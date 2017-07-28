var attachMapPopup = function (t, opts) {
    return t.popup({
        title: 'Attach Map..',
        items: function (t, options) {
            var search = options.search;
            if(!search || search.length === 0){
                resolve([]);
            }
            if(search.trim().indexOf("https://") === -1){
                resolve([{
                    text: 'WMS GetCapabilities URL must start with https://',
                    callback: function (t, opts) {
                        console.log('Result 1')
                    }
                }]);
            }
            return new Promise(function (resolve) {

                resolve([{
                    text: 'Result 1',
                    callback: function (t, opts) {
                        console.log('Result 1')
                    }
                }, {
                    text: 'Result 2',
                    callback: function (t, opts) {
                        console.log('Result 2')
                    }
                }]);
            });
        },
        search: {
            // optional # of ms to debounce search to
            // defaults to 300, override must be larger than 300
            debounce: 300,
            placeholder: 'Enter WMS GetCapabilities URL',
            empty: 'No Map Layers found',
            searching: 'Searching for Map Layers...'
        }
    })
};

var enterGetCapabilitiesUrl = function (t) {
    return t.popup({
        title: 'WMS Preview',
        items: [{
            text: 'attach Map..',
            callback: attachMapPopup
        }, {
            text: 'attach LegendGraphic..',
            callback: attachMapPopup

        }]
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