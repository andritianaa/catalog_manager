import mongoose from "mongoose"
const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://127.0.0.1:27017/commands'

mongoose.set('strictQuery', false)
mongoose.connect(CONNECTION_STRING, () => { console.log("⚡️ Database connected") })
