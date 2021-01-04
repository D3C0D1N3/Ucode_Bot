require('dotenv').config()
const axios = require('axios')
const { request } = require('express')
const express = require('express')
const app = express()
const port = 3000
const base_url = 'https://api.telegram.org'
app.use(require('body-parser').json())

app.get('/', (req, res) => {
  // console.log(process.env.TELEGRAM_BOT_TOKEN)
  res.send('Hello World!')
})

app.post('/handler', (req, res) => {
  console.log(req.body)
  console.log('it is dead');
  axios.post(base_url + '/bot' + process.env.TELEGRAM_BOT_TOKEN + '/sendMessage', {chat_id: req.body.message.chat.id, text:'Hello!'})
    .then((resp) => {
      console.log('success')
    })
    .catch((error) => {
      console.log('error')
    })
  res.send('Succes');
})

app.post('/:token/setWebhook', (req, res) => {
  console.log(req.body)
  
  if (req.body && req.body.url && req.params.token === process.env.TELEGRAM_BOT_TOKEN) {
    axios.post(base_url + '/bot' + req.params.token + '/setWebhook', {url: req.body.url})
    .then((resp) => {
      console.log(resp.status)
    })
    .catch((error) => {
      console.log(error)
    })
    res.send('Ok')
  }
})

app.listen(port, () => {
  console.log(`Server started`)
})
  // console.log('success')
