/**
 * GIBS Web Examples
 *
 * Copyright 2013 - 2014 United States Government as represented by the
 * Administrator of the National Aeronautics and Space Administration.
 * All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

window.onload = function() {

    var date = new Date();
    date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    var mapOptions = {
        center: new google.maps.LatLng(64, 200),
        zoom: 5,
        maxZoom: 7
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    function getTileOptions(layer, tileMatrix = 7) {
        var getTileUrl = function(tile, zoom) {
            var pow = Math.pow(2, zoom);
            if (tile.x > pow - 1) {
                tile.x = tile.x % pow;
            }
            if (tile.x < 0) {
                tile.x = pow + (tile.x % pow);
            }
            return "http://map1.vis.earthdata.nasa.gov/wmts-webmerc/" +
                    layer+"/default/"+date+"/" +
                    "GoogleMapsCompatible_Level"+tileMatrix+"/" +
                    zoom + "/" + tile.y + "/" +
                    tile.x + ".png";
        };

        var tileOptions = {
            alt: layer,
            getTileUrl: getTileUrl,
            maxZoom: tileMatrix,
            minZoom: 1,
            name: layer,
            tileSize: new google.maps.Size(256, 256),
            opacity: 0.5
        };

        return tileOptions;
    }

    var seaIceMapType = new google.maps.ImageMapType(getTileOptions("MODIS_Terra_Sea_Ice"));
    var seaIceConcentrationMapType = new google.maps.ImageMapType(getTileOptions("AMSR2_Sea_Ice_Concentration_12km", 6));

    map.overlayMapTypes.push(seaIceConcentrationMapType);
    map.overlayMapTypes.push(seaIceMapType);

    $('#control input[type=date]').change(function() {
        date = $(this).val();
        seaIceMapType = new google.maps.ImageMapType(getTileOptions("MODIS_Terra_Sea_Ice"));
        seaIceConcentrationMapType = new google.maps.ImageMapType(getTileOptions("AMSR2_Sea_Ice_Concentration_12km", 6));
        map.overlayMapTypes.clear();
        map.overlayMapTypes.push(seaIceConcentrationMapType);
        // map.overlayMapTypes.push(seaIceMapType);
    })
};

