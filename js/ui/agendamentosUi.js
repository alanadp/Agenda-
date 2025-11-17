import { adicionarAgendamento, listarAgendamentos, deleteAgendamento, editarAgendamento } from '../modules/agendamentos.js'
import { listarCompromissos } from '../modules/compromissos.js'

let editandoId = null

export async function popularCompromissos() {
  const select = document.getElementById("compromisso_id")
  select.innerHTML = '<option value="" disabled selected>Selecione o compromisso</option>'
  try {
    const dados = await listarCompromissos()
    dados.forEach(c => {
      const option = document.createElement("option")
      option.value = c.id
      option.textContent = c.descricao
      select.appendChild(option)
    })
  } catch {
    const option = document.createElement("option")
    option.textContent = "Erro ao carregar compromissos"
    option.disabled = true
    select.appendChild(option)
  }
}

export async function carregarAgendamentos() {
  const dados = await listarAgendamentos()
  const tbody = document.getElementById("tabelaAgendamentos")
  tbody.innerHTML = ""

  dados.sort((a,b) => new Date(a.data_agendamento) - new Date(b.data_agendamento))

  dados.forEach(a => {
    const tr = document.createElement("tr")
    const data = new Date(a.data_agendamento)
    const dataFormatada = data.toLocaleDateString()
    const horaFormatada = data.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
    
    tr.innerHTML = `
      <td class="border p-2">${a.compromissos?.descricao ?? '–'}</td>
      <td class="border p-2">${a.descricao}</td>
      <td class="border p-2">${dataFormatada} ${horaFormatada}</td>
      <td class="border p-2">
        <button data-id="${a.id}" class="btnEditar bg-yellow-500 text-white px-2 py-1 rounded mr-2">Editar</button>
        <button data-id="${a.id}" class="btnExcluir bg-red-500 text-white px-2 py-1 rounded">Excluir</button>
      </td>
    `
    tbody.appendChild(tr)
  })

  document.querySelectorAll(".btnExcluir").forEach(btn => {
    btn.addEventListener("click", async e => {
      const id = e.target.dataset.id
      await deleteAgendamento(id)
      carregarAgendamentos()
    })
  })

  document.querySelectorAll(".btnEditar").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id
      const agendamento = dados.find(a => a.id === id)
      document.getElementById('descricao').value = agendamento.descricao
      document.getElementById('compromisso_id').value = agendamento.compromisso_id
      document.getElementById('data_agendamento').value = agendamento.data_agendamento
      editandoId = id
    })
  })
}

export function formAgendamentoHandler() {
  const form = document.getElementById('formAgendamento')
  form.addEventListener('submit', async e => {
    e.preventDefault()
    const descricao = document.getElementById('descricao').value
    const compromisso_id = document.getElementById('compromisso_id').value
    const data_agendamento = document.getElementById('data_agendamento').value

    const obj = { descricao, compromisso_id, data_agendamento }

    try {
      if(editandoId) {
        await editarAgendamento(editandoId, obj)
        editandoId = null
      } else {
        await adicionarAgendamento(obj)
      }
      form.reset()
      carregarAgendamentos()
    } catch(err) {
      console.error(err)
      alert('Erro ao salvar agendamento')
    }
  })
}
