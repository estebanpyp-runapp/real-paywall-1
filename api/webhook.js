// api/webhook.js
const fetch = require('node-fetch')

module.exports = async (req, res) => {
  try {
    const { type, data } = req.body

    if (type !== 'payment') {
      return res.status(200).json({ received: true })
    }

    const paymentId = data.id

    // Consultar pago real en Mercado Pago
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
        }
      }
    )

    const payment = await response.json()

    if (payment.status === 'approved') {
      const sessionId = payment.external_reference

      console.log('Pago aprobado para sesión:', sessionId)

      // Aquí después actualizamos Supabase
    }

    res.status(200).json({ ok: true })

  } catch (err) {
    console.error('Webhook error:', err)
    res.status(500).json({ error: 'Webhook error' })
  }
}
