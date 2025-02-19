declare namespace NodeJS {
  interface ProcessEnv {
    readonly S3_ENDPOINT: string
    readonly S3_ACCESS_KEY: string
    readonly S3_SECRET_ACCESS_KEY: string
    readonly S3_BUCKET: string
  }
}
