var GetCapabilitiesParser = function () {

    this.parse = function (xmlBody) {

        var wmsCapabilities = {
            'service': {
                'name': $(gc).find('Service').find('Name').text(),
                'title': $(gc).find('Service').find('Title').text()
            }
        };

        var layers = [];
        $(gc).find('Layer Layer').each(function () {
            layers.push({
                'name': $(this).find("Name").text(),
                'title': $(this).find("Title").text()
            })
        });

        wmsCapabilities.layers = layers;

        return wmsCapabilities;
    }


};