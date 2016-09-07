import { masterCommands } from './events'

import { getStandings, getRecentTransactions } from './utils'
import { getRefreshedAccessToken } from './refreshToken'

const TRIGGER_WORDS = {
  standings: {
    word: 'standings',
    fetchWith: getStandings,
  },
  transactions: {
    word: 'transactions',
    fetchWith: getRecentTransactions,
  },
}

let params = {
  icon_url: 'https://s.yimg.com/dh/ap/fantasy/img/app_icon_144x144.jpg',
}

export const respondMessage = (bot, message) => {
  console.log(message)
  const triggerWord = findTriggerWord(message.text)
  if (triggerWord != '') {
    getAccessToken()
      .then(access_token => fetchMessage(triggerWord, access_token))
      .then(messageToPost => {
        const channelToPost = getChannelById(bot.channels, message.channel)
        bot.postMessageToChannel(channelToPost, messageToPost, params)
    })
  }
}

async function getAccessToken() {
  const token = await getRefreshedAccessToken()
  return token
}

async function fetchMessage(triggerWord, access_token) {
  const message = await TRIGGER_WORDS[triggerWord].fetchWith(access_token)
  return message
}

// Searches through the message string to match to any triggers..
// @todo: Probably should make this more robust instead of returning the first word.
const findTriggerWord = (message) => {
  let matchedTrigger = ''
  Object.keys(TRIGGER_WORDS).forEach(trigger => {
    if (message.indexOf(trigger) !== -1) {
      matchedTrigger += trigger
    }
  })
  return matchedTrigger
}

const getChannelById = (channels, id) => {
  return channels.find((channel) => channel.id == id).name
}
