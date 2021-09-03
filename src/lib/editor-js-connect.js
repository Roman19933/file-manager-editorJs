import FileManager from "./file-manager-plugin"
const iconSvg = `<svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="18px" height="18px"><path d="M 31.414063 6 C 30.886719 6 30.371094 6.214844 30 6.585938 L 29.585938 7 L 10 7 C 7.578125 7 5.554688 8.730469 5.101563 11.019531 C 6.253906 10.375 7.582031 10 9 10 L 17.171875 10 C 18.507813 10 19.761719 10.519531 20.707031 11.464844 L 22.242188 13 L 40 13 C 41.457031 13 42.820313 13.398438 44 14.082031 L 44 11 C 44 8.242188 41.757813 6 39 6 Z M 9 12 C 5.691406 12 3 14.691406 3 18 L 3 37 C 3 40.308594 5.691406 43 9 43 L 14.417969 43 C 15.46875 43.628906 16.691406 44 18 44 L 39 44 C 39.183594 44 39.359375 43.949219 39.515625 43.855469 C 43.710938 43.339844 47 39.832031 47 35.5 C 47 35.359375 46.992188 35.285156 46.988281 35.238281 C 46.992188 35.210938 47 35.144531 47 35 C 47 33.527344 46.632813 32.148438 46 30.933594 L 46 21 C 46 17.691406 43.308594 15 40 15 L 21.828125 15 C 21.566406 15 21.308594 14.894531 21.121094 14.707031 L 19.292969 12.878906 C 18.726563 12.3125 17.972656 12 17.171875 12 Z M 30.5 23 C 33.761719 23 36.566406 24.832031 37.996094 27.519531 C 38.148438 27.8125 38.441406 28.007813 38.769531 28.046875 C 42.277344 28.429688 45 31.382813 45 35 C 45 35 44.992188 35.070313 44.988281 35.21875 C 44.988281 35.234375 44.988281 35.257813 44.988281 35.277344 C 44.992188 35.410156 45 35.480469 45 35.5 C 45 38.957031 42.328125 41.753906 38.933594 41.976563 C 38.882813 41.980469 38.832031 41.988281 38.78125 42 L 18 42 C 15.226563 42 13 39.773438 13 37 C 13 34.671875 14.582031 32.738281 16.71875 32.171875 C 17.015625 32.09375 17.261719 31.878906 17.382813 31.59375 C 17.503906 31.308594 17.484375 30.984375 17.332031 30.714844 C 17.121094 30.339844 17 29.933594 17 29.5 C 17 28.109375 18.109375 27 19.5 27 C 20.230469 27 20.867188 27.3125 21.332031 27.8125 C 21.554688 28.054688 21.875 28.171875 22.199219 28.128906 C 22.523438 28.085938 22.804688 27.886719 22.953125 27.597656 C 24.371094 24.867188 27.207031 23 30.5 23 Z M 26 29 L 24.039063 32 L 31.25 32 L 33 29 Z M 37.09375 29 C 32.5625 29 32.53125 34 32.53125 34 L 32.375 36.03125 C 31.90625 40.0625 29 40 29 40 L 28 40 L 27.46875 41 L 31.71875 41 C 31.71875 41 35.28125 41 35.71875 37 C 35.71875 37 35.96875 34.09375 36 34 C 36.03125 33.90625 36.0625 31 39 31 C 39 31 39.964844 31.015625 40.441406 31.203125 L 41 30.5 C 38.84375 28.90625 37.09375 29 37.09375 29 Z M 22.730469 34 L 19.140625 39.496094 C 18.75 40.164063 19.230469 41 20 41 L 26 41 L 27.167969 39 L 23.703125 39 L 25 37 L 28.332031 37 L 30.082031 34 Z"/></svg>`;
const iconSvgResize = `<svg fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 182.931 182.931" style="enable-background: new 0 0 182.931 182.931" xml:space="preserve"><path d="M173.93,92.798c-4.971,0-9,4.029-9,9v50.404L30.728,18h50.404c4.971,0,9-4.029,9-9s-4.029-9-9-9H9C4.03,0,0,4.029,0,9 v72.132c0,4.971,4.029,9,9,9s9-4.029,9-9V30.729l134.202,134.202h-50.404c-4.971,0-9,4.029-9,9s4.029,9,9,9h72.132 c4.971,0,9-4.029,9-9v-72.132C182.93,96.828,178.901,92.798,173.93,92.798z"/></svg>`;
export default class EditorJsFm {
    constructor({
        data,
        config,
        api,
        readOnly
    }) {
        this.api = api;
        this.data = data;
        this.readOnly = readOnly;
        this.config = config;
        this.fm = new FileManager({
            config,
            api
        })
        this.flagChoose = true;
        this.flagImage = false;
        this.flagEditImage = false;
        this.node = {
            wrapper: null,
            name: null,
            url: null,
            button: null
        }
    }

    /**
     * Get Tool toolbox settings
     * icon - Tool icon's SVG
     * title - title to show in toolbox
     *
     * @returns {{icon: string, title: string}}
     */
    static get toolbox() {
        return {
            title: 'FileManager',
            icon: iconSvg
        };
    }

    /**
     * Get view settings
     * 
     * svg - View icon's SVG
     * type - type view setings
     * title - title view setings
     *
     * @returns {{type: string, title: string svg: string}}
     */
    get viewFileManager() {
        return [{
            type: 'resize',
            svg: iconSvgResize,
            title: 'Resize',
        }];
    }

