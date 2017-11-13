const fs = require('fs')
const cheerio = require('cheerio')
const requestPromise = require('request-promise')
const request= require('request')

for (let i=1; i<=1914; i++) {
  requestPromise(`https://xkcd.com/${i}/`)
    .then(html => {
      let $ = cheerio.load(html)
      let address = 'https:/'+$('#comic img').attr('src').slice(1)
      let imageData = {}
      imageData.url = address
      imageData.title = $('#ctitle').text()
      imageData.alt = $('#comic img').attr('title')

      request(address).pipe(fs.createWriteStream(`data/${i}.jpg`))
      fs.writeFile(`data/${i}.json`, JSON.stringify(imageData), ()=>{})
    })
    .catch(err => {
      console.log(err)
    })
}
