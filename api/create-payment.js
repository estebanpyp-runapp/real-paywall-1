// api/create-payment.js
const fetch = require('node-fetch')

module.exports = async (req, res) => {
  if (req.method !== 'POST') 
    return res.status(405).json({ error: 'Method not allowed' })

  const { email, session_id, amount } = req.body
  if (!email || !session_id || !amount) 
    return res.status(400).json({ error: 'Missing required fields' })

  try {
    const response = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        transaction_amount: amount,
        description: `Pago evaluación: ${session_id}`,
        payer: { email },
        payment_method_id: 'pix', // o 'credit_card'
        external_reference: session_id
      })
    })

    const data = await response.json()
    return res.status(200).json(data)
  } catch (err) {
    console.error('Mercado Pago REST error:', err)
    return res.status(500).json({ error: 'Payment creation failed', message: err.message || err })
  }
}


