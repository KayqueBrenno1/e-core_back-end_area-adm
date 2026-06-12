/*************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o 
 *          CRUD de Bebida, Foto e Embalagem
 * data: 12/06/2026
 * Autor: Kayque Brenno Ferreira Almeida
 * Versão: 1.0
**************************************************************************************************************************/

const configMessages = require('../modulo/configMessages.js')

const bebidaFotoEmbalagemDAO = require('../../model/DAO/bebida_foto_embalagem/bebida_foto_embalagem.js')

const validarDados = async function (bebFotoEmb) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (bebFotoEmb.id_bebida == undefined || bebFotoEmb.id_bebida == '' || bebFotoEmb.id_bebida == null || bebFotoEmb.id_bebida < 1 || isNaN(bebFotoEmb.id_bebida))
        customMessages.ERROR_BAD_REQUEST.field = '[ID_BEBIDA] INVÁLIDO'
    if (bebFotoEmb.id_foto == undefined || bebFotoEmb.id_foto == '' || bebFotoEmb.id_foto == null || bebFotoEmb.id_foto < 1 || isNaN(bebFotoEmb.id_foto))
        customMessages.ERROR_BAD_REQUEST.field = '[ID_FOTO] INVÁLIDO'
    if (bebFotoEmb.id_tipo_embalagem == undefined || bebFotoEmb.id_tipo_embalagem == '' || bebFotoEmb.id_tipo_embalagem == null || bebFotoEmb.id_tipo_embalagem < 1 || isNaN(bebFotoEmb.id_tipo_embalagem))
        customMessages.ERROR_BAD_REQUEST.field = '[ID_TIPO_EMBALAGEM] INVÁLIDO'
    if (bebFotoEmb.valor == undefined || bebFotoEmb.valor == '' || bebFotoEmb.valor == null || isNaN(bebFotoEmb.valor) || Number(bebFotoEmb.valor) <= 0)
        customMessages.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
    else
        return false

    return customMessages.ERROR_BAD_REQUEST
}

const inserirNovaBebidaFotoEmbalagem = async function (bebFotoEmb) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let validacao = await validarDados(bebFotoEmb)
        if (validacao)
            return validacao
        else {
            let result = await bebidaFotoEmbalagemDAO.insertBebidaFotoEmbalagem(bebFotoEmb)

            if (result) {
                bebFotoEmb.id = result

                customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_CREATED_ITEM.status
                customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_CREATED_ITEM.status_code
                customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_CREATED_ITEM.message
                customMessages.DEFAULT_MESSAGE.response     = bebFotoEmb

                return customMessages.DEFAULT_MESSAGE
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const atualizarBebidaFotoEmbalagem = async function (bebFotoEmb, id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarBebidaFotoEmbalagem(id)

        if (resultBuscarID.status) {
            let validar = await validarDados(bebFotoEmb)

            if (!validar) {
                bebFotoEmb.id = Number(id)

                let result = await bebidaFotoEmbalagemDAO.updateBebidaFotoEmbalagem(bebFotoEmb)

                if (result) {
                    customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_UPDATE_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_UPDATE_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_UPDATE_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response     = bebFotoEmb

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

const listarBebidaFotoEmbalagem = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await bebidaFotoEmbalagemDAO.selectAllBebidaFotoEmbalagem()

        if (result) {
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status                           = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code                      = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count                   = result.length
                customMessages.DEFAULT_MESSAGE.response.bebida_foto_embalagem   = result

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

const buscarBebidaFotoEmbalagem = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST
        } else {
            let result = await bebidaFotoEmbalagemDAO.selectByIdBebidaFotoEmbalagem(id)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status                           = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code                      = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.bebida_foto_embalagem   = result

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

const buscarFotoEmbalagensIdBebida = async function (idBebida) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idBebida == undefined || String(idBebida).replaceAll(' ', '') == '' || idBebida == null || isNaN(idBebida) || idBebida < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID_BEBIDA] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST
        } else {
            let result = await bebidaFotoEmbalagemDAO.selectFotoEmbalagemtsByIdBebida(idBebida)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status                           = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code                      = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.bebida_foto_embalagem   = result

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

const buscarBebidaEmbalagensIdFoto = async function (idFoto) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idFoto == undefined || String(idFoto).replaceAll(' ', '') == '' || idFoto == null || isNaN(idFoto) || idFoto <= 0) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID_FOTO] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST
        } else {
            let result = await bebidaFotoEmbalagemDAO.selectBebidasByIdFoto(idFoto)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status                           = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code                      = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.bebida_foto_embalagem   = result

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

const buscarBebidaFotosIdEmbalagem = async function (idEmbalagem) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idEmbalagem == undefined || String(idEmbalagem).replaceAll(' ', '') == '' || idEmbalagem == null || isNaN(idEmbalagem) || idEmbalagem <= 0) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID_TIPO_EMBALAGEM] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST
        } else {
            let result = await bebidaFotoEmbalagemDAO.selectBebidasByIdTipoEmbalagem(idEmbalagem)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status                           = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code                      = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.bebida_foto_embalagem   = result

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

const excluirBebidaFotoEmbalagem = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarBebidaFotoEmbalagem(id)

        if (resultBuscarID.status) {
            let result = await bebidaFotoEmbalagemDAO.deleteBebidaFotoEmbalagem(id)

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

const excluirFotoEmbalagemIdBebida = async function (idBebida) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await bebidaFotoEmbalagemDAO.deleteFotoEmbalagensByIdBebida(idBebida)

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
    inserirNovaBebidaFotoEmbalagem,
    atualizarBebidaFotoEmbalagem,
    listarBebidaFotoEmbalagem,
    buscarBebidaFotoEmbalagem,
    buscarFotoEmbalagensIdBebida,
    buscarBebidaEmbalagensIdFoto,
    buscarBebidaFotosIdEmbalagem,
    excluirBebidaFotoEmbalagem,
    excluirFotoEmbalagemIdBebida
}