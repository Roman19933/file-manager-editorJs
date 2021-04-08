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

## Config Params

| Field          | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| token          | `string`  | authorization token             |
| apiUrl         | `string`  | route to the API                |
| uploadUrl      | `string`  | domain where is image/file      |
| routes         | `object`  | routes for work with api        |
