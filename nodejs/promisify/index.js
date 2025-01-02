import ncp from 'ncp'
import { promisify } from 'node:util'
// หรือใช้ https://www.npmjs.com/package/pify หากต้องการทำให้ทุก Methods กลายเป็น Promise

const copyFrom = './abc'
const pasteTo = './def'

// Callback
// ncp.ncp(copyFrom, pasteTo, (err) => {
//   if (err) {
//     return console.error(err)
//   }
//   console.log('Done')
// })

// Promise
const ncpAsync = promisify(ncp.ncp)
try {
  await ncpAsync(copyFrom, pasteTo)
  console.log('Done')
} catch (err) {
  console.error(err)
}
