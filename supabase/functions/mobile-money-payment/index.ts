// Edge Function: Mobile Money Payment Processor - MZAKA Version
// Traitement des paiements via les 4 opérateurs Mobile Money burkinabés
// Orange Money, Moov Money, Coris Money, Wave
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
      contractId,
      amount,
      paymentType,
      mobileOperator,
      recipientPhone,
      description,
      returnUrl
    } = requestData;

    // Validation des données requises
    if (!contractId || !amount || !paymentType || !mobileOperator || !recipientPhone) {
      throw new Error('Données de paiement incomplètes');
    }

    // Validation des opérateurs Mobile Money
    const validOperators = ['orange_money', 'moov_money', 'coris_money', 'wave'];
    if (!validOperators.includes(mobileOperator)) {
      throw new Error('Opérateur Mobile Money non supporté');
    }

    // Validation des types de paiement
    const validPaymentTypes = ['rent', 'deposit', 'service_charges', 'maintenance'];
    if (!validPaymentTypes.includes(paymentType)) {
      throw new Error('Type de paiement non supporté');
    }

    // Récupérer les clés d'environnement
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');

    if (!serviceRoleKey || !supabaseUrl) {
      throw new Error('Configuration Supabase manquante');
    }

    // Récupérer les informations du contrat et des parties
    const contractResponse = await fetch(`${supabaseUrl}/rest/v1/lease_contracts?id=eq.${contractId}&select=*`, {
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey,
        'Content-Type': 'application/json'
      }
    });

    if (!contractResponse.ok) {
      throw new Error('Impossible de récupérer les informations du contrat');
    }

    const contractData = await contractResponse.json();
    if (!contractData || contractData.length === 0) {
      throw new Error('Contrat non trouvé');
    }

    const contract = contractData[0];

    // Générer un ID de transaction unique
    const transactionId = `MZAKA-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Créer l'enregistrement de paiement dans la base de données
    const paymentData = {
      contract_id: contractId,
      payer_id: null, // Sera rempli par l'authentification frontend
      recipient_id: contract.landlord_id,
      amount: amount,
      currency: 'FCFA',
      payment_type: paymentType,
      mobile_operator: mobileOperator,
      operator_transaction_id: transactionId,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    const insertResponse = await fetch(`${supabaseUrl}/rest/v1/payments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(paymentData)
    });

    if (!insertResponse.ok) {
      const errorText = await insertResponse.text();
      throw new Error(`Erreur de création du paiement: ${errorText}`);
    }

    const newPayment = await insertResponse.json();

    // Simuler le traitement du paiement (en production, ceci serait une vraie API)
    const paymentResult = await processMobileMoneyPayment({
      mobileOperator,
      amount,
      recipientPhone,
      description: description || `Paiement ${paymentType} - Contrat ${contract.contract_number}`,
      transactionId
    });

    // Mettre à jour le statut du paiement
    const updateResponse = await fetch(`${supabaseUrl}/rest/v1/payments?id=eq.${newPayment[0].id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: paymentResult.status,
        payment_date: new Date().toISOString(),
        completed_at: paymentResult.status === 'completed' ? new Date().toISOString() : null
      })
    });

    if (!updateResponse.ok) {
      console.error('Erreur de mise à jour du paiement');
    }

    // Générer le reçu automatique si le paiement est réussi
    let receiptUrl = null;
    if (paymentResult.status === 'completed') {
      receiptUrl = await generatePaymentReceipt(newPayment[0], contract, paymentResult);
    }

    // Retourner la réponse
    return new Response(JSON.stringify({
      data: {
        payment: newPayment[0],
        transactionId,
        status: paymentResult.status,
        receiptUrl,
        mobileOperator: getOperatorInfo(mobileOperator),
        nextSteps: getNextSteps(paymentResult.status, mobileOperator),
        returnUrl: returnUrl || null
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Erreur paiement Mobile Money:', error);

    const errorResponse = {
      error: {
        code: 'MOBILE_MONEY_PAYMENT_FAILED',
        message: error.message
      }
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

// Fonction pour traiter le paiement Mobile Money (simulation)
async function processMobileMoneyPayment({ mobileOperator, amount, recipientPhone, description, transactionId }) {
  // En production, ceci serait remplacé par de vrais appels aux APIs des opérateurs
  const successRate = 0.95; // 95% de succès simulé
  
  // Simuler un délai de traitement
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const isSuccess = Math.random() < successRate;
  
  return {
    status: isSuccess ? 'completed' : 'failed',
    operator: mobileOperator,
    amount,
    recipientPhone,
    description,
    transactionId,
    processedAt: new Date().toISOString(),
    fees: {
      percentage: getOperatorFees(mobileOperator),
      amount: Math.round(amount * getOperatorFees(mobileOperator) / 100)
    }
  };
}

// Fonction pour obtenir les informations de l'opérateur
function getOperatorInfo(operator) {
  const operators = {
    orange_money: {
      name: 'Orange Money',
      logo: '🟠',
      color: '#FF6B00',
      fees: '0.8%',
      maxAmount: 5000000,
      minAmount: 100
    },
    moov_money: {
      name: 'Moov Money',
      logo: '🔵',
      color: '#0066CC',
      fees: '1.0%',
      maxAmount: 2000000,
      minAmount: 100
    },
    coris_money: {
      name: 'Coris Money',
      logo: '🟡',
      color: '#FFD700',
      fees: '1.2%',
      maxAmount: 3000000,
      minAmount: 500
    },
    wave: {
      name: 'Wave',
      logo: '🟣',
      color: '#7B68EE',
      fees: '0.5%',
      maxAmount: 1000000,
      minAmount: 100
    }
  };
  
  return operators[operator] || operators.orange_money;
}

// Fonction pour obtenir les frais de l'opérateur
function getOperatorFees(operator) {
  const fees = {
    orange_money: 0.8,
    moov_money: 1.0,
    coris_money: 1.2,
    wave: 0.5
  };
  
  return fees[operator] || 1.0;
}

// Fonction pour obtenir les prochaines étapes
function getNextSteps(status, operator) {
  if (status === 'completed') {
    return [
      'Paiement réussi !',
      'Reçu automatique généré',
      'Votre compte sera crédité sous 24h',
      'Vous recevrez un SMS de confirmation'
    ];
  } else if (status === 'failed') {
    return [
      'Paiement échoué',
      'Vérifiez votre solde Mobile Money',
      'Vérifiez le numéro du destinataire',
      'Réessayez dans quelques minutes'
    ];
  } else {
    return [
      'Paiement en cours de traitement',
      'Ne fermez pas cette page',
      'Vous recevrez une confirmation par SMS',
      'Le statut sera mis à jour automatiquement'
    ];
  }
}

// Fonction pour générer un reçu
async function generatePaymentReceipt(payment, contract, paymentResult) {
  // En production, ceci générerait un vrai PDF ou document
  const receiptData = {
    receiptNumber: `RCP-${Date.now()}`,
    paymentId: payment.id,
    transactionId: paymentResult.transactionId,
    amount: payment.amount,
    currency: payment.currency,
    operator: paymentResult.operator,
    date: new Date().toISOString(),
    contract: {
      number: contract.contract_number,
      property: 'Biens Immobiliers',
      tenant: 'Locataire',
      landlord: 'Propriétaire'
    }
  };
  
  // Simuler la génération d'un lien de reçu
  return `https://mzaka.bf/receipts/${receiptData.receiptNumber}.pdf`;
}