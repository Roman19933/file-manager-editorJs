import axios from "axios";
import { injectDomHtml, getHtmlFolders } from "../util/index";

export default class restApi {
  constructor({
    token, apiUrl
  }) {
    this.token = token;
    this.apiUrl = apiUrl;
    this.client = null;
  }

  //init axios and settings
  init() {
    this.client = axios.create({
      baseURL: this.apiUrl,
    })

    this.client.interceptors.request.use(
      async config => {
        if (this.token) {
          config.headers.common['Authorization'] = this.token;
        }
        return config;
      },
      async error => {
        return Promise.reject(error);
      }
    );
  }
  //get all folders
  async getAllFolders() {
    let el = document.querySelector('.fm');
    let ul = document.querySelector('.fm-content__folders ul');
    ul.innerHTML = '';
    try {
      let { data } = await this.client.get('filemanager/folders')
      data.data.forEach(element => {
        injectDomHtml(el, '.fm-content__folders ul', 'afterbegin', getHtmlFolders(element))
      });
    } catch (e) {
      console.log(e)
    }
  }

  //get file/subfolders
  async getSubFoldersFiles(id) {
    try {
      let { data } = await this.client.get(`filemanager/folders/${id}`)
      return data.data;
    } catch (e) {
      console.log(e)
    }
  }

  //update folders
  async updateFolder(id, payload) {
    try {
      await this.client.put(`filemanager/folder/${id}`, payload)
    } catch (e) {
      console.log(e)
    }
  }

  //update files
  async updateFile(id, payload) {
    try {
      await this.client.put(`filemanager/file/${id}`, payload)
    } catch (e) {
      console.log(e)
    }
  }

  //delete files
  async deleteFile(id) {
    try {
      await this.client.delete(`filemanager/file/${id}`)
    } catch (e) {
      console.log(e)
    }
  }

  //delete folders
  async deleteFolder(id) {
    try {
      await this.client.delete(`filemanager/folder/${id}`)
    } catch (e) {
      console.log(e)
    }
  }

  //upload files
  async uploadFile(folderId, payload) {
    try {
      await this.client.post(`filemanager/folders/${folderId}/file`, payload)
    } catch (e) {
      console.log(e)
    }
  }

  //add folder
  async createFolder(payload) {
    try {
      await this.client.post(`filemanager/folders`, payload)
    } catch (e) {
      console.log(e)
    }
  }

}