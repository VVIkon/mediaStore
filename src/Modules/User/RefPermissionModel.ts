import { Application } from '../../Application'
import DataTypes from 'sequelize'
import { AbstractModel } from '../../Base/Services/AbstractModel'

export interface IPermission {
    id: number,
    tag: string,
    description: string,
    deletedAt: number,
    updatedAt?: number,
    createdAt?: number,
}

export class RefPermissionModel extends AbstractModel {
    public refPermissionModel: any

    constructor(protected app: Application) {
        super(app)

        this.refPermissionModel = app.dbService.sequelize.define('ref_permissions', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'id',
            },
            tag: {
                type: DataTypes.STRING(50),
                field: 'tag',
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING(255),
                field: 'description',
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
        }, {tableName: 'ref_permissions', createdAt: 'created_at', updatedAt: 'updated_at',  timestamps: true,})
    }
}