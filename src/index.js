import './style/main.scss';
import EditorJsFm from './lib/editor-js-connect';
const editor = new EditorJS({
    autofocus: true,
    holder: 'editorjs',
    tools: {
        fileManagerImage: {
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
                    uploadFile: 'filemanager/folders/${_id}/file',
                }
            }
        }
    }
});
export default EditorJsFm;