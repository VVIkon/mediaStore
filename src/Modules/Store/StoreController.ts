import { Application } from '../../Application'
import { AbstractController } from '../../Base/Controllers/AbstractController'
import { Request, Response } from 'express'
import { IStorePoints } from './StorePointsModel'
import fs from 'fs'

export class StoreController extends AbstractController {

    constructor(app: Application) {
        super(app)
        // app.http.get('/', (req, res) => { res.send(fs.readFileSync('dist/index.html').toString()) })
    }

    public async getStorePoint(req:Request, res: Response) {
        const params = await this.checkParameters(req, ['parentId'])

        const result = await this.app.storeService.getStorePoints(params.parentId)
        if (result) {
            return this.successResponse(res, { result: result })
        } else {
            return this.errorResponse(res, 'No data yet')
        }
    }

    public async getStorePointFiles(req:Request, res: Response) {
        const params = await this.checkParameters(req, ['parentId'])

        const result = await this.app.storeService.getStorePointFiles(params.parentId)
        if (result) {
            return this.successResponse(res, { result: result })
        } else {
            return this.errorResponse(res, 'No data yet')
        }
    }
    public async getFile(req:Request, res: Response) {
        const params = await this.checkParameters(req, ['id'])

        const result = await this.app.storeService.getFile(params.id)
        if (result) {
            return this.successResponse(res, { result: result })
        } else {
            return this.errorResponse(res, 'No data yet')
        }
    }
    public async getFileTypes(req:Request, res: Response) {
        const params = await this.checkParameters(req, ['deleted'])

        const result = await this.app.storeService.getFileTypes(params.deleted)
        if (result) {
            return this.successResponse(res, { result: result })
        } else {
            return this.errorResponse(res, 'No data yet')
        }
    }


}