declare namespace NodeJS {
  interface ProcessEnv {
    readonly DATABASE_URL: string
    readonly SMTP_HOST: string
    readonly SMTP_PORT: string
    readonly SMTP_SECURE: string
    readonly SMTP_FROM: string
    readonly SMTP_USER: string
    readonly SMTP_PASSWORD: string
  }
}
