// api/create-payment.js
const mercadopago = require('mercadopago')

// Configura tu Access Token desde Vercel
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
    // Creamos el pago con Mercado Pago
    const paymentData = {
      transaction_amount: amount,
      description: `Pago evaluación: ${session_id}`,
      payer: { email },
      payment_method_id: 'pix', // o 'credit_card'
      external_reference: session_id
    }

    const payment = await mercadopago.payment.create(paymentData)

    // Devuelve solo los datos esenciales
    return res.status(200).json({
      id: payment.response.id,
      status: payment.response.status,
      status_detail: payment.response.status_detail,
      external_reference: payment.response.external_reference,
      transaction_amount: payment.response.transaction_amount,
      payment_method_id: payment.response.payment_method_id
    })
  } catch (err) {
    console.error('Mercado Pago error:', err)

    // Devuelve un error sin romper la función
    return res.status(500).json({
      error: 'Payment creation failed',
      message: err.message || err
    })
  }
}
