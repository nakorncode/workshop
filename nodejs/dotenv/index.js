import dotenv from 'dotenv'

dotenv.config()

function connectDB(user, pass) {
  console.log(user, pass)
}

connectDB(process.env.DB_USER, process.env.DB_PASS)
