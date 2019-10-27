import Nodemailer from 'nodemailer'
import { Application } from '../../Application'

export class MailService {
    private config: any
    private transporter: Nodemailer.Transporter

    public constructor(protected app: Application) {
        const config = app.config.notification.mailHost
        const params: {
            host: string,
            port: number,
            secure: boolean,
            tls: {
                rejectUnauthorized: boolean,
            },
            auth: undefined|{ user: string, pass: string },
        } = {
            host: config.host,
            port: config.port,
            secure: config.secure,
            tls: {
                rejectUnauthorized: false,
            },
            auth: undefined,
        }

        if (config.user) {
            params.auth = {
                user: config.user,
                pass: config.password,
            }
        }

        this.config = config
        this.transporter = Nodemailer.createTransport(params)
    }

    public async send(to: string, subject: string, text: string, params: any = {}) {
        return new Promise((resolve, reject) => {
            params = {
                from: this.app.config.notification.mailHost.sender,
                to,
                subject,
                html: text,
                ...params,
            }
            if (this.config.sender) {
                params.sender = this.config.sender
            }
            if (this.config.replyTo) {
                params.replyTo = this.config.replyTo
            }

            this.transporter.sendMail(params, (err: any, info: any) => {
                if (err) {
                    reject(err)

                    return
                }
                resolve(info.messageId)
            })
        })
    }

}
