import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();

$('.form').submit(controller.adiciona.bind(controller));
$('#botao-importa').click(controller.importarDados.bind(controller));

/* Criando o controller, pegando a ação de submeter do formulario, e enviando os dados para o 
metodo adiciona dizendo que o controller será executado no mesmo contexto no qual foi 
instanciado */