'use strict';
//Funções de limpar e atualizar a tela
const atualizarTela = () => {
	limparTarefas()
	const banco = getBanco();
	banco.forEach((item, indice) => adicionar(item.tarefa, item.status, indice));
}

const limparTarefas = () => {
	const todoList = document.getElementById("todoList")
	while(todoList.firstChild){
		todoList.removeChild(todoList.lastChild);
	}
}

//Variavel de armazenamento de dados
// const banco = [
// 	// {"tarefa": "teste1", "status": ""},
// 	// {"tarefa": "teste2", "status": "checked"}
// ]
const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [];
const setBanco = (banco) => localStorage.setItem("todoList", JSON.stringify(banco));

//Funções que recebem o texto e criam a tarefa no DOM
const criartItem = () => {
	let texto = document.getElementById("toDoInput").value.trim();
	console.log(texto);
	if(texto === ""){
		alert("Você deve nomear sua tarefa!")
		document.getElementById("toDoInput").value = "";
	} else {
		const banco = getBanco();
		banco.push({"tarefa" : texto, "status": ""})
		setBanco(banco);
		document.getElementById("toDoInput").value = "";
		atualizarTela();
	}
}
const adicionar = (tarefa, status, indice) => {
		//Criando conteudo
		const divTarefa = document.createElement("label");
		divTarefa.classList.add("list") 
		divTarefa.innerHTML = `
			<input type="checkbox" id="check-toDo" ${status} data-indice=${indice}>
			<p>${tarefa}</p>
			<input type="button" value="X" data-indice=${indice}>
		`
		document.getElementById("todoList").appendChild(divTarefa);
		
}
const adicionarItemKey = (evento) => {
	const key = evento.key;
	if(key === "Enter"){
		criartItem();
	}
	
}


//Função para remover item clicado e item checked
const removerItem = (indice) => {
	const banco = getBanco();
	banco.splice(indice,1);
	setBanco(banco);
	atualizarTela();
}
const itemCheck = (indice) => {
	const banco = getBanco();
	banco[indice].status = banco[indice].status === "" ? "checked" : "";
	setBanco(banco);
	atualizarTela();
}


//Função de click nas tags
const clickItem = (evento) => {
	const eventoItem = evento.target;
	if(eventoItem.type === "button"){
		const indice = eventoItem.dataset.indice;
		removerItem(indice);
	} else if(eventoItem.type === "checkbox"){
		const indice = eventoItem.dataset.indice;
		itemCheck(indice);
	}
}
document.getElementById("toDoInput").addEventListener("keypress", adicionarItemKey)
document.getElementById("todoList").addEventListener("click", clickItem);


//Chamando a função para atualizar a tela
atualizarTela();