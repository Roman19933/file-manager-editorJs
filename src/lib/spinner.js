export default class spinner {

  /**
* add spinners
*/
  addSpinner() {
    let el = document.querySelector('.fm-wrapper');
    let html = `<div class="fm-spinner"><div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>`
    el.insertAdjacentHTML('afterbegin', html)
  }

  /**
* remove spinners
*/
  removeSpinner() {
    let el = document.querySelector('.fm-spinner');
    el.remove()
  }

}