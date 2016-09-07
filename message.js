import { masterCommands } from './events'

import { getStandings } from './utils'
import { getRefreshedAccessToken } from './refreshToken'

let params = {
  icon_url: 'https://s.yimg.com/dh/ap/fantasy/img/app_icon_144x144.jpg',
}

export const respondMessage = (bot, message) => {
  const parsedMessage = message.text.split(' ')
  console.log(parsedMessage)
  if (parsedMessage.includes('standings')) {
    getAccessToken()
      .then(fetchMessage)
      .then(messageToPost => {
      const channelToPost = getChannelById(bot, message.channel)
      bot.postMessageToChannel(channelToPost, messageToPost, params)
    })
  }
}

async function getAccessToken() {
  const token = await getRefreshedAccessToken()
  return token
}

async function fetchMessage(access_token) {
  const message = await getStandings(access_token)
  return message
}

const getChannelById = (bot, id) => {
  return bot.channels.find((channel) => channel.id == id).name
}
