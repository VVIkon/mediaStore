import { Application } from '../../Application'
import { AbstractController } from '../../Base/Controllers/AbstractController'
import { Request, Response } from 'express'

export class UserController extends AbstractController {

    constructor(app: Application) {
        super(app)
    }

    public async getUsers(req: Request, res: Response) {
        const params = await this.checkParameters(req, ['deleted'])

        const result = await this.app.userService.getUsers(params.deleted)
        if (result) {
            return this.successResponse(res, { result: result })
        } else {
            return this.errorResponse(res, 'No data yet')
        }
    }
    public async getUsersAttr(req: Request, res: Response) {
        const params = await this.checkParameters(req, ['deleted'])

        const result = await this.app.userService.getUsersAttr(params.deleted)
        if (result) {
            return this.successResponse(res, { result: result })
        } else {
            return this.errorResponse(res, 'No data yet')
        }
    }
    public async getDepartments(req: Request, res: Response) {
        const params = await this.checkParameters(req, ['deleted'])

        const result = await this.app.userService.getDepartments(params.deleted)
        if (result) {
            return this.successResponse(res, { result: result })
        } else {
            return this.errorResponse(res, 'No data yet')
        }
    }
    public async getPermissions(req: Request, res: Response) {
        const params = await this.checkParameters(req, ['deleted'])

        const result = await this.app.userService.getPermissions(params.deleted)
        if (result) {
            return this.successResponse(res, { result: result })
        } else {
            return this.errorResponse(res, 'No data yet')
        }
    }
}