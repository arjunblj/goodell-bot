import Bot from 'slackbots'
import dotenv from 'dotenv'

import { slackEvents } from './events'
import { respondMessage } from './message'

dotenv.load()

const settings = {
  token: process.env.SLACK_BOT_TOKEN,
  name: 'goodellbot',
}

const goodell = new Bot(settings)

goodell.on('start', () => {
  goodell.getUser('goodellbot')
    .then(() => listen(goodell))
    .catch((err) => console.error(err))
})

const listen = (goodell) => {
  goodell.on('message', (message) => {
    switch(message.type) {
			case slackEvents.message:
        if (message.text.startsWith(`<@${goodell.self.id}>`)) {
          respondMessage(goodell, message)
        }
				break
		}
  })
}
