// api/create-payment.js
module.exports = async (req, res) => {
  return res.status(200).json({ token: process.env.MERCADO_PAGO_ACCESS_TOKEN ? "OK" : "MISSING" })
}
