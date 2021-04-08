# File Manager To EditorJs

This file manager works with files and photos.

## Installation

### Install via NPM

Get the package

```shell
npm i --save-dev @editorjs/simple-image
```

Include module at your application

```javascript
import EditorJsFm from "file-manager-editor-js/src/lib/editor-js-connect";
```

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...
  
  tools: {
    ...
    fileManager: {
      class: EditorJsFm,
      config: {
        token: "token",
        apiUrl: "https://example/api/v1",
        uploadUrl: "https://example",
        routes: {
            allFoldersOrCurentFolder: 'filemanager/folders/2' or 'filemanager/folders',
            subFoldersAndFiles: 'filemanager/folders/${_id}',
            updateFolder: 'filemanager/folder/${_id}',
            deleteFolder: 'filemanager/folder/${_id}',
            createFolder: 'filemanager/folders',
            updateFile: 'filemanager/file/${_id}',
            deleteFile: 'filemanager/file/${_id}',
            uploadFile: 'filemanager/folders/${_id}/file'
        }
      }
    }
  }
  
  ...
});
```
<strong>${_id}</strong> - this means that route will contain an id (that is, action on the specific folder or file or image)

## Config Params

| Field          | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| token          | `string`  | authorization token             |
| apiUrl         | `string`  | route to the API                |
| uploadUrl      | `string`  | domain where is image/file      |
| routes         | `object`  | routes for work with api        |

## Routes

| Route                     | Description                     |
| --------------------------| ------------------------------- |
| allFoldersOrCurentFolder  | On this route we receive all folders from the server, or a specific folder to id             |
| subFoldersAndFiles        | On this route we receive all folders and files/images to a specific folder               |
| updateFolder              | On this route we edit a folder      |
| deleteFolder              | On this route we deleted a folder        |
| createFolder              | On this route we create subFolder        |
| updateFile                | On this route we edit a file/image        |
| deleteFile                | On this route we deleted a file/image       |
| uploadFile                | On this route we upload file/image to folder        |

If route <strong>allFoldersOrCurentFolder</strong> includes <strong>id</strong> to folder <strong>'filemanager/folders/ID'</strong>, server response 
must be an object.

If route <strong>allFoldersOrCurentFolder</strong> does not include <strong>id</strong> to folder <strong>'filemanager/folders'</strong>, server response 
must be an array of objects.

Routes <strong>allFoldersOrCurentFolder</strong> have required fields:

| Field          | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| title          | `string`  | folder name            |
| id         | `string`  | folder id               |

Routes <strong>subFoldersAndFiles</strong> have required fields:

| Field          | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| title          | `string`  | folder name            |
| id         | `string`  | folder id               |
| File         | `array`  | file to main folder               |
| Folder         | `array`  | subFolder to main folder              |

Field <strong>File</strong> have required fields:

| Field          | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| alt          | `string`  | alt            |
| id         | `string`  | id               |
| mime         | `string`  | mime type ('application/msword','image/png', ...)            |
| path         | `string`  | path to file or image without domain ('/uploads/2021-04-08/1617882721-1614172940-ExamTests_V1-(1).doc')               |
| title         | `string`  | file name               |

Field <strong>Folder</strong> have required fields:

| Field          | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| id         | `string`  | id               |
| title         | `string`  | file name               |

## Output data

| Field          | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| url            | `string`  | image's/files url                     |
| name        | `string`  | image's/files name                 |
| type     | `string` | type ('image' or 'file')            |


```json
{
    "type" : "image or file",
    "data" : {
        "url" : "https://example/hero.jpg",
        "name" : "Name",
        "type" : "image or file"
    }
}
```
