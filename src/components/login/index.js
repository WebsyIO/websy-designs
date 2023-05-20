/* global WebsyDesigns ENVIRONMENT */ 
class WebsyLogin {
  constructor (elementId, options) {
    const DEFAULTS = {
      loginType: 'email',
      classes: [],
      url: 'auth/login',
      redirectUrl: '/'
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    const el = document.getElementById(this.elementId)
    if (el) {   
      el.innerHTML = `
        <div id="${this.elementId}_error" class="websy-validation-failure"></div>
        <div id="${this.elementId}_container"></div>        
      `   
      const formOptions = {
        useRecaptcha: this.options.useRecaptcha || ENVIRONMENT.useRecaptcha || false,
        submit: {
          text: this.options.buttonText || 'Log in',
          classes: (this.options.buttonClasses || []).join(' ') || ''
        },        
        fields: [          
          {
            label: this.options.loginType === 'email' ? 'Email' : 'Username',
            placeholder: `Enter your ${this.options.loginType === 'email' ? 'email address' : 'Username'}`,
            field: this.options.loginType,
            type: this.options.loginType,
            required: true
          }, 
          {
            label: 'Password',
            placeholder: 'Enter your password',
            field: this.options.passwordField || 'password',
            type: 'password',
            required: true
          } 
        ],
        onSuccess: this.loginSuccess.bind(this),
        onError: this.loginFail.bind(this)
      }
      if (this.options.fields) {
        formOptions.fields = this.options.fields.concat(formOptions.fields)
      }
      this.loginForm = new WebsyDesigns.WebsyForm(`${this.elementId}_container`, Object.assign({}, this.options, formOptions))
    }
    else {
      console.error(`No element with ID ${this.elementId} found for WebsyLogin component.`)
    }
  }  
  loginFail (e) {
    const el = document.getElementById(`${this.elementId}_error`)
    if (el) {
      el.innerHTML = `Incorrect ${this.options.loginType} or password`
    }
  }
  loginSuccess () {
    if (this.options.redirectUrl) {
      window.location.href = this.options.redirectUrl
    }
  }  
}
