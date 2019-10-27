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
    public crossStoreSelectorModel: any

    constructor(protected app: Application) {
        super(app)

        this.crossStoreSelectorModel = app.dbService.sequelize.define('cross_store_selector', {
            storePointId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: 'store_point_id',
            },
            fileId: {
                type: DataTypes.INTEGER(),
                primaryKey: true,
                field: 'file_id',
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

        // this.userModel.hasMany(this.app.subordinationService.subordinationModel, { foreignKey: 'userId' })
        }, {tableName: 'cross_store_selector', createdAt: 'created_at', updatedAt: 'updated_at',  timestamps: true,})
    }
}