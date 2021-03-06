import { Application } from '../../Application'
import DataTypes from 'sequelize'
import { AbstractModel } from '../../Base/Services/AbstractModel';

export interface IFile {
    id: number|undefined
    fileRef: string
    fileName: string
    fileExt: string
    fileTypeId: number
    fileSize: number
    tags: string
    refSet: string
    keyWords: string
    deletedAt: number,
    updatedAt?: number,
    createdAt?: number
}

export class FileModel extends AbstractModel{

    constructor(protected app: Application) {
        super(app)

        this.model = app.dbService.sequelize.define('files', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            fileRef: {
                type: DataTypes.STRING(255),
                field: 'file_ref',
                allowNull: false,
            },
            fileName: {
                type: DataTypes.STRING(255),
                field: 'file_name',
                allowNull: false,
            },
            fileExt: {
                type: DataTypes.STRING(15),
                field: 'file_ext',
                allowNull: false,
            },
            refFileTypeId:{
                type: DataTypes.INTEGER(),
                field: 'file_type_id',
                allowNull: false,
                references: { model: 'ref_file_types', key: 'id' }
            },
            fileSize:{
                type: DataTypes.INTEGER(),
                field: 'file_size',
                allowNull: false,
            },
            tags: {
                type: DataTypes.STRING(255),
                field: 'tags',
                allowNull: false,
            },
            refSet: {
                type: DataTypes.STRING(255),
                field: 'ref_set',
                allowNull: false,
            },
            keyWords: {
                type: DataTypes.STRING(255),
                field: 'key_words',
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
        }, {tableName: 'files', createdAt: 'created_at', updatedAt: 'updated_at',  timestamps: true,})
        this.model.belongsTo(this.app.refFileTypeModel.model)
    }

/** ---------------------------------GET/SET--------------------------------------- */

    public async getFileAttr(id: number): Promise<IFile>{
        return this.model.findOne({
            include: [this.app.refFileTypeModel.model],
            where: {
                id: {[DataTypes.Op.eq]: id}
            },
            order: [
                ['id', 'ASC']
            ]
        })
    }
    // public async saveStorePointItem(params: IFile): Promise<IFile> {
    //     let result = null
    //     if (params.id) {
    //         try {
    //             let foundStorePoint = await this.Model.findById(params.id)
    //             if (foundStorePoint) {
    //                 foundStorePoint = params
    //                 result = await foundStorePoint.save()
    //             }
    //         } catch (err) {
    //             console.log('Mistake: ' + err, params.toString())
    //         }
    //     } else {
    //         try {
    //             result = await this.Model.create({ params})
    //         } catch (err) {
    //             console.log('Mistake: ' + err, params.toString())
    //         }
    //     }
    //     return result.dataValues
    // }

}    






