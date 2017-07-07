var enterGetCapabilitiesUrl = function (t) {
    return t.popup({
        title: 'WMS Preview',
        items: [
            {
                text: 'enter-getcapabilities-url.html',
                callback: function(t){
                    return t.overlay({
                        url: './enter-getcapabilities-url.html',
                        args: { rand: (Math.random() * 100).toFixed(0) }
                    })
                        .then(function(){
                            return t.closePopup();
                        });
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