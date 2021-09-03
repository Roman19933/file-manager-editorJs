import locale from "../locales";
/**
 * images
 */
let close = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3E%3C/svg%3E`;
import addFolder from "../images/add-folder.png";
import fileImg from "../images/file.png";
import mp3 from "../images/mp3.png";
import download from "../images/download.png";
import edit from "../images/edit.png";
import deleted from "../images/deleted.png";
import cancel from "../images/cancel.png";
import ok from "../images/ok.png";
import upload from "../images/upload.png";

/**
 * html structure to file manager
 */
export const ModalWindow = function (config) {
  let fmmHTML = `
  <div class="fm-wrapper">
  <div class="fm-top">
    <div class="fm-top__add">
      <button data-addFolder="true">${locale[config.lang].addNewFolder}</button>
    </div>
    <div
    class="search-form"
  >
      <div class="search-form__wrapper">
        <input
          type="text"
          placeholder="${locale[config.lang].chooseFolder}"
          data-search="true"
          disabled
        >
      </div>
  </div>
    <button class="btn-close" data-close="true">
      <img data-close="true" src="${close}">
    </button>
  </div>
  <div class="fm-content">
    <div class="fm-content__folders">
    <div
    class="search-form"
  >
      <div class="search-form__wrapper">
        <input
          type="text"
          placeholder="${locale[config.lang].searchFolderInput}"
          data-searchFolder="true"
        >
      </div>
  </div>
      <ul class="tree">
      </ul>
    </div>
    <div class="fm-content__items">
    </div>
  </div>
  <div class="fm-bottom">
    <button class="button-choose" data-choose="true">
      ${locale[config.lang].choose}
    </button>
    <button class="button-cancel" data-close="true">
      ${locale[config.lang].cancel}
    </button>
  </div>
</div>
`
  return createAndInjectDomElement('div', 'fm', 'afterbegin', fmmHTML)
}

/**
 * html structure to folders
 * @param {Object} folder - folder object
 * 
 */
export const getHtmlFolders = function (folder) {
  return `<li>
            <div class="folder-item">
              <div class="folder-action">
                <button><label class="upload"><input type="file" data-upload="true" class="upload__input" data-folderId="${folder.id}"><img src="${upload}" data-folderId="${folder.id}"></label></button>
                <button><img src="${addFolder}" data-addSubFolder="true" data-folderId="${folder.id}"></button>
                <button><img src="${edit}" data-edit="true" data-folderId="${folder.id}"></button>
                <button><img src="${deleted}" data-folderDeleted="true" data-folderId="${folder.id}"></button>
              </div>
              <span class="folder-item__name" data-folderId="${folder.id}">${folder.title}</span>
              <div class="fm-item__input fm-item__input_folder">
                <input type="text" class="title" data-title="true" id="title" value="${folder.title}">   
                <div class="fm-item__btn fm-item__btn_folder">
                  <button><img src="${ok}" data-folderSend="true" data-folderId="${folder.id}"></button>   
                  <button><img src="${cancel}" data-folderCancel="true" data-folderId="${folder.id}"></button>   
                </div>
              </div>
            </div>
          </li>
          `
}

/**
 * html structure to file
 * @param {Object} file - file object
 * @param {Number} index - index to file in array
 * @param {String} url - furl to file
 */
export const getFilesForType = function (file, index, url, lang) {
  let img = file.mime.includes('image') ? `${url}${file.path}` : file.mime.includes('audio') ? mp3 : fileImg
  return `<div class="fm-item " data-index="${index}" >
                  <div class="fm-item__menu">
                    <button data-index="${index}"><img src="${edit}" data-edit="true" class="fm-item__img_menu"></button>
                    <button  data-index="${index}"><img src="${download}" data-download="true" class="fm-item__img_menu"></button>
                    <button data-index="${index}"><img src="${deleted}" data-deleted="true" class="fm-item__img_menu"></button>
                  </div>
                  <img src="${img}" alt="${file.alt}" title="${file.alt}" data-file="true" class="fm-item__img_main">
                  <span class="fm-item__title" data-file="true">${file.title}</span>
                    <div class="fm-item__input" data-index="${index}">
                      <label for="title">Title</label>
                      <input type="text" class="title" data-title="true" id="title" value="${file.title}">   
                      <label for="alt">Alt</label>
                      <input type="text" class="alt" data-alt="true" id="alt" value="${file.alt}">
                      <div class="fm-item__btn" data-index="${index}">
                        <button data-cancel="true">${locale[lang].cancel}</button>   
                        <button data-send="true">${locale[lang].send}</button>   
                      </div>
                    </div>   
                </div>`
}

/**
 * html structure to file
 * @param {String} element - parent element
 * @param {String} classTarget - search class
 * @param {String} typeInject - type of inject 
 * @param {String} html - html
 */
export const injectDomElement = function (element, classTarget, typeInject, html) {
  return element.querySelector(classTarget).insertAdjacentElement(typeInject, html)
}

/**
 * html structure to file
 * @param {String} element - parent element
 * @param {String} classTarget - search class
 * @param {String} typeInject - type of inject 
 * @param {String} html - html
 */
export const injectDomHtml = function (element, classTarget, typeInject, html) {
  return element.querySelector(classTarget).insertAdjacentHTML(typeInject, html)
}

/**
 * html structure to file
 * @param {String} tag - creating tag
 * @param {String} classes - element class
 * @param {String} typeInject - type of inject 
 * @param {String} html - html
 * @param {String} attr - element attributes
 */
export const createAndInjectDomElement = function (tag, classes, typeInject, html, attr) {
  let el = document.createElement(tag);
  el.classList.add(classes)
  if (attr) {
    el.setAttribute(attr.name, attr.value);
  }
  el.insertAdjacentHTML(typeInject, html)
  return el;
}