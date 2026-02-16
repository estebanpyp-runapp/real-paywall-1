// api/create-evaluation.js
const { createClient } = require('@supabase/supabase-js')
const { v4: uuidv4 } = require('uuid')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { email, resultado_parcial, diagnostico_completo } = req.body

    const session_id = uuidv4()

    try {
      const { error } = await supabase.from('evaluations').insert([
        {
          id: session_id,
          email,
          resultado_parcial,
          diagnostico_completo,
          paid: false
        }
      ])

      if (error) {
        return res.status(500).json({ error: error.message })
      }

      return res.status(200).json({ session_id })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}

