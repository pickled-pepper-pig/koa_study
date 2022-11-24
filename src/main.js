const app = require('./app/index')
const { APP_PORT } = require('./config/config.default')

app.listen(3000, () => {
    console.log(`server is running on http://localhost: ${APP_PORT}`)
})