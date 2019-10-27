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
    public storePointsModel: any

    constructor(protected app: Application) {
        super(app)

        this.storePointsModel = app.dbService.sequelize.define('store_points', {
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
    }

/** ---------------------------------GET/SET--------------------------------------- */

    public async getStorePointTree (pointId: number, deleted: number[]=[0]): Promise<IStorePoints[]>{
        return this.storePointsModel.findAll({
            where: {
                id: {[DataTypes.Op.eq]: pointId},
                deleted: {[DataTypes.Op.in]: deleted }
            },
            order: [
                ['id', 'ASC']
            ]
        })
    }
    public async saveStorePointItem(params: IStorePoints): Promise<IStorePoints> {
        let result = null
        if (params.id) {
            try {
                let foundStorePoint = await this.storePointsModel.findById(params.id)
                if (foundStorePoint) {
                    foundStorePoint = params
                    result = await foundStorePoint.save()
                }
            } catch (err) {
                console.log('Ошибка: ' + err, params.toString())
            }
        } else {
            try {
                result = await this.storePointsModel.create({ params})
            } catch (err) {
                console.log('Ошибка: ' + err, params.toString())
            }
        }
        return result.dataValues
    }
    



}    






