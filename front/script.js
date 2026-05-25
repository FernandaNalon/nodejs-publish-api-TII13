// Função responsável por buscar todos os pedidos na api e exibir na tela
function listarPedidos() {
    // busca o elemento HTML (lista), onde a listagem de pedidos será exibida
    const lista = document.getElementById("lista");
    // conexão suave entre a interface e a conexão da API
    lista.innerHTML= "Carregando pedidos...";
    // faz uma requisição GET para a API com a url publicada
    fetch("https://nodejs-publish-api-tii13.onrender.com/pedidos")
    // convertendo a resposta da API para JSON
    .then(res => res.json())
    // trabalhando o resultado da API
    .then(resultado => {
        // limpando a lista para preencher com os pedidos
        lista.innerHTML = "";
        // Percorrendo o array de pedidos recebido da API
        resultado.dados.forEach(pedido => {
            // Cria um item de linha para cada pedido
            const item = document.createElement("li");
            // Define como o texto será exibido na tela
            item.textContent = `${pedido.id} - ${pedido.cliente} | ${pedido.produto} | ${pedido.status}`;
            // Adiciona o item dentro da lista
            lista.appendChild(item);
        });
    })
    // Caso o front não consiga acessar a API para trazer os dados
    .catch(() => {
        lista.innerHTML = "Erro ao carregar os pedidos"
    });
};

// Função responsável pela criação de novos pedidos
function cadastrarPedido() {
    // Pega os valores digitados nos inputs do HTML e depois limpar
    const cliente = document.getElementById("cliente").value;
    const produto = document.getElementById("produto").value;
    // Envia uma requisição POST para a API
    fetch("https://nodejs-publish-api-tii13.onrender.com/pedidos", {
        method: "POST",
        headers: {'Content-Type': 'application/JSON'},
        // converte os dados em JSON, para entregar para o BODY
        body: JSON.stringify({
            id: Date.now(),
            cliente: cliente,
            produto: produto,
            status: 'pendente'
        })
    })
    // Converter a resposta da API para JSON
    .then(res => res.json())
    .then(() => {
        // Limpa os inputs após o envio de cadastro
        document.getElementById("cliente").value = "";
        document.getElementById("produto").value = "";
        // Atualizando a lista de pedidos
        listarPedidos();
    })
    // Alerta para caso não seja possível realizar o cadastro do pedido
    .catch(() => {
        alert("Erro ao cadastrar pedido");
    });
}

// Função responsável por atualizar o status de um pedido
function atualizarPedido() {
    // Pega o ID informado e o força a ser um número
    const id = Number(document.getElementById("idAtualizar").value);
    // Pega o novo status do pedido (digitado no input)
    const status = document.getElementById("statusAtualizar").value;
    // Envia uma requisição PUT para a API
    fetch("https://nodejs-publish-api-tii13.onrender.com/pedidos", {
        method: "PUT",
        headers: {'Content-Type': 'application/JSON'},
        body: JSON.stringify({
            // envia o ID e o novo status do pedido
            id: id,
            status: status
        })
    })
    .then(res => res.json())
    // Depois de atualizar, buscará a lista de pedidos novamente e limpará os campos de id e status
    .then(() => {
        document.getElementById("idAtualizar").value="";
        document.getElementById("statusAtualizar").value="";
        listarPedidos();
    })
    .catch(() => {
        alert("Erro ao editar o pedido");
    });
}

// função responsável por remover um pedido
function removerPedido() {
    // Pega o ID informado e o força a ser um número
    const id = Number(document.getElementById("idRemover").value);

    fetch("https://nodejs-publish-api-tii13.onrender.com/pedidos", {
        method: "DELETE",
        headers: {'Content-Type': 'application/JSON'},
        // Envia apenas o ID do pedido a ser removido
        body: JSON.stringify({
            id: id
        })
    })
    .then(res => res.json())
    // limpa o campo de ID e atualiza a lista de pedidos
    .then(() => {
        document.getElementById("idRemover").value="";
        listarPedidos();
    })
    .catch(() => {
        alert("Erro ao cancelar o pedido");
    });
}

// Chama a função assim que a página carregar.
listarPedidos();