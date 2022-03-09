/* global d3 L */ 
class WebsyMap {
  constructor (elementId, options) {
    const DEFAULTS = {
      tileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      disablePan: false,
      disableZoom: false,
      markerSize: 10,
      useClustering: false,
      maxMarkerSize: 50,
      minMarkerSize: 20,
      data: {},
      colors: d3.schemeCategory10
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    if (!elementId) {
      console.log('No element Id provided for Websy Map')		
      return
    }
    const mapOptions = {
      click: this.handleMapClick.bind(this)
    }
    if (this.options.disableZoom === true) {
      mapOptions.scrollWheelZoom = false
      mapOptions.zoomControl = false
    }
    if (this.options.disablePan === true) {
      mapOptions.dragging = false
    }
    const el = document.getElementById(this.elementId)    
    if (el) {
      if (typeof d3 === 'undefined') {
        console.error('d3 library has not been loaded')
      }
      if (typeof L === 'undefined') {
        console.error('Leaflet library has not been loaded')
      }
      el.addEventListener('click', this.handleClick.bind(this))
      this.map = L.map(this.elementId, mapOptions)
      this.render()
    }
  }
  handleClick (event) {

  }
  handleMapClick (event) {

  }
  render () {
    const el = document.getElementById(`${this.options.elementId}_map`)
    
    const t = L.tileLayer(this.options.tileUrl, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)
    if (this.geo) {
      this.map.removeLayer(this.geo)
    }
    if (this.polygons) {
      this.polygons.forEach(p => this.map.removeLayer(p))
    }
    if (this.options.geoJSON) {
      this.geo = L.geoJSON(this.options.geoJSON, {
        style: feature => {
          return {
            color: feature.color || '#ffffff',
            colorOpacity: feature.colorOpacity || 1,
            fillColor: feature.fillColor || '#e6463c',
            fillOpacity: feature.fillOpacity || 0,
            weight: feature.weight || 1
          }
        },
        onEachFeature: (feature, layer) => {
          layer.bindTooltip(feature.tooltip,
            {
              permanent: true, 
              direction: 'center',
              className: feature.tooltipClass || 'websy-polygon-tooltip'
            }
          )
        }
      }).addTo(this.map)
    }
    // this.markers = []        
    // this.data = [] // this.data.filter(d => d.Latitude.qNum !== 0 && d.Longitude.qNum !== 0)    
    // this.data.forEach(r => {
    //   // console.log(r)
    //   if (r.Latitude.qNum !== 0 && r.Longitude.qNum !== 0) {
    //     const markerOptions = {}
    //     if (this.options.simpleMarker === true) {
    //       markerOptions.icon = L.divIcon({className: 'simple-marker'})
    //     }
    //     if (this.options.markerUrl) {
    //       markerOptions.icon = L.icon({iconUrl: this.options.markerUrl})
    //     }
    //     markerOptions.data = r
    //     let m = L.marker([r.Latitude.qText, r.Longitude.qText], markerOptions)
    //     m.on('click', this.handleMapClick.bind(this))
    //     if (this.options.useClustering === false) {
    //       m.addTo(this.map)
    //     }
    //     this.markers.push(m)
    //     if (this.options.useClustering === true) {
    //       this.cluster.addLayer(m)
    //     }
    //   }
    // })
    if (this.options.data.polygons) {
      this.options.data.polygons.forEach((p, i) => {
        if (!p.options) {
          p.options = {}
        }
        if (!p.options.color) {
          p.options.color = this.options.colors[i % this.options.colors.length]
        }
        const pol = L.polygon(p.data.map(c => c.map(d => [d.Latitude, d.Longitude])), p.options).addTo(this.map)
        this.map.fitBounds(pol.getBounds())
      })
    }
    // if (this.data.markers.length > 0) {            
    //   el.classList.remove('hidden')
    //   if (this.options.useClustering === true) {
    //     this.map.addLayer(this.cluster)
    //   }
    //   const g = L.featureGroup(this.markers)
    //   this.map.fitBounds(g.getBounds())
    //   this.map.invalidateSize()
    // }
    if (this.geo) {
      this.map.fitBounds(this.geo.getBounds())
    }
    else if (this.polygons) {
      // this.map.fitBounds(this.geo.getBounds())
    }
    else if (this.options.center) {
      this.map.setView(this.options.center, this.options.zoom || null)
    }
  }
}
