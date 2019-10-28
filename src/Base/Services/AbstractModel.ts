import { Application } from '../../Application'
import DataTypes from 'sequelize'

export abstract class AbstractModel {
    public model: any

    constructor(protected app: Application) {}

    public async getOne (id: number, deleted: number[]=[0]): Promise<any> {
        return await this.model.findOne({
            where: {
                Id: {[DataTypes.Op.eq]: id},
                deleted: {[DataTypes.Op.in]: deleted }
            },
            order: [
                ['id', 'ASC']
            ]
        })
    }
    public async getAll (deleted: number[]=[0]): Promise<any[]> {
        return await this.model.findAll({
            where: {
                deleted: {[DataTypes.Op.in]: deleted }
            },
            order: [
                ['id', 'ASC']
            ]
        })
    }
    public async saveItem(params: any): Promise<any> {
        let result = null
        if (params.id) {
            try {
                let items = await this.model.findByPk(params.id)
                if (items) {
                    items = params
                    result = await items.save()
                }
            } catch (err) {
                console.log('Ошибка: ' + err, params.toString())
            }
        } else {
            try {
                result = await this.model.create({ params})
            } catch (err) {
                console.log('Ошибка: ' + err, params.toString())
            }
        }
        return result.dataValues
    }

    public async deleteItem(id: number, deleteIt: boolean = true): Promise<void> {
        if (id) {
            try {
                let item = await this.model.findById(id)
                if (item) {
                    item.deletedAt = deleteIt ? 1 : 0
                    await item.save()
                }
            } catch (err) {
                console.log(`Ошибка:  ${err}  id = ${id}`, )
            }
        }
    }
}