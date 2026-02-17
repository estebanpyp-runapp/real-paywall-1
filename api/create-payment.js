// api/create-payment.js
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, session_id, amount } = req.body

  if (!email || !session_id || !amount) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  return res.status(200).json({
    received: { email, session_id, amount }
  })
}
