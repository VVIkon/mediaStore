import { Application } from '../../Application'
import DataTypes from 'sequelize'
import { AbstractModel } from '../../Base/Services/AbstractModel'

export interface IDepart {
    id: number,
    storePointId: number,
    nameDepartment: string,
    deletedAt: number,
    updatedAt?: number,
    createdAt?: number
}

export class DepartmentModel extends AbstractModel {

    constructor(protected app: Application) {
        super(app)

        this.model = app.dbService.sequelize.define('departments', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'id',
            },
            nameDepartment: {
                type: DataTypes.STRING(255),
                field: 'store_point_set',
                allowNull: false,
            },
            deletedAt: {
                type: DataTypes.INTEGER,
                field: 'deleted_at',
                allowNull: false,
                defaultValue: 0,
            },
            updatedAt: {
                type: DataTypes.INTEGER,
                field: 'updated_at',
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.INTEGER,
                field: 'created_at',
                allowNull: false,
            },

        }, {tableName: 'departments', createdAt: 'created_at', updatedAt: 'updated_at',  timestamps: true,})

        this.model.hasMany(this.app.storePointsModel.model, { foreignKey: 'departmentId' })
        this.model.hasMany(this.app.userModel.model, { foreignKey: 'departmentId' })
    }
}