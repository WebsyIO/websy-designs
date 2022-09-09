/* global WebsyDesigns FormData grecaptcha ENVIRONMENT GlobalPubSub */ 
class WebsyForm {
  constructor (elementId, options) {
    const defaults = {
      submit: { text: 'Save', classes: '' },
      useRecaptcha: false,
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
      // if (this.options.classes) {
      //   this.options.classes.forEach(c => el.classList.add(c))
      // }
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('keyup', this.handleKeyUp.bind(this))
      el.addEventListener('keydown', this.handleKeyDown.bind(this))
      this.render()
    }
  }
  cancelForm () {
    const formEl = document.getElementById(`${this.elementId}Form`)
    formEl.reset()
    if (this.options.cancelFn) {
      this.options.cancelFn(this.elementId)
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
  set data (d) {
    if (!this.options.fields) {
      this.options.fields = []
    }
    for (let key in d) {      
      this.options.fields.forEach(f => {
        if (f.field === key) {
          f.value = d[key]
          const el = document.getElementById(`${this.elementId}_input_${f.field}`)
          el.value = f.value
        }
      })      
    }
    this.render()
  }
  confirmValidation () {
    const el = document.getElementById(`${this.elementId}_validationFail`)
    if (el) {
      el.innerHTML = ''
    }
  }
  failValidation (msg) {
    const el = document.getElementById(`${this.elementId}_validationFail`)
    if (el) {
      el.innerHTML = msg
    }
  }
  handleClick (event) {    
    if (event.target.classList.contains('submit')) {
      event.preventDefault()
      this.submitForm()
    }
    else if (event.target.classList.contains('cancel')) {
      event.preventDefault()
      this.cancelForm()
    }
  }
  handleKeyDown (event) {
    if (event.key === 'enter') {
      this.submitForm()
    }
  }
  handleKeyUp (event) {

  }
  processComponents (components, callbackFn) {
    if (components.length === 0) {
      callbackFn()
    }
    else {
      components.forEach(c => {
        if (typeof WebsyDesigns[c.component] !== 'undefined') {
          c.instance = new WebsyDesigns[c.component](`${this.elementId}_input_${c.field}_component`, c.options)
        }
        else {
          // some user feedback here
        }
      })
    }
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
  render (update, data) {
    const el = document.getElementById(this.elementId)
    let componentsToProcess = []
    if (el) {      
      let html = `
        <form id="${this.elementId}Form" class="websy-form ${this.options.classes || ''}">
      `
      this.options.fields.forEach((f, i) => {
        if (f.component) {
          componentsToProcess.push(f)
          html += `
            ${i > 0 ? '-->' : ''}<div class='${f.classes || ''}'>
              ${f.label ? `<label for="${f.field}">${f.label}</label>` : ''}
              <div id='${this.elementId}_input_${f.field}_component' class='form-component'></div>
            </div><!--
          `
        }
        else if (f.type === 'longtext') {
          html += `
            ${i > 0 ? '-->' : ''}<div class='${f.classes || ''}'>
              ${f.label ? `<label for="${f.field}">${f.label}</label>` : ''}
              <textarea
                id="${this.elementId}_input_${f.field}"
                ${f.required === true ? 'required' : ''} 
                placeholder="${f.placeholder || ''}"
                name="${f.field}" 
                class="websy-input websy-textarea"
              ></textarea>
            </div><!--
          ` 
        }
        else {
          html += `
            ${i > 0 ? '-->' : ''}<div class='${f.classes || ''}'>
              ${f.label ? `<label for="${f.field}">${f.label}</label>` : ''}
              <input 
                id="${this.elementId}_input_${f.field}"
                ${f.required === true ? 'required' : ''} 
                type="${f.type || 'text'}" 
                class="websy-input" 
                name="${f.field}" 
                placeholder="${f.placeholder || ''}"
                value="${f.value || ''}"
                valueAsDate="${f.type === 'date' ? f.value : ''}"
                oninvalidx="this.setCustomValidity('${f.invalidMessage || 'Please fill in this field.'}')"
              />
            </div><!--
          `
        }        
      })
      html += `
        --><button class="websy-btn submit ${this.options.submit.classes || ''}">${this.options.submit.text || 'Save'}</button>${this.options.cancel ? '<!--' : ''}
      `
      if (this.options.cancel) {
        html += `
          --><button class="websy-btn cancel ${this.options.cancel.classes || ''}">${this.options.cancel.text || 'Cancel'}</button>
        `
      }
      html += `          
        </form>
        <div id="${this.elementId}_validationFail" class="websy-validation-failure"></div>
      `
      if (this.options.useRecaptcha === true) {
        html += `
          <div id='${this.elementId}_recaptcha'></div>
        ` 
      }      
      el.innerHTML = html
      this.processComponents(componentsToProcess, () => {
        if (this.options.useRecaptcha === true && typeof grecaptcha !== 'undefined') {
          this.recaptchaReady()
        }
      })      
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
          if (this.options.url) {
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
          else if (this.options.submitFn) {
            this.options.submitFn(data, () => {
              if (this.options.clearAfterSave === true) {
                // this.render()
                formEl.reset()
              }
            })            
          }          
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
