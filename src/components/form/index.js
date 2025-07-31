/* global WebsyDesigns FormData grecaptcha ENVIRONMENT GlobalPubSub */ 
class WebsyForm {
  constructor (elementId, options) {
    const defaults = {
      submit: { text: 'Save', classes: [] },
      useRecaptcha: false,
      recaptchaAction: 'submit',
      clearAfterSave: false,
      fields: [],
      mode: 'add',
      useLoader: false,
      onSuccess: function (data) {},
      onError: function (err) { console.log('Error submitting form data:', err) }
    }
    GlobalPubSub.subscribe('recaptchaready', this.recaptchaReady.bind(this))
    this.recaptchaResult = null
    this.options = Object.assign({}, defaults, options)
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
      el.addEventListener('change', this.handleChange.bind(this))
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('beforeinput', this.handleBeforeInput.bind(this))
      el.addEventListener('input', this.handleInput.bind(this))
      el.addEventListener('focusout', this.handleFocusOut.bind(this))
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
    this.loader.hide()
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
      else if (this.options.useRecaptchaV3 === true) {
        grecaptcha.ready(() => {
          grecaptcha.execute(ENVIRONMENT.RECAPTCHA_KEY, { action: this.options.recaptchaAction }).then(token => {
            this.apiService.add('google/checkrecaptcha', {grecaptcharesponse: token}).then(response => {
              if (response.success && response.success === true) {
                resolve(true)
                grecaptcha.reset(`${this.elementId}_recaptcha`, {sitekey: ENVIRONMENT.RECAPTCHA_KEY})
              }
              else {
                resolve(false)              
              }            
            })
          }, err => {
            console.log(err)
          })
        })
      }
      else {
        resolve(true)
      }
    })
  }
  clear () {
    const formEl = document.getElementById(`${this.elementId}Form`)    
    formEl.reset()
    if (!this.options.fields) {
      this.options.fields = []
    }    
    this.options.fields.forEach(f => {        
      this.setValue(f.field, '')        
    })      
    this.loader.hide()
  }
  get data () {
    const formEl = document.getElementById(`${this.elementId}Form`)    
    const data = {}
    const temp = new FormData(formEl)
    temp.forEach((value, key) => {
      if (this.fieldMap[key] && this.fieldMap[key].type === 'checkbox') {
        data[key] = true
      }
      if (this.fieldMap[key] && this.fieldMap[key].instance && this.fieldMap[key].instance.value) {
        data[key] = this.fieldMap[key].instance.value
      }
      else {
        data[key] = value
      }
    })
    let keys = Object.keys(data)
    for (const key in this.fieldMap) {
      if (keys.indexOf(key) === -1) {
        if (this.fieldMap[key] && this.fieldMap[key].type === 'checkbox') {
          data[key] = false
        }
        else if (this.fieldMap[key] && (this.fieldMap[key].component === 'Switch' || this.fieldMap[key].component === 'WebsySwitch')) {
          data[key] = this.fieldMap[key].instance.options.enabled
        }
        else if (this.fieldMap[key] && this.fieldMap[key].instance && this.fieldMap[key].instance.value) {
          data[key] = this.fieldMap[key].instance.value
        }
      }
    }
    return data
  }
  set data (d) {
    if (!this.options.fields) {
      this.options.fields = []
    }
    for (let key in d) {      
      this.options.fields.forEach(f => {        
        if (f.field === key && d[key]) {
          this.setValue(key, d[key])
        //   f.value = d[key]
        //   const el = document.getElementById(`${this.elementId}_input_${f.field}`)
        //   if (el) {
        //     el.value = f.value 
        //   }          
        }
      })      
    }
    // this.render()
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
  handleChange (event) {
    if (event.target.getAttribute('data-user-type') === 'expiry') {
      if (event.target.value.length === 7) {
        let value = event.target.value.split('/')
        event.target.value = `${value[0]}/${value[1].substring(2, 4)}`
      }
    }
    if (event.target.classList.contains('websy-input')) {
      let index = event.target.getAttribute('data-index')
      if (this.options.fields[index] && (this.options.fields[index].required || this.options.fields[index].validate)) {
        this.validateField(this.options.fields[index], event.target.value)
      }    
      if (this.options.fields[index].onChange) {
        this.options.fields[index].onChange({
          value: event.target.value, 
          field: this.options.fields[index],
          form: this,
          index
        })
      }  
    }
  }
  handleClick (event) {    
    if (event.target.classList.contains('submit')) {
      event.preventDefault()
      event.stopPropagation()
      this.submitForm()
    }
    else if (event.target.classList.contains('cancel')) {
      event.preventDefault()
      this.cancelForm()
    }
  }
  handleFocusOut (event) {
    if (event.target.classList.contains('websy-input')) {
      let index = event.target.getAttribute('data-index')
      if (this.options.fields[index] && (this.options.fields[index].required || this.options.fields[index].validate)) {
        this.validateField(this.options.fields[index], event.target.value)
      }
      if (this.options.fields[index].onLeave) {
        this.options.fields[index].onLeave({
          value: event.target.value, 
          field: this.options.fields[index],
          form: this,
          index
        })
      }
    }
  }
  handleKeyDown (event) {
    if (event.key === 'enter' && this.options.submitOnEnter === true) {
      this.submitForm()
    }
    // if (event.target.getAttribute('data-user-type') === 'expiry') {
    //   let isNumeric = !isNaN(event.key)
    //   let validKey = false
    //   if (!validKey) {
    //     validKey = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab'].indexOf(event.key) !== -1
    //   }
    //   if ((event.target.value.length === 5 && !validKey) || (!validKey && !isNumeric)) {
    //     event.preventDefault()
    //     return false
    //   }
    //   if (event.key === 'Backspace') {
    //     if (event.target.value.indexOf('/') === event.target.selectionStart - 1) {
    //       let chars = event.target.value.split('')
    //       chars.pop()
    //       event.target.value = chars.join('')
    //     }
    //   }
    // }
    // if (event.target.getAttribute('data-user-type') === 'cvv') {
    //   let isNumeric = !isNaN(event.key)
    //   let validKey = false
    //   if (!validKey) {
    //     validKey = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab'].indexOf(event.key) !== -1
    //   }
    //   if ((event.target.value.length === 3 && !validKey) || (!validKey && !isNumeric)) {
    //     event.preventDefault()
    //     return false
    //   }
    // }
  }
  handleKeyUp (event) {
    // if (event.target.getAttribute('data-user-type') === 'expiry') {
    //   let chars = event.target.value.split('')
    //   let isNumeric = !isNaN(event.key)
    //   if (event.key === 'Backspace') {
    //     if (chars[chars.length - 1] === '/' && chars.length !== 3) {
    //       chars.pop()
    //       event.target.value = chars.join('')
    //       return 
    //     }    
    //   }
    //   if (event.target.selectionStart === 2) {      
    //     if (chars[2] && ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'].indexOf(event.key) === -1) {
    //       event.target.setSelectionRange(3, 3)
    //     }
    //     else if (isNumeric) {
    //       event.target.value += '/'
    //     }
    //   }
    // }
  }
  handleBeforeInput (event) {
    if (event.target.getAttribute('data-user-type') === 'expiry') {
      let isNumeric = !isNaN(+event.data)
      let validKey = false
      if (!validKey) {
        validKey = ['deleteContentBackward', 'deleteContentForward'].indexOf(event.inputType) !== -1
      }
      if ((event.target.value.length === 5 && !validKey) || (!validKey && !isNumeric)) {
        event.preventDefault()
        return false
      }
      if (event.inputType === 'deleteContentBackward') {
        if (event.target.value.indexOf('/') === event.target.selectionStart - 1) {
          let chars = event.target.value.split('')
          chars.pop()
          event.target.value = chars.join('')
        }
      }
    }
    if (event.target.getAttribute('data-user-type') === 'cvv') {
      let isNumeric = !isNaN(+event.data)
      let validKey = false
      if (!validKey) {
        validKey = ['deleteContentBackward', 'deleteContentForward'].indexOf(event.inputType) !== -1
      }
      if ((event.target.value.length === 3 && !validKey) || (!validKey && !isNumeric)) {
        event.preventDefault()
        return false
      }
    }
  }
  handleInput (event) {
    if (event.target.getAttribute('data-user-type') === 'expiry') {
      let chars = event.target.value.split('')
      let isNumeric = !isNaN(+event.data)
      if (event.key === 'Backspace') {
        if (chars[chars.length - 1] === '/' && chars.length !== 3) {
          chars.pop()
          event.target.value = chars.join('')
          return 
        }    
      }
      if (event.target.selectionStart === 2) {      
        if (chars[2] && ['deleteContentBackward', 'deleteContentForward'].indexOf(event.inputType) === -1) {
          event.target.setSelectionRange(3, 3)
        }
        else if (isNumeric) {
          event.target.value += '/'
        }
      }
    }
  }
  processComponents (components, callbackFn) {
    if (components.length === 0) {
      callbackFn()
    }
    else {
      components.forEach(c => {
        if (typeof WebsyDesigns[c.component] !== 'undefined') {
          if (!c.options.onChange) {
            c.options.onChange = () => {
              if (c.required || c.validate) {
                this.validateField(c, c.instance.value)
              }
            }
          }
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
        <form id="${this.elementId}Form" class="websy-form ${(this.options.classes || []).join(' ')}">
      `
      this.options.fields.forEach((f, i) => {
        this.fieldMap[f.field] = f
        f.owningElement = this.elementId
        let inputValue = typeof f.value === 'function' ? f.value() : f.value
        if (f.disabled || f.readOnly || this.options.readOnly) {
          if (!f.options) {
            f.options = {}
          }
          f.disabled = true
          f.options.disabled = true
          if (!f.classes) {
            f.classes = []
          }
          if (!f.options.classes) {
            f.options.classes = []
          }
          f.classes.push('disabled')
          f.options.classes.push('disabled')
          if (f.readOnly || this.options.readOnly) {            
            f.classes.push('websy-input-readonly')
            f.options.classes.push('websy-input-readonly')
          }
        }
        if (f.component) {
          componentsToProcess.push(f)
          html += `
            ${i > 0 ? '-->' : ''}<div id='${this.elementId}_${f.field}_inputContainer' style='${f.style || ''}' class='websy-input-container ${f.classes ? f.classes.join(' ') : ''} ${f.component === 'MediaUpload' ? 'media-upload' : ''}'>
              ${f.label ? `<label for="${f.field}">${f.label}</label>` : ''}${f.required === true ? '<span class="websy-form-required-value">*</span>' : ''}
              <div id='${this.elementId}_input_${f.field}_component' class='form-component'></div>
              <span id='${this.elementId}_${f.field}_error' class='websy-form-validation-error'></span>
            </div><!--
          `
        }
        else if (f.type === 'longtext') {
          html += `
            ${i > 0 ? '-->' : ''}<div id='${this.elementId}_${f.field}_inputContainer' style='${f.style || ''}' class='websy-input-container ${f.classes ? f.classes.join(' ') : ''}'>
              ${f.label ? `<label for="${f.field}">${f.label}</label>` : ''}${f.required === true ? '<span class="websy-form-required-value">*</span>' : ''}
              <textarea
                id="${this.elementId}_input_${f.field}"
                ${f.required === true ? 'required' : ''} 
                placeholder="${f.placeholder || ''}"
                data-user-type="${f.type}"
                data-index="${i}"
                name="${f.field}" 
                ${f.disabled || f.readOnly || this.options.readOnly ? 'disabled' : ''}
                ${(f.attributes || []).join(' ')}
                class="websy-input websy-textarea ${f.readOnly || this.options.readOnly ? 'websy-input-readonly' : ''}"
              >${inputValue || ''}</textarea>
              <span id='${this.elementId}_${f.field}_error' class='websy-form-validation-error'></span>
            </div><!--
          ` 
        }
        else {
          html += `
            ${i > 0 ? '-->' : ''}<div id='${this.elementId}_${f.field}_inputContainer' style='${f.style || ''}' class='websy-input-container ${f.classes ? f.classes.join(' ') : ''}'>
              ${f.label ? `<label for="${f.field}">${f.label}</label>` : ''}${f.required === true ? '<span class="websy-form-required-value">*</span>' : ''}
              <input 
                id="${this.elementId}_input_${f.field}"
                ${f.required === true ? 'required' : ''} 
                type="${(f.type === 'expiry' ? 'text' : f.type === 'cvv' ? 'number' : f.type) || 'text'}" 
                data-user-type="${f.type}"
                data-index="${i}"
                class="websy-input ${f.readOnly || this.options.readOnly ? 'websy-input-readonly' : ''}" 
                ${(f.attributes || []).join(' ')}
                name="${f.field}" 
                placeholder="${f.placeholder || ''}"
                value="${f.type === 'date' ? '' : inputValue || ''}"
                valueAsDate="${f.type === 'date' ? inputValue : ''}"
                ${f.disabled || f.readOnly || this.options.readOnly ? 'disabled' : ''}
                oninvalidx="this.setCustomValidity('${f.invalidMessage || 'Please fill in this field.'}')"
              />
              <span id='${this.elementId}_${f.field}_error' class='websy-form-validation-error'></span>
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
      if (!this.options.readOnly) {
        html += `
          --><button class="websy-btn submit ${this.options.submit.classes ? this.options.submit.classes.join(' ') : ''}">${this.options.submit.text || 'Save'}</button>${this.options.cancel ? '<!--' : ''}
        `
      }
      else {
        html += `-->`
      }
      if (this.options.cancel) {
        html += `
          --><button class="websy-btn cancel ${this.options.cancel.classes ? this.options.cancel.classes.join(' ') : ''}">${this.options.cancel.text || 'Cancel'}</button>
        `
      }
      html += `          
        </form>
        <div id="${this.elementId}_validationFail" class="websy-validation-failure"></div>
        <div id="${this.elementId}_loader" class=""></div>
      `
      el.innerHTML = html
      if (!this.loader) {
        this.loader = new WebsyDesigns.LoadingDialog(`${this.elementId}_loader`, { title: '&nbsp;' })
      }
      this.processComponents(componentsToProcess, () => {
        if ((this.options.useRecaptcha === true || this.options.useRecaptchaV3 === true) && typeof grecaptcha !== 'undefined') {
          this.recaptchaReady()
        }
      })      
    }
  }
  setValue (field, value) {
    if (this.fieldMap[field]) {
      if (this.fieldMap[field].instance) {
        this.fieldMap[field].instance.value = value
      }
      else {
        const el = document.getElementById(`${this.elementId}_input_${field}`)
        if (el) {
          el.value = value
          el.setAttribute('value', value)
          if (this.fieldMap[field].type === 'checkbox') {
            el.checked = value
          }
          if (this.fieldMap[field].type === 'date') {
            el.valueAsDate = value
          }
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
    if (this.options.preSubmitFn && this.options.preSubmitFn() === false) {
      return
    }
    if (this.validateForm() === true) {  
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
          if (this.options.useLoader) {
            this.loader.show()
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
              this.loader.hide()          
              if (this.options.clearAfterSave === true) {
                // this.render()
                formEl.reset()
              }
            }, () => {              
              this.loader.hide()          
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
          if (this.options.submitErr) {
            this.options.submitErr()
          }
        }        
      })         
    }    
  }
  validateForm () {
    let valid = true
    let data = this.data
    for (let i = 0; i < this.options.fields.length; i++) {
      if (this.options.fields[i].required || this.options.fields[i].validate) { 
        if (this.validateField(this.options.fields[i], data[this.options.fields[i].field]) === false) {
          valid = false
        }
      }      
    }
    return valid
  }
  validateField (field, value) {
    const inputContainerEl = document.getElementById(`${this.elementId}_${field.field}_inputContainer`)
    const errorEl = document.getElementById(`${this.elementId}_${field.field}_error`)
    if (field.required) {
      let valid = true
      if (field.component && field.instance && field.instance.value) {
        valid = field.instance.value.length > 0
      }      
      else {
        valid = !(typeof value === 'undefined' || value === '')
      }
      if (!valid) {
        if (errorEl) {
          errorEl.innerHTML = field.invalidMessage || 'A value is required'
        }
        if (inputContainerEl) {
          inputContainerEl.classList.add('websy-form-input-has-error')
        }
        return false
      }      
    }
    if (field.validate) {
      let valid = field.validate(field, value)
      if (!valid) {
        if (errorEl) {
          errorEl.innerHTML = field.invalidMessage || 'A value is required'
        }
        if (inputContainerEl) {
          inputContainerEl.classList.add('websy-form-input-has-error')
        }
        return false
      }
    }
    if (errorEl) {
      errorEl.innerHTML = ''
    }
    if (inputContainerEl) {
      inputContainerEl.classList.remove('websy-form-input-has-error')
    }
    return true
  } 
  validateRecaptcha (token) {
    this.recaptchaValue = token
  }
}
