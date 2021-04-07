let close = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3E%3C/svg%3E`;

//images
import addFolder from "../images/add-folder.png";
import fileImg from "../images/file.png";
import download from "../images/download.png";
import edit from "../images/edit.png";
import deleted from "../images/deleted.png";
import cancel from "../images/cancel.png";
import ok from "../images/ok.png";
import upload from "../images/upload.png";

//modal window
export const ModalWindow = function (options) {
  let fmmHTML = `
  <div class="fm-wrapper">
  <div class="fm-top">
    <div class="fm-top__add">
      <button data-addFolder="true">Add new folder</button>
    </div>
    <button class="btn-close" data-close="true">
      <img data-close="true" src="${close}">
    </button>
  </div>
  <div class="fm-content">
    <div class="fm-content__folders">
      <ul class="tree">
      </ul>
    </div>
    <div class="fm-content__items">
    </div>
  </div>
  <div class="fm-bottom">
    <button class="button-choose" data-choose="true">
      Выбрать
    </button>
    <button class="button-cancel" data-close="true">
      Отмена
    </button>
  </div>
</div>
`
  return createAndInjectDomElement('div', 'fm', 'afterbegin', fmmHTML)
}

//html to folders
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

//get html fot type
export const getFilesForType = function (file, index, url) {
  let img = file.mime.includes('image') ? `${url}${file.path}` : fileImg
  return `<div class="fm-item " data-index="${index}" >
                  <div class="fm-item__menu">
                    <button data-index="${index}"><img src="${edit}" data-edit="true"></button>
                    <button  data-index="${index}"><img src="${download}" data-download="true"></button>
                    <button data-index="${index}"><img src="${deleted}" data-deleted="true"></button>
                  </div>
                  <img src="${img}" alt="${file.alt}" title="${file.alt}" data-file="true">
                  <span class="fm-item__title" data-file="true">${file.title}</span>
                    <div class="fm-item__input" data-index="${index}">
                      <label for="title">Title</label>
                      <input type="text" class="title" data-title="true" id="title" value="${file.title}">   
                      <label for="alt">Alt</label>
                      <input type="text" class="alt" data-alt="true" id="alt" value="${file.alt}">
                      <div class="fm-item__btn" data-index="${index}">
                        <button data-cancel="true">Отмена</button>   
                        <button data-send="true">отправить</button>   
                      </div>
                    </div>   
                </div>`
}

//injectDomElement
export const injectDomElement = function (element, classTarget, typeInject, html) {
  return element.querySelector(classTarget).insertAdjacentElement(typeInject, html)
}

//injectDomHtml
export const injectDomHtml = function (element, classTarget, typeInject, html) {
  return element.querySelector(classTarget).insertAdjacentHTML(typeInject, html)
}

//createAndInjectDomElement
export const createAndInjectDomElement = function (tag, classes, typeInject, html, attr) {
  let el = document.createElement(tag);
  el.classList.add(classes)
  if (attr) {
    el.setAttribute(attr.name, attr.value);
  }
  el.insertAdjacentHTML(typeInject, html)
  return el;
}