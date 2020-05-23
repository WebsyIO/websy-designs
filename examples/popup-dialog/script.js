// import WebsyPopupDialog from "../../src/components/popup-dialog"

console.log(WebsyDesigns)

const myPopup = new WebsyDesigns.WebsyPopupDialog('popupTest')
const globalLoaderDialog = new WebsyDesigns.WebsyLoadingDialog('globalLoader', { classes: ['dark-loader'] })
const localLoaderDialog = new WebsyDesigns.WebsyLoadingDialog('localLoader', { classes: [] })

function popupEmpty () {
	myPopup.show({})
}

function popupTitleMessage () {
	myPopup.show({
		title: 'My Message',
		message: 'This is my message to you hoo oo.'
	})
}

function popupMessage () {
	myPopup.show({
		message: `Signed, sealed, delivered I'm yours.`
	})
}

function popupTitleMessageButtons () {
	myPopup.show({
		title: 'My Message',
		message: 'This is my message to you hoo oo.',
		buttons: [
			{
				label: 'Cancel',
				classes: ['btn-secondary']
			},
			{
				label: 'OK',
				qElemNUmber: 1,
				preventClose: true,
				fn: info => {
					console.log('You clicked a button')
					console.log(info)					
				}
			}
		]
	})
}

function popupMessageButtons () {
	myPopup.show({
		message: 'This is my message to you hoo oo.',
		buttons: [
			{
				label: 'Cancel'
      },
      {
        label: 'Cancel2',
        classes: ['btn-accent']
			},
			{
				label: 'OK',
				preventClose: true,
				fn: info => {
					console.log('You clicked a button')
					console.log(info)					
				}
			}
		]
	})
}

function globalLoader () {
	globalLoaderDialog.show()
	setTimeout(() => globalLoaderDialog.hide(), 2000)
}

function localLoader () {
	localLoaderDialog.show()
	setTimeout(() => localLoaderDialog.hide(), 2000)
}
