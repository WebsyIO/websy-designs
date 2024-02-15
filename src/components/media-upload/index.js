/*
  global
  FormData
  FileReader
  Image
*/ 
class MediaUpload {
  constructor (elementId, options) {
    const defaults = {
      allowMultiple: false,
      createThumbnail: false,
      thumbSize: 300,
      supportedTypes: ['image/png', 'image/jpg']
    }    
    this.media = []
    this.options = Object.assign({}, defaults, options)
    this.elementId = elementId
    if (!elementId) {
      console.log('No element Id provided')
      return
    }
    const el = document.getElementById(elementId)    
    if (el) {
      el.addEventListener('change', this.handleChange.bind(this))
      el.innerHTML = `
        <div class='websy-upload-form-container'>
          <span>Drag and drop a file or click to browse.</span>
          <form id="${this.elementId}_form" enctype="multipart/form-data">            
              <input id="${this.elementId}_file" type="file"  name="${this.options.name || 'media'}" accept="${this.options.supportedTypes.join(' ')}" multiple>
          </form>
        </div>
        <div id='${this.elementId}_uploaded' class='websy-uploaded-media'></div>        
      `
      this.render()
    }
  }
  set data (d = []) {
    if (Array.isArray(d)) {
      this.media = d
    }
    else {
      this.media = [d]
    }
    this.render()
  }
  get data () {
    return this.media
  }
  createHtml (count) {
    let html = ''
    for (let i = 0; i < count; i++) {
      html += `
        <div>
          <img id='${this.elementId}_media_${i}'/>
        </div>   
      `
    }
    return html
  }
  getForm () {
    let formFound = false
    let el = document.getElementById(`${this.elementId}_file`)
    if (el) {
      while (formFound === false && el.tagName !== 'BODY') {
        el = el.parentElement
        if (el.tagName === 'FORM') {
          formFound = true
          return el
        }
      }
    }
    return null
  }
  handleChange (event) {
    this.fileList = []
    let uploadForm = document.getElementById(`${this.elementId}_form`)
    if (!uploadForm) {
      uploadForm = this.getForm()
    }
    if (!uploadForm) {
      console.error(`The element ${this.elementId}_file does not belong to a form.`)
      return
    }
    const formData = new FormData(uploadForm)    
    const html = this.createHtml(formData.length)  
    formData.forEach((value, key) => {
      if (key === (this.options.name || 'media')) {
        this.fileList.push({ name: key, file: value })
      }
    })
    const resultEl = document.getElementById(`${this.elementId}_uploaded`)
    resultEl.innerHTML = html
    this.uploadItem(0, this.fileList)
  }
  render () {
    if (this.media.length > 0) {      
      const resultEl = document.getElementById(`${this.elementId}_uploaded`)    
      resultEl.innerHTML = this.createHtml(this.media.length)
      this.media.forEach((m, i) => {
        const imgEl = document.getElementById(`${this.elementId}_media_${i}`)
        imgEl.setAttribute('src', `data:${m.type};base64,` + m.data)
      })
    }
  }
  uploadItem (index, items, callbackFn) {
    if (!items[index]) {
      callbackFn()
    }
    else {
      const r = new FileReader()
      const mediaData = {
        type: items[index].file.type,
        name: items[index].file.name,
        size: items[index].file.size
      }
      r.onloadend = () => {
        let imgCanvas = document.createElement('canvas')
        let imgContext = imgCanvas.getContext('2d')
        let thumbCanvas = document.createElement('canvas')
        let thumbContext = thumbCanvas.getContext('2d')
        let img = new Image()
        img.onload = () => {
          let width = img.width
          let height = img.height
          if (this.options.resize === true && this.options.imgSize) {
            let ratio = 1
            if (width > height) {
              ratio = width / height            
              width = this.options.imgSize
              height = this.options.imgSize / ratio                      
            }
            else if (height > width) {
              ratio = height / width            
              width = this.options.imgSize / ratio
              height = this.options.imgSize          
            } 
          }
          const fullResEl = document.getElementById(`${this.elementId}_media_${index}_fullres`)
          if (fullResEl) {
            fullResEl.innerHTML = `${width} x ${height}`
          }   
          imgCanvas.width = width
          imgCanvas.height = height          
          imgContext.drawImage(img, 0, 0, width, height)
          let ratio = 1                 
          if (width > height) {
            ratio = width / height            
            thumbCanvas.width = this.options.thumbSize
            thumbCanvas.height = this.options.thumbSize / ratio                      
          }
          else if (height > width) {
            ratio = height / width            
            thumbCanvas.width = this.options.thumbSize / ratio
            thumbCanvas.height = this.options.thumbSize          
          }          
          thumbContext.drawImage(img, 0, 0, thumbCanvas.width, thumbCanvas.height)
          mediaData.name = items[index].name
          mediaData.fullWidth = imgCanvas.width
          mediaData.fullHeight = imgCanvas.height
          mediaData.thumbWidth = thumbCanvas.width
          mediaData.thumbHeight = thumbCanvas.height
          mediaData.data = imgCanvas.toDataURL(mediaData.type).replace(/^data:image\/(png|jpg);base64,/, '')
          mediaData.thumbData = thumbCanvas.toDataURL(mediaData.type).replace(/^data:image\/(png|jpg);base64,/, '')
          this.media.push(mediaData)
          const imgEl = document.getElementById(`${this.elementId}_media_${index}`)
          imgEl.setAttribute('src', imgCanvas.toDataURL(mediaData.type))              
          this.uploadItem(++index, items, callbackFn)
        }
        img.src = r.result
      }
      r.readAsDataURL(items[index].file)
    }
  }
}
