import path from 'path'
import Express from 'express'
import Multiparty from 'connect-multiparty'
import { DbService } from './Base/Services/DbService'
import { AbstractConsoleCommand } from './Base/Consoles/AbstractConsoleCommand'
import { LoggerService} from './Base/Services/LoggerService'
import { MailService} from './Base/Services/MailService'

import { Router} from './Modules/Router'
import { StoreController} from './Modules/Store/StoreController'
import { StoreService} from './Modules/Store/StoreService'
import { StorePointsModel} from './Modules/Store/StorePointsModel'
import { CrossStoreSelectorModel} from './Modules/Store/CrossStoreSelectorModel'
import { FileModel} from './Modules/Store/FileModel'
import { RefFileTypeModel} from './Modules/Store/RefFileTypeModel'

import { UserController} from './Modules/User/UserController'
import { UserService} from './Modules/User/UserService'
import { UserModel} from './Modules/User/UserModel'
import { DepartmentModel} from './Modules/User/DepartmentModel'
import { RefPermissionModel} from './Modules/User/RefPermissionModel'


export class Application {
    public mode!: string
    public http!: Express.Express
    public rootDir: string = path.dirname(__dirname)

    /* Commands */
    // public testCommand!: TestCommand

    public router!: Router
    /* Controllers */
    public storeController!: StoreController
    public userController!: UserController

    /* Services & Models */
    public dbService!: DbService
    public loggerService!: LoggerService
    public mailService!: MailService

    public storePointsModel!: StorePointsModel
    public storeService!: StoreService
    public crossStoreSelectorModel!: CrossStoreSelectorModel
    public fileModel!: FileModel
    public refFileTypeModel!: RefFileTypeModel
    
    public userService!: UserService
    public userModel!: UserModel
    public departmentModel!: DepartmentModel
    public refPermissionModel!: RefPermissionModel

    constructor(public config: IConfig) {}

    get isConsole() {
        return !!process.argv[2]
    }
    public async run() {
        this.initializeServices()

        if (this.isConsole) {
            this.mode = 'command'
            this.runConsole()
        } else {
            this.mode = 'server'
            this.runWebServer()
        }
    }

    public async runConsole() {
        const command = process.argv[2]
        this.initializeConsoleCommands()
        for (const commandInstance of Object.values(this)) {
            if (commandInstance instanceof AbstractConsoleCommand) {
                if (commandInstance.name === command) {
                    await commandInstance.execute()
                    process.exit()
                }
            }
        }
        console.log(`Command "${command}" not found`)
        process.exit()
    }

    public runWebServer() {
        this.http = Express()
        this.http.use(Express.json())
        this.http.use(Express.urlencoded({ extended: true }))
        this.http.use(Multiparty())
        this.initializeControllers()
        this.router = new Router(this)

        this.http.listen(this.config.port, () => {
            console.log(`Web server started at port ${this.config.port}`)
        })
    }

    public initializeConsoleCommands() {
        // this.testCommand = new TestCommand(this)
    }

    public initializeControllers() {
         this.storeController = new StoreController(this)
         this.userController = new UserController(this)
    }

    public initializeServices() {
        this.dbService = new DbService(this)
        this.mailService = new MailService(this)
        this.loggerService = new LoggerService(this)

        this.storePointsModel = new StorePointsModel(this)
        this.crossStoreSelectorModel = new CrossStoreSelectorModel(this)
        this.fileModel = new FileModel(this)
        this.refFileTypeModel = new RefFileTypeModel(this)
        this.storeService = new StoreService(this)

        this.userModel = new UserModel(this)
        this.departmentModel = new DepartmentModel(this)
        this.refPermissionModel = new RefPermissionModel(this)
        this.userService = new UserService(this)

    }



}
