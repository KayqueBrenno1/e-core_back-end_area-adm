/********************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD do TIPO DE EMBALAGEM
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 11/06/2026
 * Versão: 1.0
*********************************************************************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

//Import da DAO
const tipoEmbalagemDAO = require('../../model/DAO/tipo_embalagem/tipo_embalagem.js')

const validarDados = async function (tipoEmbalagem) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (tipoEmbalagem.tipo_embalagem == undefined || tipoEmbalagem.tipo_embalagem == '' || tipoEmbalagem.tipo_embalagem == null ||  tipoEmbalagem.tipo_embalagem.length > 40)
        customMessages.ERROR_BAD_REQUEST.field = '[TIPO DE EMBALAGEM] INVÁLIDO'
    else 
        return false

    return customMessages.ERROR_BAD_REQUEST
}

const tratarDados = async function (tipoEmbalagem) {
    tipoEmbalagem.tipo_embalagem = tipoEmbalagem.tipo_embalagem.replaceAll("'", "")

    return tipoEmbalagem
}

//Função INSERT
const inserirNovoTipoEmbalagem = async function (tipoEmbalagem, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(tipoEmbalagem)
            
            if (validar)
                return validar
            else {
                let result = await tipoEmbalagemDAO.insertTipoEmbalagem(await tratarDados(tipoEmbalagem))

                if (result) {
                    tipoEmbalagem.id = result

                    customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_CREATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_CREATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_CREATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response     = tipoEmbalagem

                    return customMessages.DEFAULT_MESSAGE
                } else
                    return customMessages.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return customMessages.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função ATUALIZAR
const atualizarTipoEmbalagem = async function (tipoEmbalagem, id, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarID = await buscarTipoEmbalagem(id)

            if (resultBuscarID.status) {
                let validar = await validarDados(tipoEmbalagem)

                if (!validar) {
                    tipoEmbalagem.id = Number(id)

                    let result = await tipoEmbalagemDAO.updateTipoEmbalagem(await tratarDados(tipoEmbalagem))

                    if (result) {
                        customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_UPDATE_ITEM.status
                        customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_UPDATE_ITEM.status_code
                        customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_UPDATE_ITEM.message
                        customMessages.DEFAULT_MESSAGE.response     = tipoEmbalagem

                        return customMessages.DEFAULT_MESSAGE
                    } else
                        return customMessages.ERROR_INTERNAL_SERVER_MODEL
                } else
                    return validar
            } else
                return resultBuscarID
        } else
            return customMessages.ERROR_CONTENT_TYPE
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função LISTAR TODOS
const listarTipoEmbalagem = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await tipoEmbalagemDAO.selectAllTipoEmbalagem()

        if (result) {
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status                   = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code              = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count           = result.length
                customMessages.DEFAULT_MESSAGE.response.tipo_embalagem  = result

                return customMessages.DEFAULT_MESSAGE
            } else
                return customMessages.ERROR_NOT_FOUND
        } else
            return customMessages.ERROR_INTERNAL_SERVER_MODEL
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função BUSCAR POR ID
const buscarTipoEmbalagem = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST
        } else {
            let result = await tipoEmbalagemDAO.selectByIdTipoEmbalagem(id)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status                   = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code              = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.tipo_embalagem  = result

                    return customMessages.DEFAULT_MESSAGE
                } else 
                    return customMessages.ERROR_NOT_FOUND
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função EXCLUIR
const excluirTipoEmbalagem = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarTipoEmbalagem(id)

        if (resultBuscarID.status) {
            let result = await tipoEmbalagemDAO.deleteTipoEmbalagem(id)

            if (result) {
                return customMessages.SUCCESS_DELETE_ITEM
            } else
                return customMessages.ERROR_INTERNAL_SERVER_MODEL
        } else
            return resultBuscarID
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirNovoTipoEmbalagem,
    atualizarTipoEmbalagem,
    listarTipoEmbalagem,
    buscarTipoEmbalagem,
    excluirTipoEmbalagem
}