import { Application } from '../../Application'
import { AbstractController } from '../../Base/Controllers/AbstractController'
import { Request, Response } from 'express'
import { IStorePoints } from './StorePointsModel'

export class StoreController extends AbstractController {

    constructor(app: Application) {
        super(app)
    }



}