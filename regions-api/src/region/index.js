import Id from '../Id'
import ipRegex from 'ip-regex'
import sanitizeHtml from 'sanitize-html'
import buildMakeRegion from './region'
import buildMakeSource from './source'
import bcrypt from 'bcrypt'

const makeSource = buildMakeSource({ isValidIp })
const makeRegion = buildMakeRegion({ Id, sanitize, makeSource, encryptPassword })

export default makeRegion

function isValidIp (ip) {
  return ipRegex({ exact: true }).test(ip)
}

function sanitize (text) {
  // TODO: allow more coding embeds
  return sanitizeHtml(text, {
    allowedIframeHostnames: ['codesandbox.io', 'repl.it']
  })
}

async function encryptPassword (password) {
  return await bcrypt.hash(password, 10)
}