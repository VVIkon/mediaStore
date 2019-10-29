import { Application } from '../../Application'
import { AbstractService } from '../../Base/Services/AbstractService'
import { IUser } from './UserModel'

export class UserService extends AbstractService {
    
    constructor(protected app: Application) {
        super(app)
    }

    public async getCurrentUser(id: number ) {
        return await this.app.userModel.getOne(id)
    }
    public async getUsers(deleted: number[] ) {
        return await this.app.userModel.getAll(deleted)
    }
    public async getDepartments(deleted: number[] ) {
        return await this.app.departmentModel.getAll(deleted)
    }
    public async getUsersAttr(deleted: number[] ) {
        return await this.app.userModel.getUsersAttr(deleted)
    }
    public async getPermissions(deleted: number[] ) {
        return await this.app.refPermissionModel.getAll(deleted)
    }

    public async hasPrivilege(user: IUser, priv: string): Promise<Boolean> {
        return true
    }
}
