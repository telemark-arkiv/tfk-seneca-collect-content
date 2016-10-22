'use strict'

const Wreck = require('wreck')
const querystring = require('querystring')
const makeUnique = require('tfk-unique-array')
const pkg = require('./package.json')

module.exports = function collectContent (options) {
  const seneca = this

  seneca.add('cmd: collect-info, type:user', getContent)

  function getContent (args, callback) {
    const seneca = this
    const user = args.user
    var result = {
      system: options.system || pkg.name,
      type: options.type,
      user: user,
      data: []
    }
    const tags = args.roles.join(',')
    const query = {
      channel: options.channelId,
      tags: tags
    }

    const url = `${options.feedHostUrl}?${querystring.stringify(query)}`

    Wreck.get(url, {json: true}, (error, response, payload) => {
      if (error) {
        console.error(error)
      } else {
        result.data = makeUnique(payload.data)
        seneca.act('role: info, info: content-collected', {data: result})
      }
    })

    callback(null, {ok: true})
  }

  return options.tag || 'tfk-seneca-collect-content'
}
