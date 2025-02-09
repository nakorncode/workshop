declare namespace NodeJS {
  interface ProcessEnv {
    readonly SMTP_HOST: string
    readonly SMTP_PORT: string
    readonly SMTP_SECURE: string
    readonly SMTP_USER: string
    readonly SMTP_PASSWORD: string
    readonly SMTP_FROM: string
    readonly GOOGLE_CLIENT_ID: string
    readonly GOOGLE_CLIENT_SECRET: string
  }
}
