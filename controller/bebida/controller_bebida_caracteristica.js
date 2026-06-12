/*************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o 
 *          CRUD de Bebida e Característica
 * data: 11/06/2026
 * Autor: Kayque Brenno Ferreira Almeida
 * Versão: 1.0
**************************************************************************************************************************/

const configMessages = require('../modulo/configMessages.js')

const bebidaCaracDAO = require('../../model/DAO/bebida_caracteristica/bebida_caracteristica.js')

const validarDados = async function (bebidaCarac) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (bebidaCarac.id_bebida == undefined || bebidaCarac.id_bebida == '' || bebidaCarac.id_bebida == null || bebidaCarac.id_bebida.length < 1 || isNaN(bebidaCarac.id_bebida))
        customMessages.ERROR_BAD_REQUEST.field = '[ID_BEBIDA] INVÁLIDO'
    else if (bebidaCarac.id_caracteristica == undefined || bebidaCarac.id_caracteristica == '' || bebidaCarac.id_caracteristica == null || bebidaCarac.id_caracteristica.length < 1 || isNaN(bebidaCarac.id_caracteristica))
        customMessages.ERROR_BAD_REQUEST.field = '[ID_CARACTERISTICA] INVÁLIDO'
    else 
        return false

    return customMessages.ERROR_BAD_REQUEST
}

const inserirNovaBebidaCarac = async function (bebidaCarac) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let validacao = await validarDados(bebidaCarac)
        if (validacao)
            return validacao
        else {
            let result = await bebidaCaracDAO.insertBebidaCarac(bebidaCarac)

            if (result) {
                bebidaCarac.id = result

                customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_CREATED_ITEM.status
                customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_CREATED_ITEM.status_code
                customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_CREATED_ITEM.message
                customMessages.DEFAULT_MESSAGE.response     = bebidaCarac

                return customMessages.DEFAULT_MESSAGE
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const atualizarBebidaCarac = async function (bebidaCarac, id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarBebidaCarac(id)

        if (resultBuscarID.status) {
            let validar = await validarDados(bebidaCarac)

            if (!validar) {
                bebidaCarac.id = Number(id)

                let result = await bebidaCaracDAO.updateBebidaCarac(bebidaCarac)

                if (result) {
                    customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_UPDATE_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_UPDATE_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_UPDATE_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response     = bebidaCarac

                    return customMessages.DEFAULT_MESSAGE //200 (Atualizado)
                } else {
                    return customMessages.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validar
            }
        } else {
            return resultBuscarID
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarBebidaCarac = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await bebidaCaracDAO.selectAllBebidaCarac()

        if (result) {
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status                           = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code                      = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count                   = result.length
                customMessages.DEFAULT_MESSAGE.response.bebida_caracteristica   = result

                return customMessages.DEFAULT_MESSAGE
            } else {
                return customMessages.ERROR_NOT_FOUND
            }
        } else {
            return customMessages.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarBebidaCarac = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST
        } else {
            let result = await bebidaCaracDAO.selectByIdBebidaCarac(id)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status                           = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code                      = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.bebida_caracteristica   = result

                    return customMessages.DEFAULT_MESSAGE
                } else {
                    return customMessages.ERROR_NOT_FOUND
                }
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarCaractsIdBebida = async function (idBebida) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idBebida == undefined || String(idBebida).replaceAll(' ', '') == '' || idBebida == null || isNaN(idBebida) || idBebida <= 0) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID_BEBIDA] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST
        } else {
            let result = await bebidaCaracDAO.selectCaractsByIdBebida(idBebida)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status                           = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code                      = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.bebida_caracteristica   = result

                    return customMessages.DEFAULT_MESSAGE
                } else {
                    return customMessages.ERROR_NOT_FOUND
                }
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarBebidasIdCarac = async function (idCarac) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idCarac == undefined || String(idCarac).replaceAll(' ', '') == '' || idCarac == null || isNaN(idCarac) || idCarac <= 0) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID_CARACTERISTICA] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST
        } else {
            let result = await bebidaCaracDAO.selectBebidasByIdCaracts(idCarac)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status                           = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code                      = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.bebida_caracteristica   = result

                    return customMessages.DEFAULT_MESSAGE
                } else {
                    return customMessages.ERROR_NOT_FOUND
                }
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirBebidaCarac = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarBebidaCarac(id)

        if (resultBuscarID.status) {
            let result = await bebidaCaracDAO.deleteBebidaCarac(id)

            if (result) {
                return customMessages.SUCCESS_DELETE_ITEM
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return resultBuscarID
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

const excluirCaractsIdBebida = async function (idBebida) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await bebidaCaracDAO.deleteCaractsByIdBebida(idBebida)

        if (result) {
            return customMessages.SUCCESS_DELETE_ITEM
        } else {
            return customMessages.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

module.exports = {
    inserirNovaBebidaCarac,
    listarBebidaCarac,
    buscarBebidaCarac,
    buscarCaractsIdBebida,
    buscarBebidasIdCarac,
    atualizarBebidaCarac,
    excluirBebidaCarac,
    excluirCaractsIdBebida
}