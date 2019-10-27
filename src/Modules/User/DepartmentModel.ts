import { Application } from '../../Application'
import DataTypes from 'sequelize'
import { AbstractModel } from '../../Base/Services/AbstractModel'

export interface IDepart {
    id: number,
    storePointId: number,
    nameDepartment: string,
}

export class DepartmentModel extends AbstractModel {
    public departmentModel: any

    constructor(protected app: Application) {
        super(app)

        this.departmentModel = app.dbService.sequelize.define('departments', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'id',
            },
            storePointId:{
                type: DataTypes.INTEGER(),
                field: 'store_point__id',
                allowNull: false,
                references: { model: 'store_points', key: 'id' }
            },
            nameDepartment:{
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

        // this.userModel.hasMany(this.app.subordinationService.subordinationModel, { foreignKey: 'userId' })
        })
    }
}