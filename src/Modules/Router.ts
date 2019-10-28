import { Application } from '../Application'
import { Express, Request, Response } from 'express'

export class Router {

    public constructor(protected app: Application) {
        this.routes(app.http, app)
    }

    protected routes(http: Express, app: Application) {
        http.post('/api/store-point', (req, res) => app.storeController.getStorePoint(req, res))


        http.post('/api/users-all', (req, res) => app.userController.getUsers(req, res))
    } 

}