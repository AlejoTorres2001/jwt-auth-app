const allowedOrigins = require('../config/allowedOrigins')
const crendetials = (req, res, next) => {
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Credentials', true)
  }
  next()
}
module.exports = crendetials
