import { Application } from '../../Application'
import { AbstractService } from '../../Base/Services/AbstractService'

export class StoreService extends AbstractService {

    constructor(protected app: Application) {
        super(app)
    }

    public getStorePoints(parentId: number ) {
        return this.app.storePointsModel.getStorePointChild(parentId)
    }

    public getStorePointFiles(parentId: number ) {
        return this.app.crossStoreSelectorModel.getFilesFromPoint(parentId)
    }
    public getFile(id: number ) {
        return this.app.fileModel.getFileAttr(id)
        // return this.app.fileModel.getOne(id,[0])
    }
    public getFileTypes(deleted: number[] ) {
        return this.app.refFileTypeModel.getAll(deleted)
    }
}