const fs = require('fs');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});
const express = require('express');
const app = express();

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");



const db = admin.database();

// Rota da página que exibe os talhao registrados no banco de dados
app.get('/', (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/talhao/talhao.html', (e, dados) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(cabecalho + dados + rodape);
                res.end();
            });
        });
    });
});

// Rota da página para abrir formulário para inserir um novo registro de talhao
app.get('/novo', (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/talhao/novo_talhao.html', (e, dados) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(cabecalho + dados + rodape);
                res.end();
            });
        });
    });
});

// Rota da página inserir um novo registro de talhao
app.post('/novo', urlencodedParser, (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/talhao/talhao.html', (e, dados) => {
                let mensagem = "";
                try{
                    const doctalhao = db.ref("talhao").push();
                    const talhao = {
                        id: req.body.id,
                        nome: req.body.nome,
                        longitude: req.body.longitude,
                        latitude: req.body.latitude,
                        area: req.body.area,
                        foto: req.body.foto,
                    };
                    doctalhao.set(talhao);
                    mensagem = "talhao inserido com sucesso!";
                }catch(e){
                    mensagem = "Erro ao inserir o talhao!";
                }
                dados = dados.toString().replace("{mensagem}", mensagem);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(cabecalho + dados + rodape);
                res.end();
            });
        });
    });
});

// Rota da página para abrir formuário para editar os dados de um registro de talhao
app.get('/editar/:id', (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/talhao/editar_talhao.html', (e, dados) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(cabecalho + dados + rodape);
                res.end();
            });
        });
    });
});

// Rota da página para editar os dados de um registro de talhao
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

// Rota da página para abrir formulário para excluir um registro de um talhao
app.get('/excluir/:id', (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/talhao/excluir_talhao.html', (e, dados) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(cabecalho + dados + rodape);
                res.end();
            });
        });
    });
});

// Rota da página para excluir um registro de um talhao
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