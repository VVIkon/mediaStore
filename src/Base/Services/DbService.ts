import { Application } from '../../Application'
import Sequelize from 'sequelize'

export class DbService {
    public sequelize: Sequelize.Sequelize
    protected dbConnected = false

    constructor(protected app: Application) {

        this.sequelize = new Sequelize({
            host: 'localhost',
            dialect: 'sqlite',
            storage:  this.app.rootDir + this.app.config.db.path,
            logging: false 
          })
          
        this.sequelize.authenticate()
            .then(() => {
                this.dbConnected = true
                console.log('Successfully connected to SQLite3')
            })
            .catch(err => {
                console.log(`Error while connecting to DB: ${err}`)
            })
    }


    public async onDbConnected() {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                if (this.dbConnected) {
                    resolve()
                    clearInterval(interval)
                }
            }, 50)
        })
    }
}
