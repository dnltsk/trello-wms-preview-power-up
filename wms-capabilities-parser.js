var GetCapabilitiesParser = function () {

    this.parse = function (xmlBody) {

        var wmsCapabilities = {
            'service': {
                'name': $(xmlBody).find('Service').find('Name').text(),
                'title': $(xmlBody).find('Service').find('Title').text()
            }
        };

        var layers = [];
        $(xmlBody).find('Layer Layer').each(function () {
            layers.push({
                'name': $(this).find("Name").text(),
                'title': $(this).find("Title").text()
            })
        });

        wmsCapabilities.layers = layers;

        return wmsCapabilities;
    }


};