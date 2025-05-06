const sequelize = require("sequelize");
const conexao = require("../config/database");

let Reparacao = sequelize.define(
  "reparacoes",
  {
    id_reparacao: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    matricula: {
      type: sequelize.STRING,
      allowNull: false,
    },
    pintura_geral: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    pintura_de_para_choques_dianteiro: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    pintura_de_para_choques_traseiro: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    pintura_de_porta_esquerda_da_frente: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    pintura_de_porta_direita_da_frente: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    pintura_de_porta_esquerda_de_tras: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    pintura_de_porta_direita_de_tras: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    pintura_de_capas_de_espelho: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    pintura_de_capot: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    pintura_de_porta_bagagens: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    pintura_de_tejadilho: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    pintura_de_guarda_lamas_esquerdo_da_frente: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    pintura_de_guarda_lamas_direito_da_frente: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    pintura_de_guarda_lamas_esquerdo_de_tras: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    pintura_de_guarda_lamas_direito_de_tras: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    pintura_de_jantes: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    pintura_de_plasticos: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    pintura_de_embaladeiras: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    pintura_de_grossuras_de_portas: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    polimento_geral_profundo: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    polimento_geral: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    polimento_parcial: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    restauro_de_pecas_plasticas: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    restauro_de_pecas_metalicas: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    restauro_de_pecas_metalicas: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    bate_chapa: {
      type: sequelize.BOOLEAN,
      allowNull: true,
    },
    preco: {
      type: sequelize.NUMBER,
      allowNull: false,
    },
  },
  {
    tableName: "reparacoes",
    timestamps: true,
  }
);

module.exports = Reparacao;
