import axios from "axios";
import { injectDomHtml, getHtmlFolders } from "../util/index";

export default class restApi {
  constructor({
    token, apiUrl, routes
  }) {
    this.token = token;
    this.apiUrl = apiUrl;
    this.routes = routes;
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

  //return routes after change ${_id} to id
  returnRoutes(route, id) {
    return route.replace('${_id}', id)
  }

  //get all folders
  async getAllFolders() {
    let el = document.querySelector('.fm');
    let ul = document.querySelector('.fm-content__folders ul');
    ul.innerHTML = '';
    try {
      let { data } = await this.client.get(this.routes.allFoldersOrCurentFolder)
      if (!Array.isArray(data.data)) {
        return injectDomHtml(el, '.fm-content__folders ul', 'afterbegin', getHtmlFolders(data.data))
      }
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
      let { data } = await this.client.get(this.returnRoutes(this.routes.subFoldersAndFiles, id))
      return data.data;
    } catch (e) {
      console.log(e)
    }
  }

  //update folders
  async updateFolder(id, payload) {
    try {
      await this.client.put(this.returnRoutes(this.routes.updateFolder, id), payload)
    } catch (e) {
      console.log(e)
    }
  }

  //add folder
  async createFolder(payload) {
    try {
      await this.client.post(this.routes.createFolder, payload)
    } catch (e) {
      console.log(e)
    }
  }

  //delete folders
  async deleteFolder(id) {
    try {
      await this.client.delete(this.returnRoutes(this.routes.deleteFolder, id))
    } catch (e) {
      console.log(e)
    }
  }

  //update files
  async updateFile(id, payload) {
    try {
      await this.client.put(this.returnRoutes(this.routes.updateFile, id), payload)
    } catch (e) {
      console.log(e)
    }
  }

  //delete files
  async deleteFile(id) {
    try {
      await this.client.delete(this.returnRoutes(this.routes.deleteFile, id))
    } catch (e) {
      console.log(e)
    }
  }

  //upload files
  async uploadFile(folderId, payload) {
    try {
      await this.client.post(this.returnRoutes(this.routes.uploadFile, folderId), payload)
    } catch (e) {
      console.log(e)
    }
  }
}