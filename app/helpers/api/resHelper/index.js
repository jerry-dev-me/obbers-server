const lG = "HELPERS-API" // logGroup
const lS = "VERIFY-QUERY-RESULTS" // logSubgroup

module.exports.verifyQueryResults = queryResults => {
  let statusCode = 200
  let resources = queryResults

  if (queryResults === "error") {
    statusCode = 500
    resources = queryResults
  } else if (queryResults === undefined) {
    statusCode = 500
    resources = queryResults
  } else if (queryResults === null) {
    statusCode = 404
    resources = null
  } else if (queryResults === false) {
    statusCode = 401
    resources = false
  } else if (queryResults === true) {
    statusCode = 202
    resources = true
  } else if (queryResults === []) {
    // empty array
    statusCode = 200
    resources = queryResults
  } else if (queryResults === {}) {
    // empty object
    statusCode = 200
    resources = queryResults
  } else {
    statusCode = 200
    resources = queryResults
  }

  return {
    statusCode,
    resources,
  }
}

/*
1xx Informational
100 Continue
101 Switching Protocols
102 Processing (WebDAV)

2xx Success
200 OK
201 Created
202 Accepted
204 No Content
202 Accepted
205 Reset Content
208 Already Reported (WebDAV)

3xx Redirection
302 Found
304 Not Modified
305 Use Proxy
307 Temporary Redirect

4xx Client Error
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
405 Method Not Allowed
406 Not Acceptable
407 Proxy Authentication Required
408 Request Timeout
410 Gone
415 Unsupported Media Type
429 Too Many Requests

5xx Server Error
500 Internal Server Error
501 Not Implemented
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
511 Network Authentication Required
598 Network read timeout error
599 Network connect timeout error
*/
