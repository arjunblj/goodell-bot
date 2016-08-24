import { masterCommands } from './events'

import { getStandings } from './utils'

let params = {
  icon_url: 'https://s.yimg.com/dh/ap/fantasy/img/app_icon_144x144.jpg',
}

export const respondMessage = (bot, message) => {
  const parsedMessage = message.text.split(' ')
  if (parsedMessage.includes('standings')) {
    fetchMessage().then(messageToPost => {
      const channelToPost = getChannelById(bot, message.channel)
      bot.postMessageToChannel(channelToPost, messageToPost, params)
    })
  }
}

async function fetchMessage() {
  const message = await getStandings()
  return message
}

const getChannelById = (bot, id) => {
  return bot.channels.find((channel) => channel.id == id).name
}
