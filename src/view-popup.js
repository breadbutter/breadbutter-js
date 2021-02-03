import view from './view';

const POPUP_ID = 'breadbutter-popup';
const POPUP_HOLDER_ID = 'breadbutter-popup-holder';
const POPUP_HEADER_ID = 'breadbutter-popup-header';
const POPUP_WRAPPER_ID = 'breadbutter-popup-wrapper';

const MASK_HOLDER_ID = 'breadbutter-mask';

const ARROW_HOLDER_ID = 'breadbutter-floating-arrow-holder';

const TEXT_HOLDER_ID = 'breadbutter-floating-text-holder';
const TEXT_ID = 'breadbutter-floating-text';
const MESSAGE_HOLDER_ID = 'breadbutter-floating-message-holder';
const MESSAGE_ID = 'breadbutter-floating-message';
const MORE_ID = 'breadbutter-floating-more';
const TEXT_TITLE_ID = 'breadbutter-floating-text-title';

import lang from './locale.js';
import './scss/view-popup.scss';
import viewForm from './view-form.js';

const ArrowTopLeft = `
<svg xmlns="http://www.w3.org/2000/svg" width="85.58" height="50.443" viewBox="0 0 85.58 50.443">
    <g id="Group_2254" data-name="Group 2254" transform="translate(-1661.785 6446.49) rotate(-96)">
        <path id="Path_1103" data-name="Path 1103" d="M555.22,773.325s-27.778,5.908-24.813,63.412" transform="matrix(-0.966, -0.259, 0.259, -0.966, 6517.896, 3290.785)" fill="none" stroke-linecap="round" stroke-width="4"/>
        <path id="Polygon_1" data-name="Polygon 1" d="M10.264,3.039a2,2,0,0,1,3.473,0L22.29,18.008A2,2,0,0,1,20.554,21H3.446A2,2,0,0,1,1.71,18.008Z" transform="translate(6213.694 2324.025) rotate(11)" />
    </g>
</svg>
`;

const ArrowTopRight = `
<svg xmlns="http://www.w3.org/2000/svg" width="85.58" height="50.443" viewBox="0 0 85.58 50.443" style="transform:scale(-1,1)">
    <g id="Group_2254" data-name="Group 2254" transform="translate(-1661.785 6446.49) rotate(-96)">
        <path id="Path_1103" data-name="Path 1103" d="M555.22,773.325s-27.778,5.908-24.813,63.412" transform="matrix(-0.966, -0.259, 0.259, -0.966, 6517.896, 3290.785)" fill="none" stroke-linecap="round" stroke-width="4"/>
        <path id="Polygon_1" data-name="Polygon 1" d="M10.264,3.039a2,2,0,0,1,3.473,0L22.29,18.008A2,2,0,0,1,20.554,21H3.446A2,2,0,0,1,1.71,18.008Z" transform="translate(6213.694 2324.025) rotate(11)" />
    </g>
</svg>
`;

const ArrowBottomLeft = `
<svg xmlns="http://www.w3.org/2000/svg" width="85.58" height="50.443" viewBox="0 0 85.58 50.443" style="transform:scale(1,-1)">
    <g id="Group_2254" data-name="Group 2254" transform="translate(-1661.785 6446.49) rotate(-96)">
        <path id="Path_1103" data-name="Path 1103" d="M555.22,773.325s-27.778,5.908-24.813,63.412" transform="matrix(-0.966, -0.259, 0.259, -0.966, 6517.896, 3290.785)" fill="none" stroke-linecap="round" stroke-width="4"/>
        <path id="Polygon_1" data-name="Polygon 1" d="M10.264,3.039a2,2,0,0,1,3.473,0L22.29,18.008A2,2,0,0,1,20.554,21H3.446A2,2,0,0,1,1.71,18.008Z" transform="translate(6213.694 2324.025) rotate(11)" />
    </g>
</svg>
`;

