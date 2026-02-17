module.exports = async (req, res) => {
  console.log('======================')
  console.log('Webhook hit')
  console.log('Method:', req.method)
  console.log('Headers:', req.headers)
  console.log('Body:', req.body)
  console.log('Query:', req.query)
  console.log('======================')

  return res.status(200).json({ ok: true })
}
