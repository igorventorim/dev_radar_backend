const express = require('express')
const mongoose = require('mongoose');
const routes = require('./routes')
const cors = require('cors');
const http = require('http');
const { setupWebSocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://iventorim:19zbvNxbBgIPf1Og@wikidb-yb1gv.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Tipos de parâmetros:

// QUERY Params: req.query (Filtros, ordenação, paginação, ...)
// Route Params: req.params (Identificar um recurso na alteração, remoção)
// Body: req.body (Dados para a criação)

app.use(cors());
app.use(express.json());
app.use(routes)


server.listen(3333);