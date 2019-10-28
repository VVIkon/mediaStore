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
    public Model: any

    constructor(protected app: Application) {
        super(app)

        this.Model = app.dbService.sequelize.define('departments', {
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

        this.Model.hasMany(this.app.storePointsModel.Model, { foreignKey: 'departmentId' })
        this.Model.hasMany(this.app.userModel.Model, { foreignKey: 'departmentId' })
    }
}