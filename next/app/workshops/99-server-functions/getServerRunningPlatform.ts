'use server'

import { platform } from 'os'

export default async function getServerRunningPlatform() {
  return platform()
}
