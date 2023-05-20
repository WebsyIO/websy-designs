/* global WebsyDesigns ENVIRONMENT */ 
class WebsySignup {
  constructor (elementId, options) {
    const DEFAULTS = {
      loginType: 'email',
      classes: [],
      url: 'auth/signup'      
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)    
    const el = document.getElementById(this.elementId)
    if (el) {      
      const formOptions = {
        useRecaptcha: this.options.useRecaptcha || ENVIRONMENT.useRecaptcha || false,
        submit: {
          text: this.options.buttonText || 'Sign up',
          classes: (this.options.buttonClasses || []).join(' ') || ''
        },
        submitFn: this.submitForm.bind(this),
        fields: [          
          {
            label: this.options.loginType === 'email' ? 'Email' : 'Username',
            placeholder: `Enter ${this.options.loginType === 'email' ? 'your email address' : 'your chosen Username'}`,
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
        ]
      }
      if (this.options.fields) {
        formOptions.fields = this.options.fields.concat(formOptions.fields)
      }
      this.signupForm = new WebsyDesigns.WebsyForm(this.elementId, Object.assign({}, this.options, formOptions))
    }
    else {
      console.error(`No element with ID ${this.elementId} found for WebsyLogin component.`)
    }
  }  
  submitForm (data, b, c) {
    console.log(data)
    console.log(b, c)
  }
}
