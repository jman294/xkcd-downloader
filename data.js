const fs = require('fs-extra')

fs.readdir('data')
  .then((files) => {
    let i = 0
    for (let file in files) {
      let fileName = files[file]
      console.log(fileName)
      //fs.stat(fileName)
        //.then((a) => {
          //console.log(a)
        //})
      //if (fs.stat(path
    }
  })
  .catch((err) => {
    console.log(err)
  })
