/*************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD da CARACTERÍSTICA
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 11/06/2026
 * Versão: 1.0
**************************************************************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

//Import da DAO
const caracteristicaDAO = require('../../model/DAO/caracteristica/caracteristica.js')

const validarDados = async function (caracteristica) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (caracteristica.nome == undefined || caracteristica.nome == '' || caracteristica.nome == null ||  caracteristica.nome.length > 25)
        customMessages.ERROR_BAD_REQUEST.field = '[CARACTERÍSTICA] INVÁLIDO'
    else 
        return false

    return customMessages.ERROR_BAD_REQUEST
}

const tratarDados = async function (caracteristica) {
    caracteristica.nome = caracteristica.nome.replaceAll("'", "")

    return caracteristica
}

//Função INSERT
const inserirNovaCaracteristica = async function (caracteristica, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(caracteristica)
            
            if (validar)
                return validar
            else {
                let result = await caracteristicaDAO.insertCaracteristica(await tratarDados(caracteristica))

                if (result) {
                    caracteristica.id = result

                    customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_CREATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_CREATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_CREATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response     = caracteristica

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
const atualizarCaracteristica = async function (caracteristica, id, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarID = await buscarCaracteristica(id)

            if (resultBuscarID.status) {
                let validar = await validarDados(caracteristica)

                if (!validar) {
                    caracteristica.id = Number(id)

                    let result = await caracteristicaDAO.updateCaracteristica(await tratarDados(caracteristica))

                    if (result) {
                        customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_UPDATE_ITEM.status
                        customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_UPDATE_ITEM.status_code
                        customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_UPDATE_ITEM.message
                        customMessages.DEFAULT_MESSAGE.response     = caracteristica

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
const listarCaracteristica = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await caracteristicaDAO.selectAllCaracteristica()

        if (result) {
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status                   = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code              = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count           = result.length
                customMessages.DEFAULT_MESSAGE.response.caracteristica  = result

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
const buscarCaracteristica = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST
        } else {
            let result = await caracteristicaDAO.selectByIdCaracteristica(id)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status                   = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code              = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.caracteristica  = result

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
const excluirCaracteristica = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarCaracteristica(id)

        if (resultBuscarID.status) {
            let result = await caracteristicaDAO.deleteCaracteristica(id)

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
    inserirNovaCaracteristica,
    atualizarCaracteristica,
    listarCaracteristica,
    buscarCaracteristica,
    excluirCaracteristica
}