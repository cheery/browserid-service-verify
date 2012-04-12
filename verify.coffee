https = require 'https'

parse_json = (callback) -> (res) ->
    body = ""
    res.on 'data', (chunk) -> body += chunk
    res.on 'end', -> callback (JSON.parse body)

browserid_verify = (options, callback) ->
    data = JSON.stringify options
    request = {
        host: 'browserid.org',
        path: '/verify',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            'Content-Length': data.length
        }
    }
    conn = https.request request, parse_json(callback)
    #conn.on 'error', (err) -> callback {status: "verifier error", message: err.toString()}
    conn.write(data)
    conn.end()

module.exports = browserid_verify
