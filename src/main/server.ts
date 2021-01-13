import container from '@/shared/dependency-injection'
import { App } from './protocols'

export class Server {
  get app(): App {
    return container.resolve<App>('app')
  }

  private importDepencencyInjections = async (): Promise<void> => {
    await import('@/infra/databases')
    await import('@/infra/storages')
    await import('@/data/cryptography')
    await import('@/data/contracts')
    await import('@/presentation/controllers')
    await import('@/main/middlewares')
    await import('@/main/routes')
    await import('@/main/web-servers')
    await import('@/main/app')
  }

  private defineInjectedValues = (): void => {
    const {
      HOST,
      PORT,
      MONGO_URL,
      JWT_SECRET,
      AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY,
      AWS_BUCKET,
      AWS_REGION
    } = process.env
    container
      .define('HOST')
      .as(HOST || '0.0.0.0')
      .done()
    container
      .define('PORT')
      .as(PORT || '5051')
      .done()
    container
      .define('DB_URL')
      .as(MONGO_URL || 'mongodb://localhost:27001,localhost:27002,localhost:27003/building')
      .done()
    container
      .define('JWT_SECRET')
      .as(JWT_SECRET || 'building_jwt_secret')
      .done()
    container
      .define('AWS_ACCESS_KEY_ID')
      .as(AWS_ACCESS_KEY_ID || 'AKIAIMYTQYTNOPTU3DVA')
      .done()
    container
      .define('AWS_SECRET_ACCESS_KEY')
      .as(AWS_SECRET_ACCESS_KEY || 'EGwKAKSUa7D6lvNntSiYIW0r70Yp6CXU1GYGxZ2w')
      .done()
    container
      .define('AWS_BUCKET')
      .as(AWS_BUCKET || 'building-app-bucket')
      .done()
    container
      .define('AWS_REGION')
      .as(AWS_REGION || 'us-east-1')
      .done()
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
