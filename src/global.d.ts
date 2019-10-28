declare interface String {
    sha512(): string
    md5(): string
    isValidEmail(): boolean
}

declare interface Global {
    appRoot: string
}
declare interface Date {
    getTimestamp(): number
}
declare function time(): number
declare function date(format: string, timestamp: number): string
declare function float(value: any): number

declare interface IConfig {
    node_env: string
    port: number
    db: {
        name: string
        user: string
        password: string
        path: string
    },
    mediaStorage: string,
    notification: {
        mailHost: {
            host: string,
            port: number,
            secure: false,
            user: string,
            password: string,
            sender: string,
        },
    },
    development: {
        username: string|null,
        password: string|null,
        database: string|null,
        host: string,
        dialect: string,
    },
    test: {
        username: string|null,
        password: string|null,
        database: string|null,
        host: string,
        dialect: string,
    },
    production: {
        username: string|null,
        password: string|null,
        database: string|null,
        host: string,
        dialect: string,
    },
}

declare module "connect-multiparty" {
    const app: any

    export default app
}
