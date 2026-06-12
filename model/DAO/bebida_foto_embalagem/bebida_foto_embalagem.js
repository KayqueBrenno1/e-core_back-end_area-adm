/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados MySQL na tabela 
 *      de relação entre BEBIDA FOTO e EMBALAGEM
 * Data: 12/06/2026
 * Autor: Kauan Alves Pereira
 * Versão: 1.0
**************************************************************************************/

//IMPORT DA BIBLIOTECA PARA MANIPULAR DADOS NO BD MYSQL
const knex = require('knex')

//IMPORT DO ARQUIVO DE CONFIGURAÇÃO PARA ACESSO AO BD
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

//CRIAR A CONEXÃO COM O BANCO DE DADOS CONFORME A CONFIGURAÇÃO
const knexConection = knex(knexDataBaseConfig.development)

const insertBebidaFotoEmbalagem = async function (bebidaFotoEmbalagem) {
    try {
        let sql = `insert into tbl_bebida_foto_embalagem (
            id_bebida,
            id_foto,
            id_tipo_embalagem,
            valor
        ) values (
            ${bebidaFotoEmbalagem.id_bebida},
            ${bebidaFotoEmbalagem.id_foto},
            ${bebidaFotoEmbalagem.id_tipo_embalagem},
            '${bebidaFotoEmbalagem.valor}'
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

const updateBebidaFotoEmbalagem = async function (bebidaFotoEmbalagem) {
    try {
        let sql = `update tbl_bebida_foto_embalagem set
                        id_bebida           = ${bebidaFotoEmbalagem.id_bebida},
                        id_foto             = ${bebidaFotoEmbalagem.id_foto},
                        id_tipo_embalagem   = ${bebidaFotoEmbalagem.id_tipo_embalagem},
                        valor               = ${bebidaFotoEmbalagem.valor}
                    where id = ${bebidaFotoEmbalagem.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllBebidaFotoEmbalagem = async function () {
    try {
        let sql = `select * from tbl_bebida_foto_embalagem order by id desc;`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdBebidaFotoEmbalagem = async function (id) {
    try {
        let sql = `select * from tbl_bebida_foto_embalagem where id = ${id};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectFotoEmbalagemtsByIdBebida = async function (idBebida) {
    try {
        let sql = ` select tbl_foto.*,
                        tbl_tipo_embalagem.*,
                        tbl_bebida_foto_embalagem.valor
                        
                        from tbl_bebida
                            inner join tbl_bebida_foto_embalagem
                                on tbl_bebida.id = tbl_bebida_foto_embalagem.id_bebida
                            inner join tbl_foto
                                on tbl_foto.id = tbl_bebida_foto_embalagem.id_foto
                            inner join tbl_tipo_embalagem
                                on tbl_tipo_embalagem.id = tbl_bebida_foto_embalagem.id_tipo_embalagem
                                                
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


const selectBebidasByIdFoto = async function (idFoto) {
    try {
        let sql = `select tbl_bebida.*,
                    tbl_tipo_embalagem.*
                    
                    from tbl_foto
                        inner join tbl_bebida_foto_embalagem
                            on	tbl_foto.id = tbl_bebida_foto_embalagem.id_foto
                        inner join tbl_bebida
                            on tbl_bebida.id = tbl_bebida_foto_embalagem.id_bebida
                        inner join tbl_tipo_embalagem
                            on tbl_tipo_embalagem.id = tbl_bebida_foto_embalagem.id_tipo_embalagem
                            
                    where tbl_foto.id = ${idFoto};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectBebidasByIdTipoEmbalagem = async function (idTipoEmbalagem) {
    try {
        let sql = `select tbl_bebida.*,
                    tbl_foto.*
                    from tbl_bebida
                        inner join tbl_bebida_foto_embalagem
                            on tbl_bebida.id = tbl_bebida_foto_embalagem.id_bebida
                        inner join tbl_tipo_embalagem
                            on tbl_tipo_embalagem.id = tbl_bebida_foto_embalagem.id_tipo_embalagem
                        inner join tbl_foto
                            on tbl_foto.id = tbl_bebida_foto_embalagem.id_foto
                        
                    where tbl_tipo_embalagem.id = ${idTipoEmbalagem};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteBebidaFotoEmbalagem = async function (id) {
    try {
        let sql = `delete from tbl_bebida_foto_embalagem where id = ${id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteFotoEmbalagensByIdBebida = async function (idBebida) {
    try {
        let sql = `delete from tbl_bebida_foto_embalagem where id_bebida = ${idBebida}`

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
    insertBebidaFotoEmbalagem,
    updateBebidaFotoEmbalagem,
    selectAllBebidaFotoEmbalagem,
    selectByIdBebidaFotoEmbalagem,
    selectFotoEmbalagemtsByIdBebida,
    selectBebidasByIdFoto,
    selectBebidasByIdTipoEmbalagem,
    deleteBebidaFotoEmbalagem,
    deleteFotoEmbalagensByIdBebida
}