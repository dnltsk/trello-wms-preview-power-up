var enterGetCapabilitiesUrl = function (t) {
    return t.popup({
        title: 'WMS Preview',
        url: 'enter-getcapabilities-url.html',
        callback: function (t) {
            return t.closePopup();
        }
    });
};

TrelloPowerUp.initialize(
    {
        'card-buttons': function (t, options) {
            return [{
                icon: './logo.png',
                text: 'WMS Preview',
                callback: enterGetCapabilitiesUrl
            }];
        }
    });