import dotenv from 'dotenv'
import YahooFantasy from 'yahoo-fantasy-without-auth'

dotenv.load()

const yf = new YahooFantasy()
yf.setUserToken(process.env.YAHOO_USER_TOKEN)

// const wrapRequestAsPromise = (fn) => {
//   return new Promise((resolve, reject) => {fn})
// }

export function getStandings() {
  return new Promise((resolve, reject) => {
    yf.league.standings(process.env.LEAGUE_ID, (err, resp) => {
        resolve(resp)
      }
    )
  })
}
