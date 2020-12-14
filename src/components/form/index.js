/* global WebsyDesigns FormData grecaptcha ENVIRONMENT GlobalPubSub */ 
class WebsyForm {
  constructor (elementId, options) {
    const defaults = {
      submit: { text: 'Save', classes: '' },
      clearAfterSave: false,
      fields: [],
      onSuccess: function (data) {},
      onError: function (err) { console.log('Error submitting form data:', err) }
    }
    GlobalPubSub.subscribe('recaptchaready', this.recaptchaReady.bind(this))
    this.recaptchaResult = null
    this.options = Object.assign(defaults, {}, {
      // defaults go here
    }, options)
    if (!elementId) {
      console.log('No element Id provided')
      return
    }
    this.apiService = new WebsyDesigns.APIService('')
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
  checkRecaptcha () {
    return new Promise((resolve, reject) => {
      if (this.options.useRecaptcha === true) {
        if (this.recaptchaValue) {        
          this.apiService.add('/google/checkrecaptcha', JSON.stringify({grecaptcharesponse: this.recaptchaValue})).then(response => {
            if (response.success && response.success === true) {
              resolve(true)
            }
            else {
              reject(false)              
            }
          })
        }
        else {
          reject(false)
        }
      }
      else {
        resolve(true)
      }
    })
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
  recaptchaReady () {
    const el = document.getElementById(`${this.elementId}_recaptcha`)
    if (el) {
      grecaptcha.render(`${this.elementId}_recaptcha`, {
        sitekey: ENVIRONMENT.RECAPTCHA_KEY,
        callback: this.validateRecaptcha.bind(this)
      }) 
    }    
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
          <input 
            ${f.required === true ? 'required' : ''} 
            type="${f.type || 'text'}" 
            class="websy-input ${f.classes}" 
            name="${f.field}" 
            placeholder="${f.placeholder || ''}"
            oninvalidx="this.setCustomValidity('${f.invalidMessage || 'Please fill in this field.'}')"
          />
        `
      })
      html += `          
        </form>
      `
      if (this.options.useRecaptcha === true) {
        html += `
          <div id='${this.elementId}_recaptcha'></div>
        ` 
      }      
      html += `
        <button class="websy-btn submit ${this.options.submit.classes}">${this.options.submit.text || 'Save'}</button>
      `
      el.innerHTML = html
      if (this.options.useRecaptcha === true && typeof grecaptcha !== 'undefined') {
        this.recaptchaReady()
      }
    }
  }
  submitForm () {
    const formEl = document.getElementById(`${this.elementId}Form`)
    if (formEl.reportValidity() === true) {  
      this.checkRecaptcha().then(result => {
        if (result === true) {
          const formData = new FormData(formEl)
          const data = {}
          const temp = new FormData(formEl)
          temp.forEach((value, key) => {
            data[key] = value
          })  
          this.apiService.add(this.options.url, data).then(result => {
            if (this.options.clearAfterSave === true) {
              // this.render()
              formEl.reset()
            }
            this.options.onSuccess.call(this, result)
          }, err => {
            console.log('Error submitting form data:', err)
            this.options.onError.call(this, err)
          }) 
        }
        else {
          console.log('bad recaptcha')
        }        
      })         
    }    
  }
  validateRecaptcha (token) {
    this.recaptchaValue = token
  }
}
