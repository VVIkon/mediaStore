import { Application } from '../../Application'
import DataTypes from 'sequelize'
import { AbstractModel } from '../../Base/Services/AbstractModel';

export interface IStorePoints {
    id: number|undefined
    parentId: number
    pointName: string
    permissionGroupSet: string
    deletedAt: number,
    updatedAt?: number,
    createdAt?: number
}

export class StorePointsModel extends AbstractModel{

    constructor(protected app: Application) {
        super(app)

        this.model = app.dbService.sequelize.define('store_points', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            parentId:{
                type: DataTypes.INTEGER(),
                field: 'parent_id',
                allowNull: false,
                references: { model: 'store_points', key: 'id' }
            },
            pointName: {
                type: DataTypes.STRING(255),
                field: 'point_name',
                allowNull: false,
            },
            departmentId: {
                type: DataTypes.INTEGER(),
                field: 'department_id',
                allowNull: false,
                references: { model: 'department', key: 'id' }
            },

            permissionGroupSet: {
                type: DataTypes.STRING(255),
                field: 'permition_group_set',
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
        }, {tableName: 'store_points', createdAt: 'created_at', updatedAt: 'updated_at',  timestamps: true,})

        this.model.hasMany(this.app.crossStoreSelectorModel.model, { foreignKey: 'storePointId' })
    }

/** ---------------------------------GET/SET--------------------------------------- */

    public async getStorePointChilds (pointId: number, deleted: number[]=[0]): Promise<IStorePoints[]> {
        return await this.model.findAll({
            where: {
                parentId: {[DataTypes.Op.eq]: pointId},
                deleted: {[DataTypes.Op.in]: deleted }
            },
            order: [
                ['id', 'ASC']
            ]
        })
    }
}    
