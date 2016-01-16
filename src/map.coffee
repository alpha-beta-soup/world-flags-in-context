countriesJson = $.getJSON('https://github.com/alpha-beta-soup/world-flags-in-context/blob/master/data/ne-v2.0.0-countries-geojson/ne-countries-50m.json', (json) ->

  map = L.map('map').setView([51.505, -0.09], 3);

	# osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
	# osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
	# osm = new L.TileLayer(osmUrl,
  #   minZoom: 1
  #   maxZoom: 21
  #   attribution: osmAttrib
  # ).addTo(map)

  get_icon = (iso) ->
    if iso != 'nz'
      url = "http://www.geonames.org/flags/x/#{iso}.gif"
    else
      url = "../lockwood.png"
    flag_icon = L.icon(
      iconUrl: url
      iconSize: [35, 20]
    )
    return flag_icon

  onEachFeature = (feature, layer) ->
    cc = feature.properties.iso_a2.toLowerCase()
    layer.bindPopup("http://www.geonames.org/flags/x/#{cc}.gif")
    flag_location = turf.centroid(feature).geometry.coordinates
    if !flag_location?
      return
    if cc == 'nz'
      flag_location[0] += 23
    flag_icon = get_icon(cc)
    L.marker([flag_location[1], flag_location[0]],
      icon: flag_icon
      opacity: 1
    ).addTo(map)

  L.geoJson(json,
    onEachFeature: onEachFeature
    color: 'black'
    fillColor: 'grey'
    fillOpacity: 0.7
    clickable: false
    weight: 1
  ).addTo(map);
)
