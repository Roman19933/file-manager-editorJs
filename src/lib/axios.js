import axios from "axios";
import { injectDomHtml, getHtmlFolders } from "../util/index";
import spinner from "./spinner"
/**
 * axios settings and routes
 */
export default class restApi {
  /**
   * 
   * @param {String} token token for request
   * @param {String} apiUrl url for request
   * @param {Object} routes routes
   */
  constructor({
    token, apiUrl, routes
  }) {
    this.token = token;
    this.apiUrl = apiUrl;
    this.routes = routes;
    this.client = null;
    this.spinner = new spinner();
  }

  /**
 * axios settings
 */
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
  /**
   * 
   * @param {String} route url where replace ${_id} to id
   * @param {String} id node id
   * @returns {String} new route replaced ${_id} to id
   */
  returnRoutes(route, id) {
    return route.replace('${_id}', id)
  }

  /**
   * get all folders
   * @returns {Array or Object} return array of objects with folders or object one times folder to id
   */
  async getAllFolders() {
    let el = document.querySelector('.fm');
    let ul = document.querySelector('.fm-content__folders ul');
    ul.innerHTML = '';
    try {
      this.spinner.addSpinner();
      let { data } = await this.client.get(this.routes.allFoldersOrCurentFolder)
      if (!Array.isArray(data.data)) {
        return injectDomHtml(el, '.fm-content__folders ul', 'afterbegin', getHtmlFolders(data.data))
      }
      data.data.forEach(element => {
        injectDomHtml(el, '.fm-content__folders ul', 'afterbegin', getHtmlFolders(element))
      });

    } catch (e) {
      console.log(e)
    } finally {
      this.spinner.removeSpinner();
    }
  }

  /**
 * get file/subfolders
 * @param {String} id folder id
 * @returns {Object} return folder to id
 */
  async getSubFoldersFiles(id) {
    try {
      this.spinner.addSpinner();
      let { data } = await this.client.get(this.returnRoutes(this.routes.subFoldersAndFiles, id))
      return data.data;
    } catch (e) {
      console.log(e)
    } finally {
      this.spinner.removeSpinner();
    }
  }

  /**
 * update folders
 * @param {String} id folder id
 * @param {object} payload  {title: 'new title', id: folder id}
 */
  async updateFolder(id, payload) {
    try {
      this.spinner.addSpinner();
      await this.client.put(this.returnRoutes(this.routes.updateFolder, id), payload)
    } catch (e) {
      console.log(e)
    } finally {
      this.spinner.removeSpinner();
    }
  }

  /**
 * add folder
 * @param {object} payload  {title: 'folder name (default : new folder)', folderId: parent folder id or ''}
 */
  async createFolder(payload) {
    try {
      this.spinner.addSpinner();
      await this.client.post(this.routes.createFolder, payload)
    } catch (e) {
      console.log(e)
    } finally {
      this.spinner.removeSpinner();
    }
  }

  /**
* delete folder
* @param {String} id  folder id
*/
  async deleteFolder(id) {
    try {
      this.spinner.addSpinner();
      await this.client.delete(this.returnRoutes(this.routes.deleteFolder, id))
    } catch (e) {
      console.log(e)
    } finally {
      this.spinner.removeSpinner();
    }
  }

  /**
 * update files
 * @param {String} id folder id
 * @param {object} payload  {title: 'new title', alt: 'new alt'}
 */
  async updateFile(id, payload) {
    try {
      this.spinner.addSpinner();
      await this.client.put(this.returnRoutes(this.routes.updateFile, id), payload)
    } catch (e) {
      console.log(e)
    } finally {
      this.spinner.removeSpinner();
    }
  }

  /**
 * delete file
 * @param {String} id  file id
 */
  async deleteFile(id) {
    try {
      this.spinner.addSpinner();
      await this.client.delete(this.returnRoutes(this.routes.deleteFile, id))
    } catch (e) {
      console.log(e)
    } finally {
      this.spinner.removeSpinner();
    }
  }

  /**
 * upload files
 * @param {String} folderId  folder id where upload file
 * @param {Object} payload  {folderId: folder id where upload file, file: upload file}
 */
  async uploadFile(folderId, payload) {
    try {
      this.spinner.addSpinner();
      await this.client.post(this.returnRoutes(this.routes.uploadFile, folderId), payload)
    } catch (e) {
      console.log(e)
    } finally {
      this.spinner.removeSpinner();
    }
  }
}