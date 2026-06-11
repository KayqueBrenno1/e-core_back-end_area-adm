/*************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD da BEBIDA
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 11/06/2026
 * Versão: 1.0
**************************************************************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

//Import da DAO
const bebidaDAO = require('../../model/DAO/bebida/bebida.js')

//IMPORT DAS CONTROLLERS
const controllerCategoria   = require('../categoria/controller_categoria.js')
const controllerMarca       = require('../marca/controller_marca.js')
const controllerSabor       = require('../sabor/controller_sabor.js')
const controllerBebidaCarac = require('./controller_bebida_caracteristica.js')

const validarDados = async function (bebida) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (bebida.nome == undefined || bebida.nome == '' || bebida.nome == null ||  bebida.nome.length > 120)
        customMessages.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
    else if (bebida.litragem == undefined || bebida.litragem == '' || bebida.litragem == null || bebida.litragem.length > 25)
        customMessages.ERROR_BAD_REQUEST.field = '[LITRAGEM] INVÁLIDO'
    else if (bebida.descricao == undefined || bebida.descricao == '' || bebida.descricao == null)
        customMessages.ERROR_BAD_REQUEST.field = '[DESCRICAO] INVÁLIDA'
    else if (bebida.id_categoria == undefined || bebida.id_categoria == '' || bebida.id_categoria == null || isNaN(bebida.id_categoria) || bebida.id_categoria.length < 1)
        customMessages.ERROR_BAD_REQUEST.field = '[ID_CATEGORIA] INVÁLIDO'
    else if (bebida.id_marca == undefined || bebida.id_marca == '' || bebida.id_marca == null || isNaN(bebida.id_marca) || bebida.id_marca.length < 1)
        customMessages.ERROR_BAD_REQUEST.field = '[ID_MARCA] INVÁLIDO'
    else if (bebida.id_sabor == undefined || bebida.id_sabor == '' || bebida.id_sabor == null || isNaN(bebida.id_sabor) || bebida.id_sabor.length < 1)
        customMessages.ERROR_BAD_REQUEST.field = '[ID_SABOR] INVÁLIDO'
    else
        return false

    return customMessages.ERROR_BAD_REQUEST
}

const tratarDados = async function (bebida) {
    bebida.nome = bebida.nome.replaceAll("'", "")
    bebida.litragem = bebida.litragem.replaceAll("'", "")    
    bebida.descricao = bebida.descricao.replaceAll("'", "")       

    return bebida
}

//Função INSERT
const inserirNovaBebida = async function (bebida, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(bebida)
            
            if (validar)
                return validar
            else {
                let result = await bebidaDAO.insertBebida(await tratarDados(bebida))

                if (result) {
                    bebida.id = result

                    for (let itemBebida of bebida.caracteristica) {
                        let bebidaCaracteristica = {
                            "id_bebida": bebida.id,
                            "id_caracteristica": itemBebida.id
                        }

                        let resultBebidaCarac = await controllerBebidaCarac
                                                        .inserirNovaBebidaCarac(bebidaCaracteristica)
                        
                        if (!resultBebidaCarac.status)
                            return customMessages.SUCCESS_CREATED_ITEM_WARNING
                    }

                    customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_CREATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_CREATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_CREATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response     = bebida

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
const atualizarBebida = async function (bebida, id, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarID = await buscarBebida(id)

            if (resultBuscarID.status) {
                let validar = await validarDados(bebida)

                if (!validar) {
                    bebida.id = Number(id)

                    let result = await bebidaDAO.updateBebida(await tratarDados(bebida))

                    if (result) {
                        let resultDeleteCaracts = await controllerBebidaCarac.excluirCaractsIdBebida(bebida.id)
                        
                        if (resultDeleteCaracts.status) {
                            for (let itemBebida of bebida.caracteristica) {
                                let bebidaCaracteristica = {
                                    "id_bebida": bebida.id,
                                    "id_caracteristica": itemBebida.id
                                }

                                let resultBebidaCarac = await controllerBebidaCarac
                                                                .inserirNovaBebidaCarac(bebidaCaracteristica)
                                
                                if (!resultBebidaCarac.status)
                                    return customMessages.SUCCESS_CREATED_ITEM_WARNING
                            }
                        }

                        customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_UPDATE_ITEM.status
                        customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_UPDATE_ITEM.status_code
                        customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_UPDATE_ITEM.message
                        customMessages.DEFAULT_MESSAGE.response     = bebida

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
const listarBebida = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await bebidaDAO.selectAllBebida()

        if (result) {
            if (result.length > 0) {
                for (let bebida of result) {
                    let resultCategoria = await controllerCategoria.buscarCategoria(bebida.id_categoria)

                    if (resultCategoria.status) {
                        bebida.categoria = resultCategoria.response.categoria

                        delete bebida.id_categoria
                    }

                    let resultMarca = await controllerMarca.buscarMarca(bebida.id_marca)

                    if (resultMarca.status) {
                        bebida.marca = resultMarca.response.marca

                        delete bebida.id_marca
                    }

                    let resultSabor = await controllerSabor.buscarSabor(bebida.id_sabor)

                    if (resultSabor.status) {
                        bebida.sabor = resultSabor.response.sabor

                        delete bebida.id_sabor
                    }

                    let resultBebidaCarac = await controllerBebidaCarac
                                                    .buscarCaractsIdBebida(bebida.id)

                    if (resultBebidaCarac.status)
                        bebida.caracteristica = resultBebidaCarac.response.bebida_caracteristica
                }

                customMessages.DEFAULT_MESSAGE.status           = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code      = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count   = result.length
                customMessages.DEFAULT_MESSAGE.response.bebida  = result

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
const buscarBebida = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST
        } else {
            let result = await bebidaDAO.selectByIdBebida(id)

            if (result) {
                if (result.length > 0) {
                    for (let bebida of result) {
                        let resultCategoria = await controllerCategoria.buscarCategoria(bebida.id_categoria)
    
                        if (resultCategoria.status) {
                            bebida.categoria = resultCategoria.response.categoria
    
                            delete bebida.id_categoria
                        }
    
                        let resultMarca = await controllerMarca.buscarMarca(bebida.id_marca)
    
                        if (resultMarca.status) {
                            bebida.marca = resultMarca.response.marca
    
                            delete bebida.id_marca
                        }
    
                        let resultSabor = await controllerSabor.buscarSabor(bebida.id_sabor)
    
                        if (resultSabor.status) {
                            bebida.sabor = resultSabor.response.sabor
    
                            delete bebida.id_sabor
                        }

                        let resultBebidaCarac = await controllerBebidaCarac
                                                    .buscarCaractsIdBebida(bebida.id)

                        if (resultBebidaCarac.status)
                            bebida.caracteristica = resultBebidaCarac.response.bebida_caracteristica
                    }

                    customMessages.DEFAULT_MESSAGE.status           = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code      = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.bebida  = result

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
const excluirBebida = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarBebida(id)

        if (resultBuscarID.status) {
            let result = await bebidaDAO.deleteBebida(id)

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
    inserirNovaBebida,
    atualizarBebida,
    listarBebida,
    buscarBebida,
    excluirBebida
}