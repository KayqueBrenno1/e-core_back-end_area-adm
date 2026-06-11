/*************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD da MARCA
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 11/06/2026
 * Versão: 1.0
**************************************************************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

//Import da DAO
const marcaDAO = require('../../model/DAO/marca/marca.js')

const validarDados = async function (marca) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (marca.nome_marca == undefined || marca.nome_marca == '' || marca.nome_marca == null ||  marca.nome_marca.length > 60)
        customMessages.ERROR_BAD_REQUEST.field = '[MARCA] INVÁLIDO'
    else 
        return false

    return customMessages.ERROR_BAD_REQUEST
}

const tratarDados = async function (marca) {
    marca.nome_marca = marca.nome_marca.replaceAll("'", "")

    return marca
}

//Função INSERT
const inserirNovaMarca = async function (marca, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(marca)
            
            if (validar)
                return validar
            else {
                let result = await marcaDAO.insertMarca(await tratarDados(marca))

                if (result) {
                    marca.id = result

                    customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_CREATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_CREATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_CREATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response     = marca

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
const atualizarMarca = async function (marca, id, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarID = await buscarMarca(id)

            if (resultBuscarID.status) {
                let validar = await validarDados(marca)

                if (!validar) {
                    marca.id = Number(id)

                    let result = await marcaDAO.updateMarca(await tratarDados(marca))

                    if (result) {
                        customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_UPDATE_ITEM.status
                        customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_UPDATE_ITEM.status_code
                        customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_UPDATE_ITEM.message
                        customMessages.DEFAULT_MESSAGE.response     = marca

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
const listarMarca = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await marcaDAO.selectAllMarca()

        if (result) {
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status           = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code      = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count   = result.length
                customMessages.DEFAULT_MESSAGE.response.marca   = result

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
const buscarMarca = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST
        } else {
            let result = await marcaDAO.selectByIdMarca(id)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status           = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code      = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.marca   = result

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
const excluirMarca = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarMarca(id)

        if (resultBuscarID.status) {
            let result = await marcaDAO.deleteMarca(id)

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
    inserirNovaMarca,
    atualizarMarca,
    listarMarca,
    buscarMarca,
    excluirMarca
}