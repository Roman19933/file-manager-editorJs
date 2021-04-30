export default class spinner {

  addSpinner() {
    let el = document.querySelector('.fm-wrapper');
    let html = `<div class="fm-spinner"><div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>`
    el.insertAdjacentHTML('afterbegin', html)
  }

  removeSpinner() {
    let el = document.querySelector('.fm-spinner');
    el.remove()
  }

}