import dotenv from 'dotenv'
import request from 'request'

dotenv.load()

const formData = {
  grant_type: 'refresh_token',
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  refresh_token: process.env.REFRESH_TOKEN,
}

const headers = {Authorization: 'Basic ' + new Buffer(process.env.CONSUMER_KEY + ':' + process.env.CONSUMER_SECRET).toString('base64')}

export const getRefreshedAccessToken = () => {
  return new Promise((resolve, reject) => {
    request.post('https://api.login.yahoo.com/oauth2/get_token', {
      headers: headers,
      json: true,
      form: formData,
    }, (err, res, body) => {
      resolve(body.access_token)
    })
  })
}
