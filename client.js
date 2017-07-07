var enterGetCapabilitiesUrl = function (t) {
    return t.popup({
        title: 'WMS Preview',
        items: [
            {
                text: 'Enter GetCapabilities URL',
                callback: function (t) {
                    return t.popup(
                        {
                            title: "Estimation",
                            url: 'enter-getcapabilities-url.html'
                        }
                    )
                }
            }
        ]
    });
};

TrelloPowerUp.initialize(
    {
        'board-buttons': function (t, options) {
            return [{
                icon: 'https://damonbraces.com/img/bethany-hamilton/emoji/DamonBraces_S016.png',
                text: 'WMS Preview',
                callback: enterGetCapabilitiesUrl
            }];
        }
    });