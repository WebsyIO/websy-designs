/* global d3 L WebsyDesigns */ 
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
      legendPosition: 'bottom',
      colors: ['#5e4fa2', '#3288bd', '#66c2a5', '#abdda4', '#e6f598', '#fee08b', '#fdae61', '#f46d43', '#d53e4f', '#9e0142']
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    this._isRendered = false
    if (!elementId) {
      console.log('No element Id provided for Websy Map')		
      return
    }
    const mapOptions = Object.assign({}, options.mapOptions)
    mapOptions.click = this.handleMapClick.bind(this)    
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
        // console.error('d3 library has not been loaded')
      }
      if (typeof L === 'undefined') {
        console.error('Leaflet library has not been loaded')
      }
      el.innerHTML = `
        <div id="${this.elementId}_map"></div>
        <div id="${this.elementId}_legend" class="websy-map-legend"></div>
      `
      el.addEventListener('click', this.handleClick.bind(this))
      this.legend = new WebsyDesigns.Legend(`${this.elementId}_legend`, {})
      this.map = L.map(`${this.elementId}_map`, mapOptions)
      this.render()
    }
  }
  get isRendered () {
    return this._isRendered
  }
  handleClick (event) {

  }
  handleMapClick (event) {

  }
  render () {
    this._isRendered = false
    const mapEl = document.getElementById(`${this.elementId}_map`)
    const legendEl = document.getElementById(`${this.elementId}_map`)
    if (this.options.showLegend === true && this.options.data.polygons) {            
      let legendData = this.options.data.polygons.map((s, i) => ({value: s.label || s.key, color: s.color || this.options.colors[i % this.options.colors.length]})) 
      let longestValue = legendData.map(s => s.value).reduce((a, b) => a.length > b.length ? a : b)
      if (this.options.legendPosition === 'top' || this.options.legendPosition === 'bottom') {
        legendEl.style.width = '100%'
      }
      if (this.options.legendPosition === 'left' || this.options.legendPosition === 'right') {
        legendEl.style.height = '100%'
        legendEl.style.width = this.legend.testWidth(longestValue) + 'px'
      }
      this.legend.data = legendData
      let legendSize = this.legend.getSize()
      mapEl.style.position = 'relative'
      if (this.options.legendPosition === 'top') {      
        legendEl.style.top = 0
        legendEl.style.bottom = 'unset'
        mapEl.style.top = legendSize.height
        mapEl.style.height = `calc(100% - ${legendSize.height}px)`
      }
      if (this.options.legendPosition === 'bottom') {      
        legendEl.style.top = 'unset'
        legendEl.style.bottom = 0      
        mapEl.style.height = `calc(100% - ${legendSize.height}px)`
      }
      if (this.options.legendPosition === 'left') {      
        legendEl.style.left = 0
        legendEl.style.right = 'unset'
        legendEl.style.top = 0
        mapEl.style.left = `${legendSize.width}px`
        mapEl.style.width = `calc(100% - ${legendSize.width}px)`
      }
      if (this.options.legendPosition === 'right') {      
        legendEl.style.left = 'unset'
        legendEl.style.right = 0
        legendEl.style.top = 0
        mapEl.style.width = `calc(100% - ${legendSize.width}px)`
      } 
    }
    else {
      mapEl.style.width = '100%'
      mapEl.style.height = '100%'
    }
    const t = L.tileLayer(this.options.tileUrl, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)
    if (this.geo) {
      this.map.removeLayer(this.geo)
    }
    if (this.polygons) {
      this.polygons.forEach(p => this.map.removeLayer(p))
    }
    this.polygons = []
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
        this.polygons.push(pol)
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
      const b = this.geo.getBounds()
      if (b.isValid()) {        
        this.map.fitBounds(this.geo.getBounds())
      }
    }
    else if (this.polygons) {
      // this.map.fitBounds(this.geo.getBounds())
    }
    else if (this.options.center) {
      this.map.setView(this.options.center, this.options.zoom || null)
    }
    this._isRendered = true
  }
}
