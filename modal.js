class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isOpen = false;
        this.shadowRoot.innerHTML = `
          <style>
            .modal-overlay {
                background: rgba(0, 0, 0, 0.6);
                width: 100%;
                height: 100%;
                position: fixed;
                left: 0;
                top: 0;
                visibility: hidden;
            }
            :host([opened]) .modal-overlay,
            :host([opened]) .modal {
                visibility: visible;
                pointer-events: all;

                transform: scale(1);
                transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
            }
           
            .modal {
                position: fixed;
                top: 10vh;
                left: 25%;
                width: 50%;
                z-index: 100;
                background: white;
                border-radius: 3px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.26);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                visibility: hidden;
                transform: scale(1.1);
                transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
                padding: 15px
            }

            ::slotted(h1) {
                font-size: 1.25rem;
                margin: 0;
            }
          </style>
            <div class='modal-overlay'></div>
            <div class="modal">
                <div class="title">
                    <slot name="title"></slot>
                </div>
                <div class="content">
                    <slot name="content"></slot>
                </div>
                <div class="footer">
                    <button class="btn-close">CLOSE</button>
                </div>
            </div>
      `;
     
        const backdrop = this.shadowRoot.querySelector('.modal-overlay');
        backdrop.addEventListener('click', this._cancel.bind(this));
        const closeBtn = this.shadowRoot.querySelector('.btn-close');
        closeBtn.addEventListener('click', this._cancel.bind(this));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.isOpen = this.hasAttribute('opened')
    }

    static get observedAttributes() {
        return ['opened'];
    }

    open() {
        this.setAttribute('opened', '');
    }

    _cancel(event) {
        if (this.hasAttribute('opened')) {
            this.removeAttribute('opened');
        }
        const closeEvt = new Event('close', { bubbles: true, composed: true });
        event.target.dispatchEvent(closeEvt);
    }
}

customElements.define('my-modal', Modal);
