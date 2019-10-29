import { Application } from '../../Application'
import { IUser } from '../../Modules/User/UserModel'
import { Request, Response } from 'express'

export interface IQueryData {
    params: { [key: string]: any }
    req: Request
    res: Response
}
export interface IAuthorizedQueryData extends IQueryData {
    user: IUser
}

export class NotFoundException extends Error {}

export class AccessDeniedException extends Error {}

export class AbstractController {
    public static ERROR_NOT_FOUND = 'not_found'
    public static ERROR_ACCESS_DENIED = 'access_denied'

    public static errorResponseStatic(res: Response, errorMessage: string|null) {
        res.send({ error: true, success: false, errorMessage })
    }

    public static successResponseStatic(res: Response, data = {}) {
        res.send({ error: false, success: true, ...data })
    }

    public constructor(protected app: Application) { }

    public async checkParameters(req: Request, requiredFields: any[] = []): Promise<{ [key: string]: any }> {
        const params = req.body
        if (!params.parameters) {
            throw new Error('insufficient_parameters')
        }
        // const parameters = JSON.parse(params.parameters)
        const parameters = params.parameters

        if (!parameters) {
            throw new Error('insufficient_parameters')
        }
        for (const field of requiredFields) {
            if (!(field in parameters)) {
                throw new Error('insufficient_parameters')
            }
        }
        return parameters
    }


    // public async getCurrentUser(req: Request): Promise<IUser|null> {
    //     return await this.app.userService.getCurrentUser(req)
    // }

    // public async hasPrivilege(req: Request, privilege: string|string[]): Promise<boolean> {

    //     const user = await this.app.userService.getCurrentUser(req)
    //     if (!user) {
    //         return false
    //     }
    //     if (privilege instanceof Array) {
    //         if (!privilege.length) {
    //             return true
    //         }
    //         for (const priv of privilege) {
    //             if (await this.app.userService.hasPrivilege(user, priv)) {
    //                 return true
    //             }
    //         }
    //     }
    //     return false
    // }

    public errorResponse(res: Response, errorMessage: string|null = null) {
        AbstractController.errorResponseStatic(res, errorMessage)
    }

    public successResponse(res: Response, data = {}) {
        AbstractController.successResponseStatic(res, data)
    }

    public accessDeniedResponse(res: Response) {
        AbstractController.errorResponseStatic(res, 'access_denied')
    }

    public notFoundResponse(res: Response) {
        AbstractController.errorResponseStatic(res, 'not_found')
    }
}
