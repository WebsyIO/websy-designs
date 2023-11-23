/*
  global
  WebsyDesigns
*/ 
class MultiForm {
  constructor (elementId, options) {
    this.elementId = elementId    
    const DEFAULTS = {
      addButton: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512"><line x1="256" y1="112" x2="256" y2="400" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="400" y1="256" x2="112" y2="256" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>`,      
      deleteButton: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512"><line x1="368" y1="368" x2="144" y2="144" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="368" y1="144" x2="144" y2="368" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>`,
      allowAdd: true,
      allowDelete: true
    }
    this.options = Object.assign({}, DEFAULTS, options)
    this.formData = []
    this.forms = []
    this.recordsToDelete = []
    const el = document.getElementById(elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      el.innerHTML = `<div id='${elementId}_container' class='websy-multi-form-container'></div>`
    }    
    this.render()
  }
  addEntry () {
    const el = document.getElementById(`${this.elementId}_container`)
    let newId = WebsyDesigns.Utils.createIdentity()
    const newFormEl = document.createElement('div')
    newFormEl.id = `${this.elementId}_${newId}_formContainer`
    newFormEl.classList.add('websy-multi-form-form-container')
    newFormEl.innerHTML = `
      <div id='${this.elementId}_${newId}_form' class='websy-multi-form-form'>
      </div>
      <button id='${this.elementId}_${newId}_deleteButton' data-formid='${newId}' class='hidden websy-multi-form-delete'>
        ${this.options.deleteButton}
      </button>          
      <button id='${this.elementId}_${newId}_addButton' data-formid='${newId}' class='websy-multi-form-add'>
        ${this.options.addButton}
      </button>   
    `
    el.appendChild(newFormEl)
    let formOptions = Object.assign({}, this.options)
    this.forms.push(new WebsyDesigns.Form(`${this.elementId}_${newId}_form`, formOptions))
  }
  clear () {
    this.formData = []
    this.forms = []
    this.recordsToDelete = []
    const el = document.getElementById(`${this.elementId}_container`)
    if (el) {
      el.innerHTML = ''
    }
  }
  get data () {
    const d = this.forms.map(f => (f.data))
    // we don't return the last form
    d.pop()
    return d
  }
  set data (d) {
    this.formData = d
    this.render()
  }
  handleClick (event) {
    if (event.target.classList.contains('websy-multi-form-add')) {
      let id = event.target.getAttribute('data-formid')
      // hide add button and show delete button
      const addButtonEl = document.getElementById(`${this.elementId}_${id}_addButton`)
      if (addButtonEl) {
        addButtonEl.classList.add('hidden')
      }
      const deleteButtonEl = document.getElementById(`${this.elementId}_${id}_deleteButton`)
      if (deleteButtonEl) {
        deleteButtonEl.classList.remove('hidden')
      }
      // add new form
      if (this.options.allowAdd === true) {
        this.addEntry()
      }
    }
    if (event.target.classList.contains('websy-multi-form-delete')) {
      // delete form based on index
      let id = event.target.getAttribute('data-formid')
      let rowId = event.target.getAttribute('data-rowid')
      this.recordsToDelete.push(rowId)
      let indexToDelete = -1
      for (let i = 0; i < this.forms.length; i++) {
        if (this.forms[i].elementId === `${this.elementId}_${id}_form`) {
          indexToDelete = i
          break
        }
      }
      if (indexToDelete !== -1) {
        this.forms.splice(indexToDelete, 1)
      }
      const el = document.getElementById(`${this.elementId}_${id}_formContainer`)
      if (el) {
        el.remove()
      }
      // delete form element based on id
    }
  }
  render () {
    this.forms = []
    this.recordsToDelete = []
    const el = document.getElementById(`${this.elementId}_container`)
    if (el) {
      let html = ''
      this.formData.forEach(d => {
        d.formId = WebsyDesigns.Utils.createIdentity()
        html += `
          <div id='${this.elementId}_${d.formId}_formContainer' class='websy-multi-form-form-container'>
            <div id='${this.elementId}_${d.formId}_form' class='websy-multi-form-form'>
            </div>
        `
        if (this.options.allowDelete === true) {          
          html += `
            <button id='${this.elementId}_${d.formId}_deleteButton' data-formid='${d.formId}' data-rowid='${d.id}' class='websy-multi-form-delete'>
              ${this.options.deleteButton}
            </button>
          `
        }
        html += `
          </div>
        `
      })
      let id = WebsyDesigns.Utils.createIdentity()
      if (this.options.allowAdd === true) {
        html += `
          <div id='${this.elementId}_${id}_formContainer' class='websy-multi-form-form-container'>
            <div id='${this.elementId}_${id}_form' class='websy-multi-form-form'>
            </div>
            <button id='${this.elementId}_${id}_deleteButton' data-formid='${id}' class='hidden websy-multi-form-delete'>
              ${this.options.deleteButton}
            </button>          
            <button id='${this.elementId}_${id}_addButton' data-formid='${id}' class='websy-multi-form-add'>
              ${this.options.addButton}
            </button>                    
          </div>
        `
      }
      el.innerHTML = html
      this.formData.forEach(d => {
        let formOptions = Object.assign({}, this.options)
        let formObject = new WebsyDesigns.Form(`${this.elementId}_${d.formId}_form`, formOptions)
        formObject.data = d
        this.forms.push(formObject)
      })
      if (this.options.allowAdd === true) {
        let formOptions = Object.assign({}, this.options)
        this.forms.push(new WebsyDesigns.Form(`${this.elementId}_${id}_form`, formOptions))
      }
    }
  }
  validateForm () {
    // we don't validate the last form
    for (let i = 0; i < this.forms.length - 1; i++) {
      let valid = this.forms[i].validateForm()
      if (!valid) {
        return false
      }
    }
    return true
  }
}
