const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization
    if (!token) {
      res.status(401).json({ success: false, message: 'Unauthorized user' })
    }

    token = token.split(' ')[1]
    let user = jwt.verify(token, JWT_SECRET_KEY)
    req.body.userId = user.id
    req.body.username = user.username
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ success: false, message: 'Unauthorized user' })
  }
}

module.exports = { auth }