const ArrowBottomRight = `
<svg xmlns="http://www.w3.org/2000/svg" width="85.58" height="50.443" viewBox="0 0 85.58 50.443" style="transform:scale(-1,-1)">
    <g id="Group_2254" data-name="Group 2254" transform="translate(-1661.785 6446.49) rotate(-96)">
        <path id="Path_1103" data-name="Path 1103" d="M555.22,773.325s-27.778,5.908-24.813,63.412" transform="matrix(-0.966, -0.259, 0.259, -0.966, 6517.896, 3290.785)" fill="none" stroke-linecap="round" stroke-width="4"/>
        <path id="Polygon_1" data-name="Polygon 1" d="M10.264,3.039a2,2,0,0,1,3.473,0L22.29,18.008A2,2,0,0,1,20.554,21H3.446A2,2,0,0,1,1.71,18.008Z" transform="translate(6213.694 2324.025) rotate(11)" />
    </g>
</svg>
`;

let TEXT_MARGIN = 650;

let Locale = {};
let APP_NAME = false;
let currentPopup = false;
let currentMask = false;

let EVENT_CALLBACK = [];

const FORM = {
    TITLE: 'popup-title',
    CLOSE: 'popup-close',
};

const EVENT = {
    FORM_CLOSE: 'formclose'
};

const DATA = {
    show_login_focus: true
};

const loadApp = function (options) {
    if (options.app_name) {
        APP_NAME = options.app_name;
    }
};

const loadLanguage = function (options) {
    if (options.language) {
        let locale = lang.getLocale(options.language, options.locale);
        if (locale) {
            Locale = locale;
        }
    }
};

const loadOptions = function (options) {
    loadLanguage(options);
};

const init = function (options) {
    loadOptions(options);
    loadApp(options);
};

const addForm = function (options) {
    let view = createView(options);
    options.popup = true;

    viewForm.addForm(view, options);
};

const addRegister = function (options) {
    let view = createView(options);
    options.popup = true;

    viewForm.addRegister(view, options);
};

const addReset = function (options) {
    let view = createView(options);
    options.popup = true;

    viewForm.addReset(view, options);
};

const addConfirm = function (options) {
    let view = createView(options);
    options.popup = true;

    viewForm.addConfirm(view, options);
};

const addView = function (id) {
    let container = false;
    if (id) {
        container = document.createElement('div');
        container.classList.add(id);
    }
    return container;
};

const addSpanView = function (id) {
    let container = false;
    if (id) {
        container = document.createElement('span');
        container.classList.add(id);
    }
    return container;
};

const parsePosition = function(position) {
    let pos = position;
    if (!isNaN(position)) {
        pos += 'px';
    }
    return pos;
}

const createView = function (options) {
    options.onProvider = triggerProvider;
    options.adjustHeader = triggerAdjustHeader;

    if (typeof options.onFormClose == 'function') {
        EVENT_CALLBACK.push(options.onFormClose);
    }
    if (typeof options.show_login_focus != 'undefined') {
        DATA.show_login_focus = options.show_login_focus;
    } else {
        DATA.show_login_focus = true;
    }

    closeForm();
    let popup = addView(POPUP_ID);

    if (options.continue_with_position) {
        if (options.continue_with_position.top) {
            popup.style.top = parsePosition(options.continue_with_position.top);
        } else if (options.continue_with_position.bottom) {
            popup.style.bottom = parsePosition(options.continue_with_position.bottom);
        }
        if (options.continue_with_position.left) {
            popup.style.left = parsePosition(options.continue_with_position.left);
        } else if (options.continue_with_position.right) {
            popup.style.right = parsePosition(options.continue_with_position.right);
        }
    } else {
        popup.style.top = '30px';
        popup.style.right = '30px';
    }


    let header = addView(POPUP_HEADER_ID);
    let holder = addView(POPUP_HOLDER_ID);
    let wrapper = addView(POPUP_WRAPPER_ID);
    popup.appendChild(wrapper);
    wrapper.appendChild(header);
    wrapper.appendChild(holder);

    header.appendChild(getTitle());
    header.appendChild(getCloseIcon());
    document.body.append(popup);
    currentPopup = popup;

    return holder;
};

