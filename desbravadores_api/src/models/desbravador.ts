import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

interface DesbravadorInstance extends Model {
    id: number,
    name: string,
    cpf: string,
    date_birth: Date,
    email: string,
    phone: string,
    active: boolean,
    clube_id: number
}

export const Desbravador = sequelize.define<DesbravadorInstance>("desbravadores", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_birth: {
        type: DataTypes.DATE,
        allowNull: false
    },
    email: DataTypes.STRING,
    phone: DataTypes.TEXT,
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    club_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "clubs",
            key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    }
})