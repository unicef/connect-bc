export default function makePostRegion ({ addRegion }) {
    return async function postRegion (httpRequest) {
      try {
        const { source = {}, ...regionInfo } = httpRequest.body
        // source.ip = httpRequest.ip
        source.browser = httpRequest.headers['Region-Agent']
        if (httpRequest.headers['Referer']) {
          source.referrer = httpRequest.headers['Referer']
        }
        const posted = await addRegion({
          ...regionInfo,
          source
        })
        return {
          headers: {
            'Content-Type': 'application/json',
            'Last-Modified': new Date(posted.modifiedOn).toUTCString()
          },
          statusCode: 201,
          body: { posted }
        }
      } catch (e) {
        // TODO: Error logging
        console.log(e)
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 400,
          body: {
            error: e.message
          }
        }
      }
    }
  }