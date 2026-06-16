/* 
    Objetivo: Arquivo responsável pela ROTA
    data: 11/06/2026
    Autor: Kayque Brenno Ferreira Almeida
    Versão: 1.0
*/


const express = require('express')
const bodyParser = require('body-parser')

//PERMITINDO A UTILIZAÇÃO DO JSON NO BODY DAS REQUISIÇÕES
const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controllerTipoEmbalagem = require('../controller/tipo_embalagem/controller_tipo_embalagem.js')
const authUser = require('../middleware/auth.js')

router.post('/', authUser.verifyToken, bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerTipoEmbalagem.inserirNovoTipoEmbalagem(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function (request, response) {
    let result = await controllerTipoEmbalagem.listarTipoEmbalagem()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerTipoEmbalagem.buscarTipoEmbalagem(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', authUser.verifyToken, bodyParserJSON, async function (request, response) {
    let id = request.params.id
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerTipoEmbalagem.atualizarTipoEmbalagem(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', authUser.verifyToken, async function (request, response) {
    let id = request.params.id

    let result = await controllerTipoEmbalagem.excluirTipoEmbalagem(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router