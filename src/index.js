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
            }
        }
    }
});
export default EditorJsFm;