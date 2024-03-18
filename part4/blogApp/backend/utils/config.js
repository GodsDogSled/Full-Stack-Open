require('dotenv').config()

// const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_URI = "mongodb+srv://gabe:1234@cluster0.xdlnqfc.mongodb.net/blogApp?retryWrites=true&w=majority&appName=Cluster0t"

module.exports = {
  MONGODB_URI,
}