const triggerAdjustHeader = function(show) {
    let wrapper = findChild(currentPopup, POPUP_WRAPPER_ID);
    let header = findChild(wrapper, POPUP_HEADER_ID);
    let title = findChild(header, FORM.TITLE);
    if (show) {
        title.innerText = getTitleText();
    } else {
        title.innerText = "";
    }
};

const triggerProvider = function(advanced) {
    if (advanced) {
        assignMask();
        setupScrollingTrigger();
    }
};

let scrolling = false;
let scrollPosition = false;
let scrollTimer = false;

const setupScrollingTrigger = function() {
    window.addEventListener('scroll', function(event){
        scrollingTrigger(event);
    }, true);
};

const scrollingTrigger = function(event) {
    let windowHeight = window.innerHeight;
    let scrollArea = windowHeight / 10;
    let scrollNow = event.target.scrollTop ? event.target.scrollTop : (event.target.scrollingElement ? event.target.scrollingElement.scrollTop : 0);
    clearTimeout(scrollTimer);
    if (scrolling == false) {
        scrollPosition = scrollNow;
        scrolling = true;
    } else if (Math.abs(scrollNow - scrollPosition) > scrollArea){
        let wrapper = findChild(currentPopup, POPUP_WRAPPER_ID);
        let holder = findChild(wrapper, POPUP_HOLDER_ID);
        holder.classList.add('scrolling');
    }
    scrollTimer = setTimeout(function(){
        scrolling = false;
        scrollPosition = false;
    }, 5000);
};

const assignMask = function() {
    if (DATA.show_login_focus) {
        closeMask();
        currentMask = getMask();
        document.body.append(currentMask);

        assignTextLocation();
    }
};

const assignTextLocation = function() {
    let popup = currentPopup;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const offsetLeft = popup.offsetLeft;
    const offsetRight = windowWidth - (popup.offsetLeft + popup.offsetWidth);
    const offsetTop = popup.offsetTop;
    const offsetBottom = windowHeight - (popup.offsetTop + popup.offsetHeight);

    let fit = false;
    let left = false;
    let bottom = false;

    if (offsetLeft > TEXT_MARGIN || offsetRight > TEXT_MARGIN) {
        fit = true;
    }

    if (offsetLeft >= offsetRight) {
        left = true;
    }
    if (offsetBottom >= offsetTop) {
        bottom = true;
    }

    let text_holder = getTextHolder();
    currentPopup.appendChild(text_holder);
    if (fit) {
        text_holder.classList.add(left ? 'left' : 'right');
        text_holder.classList.add(bottom ? 'bottom' : 'top');

        if (bottom) {
            text_holder.appendChild(getArrowIcon(left, bottom));
            text_holder.appendChild(getTextTitle());
            text_holder.appendChild(getText());
            text_holder.appendChild(getMessage());
        } else {
            text_holder.appendChild(getTextTitle());
            text_holder.appendChild(getText());
            text_holder.appendChild(getMessage());
            text_holder.appendChild(getArrowIcon(left, bottom));
        }
    } else {
        text_holder.classList.add('nowhere');
        text_holder.appendChild(getTextTitle());
        text_holder.appendChild(getText());
        text_holder.appendChild(getMessage());
    }
};

const getTextHolder = function(){
  let b = addView(TEXT_HOLDER_ID);
  return b;
};

const getTextTitle = function() {
    let b = addView(TEXT_TITLE_ID);
    b.innerHTML = Locale.POPUP.TEXT_1;
    return b;
};

const getText = function() {
    let b = addView(TEXT_ID);
    b.innerHTML = Locale.POPUP.TEXT_2;
    return b;
};

