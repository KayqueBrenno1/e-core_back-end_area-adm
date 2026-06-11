/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados MySQL na tabela 
 *      de relação entre BEBIDA e CARACTERÍSTICA
 * Data: 11/06/2026
 * Autor: Kayque Brenno Ferreira Almeida
 * Versão: 1.0
**************************************************************************************/

//IMPORT DA BIBLIOTECA PARA MANIPULAR DADOS NO BD MYSQL
const knex = require('knex')

//IMPORT DO ARQUIVO DE CONFIGURAÇÃO PARA ACESSO AO BD
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

//CRIAR A CONEXÃO COM O BANCO DE DADOS CONFORME A CONFIGURAÇÃO
const knexConection = knex(knexDataBaseConfig.development)

const insertBebidaCarac = async function (bebidaCarac) {
    try {
        let sql = `insert into tbl_bebida_caracteristica (
            id_bebida,
            id_caracteristica
        ) values (
            ${bebidaCarac.id_bebida},
            ${bebidaCarac.id_caracteristica}
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

const updateBebidaCarac = async function (bebidaCarac) {
    try {
        let sql = `update tbl_bebida_caracteristica set
                        id_bebida           = ${bebidaCarac.id_bebida},
                        id_caracteristica   = ${bebidaCarac.id_caracteristica}
                    where id = ${bebidaCarac.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else 
            return false
    } catch (error) {
        return false
    }
}

const selectAllBebidaCarac = async function () {
    try {
        let sql = `select * from tbl_bebida_caracteristica order by id desc;`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdBebidaCarac = async function (id) {
    try {
        let sql = `select * from tbl_bebida_caracteristica where id = ${id};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectCaractsByIdBebida = async function (idBebida) {
    try {
        let sql = ` select tbl_caracteristica.*
                    from tbl_bebida
                    
                        inner join tbl_bebida_caracteristica
                            on tbl_bebida.id = tbl_bebida_caracteristica.id_bebida
                        inner join tbl_caracteristica
                            on tbl_caracteristica.id = tbl_bebida_caracteristica.id_caracteristica
                            
                    where tbl_bebida.id = ${idBebida};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else 
            return false
    } catch (error) {
        return false
    }
}

const selectBebidasByIdCaracts = async function (idCarac) {
    try {
        let sql = `select tbl_bebida.*
                    from tbl_bebida
                    
                        inner join tbl_bebida_caracteristica
                            on tbl_bebida.id = tbl_bebida_caracteristica.id_bebida
                        inner join tbl_caracteristica
                            on tbl_caracteristica.id = tbl_bebida_caracteristica.id_caracteristica
                    
                    where tbl_caracteristica.id = ${idCarac};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteBebidaCarac = async function (id) {
    try {
        let sql = `delete from tbl_bebida_caracteristica where id = ${id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteCaractsByIdBebida = async function (idBebida) {
    try {
        let sql = `delete from tbl_bebida_caracteristica where id_bebida = ${idBebida}`

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
    insertBebidaCarac,
    updateBebidaCarac,
    selectAllBebidaCarac,
    selectByIdBebidaCarac,
    selectCaractsByIdBebida,
    selectBebidasByIdCaracts,
    deleteBebidaCarac,
    deleteCaractsByIdBebida
}