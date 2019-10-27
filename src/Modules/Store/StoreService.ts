import { Application } from '../../Application'
import { AbstractModel } from '../../Base/Services/AbstractModel'

export class StoreService extends AbstractModel {

    constructor(protected app: Application) {
        super(app)
    }

    public getStorePointTree(req: Request ) {
        console.log('getStorePointTree')
    }
}