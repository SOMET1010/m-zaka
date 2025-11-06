// Edge Function: e-Bail Digital Generator
// Génère des contrats de bail numériques conformes aux standards eIDAS/UEMOA
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
      propertyId,
      tenantId,
      landlordId,
      startDate,
      endDate,
      monthlyRent,
      depositAmount,
      contractTerms,
      signatureType // 'otp' ou 'certificate'
    } = requestData;

    // Validation des données requises
    if (!propertyId || !tenantId || !landlordId || !startDate || !endDate || !monthlyRent) {
      throw new Error('Données de contrat incomplètes');
    }

    // Récupérer les clés d'environnement
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');

    if (!serviceRoleKey || !supabaseUrl) {
      throw new Error('Configuration Supabase manquante');
    }

    // Générer un numéro de contrat unique
    const contractNumber = `MZAKA-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const ebailId = `EB-${Date.now()}`;

    // Récupérer les informations du bien
    const propertyResponse = await fetch(`${supabaseUrl}/rest/v1/properties?id=eq.${propertyId}&select=*`, {
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey,
        'Content-Type': 'application/json'
      }
    });

    if (!propertyResponse.ok) {
      throw new Error('Impossible de récupérer les informations du bien');
    }

    const propertyData = await propertyResponse.json();
    if (!propertyData || propertyData.length === 0) {
      throw new Error('Bien immobilier non trouvé');
    }

    const property = propertyData[0];

    // Récupérer les informations du locataire et propriétaire
    const usersResponse = await fetch(`${supabaseUrl}/rest/v1/profiles?id=in.(${tenantId},${landlordId})&select=*`, {
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey,
        'Content-Type': 'application/json'
      }
    });

    if (!usersResponse.ok) {
      throw new Error('Impossible de récupérer les informations des utilisateurs');
    }

    const usersData = await usersResponse.json();
    const tenant = usersData.find(u => u.id === tenantId);
    const landlord = usersData.find(u => u.id === landlordId);

    if (!tenant || !landlord) {
      throw new Error('Utilisateurs non trouvés');
    }

    // Générer le contenu du contrat de bail
    const contractContent = generateContractContent({
      contractNumber,
      property,
      tenant,
      landlord,
      startDate,
      endDate,
      monthlyRent,
      depositAmount,
      contractTerms
    });

    // Créer le contrat dans la base de données
    const contractData = {
      contract_number: contractNumber,
      property_id: propertyId,
      tenant_id: tenantId,
      landlord_id: landlordId,
      start_date: startDate,
      end_date: endDate,
      monthly_rent: monthlyRent,
      deposit_amount: depositAmount,
      status: 'draft',
      ebail_id: ebailId,
      compliance_status: 'pending'
    };

    const insertResponse = await fetch(`${supabaseUrl}/rest/v1/lease_contracts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(contractData)
    });

    if (!insertResponse.ok) {
      const errorText = await insertResponse.text();
      throw new Error(`Erreur de création du contrat: ${errorText}`);
    }

    const newContract = await insertResponse.json();

    // Retourner la réponse de succès
    return new Response(JSON.stringify({
      data: {
        contract: newContract[0],
        contractNumber,
        ebailId,
        content: contractContent,
        signatureOptions: {
          otp: {
            available: true,
            provider: 'SMS Burkina',
            compliance: 'eIDAS/UEMOA'
          },
          certificate: {
            available: tenant.cnam_verified && landlord.cnam_verified,
            provider: 'Infosec Burkina',
            compliance: 'eIDAS/UEMOA'
          }
        }
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Erreur génération e-Bail:', error);

    const errorResponse = {
      error: {
        code: 'EBAIL_GENERATION_FAILED',
        message: error.message
      }
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

// Fonction pour générer le contenu du contrat
function generateContractContent(data) {
  const { contractNumber, property, tenant, landlord, startDate, endDate, monthlyRent, depositAmount, contractTerms } = data;
  
  return {
    title: 'CONTRAT DE BAIL NUMÉRIQUE - MZAKA',
    parties: {
      landlord: {
        name: landlord.full_name,
        email: landlord.email,
        phone: landlord.phone,
        address: property.address,
        type: 'Bailleur'
      },
      tenant: {
        name: tenant.full_name,
        email: tenant.email,
        phone: tenant.phone,
        type: 'Locataire'
      }
    },
    property: {
      title: property.title,
      type: property.property_type,
      address: property.address,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      furnished: property.furnished,
      parking: property.parking,
      security: property.security
    },
    terms: {
      startDate,
      endDate,
      monthlyRent,
      depositAmount,
      currency: 'FCFA',
      paymentMethod: 'Mobile Money',
      renewal: contractTerms?.renewal || 'Automatique',
      termination: contractTerms?.termination || 'Préavis 3 mois'
    },
    legal: {
      compliance: 'eIDAS/UEMOA',
      jurisdiction: 'Burkina Faso',
      law: 'Code du Travail et de la Sécurité Sociale',
      disputeResolution: 'Tribunal de Ouagadougou',
      forceMajeure: 'Conforme à la législation burkinabé'
    },
    signatures: {
      digital: true,
      otpRequired: true,
      certificateRequired: false
    },
    generatedAt: new Date().toISOString(),
    contractNumber
  };
}