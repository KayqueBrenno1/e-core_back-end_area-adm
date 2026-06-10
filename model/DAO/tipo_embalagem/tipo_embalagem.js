/***********************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da TIPO DE EMBALAGEM no banco de dados
 *          MySQL
 * Data: 09/06/2026
 * Autor: Kayque Brenno Ferreira Almeida
 * Versão: 1.0
************************************************************************************************/

//IMPORT DA BIBLIOTECA PARA MANIPULAR DADOS NO BD MYSQL
const knex = require('knex')

//IMPORT DO ARQUIVO DE CONFIGURAÇÃO PARA ACESSO AO BD
const knexDataBaseConfig = require('../../database/database_config/knexConfig.js')

//CRIAR A CONEXÃO COM O BANCO DE DADOS CONFORME A CONFIGURAÇÃO
const knexConection = knex(knexDataBaseConfig.development)

//FUNÇÃO PARA INSERIR UM NOVO TIPO DE EMBALAGEM NO BANCO DE DADOS
const insertTipoEmbalagem = async function (tipoEmbalagem) {
    try {
        let sql = `insert into tbl_tipo_embalagem (
            tipo_embalagem
        ) values (
            '${tipoEmbalagem.tipo_embalagem}'
        );`

        let result = await knexConection.raw(sql)

        if (result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA ATUALIZAR UM TIPO DE EMBALAGEM EXISTENTE NO BANCO DE DADOS
const updateTipoEmbalagem = async function (tipoEmbalagem) {
    try {
        let sql = `update tbl_tipo_embalagem set
                        tipo_embalagem = '${tipoEmbalagem.tipo_embalagem}'
                    where id = ${tipoEmbalagem.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA LISTAR TODOS OS TIPOS DE EMBALAGENS REGISTRADOS NO SISTEMA
const selectAllTipoEmbalagem = async function () {
    try {
        let sql = `select * from tbl_tipo_embalagem order by id desc;`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA RETORNAR UM TIPO DE EMBALAGEM FILTRANDO PELO ID
const selectByIdTipoEmbalagem = async function (id) {
    try {
        let sql = `select * from tbl_tipo_embalagem where id = ${id};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA EXCLUIR UM TIPO DE EMBALAGEM REGISTRADO NO SISTEMA FILTRANDO PELO ID
const deleteTipoEmbalagem = async function (id) {
    try {
        let sql = `delete from tbl_tipo_embalagem where id = ${id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true 
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertTipoEmbalagem,
    updateTipoEmbalagem,
    selectAllTipoEmbalagem,
    selectByIdTipoEmbalagem,
    deleteTipoEmbalagem
}