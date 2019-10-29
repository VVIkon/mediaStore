import { Application } from '../../Application'
import DataTypes from 'sequelize'
import { AbstractModel } from '../../Base/Services/AbstractModel'

export interface ICrossStoreSelector{
    storePointId: number,
    fileId: number,
    permissionType: string,
    deletedAt: number,
    updatedAt?: number,
    createdAt?: number
}

export class CrossStoreSelectorModel extends AbstractModel {

    constructor(protected app: Application) {
        super(app)

        this.model = app.dbService.sequelize.define('cross_store_selectors', {
            storePointId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: 'store_point_id',
                references: { model: 'store_points', key: 'id' }
            },
            fileId: {
                type: DataTypes.INTEGER(),
                primaryKey: true,
                field: 'file_id',
                references: { model: 'files', key: 'id' }
            },
            permissionType: {
                type: DataTypes.STRING(2),
                field: 'permission_type',
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

        }, {tableName: 'cross_store_selectors', createdAt: 'created_at', updatedAt: 'updated_at',  timestamps: true,})

        this.model.belongsTo(this.app.fileModel.model)
        this.model.belongsTo(this.app.storePointsModel.model)
    }

    public async getFilesFromPoint (pointId: number, deleted: number[]=[0]): Promise<any[]> {
        return await this.model.findAll({
            include: [this.app.fileModel.model],
            where: {
                storePointId: {[DataTypes.Op.eq]: pointId},
                deletedAt: {[DataTypes.Op.in]: deleted }
            },
            order: [
                ['fileId', 'ASC']
            ]
        })
    }
}