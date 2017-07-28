var enterGetCapabilitiesUrl = function (t) {
        return t.popup({
            title: 'WMS Preview',
            items: [{
                text: 'attach Map..',
                callback: function (t, opts) {
                    console.log('attach Map..', t, opts);
                }
                //, url: 'attachment-select-target.html'
            }, {
                text: 'attach LegendGraphic..',
                callback: function (t, opts) {
                    console.log('attach LegendGraphic..', t, opts);
                    return t.popup({
                        title: 'WMS Preview',
                        items: [{
                            text: 'enter foo..',
                            callback: function (t, opts) {
                                console.log('attach Foo..', t, opts);
                            }
                            //, url: 'attachment-select-target.html'
                        }]
                    })
                }
//, url: 'attachment-select-target.html'
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