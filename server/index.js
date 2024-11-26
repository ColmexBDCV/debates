// server/index.js
const express = require('express')
const axios = require('axios')
const app = express()
const apiUrl = 'http://biblio-pruebas.colmex.mx:9081/api/v1'

app.use(express.json()) // Para parsear JSON

// Endpoint para enviar errores a Microsoft Teams
app.post('/sendErrorToTeams', async (req, res) => {
  const { error, method, sitio } = req.body
  const webhookUrl = 'https://redescolmex.webhook.office.com/webhookb2/f5f44f0f-371e-4c95-b39d-4da3e230bb4e@93db1ea2-0b31-43e8-aece-2228fabb7af1/IncomingWebhook/8bbfaaeaaee34e458e2e0510acf92eef/811356f3-d509-4767-9780-a7bf281c13b6/V2Reivy6bmOBZ1Fd26f4G3MUZqcdi6ieE3EYHYfS4IXW41'

  const message = {
    title: `Error en la Aplicación ${sitio} en el método ${method}`,
    text: `Ha ocurrido un error en la aplicación:\n\nError: ${error.message || error}`
  }

  try {
    await axios.post(webhookUrl, message)
    res.status(200).json({ message: 'Datos enviados a Microsoft Teams.' })
  } catch (webhookError) {
    console.error('Error al enviar el mensaje al webhook de Microsoft Teams:', webhookError)
    res.status(500).json({ message: 'Error al enviar a Teams.' })
  }
})

app.post('/login', async (req, res) => {
  try {
    const response = await axios.post(apiUrl + '/users/login?username=' + req.body.username + '&password=' + req.body.password)
    res.status(200).json(response.data)
    return response
  } catch (loginError) {
    console.error('Error enviado datos de logueo.:', loginError)
    res.status(500).json({ message: 'Error al enviar a coltem.' })
  }
})

module.exports = app
