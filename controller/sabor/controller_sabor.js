/*************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD do SABOR
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 10/06/2026
 * Versão: 1.0
**************************************************************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

//Import da DAO
const saborDAO = require('../../model/DAO/sabor/sabor.js')

const validarDados = async function (sabor) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (sabor.nome_sabor == undefined || sabor.nome_sabor.length > 60)
        customMessages.ERROR_BAD_REQUEST.field = '[SABOR] INVÁLIDO'
    else 
        return false
}

const tratarDados = async function (sabor) {
    sabor.nome_sabor = sabor.nome_sabor.replaceAll("'", "")

    return sabor
}

//Função INSERT
const inserirNovoSabor = async function (sabor, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(sabor)
            
            if (validar)
                return validar
            else {
                let result = await saborDAO.insertSabor(await tratarDados(sabor))

                if (result) {
                    sabor.id = result

                    customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_CREATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_CREATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_CREATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response     = sabor

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
const atualizarSabor = async function (sabor, id, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarID = await buscarSabor(id)

            if (resultBuscarID.status) {
                let validar = await validarDados(sabor)

                if (!validar) {
                    sabor.id = Number(id)

                    let result = await saborDAO.updateSabor(await tratarDados(sabor))

                    if (result) {
                        customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_UPDATE_ITEM.status
                        customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_UPDATE_ITEM.status_code
                        customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_UPDATE_ITEM.message
                        customMessages.DEFAULT_MESSAGE.response     = sabor

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
const listarSabor = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await saborDAO.selectAllSabor()

        if (result) {
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status           = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code      = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count   = result.length
                customMessages.DEFAULT_MESSAGE.response.sabor   = result

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
const buscarSabor = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST
        } else {
            let result = await saborDAO.selectByIdSabor(id)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status           = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code      = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.sabor   = result

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
const excluirSabor = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarSabor(id)

        if (resultBuscarID.status) {
            let result = await saborDAO.deleteSabor(id)

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
    inserirNovoSabor,
    atualizarSabor,
    listarSabor,
    buscarSabor,
    excluirSabor
}