/* global WebsyDesigns FormData grecaptcha ENVIRONMENT GlobalPubSub */ 
class WebsyForm {
  constructor (elementId, options) {
    const defaults = {
      submit: { text: 'Save', classes: '' },
      useRecaptcha: false,
      clearAfterSave: false,
      fields: [],
      mode: 'add',
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
    this.fieldMap = {}
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
        // grecaptcha.ready(() => {
          // grecaptcha.execute(this.recaptchaValue, { action: 'submit' }).then(token => {
          this.apiService.add('google/checkrecaptcha', {grecaptcharesponse: this.recaptchaValue}).then(response => {
            if (response.success && response.success === true) {
              resolve(true)
              grecaptcha.reset(`${this.elementId}_recaptcha`, {sitekey: ENVIRONMENT.RECAPTCHA_KEY})
            }
            else {
              resolve(false)              
            }            
          })
          // }, err => {
          //   reject(err)
          // })
        // })
        }
        else {
          resolve(false)
        }
      }
      else {
        resolve(true)
      }
    })
  }
  get data () {
    const formEl = document.getElementById(`${this.elementId}Form`)    
    const data = {}
    const temp = new FormData(formEl)
    temp.forEach((value, key) => {
      data[key] = value
    })
    return data
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
      grecaptcha.ready(() => {
        grecaptcha.render(`${this.elementId}_recaptcha`, {
          sitekey: ENVIRONMENT.RECAPTCHA_KEY,
          callback: this.validateRecaptcha.bind(this)
        }) 
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
        this.fieldMap[f.field] = f
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
                ${(f.attributes || []).join(' ')}
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
                ${(f.attributes || []).join(' ')}
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
      if (this.options.useRecaptcha === true) {
        html += `
          --><div id='${this.elementId}_recaptcha' data-sitekey='${ENVIRONMENT.RECAPTCHA_KEY}' class='websy-form-recaptcha'></div>
          <div id='${this.elementId}_recaptchaError' class='websy-alert websy-alert-error websy-hidden'>Invalid recaptcha response</div><!--
        ` 
      } 
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
      el.innerHTML = html
      this.processComponents(componentsToProcess, () => {
        if (this.options.useRecaptcha === true && typeof grecaptcha !== 'undefined') {
          this.recaptchaReady()
        }
      })      
    }
  }
  setValue (field, value) {
    if (this.fieldMap[field]) {
      if (this.fieldMap[field].instance) {
        this.fieldMap[field].instance.setValue(value)
      }
      else {
        const el = document.getElementById(`${this.elementId}_input_${field}`)
        if (el) {
          el.value = value
        }
        else {
          console.error(`Input for ${field} does not exist in form.`)    
        }
      }
    }
    else {
      console.error(`Field ${field} does not exist in form.`)
    }    
  }
  submitForm () {
    const formEl = document.getElementById(`${this.elementId}Form`)
    const buttonEl = formEl.querySelector('button.websy-btn.submit')
    const recaptchErrEl = document.getElementById(`${this.elementId}_recaptchaError`)    
    if (formEl.reportValidity() === true) {  
      if (buttonEl) {
        buttonEl.setAttribute('disabled', true)
      }
      this.checkRecaptcha().then(result => {
        if (buttonEl) {
          buttonEl.removeAttribute('disabled')
        }
        if (result === true) {                    
          if (recaptchErrEl) {
            recaptchErrEl.classList.add('websy-hidden')
          }
          const formData = new FormData(formEl)
          const data = {}
          const temp = new FormData(formEl)
          temp.forEach((value, key) => {
            data[key] = value
          })
          if (this.options.url) {
            let params = [
              this.options.url
            ]
            if (this.options.mode === 'update') {
              params.push(this.options.id)
            }
            params.push(data)
            this.apiService[this.options.mode](...params).then(result => {
              if (this.options.clearAfterSave === true) {
                // this.render()
                formEl.reset()
              }
              buttonEl.removeAttribute('disabled')
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
          if (buttonEl) {
            buttonEl.removeAttribute('disabled')
          }          
          if (recaptchErrEl) {
            recaptchErrEl.classList.remove('websy-hidden')
          }
        }        
      })         
    }    
  }
  validateRecaptcha (token) {
    this.recaptchaValue = token
  }
}
