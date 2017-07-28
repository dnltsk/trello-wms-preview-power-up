var attachMapPopup = function (t, opts) {
    return t.popup({
        title: 'Attach Map..',
        items: function (t, options) {
            var search = options.search;
            if(!search || search.length === 0){
                //no input
                return new Promise(function (resolve) {
                    resolve([]);
                });
            }
            if(search.trim().indexOf("https://") === -1){
                //input does not start with https://
                return new Promise(function (resolve) {
                    resolve([{
                        text: 'WMS GetCapabilities URL must start with https://',
                        callback: function (t, opts) {
                            console.log('Result 1')
                        }
                    }]);
                });
            }
            return new Promise(function (resolve) {
                //default
                resolve([]);
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