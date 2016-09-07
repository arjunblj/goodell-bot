import YahooFantasy from 'yahoo-fantasy-without-auth'

const yf = new YahooFantasy()

export function getStandings(access_token) {
  return new Promise((resolve, reject) => {
    yf.setUserToken(access_token)
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
