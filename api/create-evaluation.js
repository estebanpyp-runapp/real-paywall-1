// api/create-evaluation.js
const { createClient } = require('@supabase/supabase-js')
const { v4: uuidv4 } = require('uuid')

// Inicializa Supabase con variables de entorno de Vercel
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, resultado_parcial, diagnostico_completo } = req.body

  // Validación básica de datos
  if (!email || !resultado_parcial || !diagnostico_completo) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

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
      console.error('Supabase insert error:', error.message)
      return res.status(500).json({ error: 'Database insert failed' })
    }

    return res.status(200).json({ session_id })
  } catch (err) {
    console.error('Server error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
