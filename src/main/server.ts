import container from '@/shared/dependency-injection'
import { App } from './protocols'

export class Server {
  get app (): App {
    return container.resolve<App>('app')
  }

  private importDepencencyInjections = async (): Promise<void> => {
    await import('@/infra/databases')
    await import('@/infra/repositories')
    await import('@/data/contracts')
    await import('@/presentation/web-servers')
    await import('@/presentation/controllers')
    await import('@/main/app')
  }

  private defineInjectedValues = (): void => {
    container.define('PORT').as(5051)
    container.define('DB_URL').as('mongodb://localhost:27001,localhost:27002,localhost:27003/building')
  }

  public config = async (): Promise<Server> => {
    await this.importDepencencyInjections()
    this.defineInjectedValues()
    this.bindProcessEvents()
    return this
  }

  public run = async (): Promise<Server> => {
    await this.app.run()
    return this
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