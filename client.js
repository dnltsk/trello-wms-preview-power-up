var enterGetCapabilitiesUrl = function (t) {
    return t.popup({
        title: 'Popup List Example',
        items: [
            {
                text: 'Open Overlay'
                // ,callback: function (t) {
                //     return t.overlay({
                //         url: './overlay.html',
                //         args: {rand: (Math.random() * 100).toFixed(0)}
                //     })
                //         .then(function () {
                //             return t.closePopup();
                //         });
                // }
            },
            {
                text: 'Open Board Bar'
                // ,callback: function (t) {
                //     return t.boardBar({
                //         url: './board-bar.html',
                //         height: 200
                //     })
                //         .then(function () {
                //             return t.closePopup();
                //         });
                // }
            }
        ]
    });
}

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