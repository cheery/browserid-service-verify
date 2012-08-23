[![build status](https://secure.travis-ci.org/cheery/browserid-service-verify.png)](http://travis-ci.org/cheery/browserid-service-verify)
This library makes deploying BrowserID easy in node.js projects.

Plain standalone browserid verifier will be better method to implement BrowserID, but a stable one wasn't available when I wrote this library.

The example should be clear enough, but API is so simple that I will describe it.


    var browserid_verify = require('browserid-service-verify');

    var on_login = function (assertion, logged_in) {
        browserid_verify(
            {"assertion": assertion, "audience": "http://example.org"},
            function (verification) {
                logged_in(verification.status == "okay", verification);
            }
        );
    };

## api

`browserid_verify(options, callback)`

options should contain two parameters:

- `assertion` the encoded assertion from client
- `audience` the hostname and optional port of your site. The client-side MUST NOT be allowed fill this, for security reasons.

The verification will be returned by the callback. It is an ordinary browserid verification.
