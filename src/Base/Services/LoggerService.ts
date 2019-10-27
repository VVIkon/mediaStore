import { AbstractService } from './AbstractService'
import fs from 'fs'
import { Application } from '../../Application'
import path from 'path'

enum LogType {
    error = 'error',
    warning = 'warning',
}

export class LoggerService extends AbstractService {
    public interval?: NodeJS.Timeout
    public intervalExecuting = false

    public constructor(app: Application) {
        super(app)
        this.interval = setInterval(async () => {
            if (this.intervalExecuting) {
                return
            }
            this.intervalExecuting = true
            try {
                await this.getCurrentFilename()
            } catch (err) {
                this.write(err)
            } finally {
                this.intervalExecuting = false
            }
        }, 60000 * 60)
        process.on('uncaughtException', this.exceptionListener.bind(this))
        // process.on('unhandledRejection', this.exceptionListener.bind(this))
    }

    public checkCondition(){}

    public async exceptionListener(error: Error) {
        this.write(error)
        console.error(error)
    }

    public async write(message: string|Error|(string|Error)[], log: LogType = LogType.error) {
        if (!Object.values(LogType).includes(log)) {
            this.write(`Log type "${log} is invalid", reseting to "error"...`)
            log = LogType.error
        }
        const file = await this.getCurrentFilename(log)
        const date = new Date()
        message = Array.isArray(message) ? message : [message]
        for (const m of message) {
            let messageForWrite = m instanceof Error ? m.stack : `${m}`
            messageForWrite = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-` +
                `${String(date.getDate()).padStart(2, '0')}T` +
                `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:` +
                `${String(date.getSeconds()).padStart(2, '0')} ` +
                messageForWrite
            fs.appendFileSync(file, messageForWrite + '\n')
        }
    }

    public async getCurrentFilename(log = 'error') {
        if (!fs.existsSync('logs')) {
            fs.mkdirSync('logs')
        }
        const fileName = `logs/${log}.log`
        if (!fs.existsSync(fileName)) {
            return fileName
        }
        const fd = fs.openSync(fileName, 'r')
        const stat = fs.fstatSync(fd)
        fs.closeSync(fd)
        const date = new Date()
        if (stat.mtime.getDate() !== date.getDate()) {
            let moveFileName = `logs/${log}-${stat.mtime.getFullYear()}-${String(stat.mtime.getMonth() + 1).padStart(2, '0')}-` +
            `${String(stat.mtime.getDate()).padStart(2, '0')}.log`
            moveFileName = fs.existsSync(moveFileName) ? moveFileName + '.' + Date.now() : moveFileName
            fs.renameSync(fileName, moveFileName)
            this.sendLogToEmail(this.app.config.notification.mailHost.sender, moveFileName).catch(err => this.write(err))
        }
        return fileName
    }

    public async sendLogToEmail(email: string|string[], fileName: string) {
        if (!Array.isArray(email)) {
            email = [email]
        }
        const pathInfo = path.parse(fileName)
        for (const m of email) {
            await this.app.mailService.send(m, `eapub ${pathInfo.base}`,
                `<p style="font-family: monospace;">${fs.readFileSync(fileName).toString().replace(/\n/g, '<br>')}</p>`,
            )
        }
    }

}
