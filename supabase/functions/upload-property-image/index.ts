// Edge Function: Property Image Upload
// Upload et optimisation des images de biens immobiliers
// Stockage sécurisé sur Supabase Storage
// Plateforme MZAKA - Burkina Faso

Deno.serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
    'Access-Control-Max-Age': '86400',
    'Access-Control-Allow-Credentials': 'false'
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    // Extraire les données de la requête
    const requestData = await req.json();
    const { 
      imageData, 
      fileName, 
      propertyId, 
      imageType = 'general',
      isPrimary = false 
    } = requestData;

    // Validation des données requises
    if (!imageData || !fileName || !propertyId) {
      throw new Error('Image data, filename et propertyId sont requis');
    }

    // Récupérer les clés d'environnement
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');

    if (!serviceRoleKey || !supabaseUrl) {
      throw new Error('Configuration Supabase manquante');
    }

    // Extraire le type MIME et les données base64
    const base64Data = imageData.split(',')[1];
    const mimeType = imageData.split(';')[0].split(':')[1];

    // Validation du type MIME
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validImageTypes.includes(mimeType)) {
      throw new Error('Type d\'image non supporté. Utilisez JPEG, PNG ou WebP.');
    }

    // Convertir base64 en binaire
    const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

    // Vérifier la taille du fichier (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (binaryData.length > maxSize) {
      throw new Error('L\'image est trop volumineuse. Taille maximum: 10MB');
    }

    // Générer le nom de fichier unique
    const timestamp = Date.now();
    const fileExtension = fileName.split('.').pop();
    const uniqueFileName = `${propertyId}_${timestamp}_${Math.random().toString(36).substr(2, 9)}.${fileExtension}`;
    const storagePath = `property-images/${uniqueFileName}`;

    // Upload vers Supabase Storage
    const uploadResponse = await fetch(`${supabaseUrl}/storage/v1/object/property-images/${storagePath}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': mimeType,
        'x-upsert': 'true'
      },
      body: binaryData
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Échec de l'upload: ${errorText}`);
    }

    // Générer l'URL publique
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/property-images/${storagePath}`;

    // Récupérer les informations de l'utilisateur depuis l'en-tête d'authentification
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      throw new Error('En-tête d\'authentification manquant');
    }

    const token = authHeader.replace('Bearer ', '');

    // Vérifier le token et obtenir l'utilisateur
    const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': serviceRoleKey
      }
    });

    if (!userResponse.ok) {
      throw new Error('Token d\'authentification invalide');
    }

    const userData = await userResponse.json();
    const userId = userData.id;

    // Vérifier que l'utilisateur est autorisé à uploader pour ce bien
    const propertyResponse = await fetch(`${supabaseUrl}/rest/v1/properties?id=eq.${propertyId}&select=owner_id`, {
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey,
        'Content-Type': 'application/json'
      }
    });

    if (!propertyResponse.ok) {
      throw new Error('Impossible de vérifier l\'autorisation pour ce bien');
    }

    const propertyData = await propertyResponse.json();
    if (!propertyData || propertyData.length === 0) {
      throw new Error('Bien immobilier non trouvé');
    }

    const property = propertyData[0];
    if (property.owner_id !== userId) {
      throw new Error('Vous n\'êtes pas autorisé à uploader des images pour ce bien');
    }

    // Mettre à jour la liste des images du bien
    const currentPropertyResponse = await fetch(`${supabaseUrl}/rest/v1/properties?id=eq.${propertyId}&select=images`, {
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey,
        'Content-Type': 'application/json'
      }
    });

    let currentImages = [];
    if (currentPropertyResponse.ok) {
      const currentData = await currentPropertyResponse.json();
      if (currentData && currentData.length > 0 && currentData[0].images) {
        currentImages = currentData[0].images;
      }
    }

    // Ajouter la nouvelle image
    const updatedImages = [...currentImages, publicUrl];

    // Si c'est l'image principale, la placer en première position
    const finalImages = isPrimary ? [publicUrl, ...currentImages] : updatedImages;

    // Mettre à jour le bien avec la nouvelle image
    const updateResponse = await fetch(`${supabaseUrl}/rest/v1/properties?id=eq.${propertyId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        images: finalImages,
        updated_at: new Date().toISOString()
      })
    });

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error('Erreur de mise à jour du bien:', errorText);
      // Nettoyer l'image uploadée en cas d'erreur
      await fetch(`${supabaseUrl}/storage/v1/object/property-images/${storagePath}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${serviceRoleKey}`
        }
      });
      throw new Error('Échec de la mise à jour du bien immobilier');
    }

    const updatedProperty = await updateResponse.json();

    // Retourner la réponse de succès
    return new Response(JSON.stringify({
      data: {
        imageUrl: publicUrl,
        fileName: uniqueFileName,
        fileSize: binaryData.length,
        mimeType: mimeType,
        isPrimary: isPrimary,
        property: updatedProperty[0],
        storagePath: storagePath,
        uploadedAt: new Date().toISOString()
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Erreur upload image propriété:', error);

    const errorResponse = {
      error: {
        code: 'PROPERTY_IMAGE_UPLOAD_FAILED',
        message: error.message
      }
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});