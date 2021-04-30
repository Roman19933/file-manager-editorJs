import { ModalWindow, getFilesForType, getHtmlFolders } from "../util/index";
import axios from "./axios"
/**
 * Class for work with file manager:
 *  - show/hide file manager
 *  - event handler in file manager
 */
export default class FileManager {

  /**
   * @param {object} api - Editor.js API
   * @param {Object} config - file manager config
   */
  constructor({
    config, api
  }) {
    this.config = config;
    this.axios = new axios(config);
    this.api = api;
    this._data = {};
    this._files = null;
    this._subFolders = null;
    this._editFile = {};
    this._folderId = '';
    this._target = null;
    this._tagName = null;
    this._parentNode = null;
    this._dataSet = null;
    this._content = null;
  }

  /**
 * open file manager
 */
  async open() {
    this.axios.init();
    this.mw = ModalWindow();
    document.body.appendChild(this.mw)
    this.axios.getAllFolders();
    this.mw.onclick = this.onClick.bind(this);
    await setTimeout(() => {
      this.mw.classList.add('open');
    }, 100)
  }

  /**
  * close file manager
  */
  close() {
    this.mw.classList.remove('open')
    this.mw.classList.add('hide')
    setTimeout(() => {
      this.mw.classList.remove('hide')
      this.destroyed()
    }, 500)
  }

  /**
  * remove file manager to DOM
  */
  destroyed() {
    this.mw.remove()
  }

  /**
  * remove/add active classs to folder
  */
  addActiveClassForTitle() {
    let allItem = document.querySelectorAll('.folder-item')
    allItem.forEach(e => {
      e.classList.remove('active')
    })
    this._parentNode.classList.add('active')
  }

