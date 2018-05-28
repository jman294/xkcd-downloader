const fs = require('fs-extra')
const cheerio = require('cheerio')
const requestPromise = require('request-promise')
const request = require('request')

requestPromise('https://xkcd.com/')
  .then(html => {
    let $ = cheerio.load(html)
    let text = $('#middleContainer').text()
    let line = text.split('\n')[21]
    let latestComic = line.slice(47, line.length-1)
    return latestComic
  })
  .then(latestComic => {
    let i = latestComic
    while (i > 0) {
      i -= 1
      fs.stat(`data/{i}.png`, function (err, stat) {
        if (err) {
          break
        }
      })
  })
  //.then(latestComic => {
    //for (let i=4; i<=8; i++) {
      //requestPromise(`https://xkcd.com/${i}/`)
        //.then(html => {
          //let $ = cheerio.load(html)
          //let address = 'https:/'+$('#comic img').attr('src').slice(1)
          //let imageData = {}
          //imageData.url = address
          //imageData.title = $('#ctitle').text()
          //imageData.alt = $('#comic img').attr('title')

          //request(address).pipe(fs.createWriteStream(`data/${i}.jpg`))
          //fs.writeFile(`data/${i}.json`, JSON.stringify(imageData), ()=>{})
        //})
          //.catch(err => {
            //console.log(err)
          //})
      //}
    //})
