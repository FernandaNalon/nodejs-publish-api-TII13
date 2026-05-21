// 3º passo: trocar os testes pelo método GET

const http = require('http');
const url = require('url');

let pedidos = [
    {
        id: 1,
        cliente: "Fernanda",
        produto: "Hamburguer",
        status: "pendente"
    },
];

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', "application/JSON");

    const urlCompleta = url.parse(req.url, true);

    const rota = urlCompleta.pathname;
    const metodo = req.method;

    // MÉTODO GET
    if(rota === '/pedidos' && metodo === 'GET'){
        res.end(JSON.stringify({
            mensagem: "Lista de pedidos",
            dados: pedidos
        }));
        return;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({
        mensagem: 'Rota não encontrada'
    }));
});

server.listen(3000, () => {
    console.log('Server running in http://localhost:3000');
});