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
        apiUrl: "https://api-oprosi.demka.online/api/v1",
        uploadUrl: "https://api-oprosi.demka.online",
        routes: {
            allFoldersOrCurentFolder: 'filemanager/folders/425bce23-df39-4d41-8fb0-bedced304f70',
            subFoldersAndFiles: 'filemanager/folders/${_id}',
            updateFolder: 'filemanager/folder/${_id}',
            deleteFolder: 'filemanager/folder/${_id}',
            createFolder: 'filemanager/folders',
            updateFile: 'filemanager/file/${_id}',
            deleteFile: 'filemanager/file/${_id}',
            uploadFile: 'filemanager/folders/${_id}/file', - sss
        }
      }
    }
  }
  
  ...
});
```

## Config Params

| Field          | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| token          | `string`  | authorization token             |
| apiUrl         | `string`  | route to the API                |
| uploadUrl      | `string`  | domain where is image/file      |
| routes         | `object`  | routes for work with api        |
