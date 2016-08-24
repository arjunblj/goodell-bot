import dotenv from 'dotenv'
import YahooFantasy from 'yahoo-fantasy-without-auth'

dotenv.load()

const yf = new YahooFantasy()
yf.setUserToken(process.env.YAHOO_USER_TOKEN)

export function getStandings() {
  return new Promise((resolve, reject) => {
    yf.league.standings(process.env.LEAGUE_ID, (err, resp) => {
        resolve(formatData(resp, 'standings'))
      }
    )
  })
}

const formatData = (data, type) => {
  let formatted = ''
  if (type == 'standings') {
    let output = `:trophy: :football:    *Current Standings, Week ${data.current_week}*    :football: :trophy:`
    data.standings.forEach((team, i) => {
      output += `\n${i+1}. _${team.name}_ | waiver priority ${team.waiver_priority} — ${team.number_of_moves} moves — ${team.number_of_trades} trades.`
    })
    formatted += output
  }
  return formatted
}
