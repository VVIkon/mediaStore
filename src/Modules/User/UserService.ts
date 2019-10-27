import { Application } from '../../Application'
import { AbstractModel } from '../../Base/Services/AbstractModel'
import { Request } from 'express'
import { IUser } from './UserModel'

export class UserService extends AbstractModel {
    public userModel: any

    constructor(protected app: Application) {
        super(app)
    }

    public async getCurrentUser(req: Request ): Promise<IUser|null> {
        const user = await this.app.userModel.getUserById(req.body.id)
        return user
    }

    public async hasPrivilege(user: IUser, priv: string): Promise<Boolean> {
        return true
    }
}
