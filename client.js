var enterGetCapabilitiesUrl = function (t) {
        return t.popup({
            title: 'WMS Preview',
            items: [{
                text: 'attach Map..',
                callback: function (t, opts) {
                    return t.popup({
                        title: 'WMS Preview - attach Map..',
                        url: 'enter-getcapabilities-url.html'
                    })
                }
                //, url: 'attachment-select-target.html'
            }, {
                text: 'attach LegendGraphic..',
                callback: function (t, opts) {
                    return t.popup({
                        title: 'WMS Preview - attach LegendGraphic..',
                        url: 'enter-getcapabilities-url.html'
                    })
                }

            }]
        })
            ;
    }
;

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