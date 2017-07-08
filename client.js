var enterGetCapabilitiesUrl = function (t) {
    console.log("enterGetCapabilitiesUrl", t);
    return t.popup({
        title: 'WMS Preview',
        items: [
            {
                url: 'enter-getcapabilities-url.html'
                // text: 'enter-getcapabilities-url.html',
                // callback: function (t) {
                //     console.log("enter-getcapabilities-url.html", t);
                //     return t.overlay({
                //         url: './enter-getcapabilities-url.html'
                //     }).then(function () {
                //         console.log("close??", t);
                //         return t.closePopup();
                //     });
                // }
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