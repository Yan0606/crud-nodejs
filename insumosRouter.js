const fs = require('fs');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});
const express = require('express');
const app = express();

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://appnodejs-8f9ba-default-rtdb.firebaseio.com"
});


const db = admin.database();

// Rota da página que exibe os agricultor registrados no banco de dados
app.get('/', (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/agricultor/agricultor.html', (e, dados) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(cabecalho + dados + rodape);
                res.end();
            });
        });
    });
});

// Rota da página para abrir formulário para inserir um novo registro de agricultor
app.get('/novo', (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/agricultor/novo_agricultor.html', (e, dados) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(cabecalho + dados + rodape);
                res.end();
            });
        });
    });
});

// Rota da página inserir um novo registro de agricultor
app.post('/novo', urlencodedParser, (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/agricultor/agricultor.html', (e, dados) => {
                let mensagem = "";
                try{
                    const docagricultor = db.ref("agricultor").push();
                    const agricultor = {
                        nome: req.body.nome,
                        email: req.body.email,
                        senha: req.body.senha,
                        cpf: req.body.cpf
                    };
                    docagricultor.set(agricultor);
                    mensagem = "agricultor inserido com sucesso!";
                }catch(e){
                    mensagem = "Erro ao inserir o agricultor!";
                }
                dados = dados.toString().replace("{mensagem}", mensagem);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(cabecalho + dados + rodape);
                res.end();
            });
        });
    });
});

// Rota da página para abrir formuário para editar os dados de um registro de agricultor
app.get('/editar/:id', (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/agricultor/editar_agricultor.html', (e, dados) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(cabecalho + dados + rodape);
                res.end();
            });
        });
    });
});

// Rota da página para editar os dados de um registro de agricultor
app.post('/editar', urlencodedParser, (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/index.html', (e, dados) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(cabecalho + dados + rodape);
                res.end();
            });
        });
    });
});

// Rota da página para abrir formulário para excluir um registro de um agricultor
app.get('/excluir/:id', (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/agricultor/excluir_agricultor.html', (e, dados) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(cabecalho + dados + rodape);
                res.end();
            });
        });
    });
});

// Rota da página para excluir um registro de um agricultor
app.post('/excluir', urlencodedParser, (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/index.html', (e, dados) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(cabecalho + dados + rodape);
                res.end();
            });
        });
    });
});

module.exports = app;