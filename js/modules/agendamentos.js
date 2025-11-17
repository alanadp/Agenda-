import { SUPABASE_URL, API_KEY } from './config.js'

export async function adicionarAgendamento(obj) {
  const token = localStorage.getItem('sb_token')
  const res = await fetch(`${SUPABASE_URL}/rest/v1/agendamentos`, {
    method: 'POST',
    headers: {
      'apikey': API_KEY,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(obj)
  })
  if (!res.ok) throw new Error()
}

export async function listarAgendamentos() {
  const token = localStorage.getItem('sb_token')
  const res = await fetch(`${SUPABASE_URL}/rest/v1/agendamentos?select=*,compromissos(*)`, {
    headers: {
      'apikey': API_KEY,
      'Authorization': `Bearer ${token}`
    }
  })
  return await res.json()
}

export async function deleteAgendamento(id) {
  const token = localStorage.getItem('sb_token')
  const res = await fetch(`${SUPABASE_URL}/rest/v1/agendamentos?id=eq.${id}`, {
    method: 'DELETE',
    headers: {
      'apikey': API_KEY,
      'Authorization': `Bearer ${token}`
    }
  })
  if (!res.ok) throw new Error()
}

export async function editarAgendamento(id, obj) {
  const token = localStorage.getItem('sb_token')

  const res = await fetch(`${SUPABASE_URL}/rest/v1/agendamentos?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'apikey': API_KEY,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })

  if (!res.ok) throw new Error()
}
