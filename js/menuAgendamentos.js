import { verificaAutenticacao } from "./modules/auth.js";
import { logoutUi } from "./ui/auth.js";
import { listarAgendamentos } from "./modules/agendamentos.js";

export async function carregarAgendamentosMenu() {
  const dados = await listarAgendamentos();
  const tbody = document.getElementById("tabelaAgendamentosMenu");
  if (!tbody) return;
  tbody.innerHTML = "";

  dados.sort((a, b) => new Date(a.data_agendamento) - new Date(b.data_agendamento));

  if(dados.length === 0){
    tbody.innerHTML = `
      <tr>
        <td colspan="3" class="bg-blue-100 text-blue-500 p-4 text-center">
          Ainda não há nenhum agendamento cadastrado!
        </td>
      </tr>
    `;
    return;
  }

  dados.forEach(a => {
    const tr = document.createElement("tr");
    const data = new Date(a.data_agendamento);
    const dataFormatada = data.toLocaleDateString();
    const horaFormatada = data.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    tr.innerHTML = `
      <td class="border p-2">${a.compromissos?.descricao ?? '–'}</td>
      <td class="border p-2">${a.descricao}</td>
      <td class="border p-2">${dataFormatada} ${horaFormatada}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (!verificaAutenticacao()) return;
  logoutUi();
  carregarAgendamentosMenu();
});
