'use client'

import { Button } from './Button'
import getServerRunningPlatform from './getServerRunningPlatform'

export default function Page() {
  async function getPlatform() {
    const platform = await getServerRunningPlatform()
    alert(platform)
  }
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Server Functions</h1>
      <div className="flex gap-2">
        <Button onClick={getPlatform}>Get Platform on Server</Button>
      </div>
    </>
  )
}