    /**
     * standard function that creates additional plug-in settings
     * 
     * @returns DOM elevet
     */
    renderSettings() {
        const viewWrapper = document.createElement('div');

        if (this.flagImage || this.data.type === 'image') {
            this.viewFileManager.forEach(view => {
                const selectTypeButton = document.createElement('span');

                selectTypeButton.classList.add(this.api.styles.settingsButton);

                if (this.data.type === view.type) {
                    selectTypeButton.classList.add(this.api.styles.settingsButtonActive);
                }

                selectTypeButton.innerHTML = view.svg;

                selectTypeButton.dataset.viewFileManager = view.type;


                this.api.tooltip.onHover(selectTypeButton, view.title, {
                    placement: 'top',
                });

                selectTypeButton.addEventListener('click', () => {

                    if (view.type === 'resize') {

                        this.setSizeImg(selectTypeButton)
                        this.api.toolbar.close()
                        this.api.tooltip.hide(selectTypeButton)

                    }
                });

                viewWrapper.appendChild(selectTypeButton);
            });
        } else {
            return [];
        }

        return viewWrapper;
    }

    /**
       * function which change size picture
       */
    setSizeImg(btn) {
        // create element
        let div = document.createElement("div"),
            nodeWrapper = this.node.wrapper,
            $this = this

        div.innerHTML = `
          <span>x:</span><input type="number" id="resizeX" class="cdx-input fm-resize__input">
          <span>Y:</span><input type="number" id="resizeY" class="cdx-input fm-resize__input">
          <button type="button" class="fm-resize__btn">ok</button>`;

        div.classList.add('fm-resize')
        nodeWrapper.appendChild(div)

        let img = nodeWrapper.querySelector('img'),
            btnResize = nodeWrapper.querySelector('.fm-resize__btn'),
            x = nodeWrapper.querySelector('#resizeX'),
            y = nodeWrapper.querySelector('#resizeY')

        x.value = $this.node.width
        y.value = $this.node.height

        // close window which change size
        let close = (() => {
            nodeWrapper.removeChild(div)
            document.removeEventListener('click', missClick)
        })

        // miss click
        let missClick = function (e) {
            if (!div.contains(e.target) && !btn.contains(e.target)) {
                close()
            }
        }
        document.addEventListener("click", missClick)

        // change size methods
        btnResize.addEventListener('click', function () {
            // let width = `${x.value}px`,
            //     height = `${y.value}px`

            img.style.width = `${x.value}px`
            img.style.height = `${y.value}px`

            $this.data.width = x.value
            $this.data.height = y.value
            close()
        })


    }


    /**
     * Renders Block content
     *
     * @public
     *
     * @returns {HTMLDivElement}
     */
    render() {
        this.node.wrapper = document.createElement('div');
        this.node.wrapper.classList.add('node-wrapper')
        if (Object.keys(this.data).length && this.flagChoose) {
            if (this.data.type === 'file') {
                let a = document.createElement('a');
                a.setAttribute('href', this.data.url);
                a.text = this.data.name
                this.node.wrapper.appendChild(a)
            } else if (this.data.type === 'image') {
                let img = document.createElement('img');
                img.style.width = `${this.data.width}px`
                img.style.height = `${this.data.height}px`
                img.setAttribute('src', this.data.url);
                let input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.setAttribute('value', this.data.name);
                input.classList.add('cdx-input');
                this.node.name = input;
                this.node.width = this.data.width || '';
                this.node.height = this.data.height || '';
                this.node.wrapper.appendChild(img)
                this.node.wrapper.appendChild(input)
                this.flagEditImage = true
            } else {
                let audio = document.createElement('audio');
                let source = document.createElement('source');
                audio.setAttribute('controls', true)
                source.setAttribute('src', this.data.url)
                audio.appendChild(source);
                this.node.wrapper.appendChild(audio);
            }
            this.flagChoose = false

        } else {
            this.node.button = document.createElement('button');
            this.node.button.classList.add('cdx-button');
            this.node.button.setAttribute('data-openfm', true);
            this.node.button.setAttribute('type', 'button');
            this.node.button.innerText = "Open File Manager"
            this.node.wrapper.append(this.node.button)
            this.node.button.addEventListener('click', () => {
                this.fm.open()
            });
            this.fm.open()
        }
        return this.node.wrapper;
    }

    /**
     * Return Block data
     *
     * @public
     *
     * @returns {FileData}
     */
    save(e) {
        this.api.events.on('add:file', (event) => {
            if (event && this.flagChoose) {
                this.node.button.remove();
                e.insertAdjacentHTML('afterbegin', event.html)
                this.getFile({
                    type: event.type,
                    name: event.objNode.title
                })
                this.flagChoose = false
            }
        });
        if (this.flagImage) {
            Object.assign(this.data, {
                url: this.node.url.src,
                name: this.node.name.value,
                type: 'image'
            });
        }
        if (this.flagEditImage) {
            this.data.name = this.node.name.value
        }
        return this.data
    }

    /**
     * 
     * @param {String} type the type of file selected
     * @param {String} name the name of file selected
     * this method forms a date object
     */
    getFile({
        type,
        name
    }) {
        if (type === 'image') {
            this.node.name = this.node.wrapper.querySelector('input')
            this.node.url = this.node.wrapper.querySelector('img')
            this.flagImage = true;
        } else if (type === 'file') {
            this.node.name = this.node.wrapper.querySelector('a').text
            this.node.url = this.node.wrapper.querySelector('a').href
            Object.assign(this.data, {
                url: this.node.url,
                name: this.node.name,
                type: 'file'
            });
        } else {
            this.node.name = name
            this.node.url = this.node.wrapper.querySelector('audio source').src
            Object.assign(this.data, {
                url: this.node.url,
                name: this.node.name,
                type: 'audio'
            });
        }
    }

}
