const { argv } = require("yargs");
const express = require('express')
const prometheus = require('express-prometheus-middleware');
const app = express()
const port = argv.port || 80;

app.use(prometheus({}))
app.use(express.static('build'))
app.use((req, res) => res.sendFile(`${__dirname}/build/index.html`))


app.listen(port, function () {
  console.log('server listening on port ' + port)
})
