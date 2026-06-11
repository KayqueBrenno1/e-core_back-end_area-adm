/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da FOTO no banco de dados
 *          MySQL
 * Data: 09/06/2026
 * Autor: Kayque Brenno Ferreira Almeida
 * Versão: 1.0
**************************************************************************************/

//IMPORT DA BIBLIOTECA PARA MANIPULAR DADOS NO BD MYSQL
const knex = require('knex')

//IMPORT DO ARQUIVO DE CONFIGURAÇÃO PARA ACESSO AO BD
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

//CRIAR A CONEXÃO COM O BANCO DE DADOS CONFORME A CONFIGURAÇÃO
const knexConection = knex(knexDataBaseConfig.development)

//FUNÇÃO PARA INSERIR UMA NOVA FOTO NO BANCO DE DADOS
const insertFoto = async function (foto) {
    try {
        let sql = `insert into tbl_foto (
            foto,
            id_bebida
        ) values (
            '${foto.foto}',
            ${foto.id_bebida}
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

//FUNÇÃO PARA ATUALIZAR UMA FOTO EXISTENTE NO BANCO DE DADOS
const updateFoto = async function (foto) {
    try {
        let sql = `update tbl_foto set
                        foto        = '${foto.foto}',
                        id_bebida   = ${foto.id_bebida}
                    where id = ${foto.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA LISTAR TODAS AS FOTOS REGISTRADAS NO SISTEMA
const selectAllFoto = async function () {
    try {
        let sql = `select * from tbl_foto order by id desc;`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA RETORNAR UMA FOTO FILTRANDO PELO ID
const selectByIdFoto = async function (id) {
    try {
        let sql = `select * from tbl_foto where id = ${id};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA EXCLUIR UMA FOTO REGISTRADA NO SISTEMA FILTRANDO PELO ID
const deleteFoto = async function (id) {
    try {
        let sql = `delete from tbl_foto where id = ${id}`

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
    insertFoto,
    updateFoto,
    selectAllFoto,
    selectByIdFoto,
    deleteFoto
}