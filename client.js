var enterGetCapabilitiesUrl = function (t) {
        return t.popup({
            title: 'WMS Preview',
            items: [{
                text: 'attach Map..',
                url: 'attachment-select-target.html'
            }, {
                text: 'attach LegendGraphic..',
                url: 'attachment-select-target.html'
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