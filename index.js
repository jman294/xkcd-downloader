const fs = require('fs-extra')
const cheerio = require('cheerio')
const requestPromise = require('request-promise')
const request = require('request')

requestPromise('https://xkcd.com/')
  .then(html => {
    let $ = cheerio.load(html)
    let text = $('#middleContainer').text()
    let line = text.split('\n')[21]
    let latestComic = parseInt(line.slice(47, line.length-1))
    return latestComic
  })
  .then(latestComic => {
    let i = latestComic + 1
    while (i > 0) {
      i -= 1
      try {
        let stat = fs.statSync(`data/${i}.jpg`)
        break
      } catch (e) {
        console.log(`${i} is missing`)
      }
    }
    return [i, latestComic]
  })
  .then(range => {
    if (range[0] === range[1]) {
      console.log('All caught up')
      return
    } else {
      console.log(`Updating from #${range[0]}`)
    }
    for (let i=range[0]; i<=range[1]; i++) {
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
    })
