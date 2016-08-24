import Bot from 'slackbots'

import { slackEvents } from './events'
import { respondMessage } from './message'

let settings = {
    token: 'xoxb-72335266135-E1I4KlwTkEqvBtzv25QwcRBH',
    name: 'goodellbot',
}

let goodell = new Bot(settings)

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
