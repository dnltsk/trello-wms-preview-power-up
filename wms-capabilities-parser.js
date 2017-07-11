var GetCapabilitiesParser = function () {

    this.parse = function (xmlBody) {

        var wmsCapabilities = {
            service: {
                name: $(xmlBody).find('Service').find('Name').text(),
                title: $(xmlBody).find('Service').find('Title').text(),
                getMap: parseGetMapCapabilities(xmlBody)
            }
        };

        var layers = [];
        $(xmlBody).find('Layer Layer').each(function () {
            layers.push({
                name: $(this).find("Name").text(),
                title: $(this).find("Title").text()
            })
        });

        wmsCapabilities.layers = layers;

        return wmsCapabilities;
    };

    function parseGetMapCapabilities(xmlBody){
        return {
            resource : $(xmlBody).find('Capability Request GetMap OnlineResource[href]').text(),
            format : $(xmlBody).find('Capability Request GetMap Format:first').text(),
            crs : $(xmlBody).find('Capability Layer:first CRS:first').text()
        }
    }


};