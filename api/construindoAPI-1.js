// 1º passo: Criação e teste do servidor
const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', "application/JSON");
    res.end(JSON.stringify({
        mensagem: 'Servidor funcionando'
    }));
});
server.listen(3000, () => {
    console.log('Server running in http://localhost:3000');
});