  /**
   * get file and subfolders
   */
  async getFileAndSubFolders() {
    try {
      this._folderId = this._dataSet.folderid;
      let parentNode = this._parentNode;
      let childrenContainer = parentNode.parentNode.querySelector('ul');
      this._content.innerHTML = '';

      if (childrenContainer) childrenContainer.remove();
      let data = await this.axios.getSubFoldersFiles(this._folderId);
      this._subFolders = data.Folder
      this._files = data.File
      if (this._subFolders.length) this.setSubFolders()
      if (this._files.length) this.setFiles()
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * rendering subfolders in DOM
   */
  setSubFolders() {
    let plusMinus = document.createElement('span');
    plusMinus.setAttribute('data-nesting', true);
    plusMinus.classList.add('nesting');
    let parentNode = this._parentNode;
    let nested = parentNode.parentNode.querySelector('.nesting');
    if (!nested) {
      parentNode.parentNode.insertAdjacentElement('afterbegin', plusMinus)
    }
    let children = document.createElement('ul');
    children.classList.add('tree__children')
    parentNode.parentNode.appendChild(children)
    this._subFolders.forEach(folder => {
      children.insertAdjacentHTML('afterbegin', getHtmlFolders(folder))
    });
  }

  /**
   * rendering files in DOM
   */
  setFiles() {
    this._files.forEach((file, index) => {
      this._content.insertAdjacentHTML('afterbegin', getFilesForType(file, index, this.config.uploadUrl))
    });
  }

  /**
 * delete file
 */
  async deleteFile() {
    try {
      let index = +this._parentNode.dataset.index;
      await this.axios.deleteFile(this._files[index].id)
      this._files.splice(index, 1);
      this._content.innerText = '';
      this.setFiles();
    } catch (e) {
      console.log(e)
    }
  }

  /**
 * delete folder
 */
  async deleteFolder() {
    try {
      await this.axios.deleteFolder(this._dataSet.folderid)
      this._content.innerText = '';
      await this.axios.getAllFolders()
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * add Folder
   */
  async addFolder() {
    try {
      let payload = {
        folderId: this._dataSet.folderid ? this._dataSet.folderid : '',
        title: "New folder"
      }
      await this.axios.createFolder(payload)
      await this.axios.getAllFolders()
    } catch (e) {
      console.log(e)
    }
  }

  /**
 * update file
 */
  async updateFile() {
    try {
      let parentNode = this._parentNode;
      this._editFile.id = this._files[parentNode.dataset.index].id
      let inputTitle = parentNode.parentNode.parentNode.querySelector('input.title')
      let inputAlt = parentNode.parentNode.parentNode.querySelector('input.alt')
      this._editFile.title = inputTitle.value;
      this._editFile.alt = inputAlt.value;
      await this.axios.updateFile(this._files[parentNode.dataset.index].id, this._editFile)
      parentNode.parentNode.parentNode.querySelector('.fm-item__title').innerText = this._editFile.title;
      parentNode.parentNode.parentNode.classList.remove('edit')
      let data = await this.axios.getSubFoldersFiles(this._folderId);
      this._files = data.File
      this._content.innerText = '';
      this.setFiles()

    } catch (e) {
      console.log(e)
    }
  }

  /**
 * update folder
 */
  async updateFolder() {
    try {
      let parentNode = this._parentNode;
      let input = parentNode.parentNode.parentNode.parentNode.querySelector('input.title')
      this._editFile.title = input.value;
      this._editFile.id = this._dataSet.folderid
      await this.axios.updateFolder(this._dataSet.folderid, this._editFile)
      parentNode.parentNode.parentNode.parentNode.querySelector('.folder-item__name').innerText = this._editFile.title;
      parentNode.parentNode.parentNode.parentNode.classList.remove('edit')
    } catch (e) {
      console.log(e)
    }
  }

  /**
 * upload file
 */
  async uploadFile() {
    this._target.onchange = async () => {
      try {
        let formData = new FormData();
        formData.append('file', this._target.files[0])
        formData.append('folderId', this._dataSet.folderid)
        this._target.value = '';
        await this.axios.uploadFile(this._dataSet.folderid, formData)
        if (this._folderId === this._dataSet.folderid) {
          let data = await this.axios.getSubFoldersFiles(this._dataSet.folderid);
          this._files = data.File
          this._content.innerText = '';
          this.setFiles()
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  /**
 * click to file
 */
  clickToFile() {
    let nodeActive = this.mw.querySelectorAll('.fm-item.active');
    for (let i = 0; i < nodeActive.length; i++) {
      if (!nodeActive.length) return;
      nodeActive[i].classList.remove('active')
    }
    this._parentNode.classList.add('active')
    let objNode = this._files[this._parentNode.dataset.index];
    let html = "";
    let type = "";
    if (objNode.mime.includes('image')) {
      html = `<img src="${this.config.uploadUrl}${objNode.path}">
                <input type="text" placeholder="Заголовок" value="${objNode.title}" class="cdx-input">`;
      type = 'image'
    } else if (objNode.mime.includes('audio')) {
      html = `<audio controls>
                  <source src="${this.config.uploadUrl}${objNode.path}">
                </audio>`;
      type = 'audio'
    } else {
      html = `<a href="${this.config.uploadUrl}${objNode.path}" download>${objNode.title}</a>`;
      type = 'file'
    }
    this._data.html = html;
    this._data.objNode = objNode;
    this._data.type = type;
  }

  /**
 * click to folder
 */
  clickToFolder() {
    let activeClass = this._parentNode.classList.contains('active');
    if (activeClass) return;
    this.addActiveClassForTitle();
    this.getFileAndSubFolders();
  }

  /**
 * click to edit button folder/file
 */
  clickToEdit() {
    this._editFile = {}
    let parentNode = this._parentNode
    parentNode.parentNode.parentNode.classList.add('edit')
  }

  /**
 * click to cancel edit button in file
 */
  clickToCancelEditFile() {
    let parentNode = this._parentNode
    parentNode.parentNode.parentNode.classList.remove('edit')
  }

  /**
  * click to cancel edit button in folder
  */
  clickToCancelEditFolder() {
    let parentNode = this._parentNode
    parentNode.parentNode.parentNode.parentNode.classList.remove('edit')
  }

  /**
  * download file
  */
  downloadFile() {
    let index = this._parentNode.dataset.index
    window.open(`${this.config.uploadUrl}${this._files[index].path}`);
  }

  /**
  * change title in file (input handler)
  */
  changeFileTitle() {
    this._target.addEventListener("keyup", (e) => {
      this._editFile.title = e.target.value
    })
  }

  /**
  * change alt in file (input handler)
  */
  changeFileAlt() {
    this._target.addEventListener("keyup", (e) => {
      this._editFile.alt = e.target.value
    })
  }

  /**
  * choose file
  */
  async chooseFile() {
    try {
      await this.api.saver.save();
    } catch (e) {
      console.log(e)
    }
    if (Object.keys(this._data).length && this.api) {
      this.api.events.emit('add:file', this._data);
      this._data = {};
      this.close()
    }
  }

  /**
  * event handler in file manager
  */
  async onClick(event) {
    this._target = event.target;
    this._tagName = event.target.tagName;
    this._parentNode = event.target.parentNode;
    this._dataSet = event.target.dataset;
    this._content = this.mw.querySelector('.fm-content__items');
    if (this._tagName === 'SPAN' && this._dataSet.folderid) this.clickToFolder()
    if (this._dataSet.nesting) this._parentNode.classList.toggle('show')
    if (this._dataSet.download) this.downloadFile()
    if (this._dataSet.title) this.changeFileTitle()
    if (this._dataSet.alt) this.changeFileAlt()
    if (this._dataSet.deleted) this.deleteFile();
    if (this._dataSet.folderdeleted) this.deleteFolder()
    if (this._dataSet.addsubfolder || this._dataSet.addfolder) this.addFolder()
    if (this._dataSet.edit) this.clickToEdit()
    if (this._dataSet.cancel) this.clickToCancelEditFile()
    if (this._dataSet.foldercancel) this.clickToCancelEditFile()
    if (this._dataSet.send) this.updateFile()
    if (this._dataSet.foldersend) this.updateFolder()
    if (this._tagName === 'INPUT' && this._dataSet.upload) this.uploadFile()
    if (this._dataSet.close) this.close()
    if (this._dataSet.file) this.clickToFile()
    if (this._dataSet.choose) this.chooseFile()
  };
}