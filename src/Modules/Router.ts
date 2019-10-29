import { Application } from '../Application'
import { Express, Request, Response } from 'express'
import fs from 'fs'

export class Router {

    public constructor(protected app: Application) {
        this.routes(app.http, app)
    }

    protected routes(http: Express, app: Application) {
        app.http.get('/', (req, res) => {res.send('Media Store check: Ok') })

        http.post('/api/store-point', (req, res) => app.storeController.getStorePoint(req, res))
        http.post('/api/store-point-files', (req, res) => app.storeController.getStorePointFiles(req, res))
        http.post('/api/file', (req, res) => app.storeController.getFile(req, res))
        http.post('/api/file-types', (req, res) => app.storeController.getFileTypes(req, res))


        http.post('/api/users-all', (req, res) => app.userController.getUsers(req, res))
        http.post('/api/users-all-attr', (req, res) => app.userController.getUsersAttr(req, res))
        http.post('/api/departments', (req, res) => app.userController.getDepartments(req, res))
        http.post('/api/permissions', (req, res) => app.userController.getPermissions(req, res))
    } 

}