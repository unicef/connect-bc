export default function buildMakeSource ({ isValidIp }) {
    return function makeSource ({ ip, browser, referrer } = {}) {
      console.log(ip)
      if (!ip) {
        throw new Error('Region source must contain an IP.')
      }
      if (!isValidIp(ip)) {
        throw new RangeError('Region source must contain a valid IP.')
      }
      return Object.freeze({
        getIp: () => ip,
        getBrowser: () => browser,
        getReferrer: () => referrer
      })
    }
  }