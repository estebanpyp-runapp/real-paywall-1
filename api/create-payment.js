// api/create-payment.js
const mercadopago = require('mercadopago')

// Configura el Access Token desde Vercel
mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_ACCESS_TOKEN)

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, session_id, amount } = req.body

  if (!email || !session_id || !amount) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const paymentData = {
      transaction_amount: amount,
      description: `Pago evaluación: ${session_id}`,
      payer: { email },
      payment_method_id: 'pix', // o 'credit_card'
      external_reference: session_id
    }

    const payment = await mercadopago.payment.create(paymentData)
    return res.status(200).json(payment)
  } catch (err) {
    console.error('Mercado Pago error:', err)
    return res.status(500).json({ error: 'Payment creation failed' })
  }
}
