import { Application } from '../../Application'
import DataTypes from 'sequelize'
import { AbstractModel } from '../../Base/Services/AbstractModel'

export interface IUser {
    id: number,
    departmentId: number,
    storePointIdId: number,
    userName: string,
    email: string,
    phone: string,
    mobile: string,
    userLogin: string,
    userPassword: string,
    Salt?: string|undefined,
    Token?: string|undefined,
    tokenExpare?: number|undefined,
    permitionGroupSet: string,
    deletedAt: number,
    updatedAt: number,
    createdAt: number,

}
export interface IRetUserStruct {
    success: boolean,
    message: string
    user: IUser|undefined
}

export class UserModel extends AbstractModel {
    public userModel: any

    constructor(protected app: Application) {
        super(app)

        this.userModel = app.dbService.sequelize.define('users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'id',
            },
            departmentId:{
                type: DataTypes.INTEGER(),
                field: 'department_id',
                allowNull: false,
                references: { model: 'department', key: 'id' }
            },
            storePointSet:{
                type: DataTypes.INTEGER(),
                field: 'store_point_set',
                allowNull: false,
            },
            userName: {
                type: DataTypes.STRING(255),
                field: 'user_name',
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(100),
                field: 'email',
                allowNull: true,
            },
            phone: {
                type: DataTypes.STRING(100),
                field: 'email',
                allowNull: true,
            },
            mobile: {
                type: DataTypes.STRING(100),
                field: 'email',
                allowNull: true,
            },
            userLogin: {
                type: DataTypes.STRING(35),
                field: 'user_login',
                allowNull: true,
            },
            userPassword: {
                type: DataTypes.STRING(128),
                field: 'user_password',
                allowNull: true,
            },
            uToken: {
                type: DataTypes.STRING(512),
                field: 'user_token',
                allowNull: true,
            },
            uSalt: {
                type: DataTypes.BIGINT,
                field: 'user_salt',
                defaultValue: 0,
            },
            tokenExpare: {
                type: DataTypes.BIGINT,
                field: 'token_expare',
                allowNull: true,
            },
            permitionGroupSet: {
                type: DataTypes.STRING(255),
                field: 'permition_id',
                defaultValue: 0,
            },
            deletedAt: {
                type: DataTypes.INTEGER,
                field: 'deleted_at',
                allowNull: false,
                defaultValue: 0,
            },
            updatedAt: {
                type: DataTypes.INTEGER,
                field: 'updated_at',
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.INTEGER,
                field: 'created_at',
                allowNull: false,
            },

        // this.userModel.hasMany(this.app.subordinationService.subordinationModel, { foreignKey: 'userId' })
        })
    }


    ///======================================================== getters =========================
    /**
     * {id:0, uName: '', uLogin:'', uPassword: '', uToken:'', tokenExpare: 0, active:1, permitionId:0, departId: 1}
     * permitionId:0 - только просмотр; 1: Просмотр + редактирование настроек
     * Список владельцев МАС-адресов
     * @param {*} active
     */
    public async getUsers(active = [1], useCache: boolean = true):Promise<IUser[]|undefined> {
        // const json = await this.app.cacheService.get(`users_${active.join('_')}`) as string|undefined
        // if (json && useCache) {
        //     return JSON.parse(json)
        // }
        try {
            const result: IUser[] = []
            const rows =  await this.userModel.findAll({
                attributes: ['id', 'departmentId','storePointId','userName', 'userLogin', 'userPassword', 'permitionGroupSet', 'email', 'phone','mobile', 'deletedAt', 'updatedAt', 'createdAt'],
                where: {
                    active: {
                        [DataTypes.Op.in]: active,
                    }
                },
                order: [
                    ['id', 'ASC']
                ]
            })
            for (const r of rows) {
                result.push( {
                    id: r.id,
                    departmentId: r.departmentId,
                    storePointIdId: r.storePointId,
                    userName: r.userName,
                    userLogin: r.userLogin,
                    userPassword: r.userPassword,
                    permitionGroupSet: r.permitionId,
                    email: r.email,
                    phone: r.phone,
                    mobile: r.mobile,
                    deletedAt: r.deletedAt,
                    updatedAt: r.updatedAt,
                    createdAt: r.createdAt,
                })
            }
            // this.app.cacheService.set(`users_${active.join('_')}`, JSON.stringify(result), 60 * 10)
            return result
        } catch (err) {
            console.error(`ERROR_USER_SERVICE: ${err.message}`)
            return undefined
        }
    }



    /**
     * {id:0, uName: '', uLogin:'', uPassword: '', uToken:'', uSalt:'', tokenExpare: 0, email:'', active:1, permitionId:0, departId:0}
     * Сохранение владельца МАС-адресов
     * @param {*} params
     */
    public async setUser(params: IUser): Promise<IUser[]|undefined> {
        let result = null

        if (params.id) {
            try {
                const foundItem = await this.userModel.findById(params.id)
                if (foundItem) {
                    foundItem.id = params.id
                    foundItem.uName = params.userName
                    foundItem.uLogin = params.userLogin
                    foundItem.departId = params.departmentId
                    if (params.userPassword && params.userLogin) {
                        foundItem.uPassword = this.hashGenerator(params.userPassword, params.userLogin)
                    }
                    foundItem.email = params.email,
                    foundItem.permitionId = params.permitionGroupSet
                    foundItem.active = params.deletedAt
                    result = await foundItem.save()
                }
            } catch (err) {
                console.log('Ошибка: ' + err, params.toString())
            }

        } else {
            try {
                result = await this.userModel.create({
                    id: params.id,
                    uName: params.userName,
                    uLogin: params.userLogin,
                    uPassword: this.hashGenerator(params.userPassword, params.userLogin),
                    email: params.email,
                    // uToken = params.uToken,
                    // uSalt = params.uSalt,
                    // tokenExpare: params.tokenExpare,
                    permitionId: params.permitionGroupSet,
                    departId: params.departmentId,
                    active: params.deletedAt,
                })
            } catch (err) {
                console.log('Ошибка: ' + err, params.toString())
            }
        }
        // await this.app.cacheService.delete(`users_0_1`)
        // await this.app.cacheService.delete(`users_1`)
        return result ? result.dataValues : undefined
    }

    /**
     * token grgerator
     * @param {} psw
     * @param {*} login
     * @param {*} slt

    /**
     * {uLogin:'', uPassword: ''} params
     */
    public async userLogin(params: {username: string, password: string}): Promise<{ error: string|undefined, token: string|undefined }> {
        if (!params.username || !params.password) {
            return { error: 'Не получен логин или пароль', token: undefined }
        }
        const res = await this.userModel.findOne({
            where: {
                userLogin: params.username,
                active: 1,
                permitionId: {
                    [DataTypes.Op.in]: [1, 2]
                },
            }
        })
        if (!res) {
            return { error: 'Пользователь не найден', token: undefined }
        }
        // сгенерирую хешь и сравню с user_password
        const hash = this.hashGenerator(params.password, params.username)
        if (hash && hash.localeCompare(res.uPassword) != 0) {
            return { error: 'Не верный пароль', token: undefined }
        }

        const slt = new Date().getTime()
        const tokenExpare = res.tokenExpare ? res.tokenExpare : 0
        let tkn = res.uToken
        if (tokenExpare < slt) {
            // генерирую новый token + salt и сохраняем в БД
            tkn = [params.username, params.password, slt.toString()].join('').sha512()
            res.uSalt = slt.toString()
            res.uToken = tkn
            res.tokenExpare = slt + 43200000 // 12ч
            await res.save()
        }
        return { error: undefined, token: tkn }
    }

    public async getUsersByPermition(active = [1], permitions = [2], flag = 1):Promise<IUser[]|undefined> {
        return await this.userModel.findAll({
//             include: [this.app.subordinationService.subordinationModel],
            attributes: flag ? ['id', 'uName', 'email'] : ['id', 'uName', 'uLogin', 'uPassword', 'permitionId', 'email', 'active', 'departId'],
            where: {
                active: {
                    [DataTypes.Op.in]: active,
                },
                permitionId: {
                    [DataTypes.Op.in]: permitions,
                }
            },
            order: [
                ['uName', 'ASC']
            ]
        })
    }

    /**
     * Пользователя по токену
     * @param {uToken:''} params
     */
    public async getUserByToken(token: string): Promise<IRetUserStruct> {
        try {
            const res = await this.userModel.findOne({
                // include: [this.app.subordinationService.subordinationModel],
                // attributes: ['id', 'uName', 'uLogin', 'uPassword', 'permitionId', 'tokenExpare', 'email', 'departId'],
                where: {
                    user_token: token,
                    active: 1,
                },
            })

            if (!res) {
                return { success: false, message: 'Пользователь не найден', user: undefined }
            }
            const now = new Date().getTime()
            const tokenExpire = res.tokenExpare ? res.tokenExpare : 0
            if (tokenExpire < now) {
                return { success: false, message: 'Время жизни токена истекло', user: undefined }
            }
            return { success: false, message:'Всё плохо!', user: res }

        } catch (err) {
            return { success: false, message: err, user: undefined }
        }
    }

    public async getUserById(id: number|undefined): Promise<IUser|null> {
        return id ? await this.userModel.findOne({
            attributes: ['id', 'uName', 'uLogin', 'uPassword', 'permitionId', 'tokenExpare', 'email', 'departId'],
            where: {
                id,
            },
        }) : null
    }

    private hashGenerator(psw: string, login: string = 'a', slt: string = 'bbb') {
        try {
            return psw ? [login, psw, slt].join('').sha512() : undefined
        } catch (e) {
            console.log('Ошибка.hasGenerator: ' + e)
        }
    }
}