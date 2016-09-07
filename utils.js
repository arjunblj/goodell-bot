import _ from 'lodash'
import YahooFantasy from 'yahoo-fantasy-without-auth'


const messageTypes = {
  standings: 'standings',
  transactions: 'transactions',
}

const yf = new YahooFantasy()

export function getStandings(access_token) {
  return new Promise((resolve, reject) => {
    yf.setUserToken(access_token)
    yf.league.standings(process.env.LEAGUE_ID, (err, resp) => {
      resolve(formatData(resp, messageTypes.standings))
    })
  })
}

export function getRecentTransactions(access_token) {
  return new Promise((resolve, reject) => {
    yf.setUserToken(access_token)
    yf.league.transactions(process.env.LEAGUE_ID, (err, resp) => {
      resolve(formatData(resp, messageTypes.transactions))
    })
  })
}

const formatData = (data, type) => {
  let formatted = ''

  if (type == messageTypes.standings) {
    let output = `:trophy: :football:    *Current Standings, Week ${data.current_week}*    :football: :trophy:\n`
    data.standings.forEach((team, i) => {
      output += `\n${i+1}. _${team.name}_ | waiver priority ${team.waiver_priority} — ${team.number_of_moves} moves — ${team.number_of_trades} trades.`
    })
    formatted += output
  }

  if (type == messageTypes.transactions) {
    const recentAddDrops = _.filter(data.transactions, {'type': 'add/drop'}).slice(0, 5)
    let output = `:rotating_light: :fire: :fire_engine:   *Most Recent Transactions*    :fire_engine: :fire: :rotating_light:\n`
    recentAddDrops.map(move => {
      console.log(move)
      const addedPlayer = move.players[0]
      const droppedPlayer = move.players[1]
      const teamName = addedPlayer.transaction_data.destination_team_name
      output += `\n_${teamName}_\n     :heavy_plus_sign: ${addedPlayer.name.full} (${addedPlayer.display_position} from ${addedPlayer.editorial_team_abbr}.) :heavy_minus_sign: ${droppedPlayer.name.full} (${droppedPlayer.display_position} from ${droppedPlayer.editorial_team_abbr}.)`
    })
    formatted += output
  }

  return formatted
}
