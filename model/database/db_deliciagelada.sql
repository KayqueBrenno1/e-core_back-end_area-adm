create database db_ecore_deliciagelada_ds2t;

use db_ecore_deliciagelada_ds2t;

-- ============================ TABELAS ============================

############### TABELA DE USUARIO ###############
# Tabela de usuario - PRINCIPAL
create table tbl_usuario (
	id 		int not null auto_increment primary key,
    nome 	varchar(30) not null,
    email 	varchar(256) not null,
    senha 	varchar(512) not null,
    jwt		varchar(255) not null
);

############### TABELAS DE BEBIDA ###############
# CRIAÇÃO DAS TABELAS QUE FORNECEM CHAVES ESTRANGEIRAS (FOREIGN KEY) - BEBIDA

# Tabela de categoria
create table tbl_categoria (
	id 				int not null auto_increment primary key,
    nome_categoria 	varchar(30) not null
);

# Tabela de marca
create table tbl_marca (
	id 			int not null auto_increment primary key,
    nome_marca 	varchar(60) not null
);

# Tabela de sabor
create table tbl_sabor (
	id 			int not null auto_increment primary key,
    nome_sabor	varchar(60) not null
);

# Tabela de caracteristica
create table tbl_caracteristica (
	id 		int not null auto_increment primary key,
    nome	varchar(25) not null
);

# Tabela de foto
create table tbl_foto (
	id 		int not null auto_increment primary key,
    foto	varchar(200) not null
);

# Tabela de tipo_embalagem
create table tbl_tipo_embalagem (
	id 				int not null auto_increment primary key,
    tipo_embalagem	varchar(40) not null
);

# CRIAÇÃO DAS TABELAS QUE RECEBEM CHAVE ESTRANGEIRA - BEBIDA

# Tabela de bebida - PRINCIPAL
create table tbl_bebida (
	id 			 int not null auto_increment primary key,
    nome 		 varchar(120) not null,
    litragem 	 varchar(25) not null,
    descricao 	 text not null,
    id_categoria int not null,
    id_marca 	 int not null,
    id_sabor 	 int not null,
    
    constraint	FK_CATEGORIA_BEBIDA
    foreign key	(id_categoria)
    references	tbl_categoria(id),
    
    constraint	FK_MARCA_BEBIDA
    foreign key	(id_marca)
    references	tbl_marca(id),
    
    constraint	FK_SABOR_BEBIDA
    foreign key	(id_sabor)
    references	tbl_sabor(id)
);

# Tabela bebida_caracteristica
create table tbl_bebida_caracteristica (
	id 				  int not null auto_increment primary key,
    id_bebida 		  int not null,
    id_caracteristica int not null,
    
    constraint 	FK_PRODUTO_BEBIDACARACTERISTICA
    foreign key (id_bebida)
    references	tbl_bebida(id),
    
    constraint	FK_CARACTERISTICA_BEBIDACARACTERISTICA
    foreign key	(id_caracteristica)
    references	tbl_caracteristica(id)
);

# Tabela bebida_foto_embalagem
create table tbl_bebida_foto_embalagem (
	id 				  int not null auto_increment primary key,
    id_bebida 		  int not null,
    id_foto			  int not null,
    id_tipo_embalagem int not null,
    valor 			  decimal(6,2) not null,
    
    constraint 	FK_BEBIDA_BEBIDAFOTOEMBALAGEM
    foreign key (id_bebida)
    references	tbl_bebida(id),
    
    constraint	FK_FOTO_BEBIDAFOTOEMBALAGEM
    foreign key	(id_foto)
    references	tbl_foto(id),
    
    constraint	FK_TIPOEMBALAGEM_BEBIDAFOTOEMBALAGEM
    foreign key	(id_tipo_embalagem)
    references	tbl_tipo_embalagem(id)
);

-- ============================ TRIGGERS ============================

DELIMITER $
create trigger tgrDeleteBebidaCaracteristica
	before delete on tbl_bebida
		for each row
			BEGIN
				delete from tbl_bebida_caracteristica where id_bebida = old.id;
            END$
DELIMITER ;

DELIMITER $
create trigger tgrDeleteBebidaFotoEmbalagem
	before delete on tbl_bebida
		for each row
			BEGIN
				delete from tbl_bebida_foto_embalagem where id_bebida = old.id;
            END$
DELIMITER ;