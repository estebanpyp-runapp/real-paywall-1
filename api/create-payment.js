// api/create-payment.js (solo para prueba)
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  
  const { email, session_id, amount } = req.body
  if (!email || !session_id || !amount) return res.status(400).json({ error: 'Missing fields' })

  // Simulamos la respuesta de Mercado Pago
  return res.status(200).json({
    id: 123456789,
    status: 'pending',
    status_detail: 'accredited',
    external_reference: session_id,
    transaction_amount: amount,
    payment_method_id: 'pix'
  })
}

