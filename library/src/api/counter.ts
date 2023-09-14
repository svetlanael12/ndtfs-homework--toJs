const http = require('http');

const getCounter = (id) => {
  const url = `${process.env.COUNTER_URL}/counter/${id}`

  return new Promise((resolve): void => {
    http.get(url, (res) => {
      res.setEncoding('utf8')

      let rawData = ''

      res.on('data', (chunk): void => {
        rawData = rawData + chunk
      });

      res.on('end', (): void => {
        try {
          resolve(rawData)
        } catch (e) {
          console.error(e.message)
        }
      });
    }).on('error', (e): void => {
      console.error(`Got error: ${e.message}`)
    });
  });
}

const incCounter = (id) => {
  const url = `${process.env.COUNTER_URL}/counter/${id}/incr`

  return new Promise((resolve): void => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Length': 0,
      },
    };

    http.request(url, options, (res): void => {
      res.setEncoding('utf8')

      let rawData = ''

      res.on('data', (chunk): void => {
        rawData = rawData + chunk
      });

      res.on('end', (): void => {
        try {
          resolve(rawData)
        } catch (e) {
          console.error(e.message)
        }
      });
    })
      .on('error', (e): void => {
        console.error(`Got error: ${e.message}`)
      })
      .end()
  });
}

module.exports = { incCounter, getCounter }
