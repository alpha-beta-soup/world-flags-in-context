var countriesJson;

countriesJson = $.getJSON('../data/ne-v2.0.0-countries-geojson/ne-countries-50m.json', function(json) {
  var get_icon, map, onEachFeature;
  map = L.map('map').setView([51.505, -0.09], 3);
  get_icon = function(iso) {
    var flag_icon, url;
    if (iso !== 'nz') {
      url = "http://www.geonames.org/flags/x/" + iso + ".gif";
    } else {
      url = "../lockwood.png";
    }
    flag_icon = L.icon({
      iconUrl: url,
      iconSize: [35, 20]
    });
    return flag_icon;
  };
  onEachFeature = function(feature, layer) {
    var cc, flag_icon, flag_location;
    cc = feature.properties.iso_a2.toLowerCase();
    layer.bindPopup("http://www.geonames.org/flags/x/" + cc + ".gif");
    flag_location = turf.centroid(feature).geometry.coordinates;
    if (flag_location == null) {
      return;
    }
    if (cc === 'nz') {
      flag_location[0] += 23;
    }
    flag_icon = get_icon(cc);
    return L.marker([flag_location[1], flag_location[0]], {
      icon: flag_icon,
      opacity: 1
    }).addTo(map);
  };
  return L.geoJson(json, {
    onEachFeature: onEachFeature,
    color: 'black',
    fillColor: 'grey',
    fillOpacity: 0.7,
    clickable: false,
    weight: 1
  }).addTo(map);
});
