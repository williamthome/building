declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      HOST: string
      PORT: string
      JWT_SECRET: string
      MONGO_URL: string
      AWS_ACCESS_KEY_ID: string
      AWS_SECRET_ACCESS_KEY: string
      AWS_BUCKET: string
      AWS_REGION: string
    }
  }
}

// This file has no import/export statements,
// then by adding an empty export statement convert it into a module
export {}
