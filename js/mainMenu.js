import { verificaAutenticacao } from "./modules/auth.js";
import { logoutUi } from "./ui/auth.js";
import { carregarAgendamentosMenu } from "./menuAgendamentos.js";

document.addEventListener('DOMContentLoaded', () => {
    if (!verificaAutenticacao()) return
    logoutUi()
    carregarAgendamentosMenu()
})
