import { sequelize } from "../database";
import { DataTypes, Model } from "sequelize";

export interface ClubInstance extends Model {
    id: number
    name: string
    director: string
    active: boolean
}

export const Club = sequelize.define<ClubInstance>('clubs', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    director: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})