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
    login: string,
    password: string,
    salt?: string|undefined,
    token?: string|undefined,
    tokenExpare?: number|undefined,
    permitionGroupSet: string,
    deletedAt: number,
    updatedAt?: number,
    createdAt?: number

}
export interface IRetUserStruct {
    success: boolean,
    message: string
    user: IUser|undefined
}

export class UserModel extends AbstractModel {

    constructor(protected app: Application) {
        super(app)

        this.model = app.dbService.sequelize.define('users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'id',
            },
            departmentId: {
                type: DataTypes.INTEGER(),
                field: 'department_id',
                allowNull: false,
                references: { model: 'department', key: 'id' }
            },
            storePointSet: {
                type: DataTypes.INTEGER(),
                field: 'store_point_set',
                allowNull: false,
            },
            userName: {
                type: DataTypes.STRING(255),
                field: 'user_name',
                allowNull: false,
            },
            login: {
                type: DataTypes.STRING(50),
                field: 'login',
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING(512),
                field: 'password',
                allowNull: true,
            },
            token: {
                type: DataTypes.STRING(512),
                field: 'token',
                allowNull: true,
            },
            salt: {
                type: DataTypes.BIGINT,
                field: 'salt',
                defaultValue: 0,
            },
            tokenExpare: {
                type: DataTypes.BIGINT,
                field: 'token_expare',
                allowNull: true,
            },
            permitionGroupSet: {
                type: DataTypes.STRING(255),
                field: 'permission_group_set',
                defaultValue: 0,
            },
            email: {
                type: DataTypes.STRING(100),
                field: 'email',
                allowNull: true,
            },
            phone: {
                type: DataTypes.STRING(100),
                field: 'phone',
                allowNull: true,
            },
            mobile: {
                type: DataTypes.STRING(100),
                field: 'mobile',
                allowNull: true,
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
        }, {tableName: 'users', createdAt: 'created_at', updatedAt: 'updated_at',  timestamps: true,})
        this.model.belongsTo(this.app.departmentModel.model)
    }


    ///======================================================== getters =========================
    public async getUsersAttr(deleteIt = [0], ) {
        try {
            return await this.model.findAll({
                include: [this.app.departmentModel.model],
                where: {
                    deletedAt: {[DataTypes.Op.eq]: deleteIt }
                },
                order: [
                    ['id', 'ASC']
                ]
            })
            
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
                const foundItem = await this.model.findById(params.id)
                if (foundItem) {
                    foundItem.id = params.id
                    foundItem.uName = params.userName
                    foundItem.uLogin = params.login
                    foundItem.departId = params.departmentId
                    if (params.password && params.login) {
                        foundItem.uPassword = this.hashGenerator(params.password, params.login)
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
                result = await this.model.create({
                    id: params.id,
                    uName: params.userName,
                    uLogin: params.login,
                    uPassword: this.hashGenerator(params.password, params.login),
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
        const res = await this.model.findOne({
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
        return await this.model.findAll({
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
            const res = await this.model.findOne({
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
        return id ? await this.model.findOne({
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