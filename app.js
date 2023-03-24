import  express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const app = express()
// REF: https://shramko.dev/blog/dirname-error
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT ?? 5353



app.use('/', express.static(__dirname + '/bin/www'))
app.use(express.static('public'))

app.get('/', (_, res) => {
    res.sendFile('index.html', { root: __dirname })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})