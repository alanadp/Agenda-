import { verificaAutenticacao } from "./modules/auth.js";
import { logoutUi } from "./ui/auth.js";
import { carregarAgendamentos, popularCompromissos, formAgendamentoHandler } from "./ui/agendamentosUi.js";

document.addEventListener("DOMContentLoaded", () => {
  if (!verificaAutenticacao()) return;
  logoutUi();
  popularCompromissos();
  carregarAgendamentos();
  formAgendamentoHandler();
});
