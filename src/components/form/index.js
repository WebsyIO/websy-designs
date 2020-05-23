class WebsyForm {
  constructor (elementId, options) {
    this.options = Object.assign({}, {
      // defaults go here
    }, options)
    if (!elementId) {
      console.log('No element Id provided')
      return
    }
    this.elementId = elementId
    const el = document.getElementById(elementId)
    if (el) {
      if (this.options.classes) {
        this.options.classes.forEach(c => el.classList.add(c))
      }
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('keyup', this.handleKeyUp.bind(this))
      this.render()
    }
  }
  handleClick (event) {

  }
  handleKeyUp (event) {

  }
  render () {

  }
}
