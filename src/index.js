import './style/main.scss';
import EditorJsFm from './lib/editor-js-connect';
const editor = new EditorJS({
    autofocus: true,
    holder: 'editorjs',
    tools: {
        fileManagerImage: {
            class: EditorJsFm,
            config: {
                lang: "ru",
                token: "token",
                apiUrl: "https://example/api/v1",
                uploadUrl: "https://example",
                routes: {
                    allFoldersOrCurentFolder: 'filemanager/folders',
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