import heinjector from 'heinjector'
import { App } from './protocols'

export class Server {
  private _app?: App

  get app(): App {
    if (!this._app) throw new Error('App is undefined')

    return this._app
  }

  public config = async (serverCallback?: (server: Server) => void): Promise<Server> => {
    await import('@/infra/databases')
    await import('@/infra/repositories')
    await import('@/data/contracts')
    await import('@/presentation/web-servers')
    await import('@/presentation/controllers')
    await import('@/main/app')

    heinjector.define<number>({
      identifier: 'PORT',
      value: 5050
    })

    heinjector.define<string>({
      identifier: 'DB_URL',
      value: 'mongodb://localhost:27001,localhost:27002,localhost:27003/building'
    })

    heinjector.resolve('addUserRepository')
    heinjector.resolve('addUserUseCase')
    this._app = heinjector.resolve<App>('app') as App

    heinjector.clear()

    this.bindProcessEvents()

    if (serverCallback) serverCallback(this)

    return this
  }

  public run = async (): Promise<App> => {
    return await this.app.run()
  }

  private bindProcessEvents = (): void => {
    process.on('SIGINT', () => {
      this.cleanUpServer().then(() => {
        process.exit(0)
      })
    })
  }

  private cleanUpServer = async (): Promise<void> => {
    if (this.app.isHealthy()) {
      await this.app.stop()
    }
    console.warn('Server closed through app termination')
  }
}