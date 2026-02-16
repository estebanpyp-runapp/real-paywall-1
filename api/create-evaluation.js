module.exports = async (req, res) => {
  return res.status(200).json({
    url: process.env.SUPABASE_URL ? "OK" : "MISSING",
    key: process.env.SUPABASE_SERVICE_ROLE_KEY ? "OK" : "MISSING"
  })
}
