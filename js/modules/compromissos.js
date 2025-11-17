import { SUPABASE_URL, API_KEY } from './config.js'

export async function listarCompromissos() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/compromissos?select=*`, {
    headers: {
      'apikey': API_KEY
    }
  })
  return await res.json()
}
