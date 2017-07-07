var enterGetCapabilitiesUrl = function (t) {
    return t.popup({
        title: 'WMS Preview',
        items: [
            {
                callback: function (t2) {
                    return t2.popup(
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