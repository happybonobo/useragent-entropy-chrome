// New user agent.
var userAgent;

chrome.webRequest.onBeforeSendHeaders.addListener(
    function(info) {
        // Replace the User-Agent header
        var headers = info.requestHeaders;
        headers.forEach(function(header, i) {
            if (header.name.toLowerCase() == 'user-agent') {
                // Initialize.
                if (!userAgent) {
                    var number = Math.round(Math.random() * 9999999);
                    userAgent = header.value + '.' + number;
                }

                // Update.
                header.value = userAgent;
            }
        });
        return {
            requestHeaders: headers
        };
    },
    // Request filter
    {
        // Modify the headers for these pages
        urls: [
            "<all_urls>"
        ],
        // In the main window and frames
        types: ["main_frame", "sub_frame"]
    }, ["blocking", "requestHeaders"]
);