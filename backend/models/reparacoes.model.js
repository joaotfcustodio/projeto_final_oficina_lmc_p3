const { DataTypes } = require("sequelize");
const conexao = require("../config/database");

const Reparacao = conexao.define(
  "Reparacao",
  {
    id_reparacao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    matricula: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pintura_geral: DataTypes.BOOLEAN,
    pintura_de_para_choques_dianteiro: DataTypes.BOOLEAN,
    pintura_de_para_choques_traseiro: DataTypes.BOOLEAN,
    pintura_de_porta_esquerda_da_frente: DataTypes.BOOLEAN,
    pintura_de_porta_direita_da_frente: DataTypes.BOOLEAN,
    pintura_de_porta_esquerda_de_tras: DataTypes.BOOLEAN,
    pintura_de_porta_direita_de_tras: DataTypes.BOOLEAN,
    pintura_de_capas_de_espelho: DataTypes.BOOLEAN,
    pintura_de_capot: DataTypes.BOOLEAN,
    pintura_de_porta_bagagens: DataTypes.BOOLEAN,
    pintura_de_tejadilho: DataTypes.BOOLEAN,
    pintura_de_guarda_lamas_esquerdo_da_frente: DataTypes.BOOLEAN,
    pintura_de_guarda_lamas_direito_da_frente: DataTypes.BOOLEAN,
    pintura_de_guarda_lamas_esquerdo_de_tras: DataTypes.BOOLEAN,
    pintura_de_guarda_lamas_direito_de_tras: DataTypes.BOOLEAN,
    pintura_de_jantes: DataTypes.BOOLEAN,
    pintura_de_plasticos: DataTypes.BOOLEAN,
    pintura_de_embaladeiras: DataTypes.BOOLEAN,
    pintura_de_grossuras_de_portas: DataTypes.BOOLEAN,
    polimento_geral_profundo: DataTypes.BOOLEAN,
    polimento_geral: DataTypes.BOOLEAN,
    polimento_parcial: DataTypes.BOOLEAN,
    restauro_de_pecas_plasticas: DataTypes.BOOLEAN,
    restauro_de_pecas_metalicas: DataTypes.BOOLEAN,
    bate_chapa: DataTypes.BOOLEAN,
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "reparacoes",
    timestamps: true,
  }
);

module.exports = Reparacao;
