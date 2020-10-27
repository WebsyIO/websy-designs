/* global WebsyDesigns FormData */ 
class WebsyForm {
  constructor (elementId, options) {
    const defaults = {
      submit: { text: 'Save', classes: '' },
      clearAfterSave: false,
      fields: []
    }
    this.options = Object.assign(defaults, {}, {
      // defaults go here
    }, options)
    if (!elementId) {
      console.log('No element Id provided')
      return
    }
    this.apiService = new WebsyDesigns.APIService(this.options.url)
    this.elementId = elementId
    const el = document.getElementById(elementId)
    if (el) {
      if (this.options.classes) {
        this.options.classes.forEach(c => el.classList.add(c))
      }
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('keyup', this.handleKeyUp.bind(this))
      el.addEventListener('keydown', this.handleKeyDown.bind(this))
      this.render()
    }
  }
  handleClick (event) {
    if (event.target.classList.contains('submit')) {
      this.submitForm()
    }
  }
  handleKeyDown (event) {
    if (event.key === 'enter') {
      this.submitForm()
    }
  }
  handleKeyUp (event) {

  }
  render () {
    const el = document.getElementById(this.elementId)
    if (el) {
      let html = `
        <form id="${this.elementId}Form">
      `
      this.options.fields.forEach(f => {
        html += `
          ${f.label ? `<label for="${f.field}">${f.label}</label>` : ''}
          <input class="websy-input ${f.classes}" name="${f.field}" placeholder="${f.placeholder || ''}"/>
        `
      })
      html += `          
        </form>
        <button class="websy-btn submit ${this.options.submit.classes}">${this.options.submit.text || 'Save'}</button>
      `
      el.innerHTML = html
    }
  }
  submitForm () {
    const formEl = document.getElementById(`${this.elementId}Form`)
    const formData = new FormData(formEl)
    const data = {}
    const temp = new FormData(formEl)
    temp.forEach((value, key) => {
      data[key] = value
    })  
    this.apiService.add('', data).then(result => {
      if (this.options.clearAfterSave === true) {
        this.render()
      }
    }, err => console.log(err))
  }
}
