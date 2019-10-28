import { Application } from '../../Application'
import DataTypes from 'sequelize'
import { AbstractModel } from '../../Base/Services/AbstractModel'

export interface IFileType {
    id: number,
    fileType: string,
    directive: string,
    deletedAt: number,
    updatedAt?: number,
    createdAt?: number,
}

export class RefFileTypeModel extends AbstractModel {
    public Model: any

    constructor(protected app: Application) {
        super(app)

        this.Model = app.dbService.sequelize.define('ref_file_types', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'id',
            },
            fileType: {
                type: DataTypes.STRING(100),
                field: 'file_type',
                allowNull: false,
            },
            directive: {
                type: DataTypes.STRING(255),
                field: 'directive',
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

        }, {tableName: 'ref_file_types', createdAt: 'created_at', updatedAt: 'updated_at',  timestamps: true,})
        this.Model.hasMany(this.app.fileModel.Model, { foreignKey: 'fileTypeId' })
    }
}
