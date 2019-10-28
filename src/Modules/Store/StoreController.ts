import { Application } from '../../Application'
import { AbstractController } from '../../Base/Controllers/AbstractController'
import { Request, Response } from 'express'
import { IStorePoints } from './StorePointsModel'

export class StoreController extends AbstractController {

    constructor(app: Application) {
        super(app)
    }

    public getStorePoint(req:Request, res: Response) {
        const result = null

        if (result) {
            return this.successResponse(res, { result: true })
        } else {
            return this.errorResponse(res, 'No data yet')
        }
    }


}