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

    if (bebFotoEmb.id_bebida == undefined || bebFotoEmb.id_bebida == '' || bebFotoEmb.id_bebida == null || bebFotoEmb.id_bebida.length < 1 || isNaN(bebFotoEmb.id_bebida))
        customMessages.ERROR_BAD_REQUEST.field = '[ID_BEBIDA] INVÁLIDO'
    if (bebFotoEmb.id_foto == undefined || bebFotoEmb.id_foto == '' || bebFotoEmb.id_foto == null || bebFotoEmb.id_foto.length < 1 || isNaN(bebFotoEmb.id_foto))
        customMessages.ERROR_BAD_REQUEST.field = '[ID_FOTO] INVÁLIDO'
    if (bebFotoEmb.id_tipo_embalagem == undefined || bebFotoEmb.id_tipo_embalagem == '' || bebFotoEmb.id_tipo_embalagem == null || bebFotoEmb.id_tipo_embalagem.length < 1 || isNaN(bebFotoEmb.id_tipo_embalagem))
        customMessages.ERROR_BAD_REQUEST.field = '[ID_TIPO_EMBALAGEM] INVÁLIDO'
    if (bebFotoEmb.valor == undefined || bebFotoEmb.valor == '' || bebFotoEmb.valor == null || bebFotoEmb.valor.length > 9999.99 || isNaN(bebFotoEmb.valor))
        customMessages.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
    else
        return false

    return customMessages.ERROR_BAD_REQUEST
}

const tratarDados = async function (bebFotoEmb) {
    bebFotoEmb.valor = bebFotoEmb.valor.replaceAll("'", "")

    return bebFotoEmb
}