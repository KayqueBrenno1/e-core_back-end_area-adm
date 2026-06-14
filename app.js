//Import no .env
require('dotenv').config()

//IMPORT DAS DEPENDENDIAS
const express = require('express')
const cors = require('cors')

//CRIANDO UM OBJETO DO EXPRESS PARA CRIAR A API
const app = express()

//CONFIGURAÇÕES DO CORS
const corsOptions = {
    origin: ['*'], //Configuração de origem da requisição (IP ou Dominio)
    methods: 'GET, POST, PUT, DELETE, OPTIONS', //Configuração dos verbos que serão utilizados na API
    allowedHeaders: ['Content-type', 'Authorization', 'x-access-token'] //Configurações de permissões
                    //Tipo de dados  //Autorização de acesso
}

//APLICAR AS CONFIGURAÇÕES DO CORS NO APP (EXPRESS)
app.use(cors(corsOptions))

const usuarioRouter = require('./routes/usuario.router.js')
app.use('/v1/delicia-gelada/admin/usuario', cors(), usuarioRouter)

const bebidaRouter = require('./routes/bebida.router.js')
app.use('/v1/delicia-gelada/admin/bebida', cors(), bebidaRouter)

const saborRouter = require('./routes/sabor.router.js')
app.use('/v1/delicia-gelada/admin/sabor', cors(), saborRouter)

const marcaRouter = require('./routes/marca.router.js')
app.use('/v1/delicia-gelada/admin/marca', cors(), marcaRouter)

const categoriaRouter = require('./routes/categoria.router.js')
app.use('/v1/delicia-gelada/admin/categoria', cors(), categoriaRouter)

const fotoRouter = require('./routes/foto.router.js')
app.use('/v1/delicia-gelada/admin/foto', cors(), fotoRouter)

const caracteristicaRouter = require('./routes/caracteristica.router.js')
app.use('/v1/delicia-gelada/admin/caracteristica', cors(), caracteristicaRouter)

const tipoEmbalagemRouter = require('./routes/tipo_embalagem.router.js')
app.use('/v1/delicia-gelada/admin/tipo_embalagem', cors(), tipoEmbalagemRouter)

//Fazer o start da API
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})