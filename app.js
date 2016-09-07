import express from 'express'
import Bot from 'slackbots'

import { slackEvents } from './events'
import { respondMessage } from './message'

// On production, this is already set on process.env.
if (process.env.NODE_ENV !== 'production'){require('dotenv').load();}

const app = express()

// For avoiding Heroku $PORT
app.set('port', (process.env.PORT || 5000))

app.get('/', (req, res) => res.redirect('https://github.com/arjunblj/goodell-bot')).listen(app.get('port'), () => {
  console.log('Running goodell-bot server...', app.get('port'))
})

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
