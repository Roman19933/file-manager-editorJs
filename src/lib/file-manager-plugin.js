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
    this._editFile = {};
    this._folderId = ''
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
  * event handler in file manager
  */
  async onClick(event) {
    let target = event.target;
    let tagName = target.tagName;
    let parentNode = target.parentNode;
    let dataSet = target.dataset;
    let content = this.mw.querySelector('.fm-content__items');
    if (tagName === 'SPAN' && dataSet.folderid) {
      let activeClass = target.classList.contains('active');
      if (!activeClass) {
        try {
          let li = parentNode.parentNode;
          let ul = li.querySelector('.tree__children')
          let allTitle = document.querySelectorAll('.folder-item__name')
          allTitle.forEach(e => {
            e.classList.remove('active')
          })
          target.classList.add('active')
          this._folderId = dataSet.folderid;
          let childrenContainer = parentNode.parentNode.querySelector('ul');
          content.innerHTML = '';
          if (childrenContainer) childrenContainer.remove();
          let data = await this.axios.getSubFoldersFiles(dataSet.folderid);
          let subFolder = data.Folder
          this._files = data.File
          if (subFolder.length) {
            let plusMinus = document.createElement('span');
            plusMinus.setAttribute('data-nesting', true);
            plusMinus.classList.add('nesting');
            let nested = parentNode.parentNode.querySelector('.nesting');
            if (!nested) {
              parentNode.parentNode.insertAdjacentElement('afterbegin', plusMinus)
            }
            let children = document.createElement('ul');
            children.classList.add('tree__children')
            parentNode.parentNode.appendChild(children)
            subFolder.forEach(folder => {
              children.insertAdjacentHTML('afterbegin', getHtmlFolders(folder))
            });
          }
          if (this._files) {
            this._files.forEach((file, index) => {
              content.insertAdjacentHTML('afterbegin', getFilesForType(file, index, this.config.uploadUrl))
            });
          }
        } catch (e) {
          console.log(e)
        }
      }
    } else if (tagName === 'SPAN' && dataSet.nesting) {
      parentNode.classList.toggle('show')
    } else if (dataSet.download) {
      let index = parentNode.dataset.index
      window.open(`${this.config.uploadUrl}${this._files[index].path}`);
    } else if (tagName === 'INPUT' && dataSet.title) {
      target.addEventListener("keyup", (e) => {
        this._editFile.title = e.target.value
      })
    } else if (tagName === 'INPUT' && dataSet.alt) {
      target.addEventListener("keyup", (e) => {
        this._editFile.alt = e.target.value
      })
    } else if (dataSet.deleted) {
      let index = +parentNode.dataset.index;
      await this.axios.deleteFile(this._files[index].id)
      this._files.splice(index, 1);
      content.innerText = '';
      this._files.forEach((file, index) => {
        content.insertAdjacentHTML('afterbegin', getFilesForType(file, index, this.config.uploadUrl))
      });
    } else if (dataSet.folderdeleted) {
      await this.axios.deleteFolder(dataSet.folderid)
      content.innerText = '';
      await this.axios.getAllFolders()
    } else if (dataSet.addsubfolder || dataSet.addfolder) {
      let payload = {
        folderId: dataSet.folderid ? dataSet.folderid : '',
        title: "New folder"
      }
      await this.axios.createFolder(payload)
      await this.axios.getAllFolders()
    } else if (dataSet.edit) {
      this._editFile = {}
      parentNode.parentNode.parentNode.classList.add('edit')
    } else if (dataSet.cancel) {
      parentNode.parentNode.parentNode.classList.remove('edit')
    } else if (dataSet.foldercancel) {
      parentNode.parentNode.parentNode.parentNode.classList.remove('edit')
    } else if (dataSet.send) {
      try {
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
        content.innerText = '';
        this._files.forEach((file, index) => {
          content.insertAdjacentHTML('afterbegin', getFilesForType(file, index, this.config.uploadUrl))
        });

      } catch (e) {
        console.log(e)
      }
    } else if (dataSet.foldersend) {
      try {
        let input = parentNode.parentNode.parentNode.parentNode.querySelector('input.title')
        this._editFile.title = input.value;
        this._editFile.id = dataSet.folderid
        await this.axios.updateFolder(dataSet.folderid, this._editFile)
        parentNode.parentNode.parentNode.parentNode.querySelector('.folder-item__name').innerText = this._editFile.title;
        parentNode.parentNode.parentNode.parentNode.classList.remove('edit')
      } catch (e) {
        console.log(e)
      }
    } else if (tagName === 'INPUT' && dataSet.upload) {
      target.onchange = async () => {
        try {
          let formData = new FormData();
          formData.append('file', target.files[0])
          formData.append('folderId', dataSet.folderid)
          target.value = '';
          await this.axios.uploadFile(dataSet.folderid, formData)
          if (this._folderId === dataSet.folderid) {
            let data = await this.axios.getSubFoldersFiles(dataSet.folderid);
            this._files = data.File
            content.innerText = '';
            this._files.forEach((file, index) => {
              content.insertAdjacentHTML('afterbegin', getFilesForType(file, index, this.config.uploadUrl))
            });
          }
        } catch (e) {
          console.log(e)
        }
      }
    } else if (dataSet.close) {
      this.close()
    } else if (dataSet.file) {
      let nodeActive = this.mw.querySelectorAll('.fm-item.active');
      for (let i = 0; i < nodeActive.length; i++) {
        if (!nodeActive.length) return;
        nodeActive[i].classList.remove('active')
      }
      target.parentNode.classList.add('active')
      let objNode = this._files[target.parentNode.dataset.index];
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
    } else if (dataSet.choose) {
      if (Object.keys(this._data).length && this.api) {
        this.api.events.emit('add:file', this._data);
        this._data = {};
        this.close()
      }
    }
  };
}