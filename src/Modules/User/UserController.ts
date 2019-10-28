import { Application } from '../../Application'
import { AbstractController } from '../../Base/Controllers/AbstractController'
import { Request, Response } from 'express'

export class UserController extends AbstractController {

    constructor(app: Application) {
        super(app)
    }

    public getUsers(req: Request, res: Response) {

    }

}