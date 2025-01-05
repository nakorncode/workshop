import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import fs from 'node:fs'
import path from 'node:path'
import ora from 'ora'
import fetch from 'node-fetch'
import bytes from 'bytes'
import { EventEmitter } from 'node:events'

const cli = yargs(hideBin(process.argv))

function downloadFile(url) {
  const emitter = new EventEmitter()
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`)
    }
    let totalBytes = response.headers.get('content-length') || 0
    let receivedBytes = 0
    let startTime = Date.now()
    emitter.emit('response', response)
    response.body.on('data', (chunk) => {
      emitter.emit('data', chunk)
      receivedBytes += chunk.length
      const totalByte = Math.round(totalBytes)
      const receivedByte = Math.round(receivedBytes)
      const speed = Math.round(receivedBytes / (Date.now() - startTime) * 1000)
      const percentage = Math.round(receivedBytes / totalBytes * 100)
      emitter.emit('progress', { totalByte, receivedByte, percentage, speed })
    })
    response.body.on('end', () => {
      emitter.emit('end')
    })
    response.body.on('error', (err) => {
      emitter.emit('error', err)
    })
  }).catch((error) => {
    emitter.emit('error', error)
  })
  return emitter
}

cli.command('download-pipe [url]', 'Download a file using a pipe', {
  url: {
    type: 'string',
  }
}, async (argv) => {
  const spinner = ora().start()
  const filename = path.basename(new URL(argv.url).pathname)
  const dest = fs.createWriteStream(path.join(process.cwd(), filename))
  const downloader = downloadFile(argv.url)
  downloader.on('response', (response) => {
    response.body.pipe(dest)
  })
  downloader.on('progress', ({ totalByte, receivedByte, percentage, speed }) => {
    spinner.text = `[Pipe] Downloading ${filename} ${percentage}% (${bytes(receivedByte)}/${bytes(totalByte)}) ${bytes(speed)}/s`
  })
  downloader.on('end', () => {
    spinner.succeed(`Downloaded ${filename}`)
  })
  downloader.on('error', (err) => {
    spinner.fail(`Download failed: ${err.message}`)
  })
})

cli.command('download-leak [url]', 'Download a file but memory leaked', {
  url: {
    type: 'string',
  }
}, async (argv) => {
  const spinner = ora().start()
  const filename = path.basename(new URL(argv.url).pathname)
  const chunks = []
  const downloader = downloadFile(argv.url)
  downloader.on('data', (chunk) => {
    chunks.push(chunk)
  })
  downloader.on('progress', ({ totalByte, receivedByte, percentage, speed }) => {
    spinner.text = `[Leak] Downloading ${filename} ${percentage}% (${bytes(receivedByte)}/${bytes(totalByte)}) ${bytes(speed)}/s`
  })
  downloader.on('end', () => {
    fs.writeFileSync(path.join(process.cwd(), filename), Buffer.concat(chunks))
    spinner.succeed(`Downloaded ${filename}`)
  })
  downloader.on('error', (err) => {
    spinner.fail(`Download failed: ${err.message}`)
  })
})

cli.parse()
