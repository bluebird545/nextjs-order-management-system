const fs = require('fs')
const csv = require('csv-parser')

const path = require('path')

class CsvReader {
  constructor(fileName) {
    this.fileName = fileName
  }

  readRecords() {
    let extractedData = []

    return new Promise((resolve, reject) => {
      fs.createReadStream(path.join(__dirname, 'placeholder-data', this.fileName))
        .on('error', (error) => {
          throw error
        })
        .pipe(csv())
        .on('data', (row) => {
          extractedData.push(row)
        })
        .on('end', () => {
          resolve(extractedData)
        })
    })
  }
}

module.exports = CsvReader