const getMessage = function() {
    let a = addView(MESSAGE_HOLDER_ID);

    let b = addSpanView(MESSAGE_ID);
    b.innerHTML = Locale.POPUP.TEXT_3;

    let c = addSpanView(MORE_ID);
    c.innerHTML = Locale.POPUP.MORE;
    c.addEventListener("click", function() {
        b.innerHTML = Locale.POPUP.TEXT_3_2;
        this.remove();
    });
    a.appendChild(b);
    a.appendChild(c);
    return a;
};

const getArrowIcon = function(left, bottom) {
    let svg = addView(ARROW_HOLDER_ID);
    let arrow = false;
    if (left) {
        if (bottom) {
            arrow = ArrowTopRight;
        } else {
            arrow = ArrowBottomRight;
        }
    } else {
        if (bottom) {
            arrow = ArrowTopLeft;
        } else {
            arrow = ArrowBottomLeft;
        }
    }
    svg.innerHTML = arrow;

    return svg;
}

const getTitleText = function() {
    let text = Locale.POPUP.HEADER_1;
    if (APP_NAME) {
        text = lang.replace({ APP_NAME }, Locale.POPUP.HEADER_2);
    }
    return text;
};

const getTitle = function () {
    let text = getTitleText();
    let b = view.addBlock('div', FORM.TITLE);
    b.innerHTML = text;
    return b;
};

const getCloseIcon = function () {
    let b = view.addBlock('button', FORM.CLOSE);
    b.innerHTML = getCloseIconSvg();
    b.onclick = triggerClosePopup;
    return b;
};

const getMask = function () {
    let m = addView(MASK_HOLDER_ID);
    // m.onclick = triggerCloseMask;
    m.onclick = triggerClosePopup;
    return m;
}

const getCloseIconSvg = function () {
    return `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 40" style="enable-background:new 0 0 40 40;" xml:space="preserve">
<g>
<path class="st0" d="M27.26,15.54l-4.36,4.46l4.36,4.46c0.8,0.82,0.8,2.15,0,2.97c-0.8,0.82-2.1,0.82-2.9,0L20,22.97l-4.36,4.46
c-0.8,0.82-2.1,0.82-2.9,0c-0.8-0.82-0.8-2.15,0-2.97l0,0L17.1,20l-4.36-4.46c-0.8-0.82-0.8-2.15,0-2.97c0.8-0.82,2.1-0.82,2.9,0
L20,17.03l4.36-4.46c0.8-0.82,2.1-0.82,2.9,0C28.06,13.39,28.06,14.72,27.26,15.54L27.26,15.54z"/>
</g>
</svg>`;
};

const cleanChild = function (holder) {
    if (holder) {
        while (holder.firstChild) {
            holder.removeChild(holder.lastChild);
        }
    }
};

const findChild = function (container, child) {
    let c = false;
    for (let i = 0; container.children && i < container.children.length; i++) {
        if (container.children[i].classList.contains(child)) {
            c = container.children[i];
        }
    }
    return c;
};

const findParents = function (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
};

const triggerClosePopup = function () {
    if (currentPopup) {
        closeForm();
        for(let i = 0; i < EVENT_CALLBACK.length; i++) {
            let cb = EVENT_CALLBACK[i];
            if (typeof cb == 'function') {
                cb(EVENT.FORM_CLOSE);
            }
        }
    }
};

const triggerCloseMask = function() {
    if (currentMask) {
        closeMask();
    }
};

const closeMask = function() {
    if (currentMask) {
        let p = currentMask.parentElement;
        p.removeChild(currentMask);
        currentMask = false;
    }

    if (currentPopup) {
        let text = findChild(currentPopup, TEXT_HOLDER_ID);
        if (text) {
            currentPopup.removeChild(text);
        }
    }
};

const closeForm = function() {
    if (currentPopup) {
        let p = currentPopup.parentElement;
        p.removeChild(currentPopup);
        currentPopup = false;
    }
    closeMask();
};

export default {
    addForm,
    addRegister,
    addReset,
    addConfirm,
    init,
};
