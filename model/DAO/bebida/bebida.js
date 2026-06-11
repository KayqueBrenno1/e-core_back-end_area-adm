/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da BEBIDA no banco de dados
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

//FUNÇÃO PARA INSERIR UMA NOVA BEBIDA NO BANCO DE DADOS
const insertBebida = async function (bebida) {
    try {
        let sql = `insert into tbl_bebida (
            nome,
            litragem,
            descricao,
            id_categoria,
            id_marca,
            id_sabor
        ) values (
            '${bebida.nome}',
            '${bebida.litragem}',
            '${bebida.descricao}',
            ${bebida.id_categoria},
            ${bebida.id_marca},
            ${bebida.id_sabor}
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

//FUNÇÃO PARA ATUALIZAR UMA BEBIDA EXISTENTE NO BANCO DE DADOS
const updateBebida = async function (bebida) {
    try {
        let sql = `update tbl_bebida set
                        
                        nome                = '${bebida.nome}',
                        litragem            = '${bebida.litragem}',
                        descricao           = '${bebida.descricao}',
                        id_categoria        = ${bebida.id_categoria},
                        id_marca            = ${bebida.id_marca},
                        id_sabor            = ${bebida.id_sabor}

                    where id = ${bebida.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA LISTAR TODAS AS BEBIDAS REGISTRADAS NO SISTEMA
const selectAllBebida = async function () {
    try {
        let sql = `select * from tbl_bebida order by id desc;`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA RETORNAR UMA BEBIDA FILTRANDO PELO ID
const selectByIdBebida = async function (id) {
    try {
        let sql = `select * from tbl_bebida where id = ${id};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA EXCLUIR UMA BEBIDA REGISTRADA NO SISTEMA FILTRANDO PELO ID
const deleteBebida = async function (id) {
    try {
        let sql = `delete from tbl_bebida where id = ${id}`

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
    insertBebida,
    updateBebida,
    selectAllBebida,
    selectByIdBebida,
    deleteBebida
}