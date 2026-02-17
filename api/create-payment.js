// api/create-payment.js
const fetch = require('node-fetch')

module.exports = async (req, res) => {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' })

  const { email, session_id, amount } = req.body

  if (!email || !session_id || !amount)
    return res.status(400).json({ error: 'Missing required fields' })

  try {
    const response = await fetch(
      'https://api.mercadopago.com/checkout/preferences',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: [
            {
              title: 'Diagnóstico completo evaluación running',
              quantity: 1,
              currency_id: 'MXN',
              unit_price: Number(amount)
            }
          ],
          payer: {
            email: email
          },
          external_reference: session_id,
          back_urls: {
            success: 'https://real-paywall-1-five.vercel.app/success',
            failure: 'https://real-paywall-1-five.vercel.app/failure',
            pending: 'https://real-paywall-1-five.vercel.app/pending'
          },
          auto_return: 'approved'
        })
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json(data)
    }

    return res.status(200).json({
      init_point: data.init_point
    })

  } catch (err) {
    console.error('Mercado Pago Checkout error:', err)
    return res.status(500).json({
      error: 'Preference creation failed',
      message: err.message
    })
  }
}

