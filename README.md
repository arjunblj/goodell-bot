# goodell-bot

> A simple Slack bot that'll update your Slack with Yahoo Fantasy Football data as requested.

### Development

You'll need to set up a Bot app in Slack in addition to setting Yahoo app access tokens and a `refresh_token` (for the auth'd Yahoo user). Locally, these config tokens are set up with `dotenv` and can be written to using `.env.template`. After this, you can do the usual:

```shell
$ npm install
$ npm start
```
