import view from './view';

const POPUP_ID = 'breadbutter-popup';
const POPUP_HOLDER_ID = 'breadbutter-popup-holder';
const POPUP_HEADER_ID = 'breadbutter-popup-header';
const POPUP_WRAPPER_ID = 'breadbutter-popup-wrapper';

const TRANSPARENT_MASK_ID = 'breadbutter-mask-transparent';
const MASK_HOLDER_ID = 'breadbutter-mask';

const ARROW_HOLDER_ID = 'breadbutter-floating-arrow-holder';

const TEXT_HOLDER_ID = 'breadbutter-floating-text-holder';
const TEXT_ID = 'breadbutter-floating-text';
const MESSAGE_HOLDER_ID = 'breadbutter-floating-message-holder';
const MESSAGE_ID = 'breadbutter-floating-message';
const MORE_ID = 'breadbutter-floating-more';
const TEXT_TITLE_ID = 'breadbutter-floating-text-title';

const BLUR_HEADER_ID = 'breadbutter-blur-header';

import loader from './utils/loader.js';
import lang from './locale.js';
import './scss/view-popup.scss';

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

const ArrowDown = `
<svg xmlns="http://www.w3.org/2000/svg" width="85.58" height="50.443" viewBox="0 0 85.58 50.443" style="transform:scale(.5,-.5)rotate(85deg)">
    <g id="Group_2254" data-name="Group 2254" transform="translate(-1661.785 6446.49) rotate(-96)">
        <path id="Path_1103" data-name="Path 1103" d="M555.22,773.325s-27.778,5.908-24.813,63.412" transform="matrix(-0.966, -0.259, 0.259, -0.966, 6517.896, 3290.785)" fill="none" stroke-linecap="round" stroke-width="4"/>
        <path id="Polygon_1" data-name="Polygon 1" d="M10.264,3.039a2,2,0,0,1,3.473,0L22.29,18.008A2,2,0,0,1,20.554,21H3.446A2,2,0,0,1,1.71,18.008Z" transform="translate(6213.694 2324.025) rotate(11)" />
    </g>
</svg>
`;

const FORM = {
    TITLE: 'popup-title',
    CLOSE: 'popup-close',
    MOBILE_HANDLER: 'bb-mobile-handler',
    MOBILE_DROPDOWN: 'bb-mobile-dropdown'
};

const EVENT = {
    FORM_CLOSE: 'formclose'
};

const DATA = {
    show_login_focus: true,
    hide_on_focus: true,
    hide_focus_text: false

};

const VIEWPOPUP = function() {

    let TEXT_MARGIN = 650;

    let MOBILE_TEXT_MARGIN = 300;

    let Locale = {};
    let APP_NAME = false;
    let currentPopup = false;
    let currentMask = false;

    let EVENT_CALLBACK = [];

    const loadApp = function(options) {
        if (options.app_name) {
            APP_NAME = options.app_name;
        }
    };

    const loadLanguage = function(options) {
        let locale = lang.getLocale(options.language, options.locale);
        if (locale) {
            Locale = locale;
        }
    };

    const loadOptions = function(options) {
        detectMobile();
        loadLanguage(options);
    };

    const init = function(options) {
        loadOptions(options);
        loadApp(options);
    };

    const addForm = function(options, form) {
        isDeIdentification = false;
        let view = createView(options);
        options.popup = true;
        loader.start(view, true, true);
        // console.log(options);
        form.addForm(view, options);
    };

    const addRegister = function(options, form) {
        isDeIdentification = false;
        let view = createView(options);
        options.popup = true;

        form.addRegister(view, options);
    };

    const addReset = function(options, form) {
        isDeIdentification = false;
        let view = createView(options);
        options.popup = true;

        form.addReset(view, options);
    };

    const addMagicLink = function(options, form) {
        isDeIdentification = false;
        let view = createView(options);
        options.popup = true;

        form.addMagicLink(view, options);
    };

    const addConfirm = function(options, form) {
        isDeIdentification = false;
        let view = createView(options);
        options.popup = true;

        form.addConfirm(view, options);
    };

    const deIdentification = function(options, form) {
        isDeIdentification = true;
        let view = createView(options);
        options.popup = true;

        form.deIdentification(view, options);
    };

    const addCustomForm = function(options, form) {
        isDeIdentification = true;
        let view = createView(options);
        options.popup = true;

        form.addCustomForm(view, options);
    };

    const addContactUs = function(options, form) {
        isContactUs = true;
        isDeIdentification = false;
        let view = createView(options);
        options.popup = true;

        form.addContactUs(view, options);
    };

    const addView = function(id) {
        let container = false;
        if (id) {
            container = document.createElement('div');
            container.classList.add(id);
        }
        return container;
    };

    const addSpanView = function(id) {
        let container = false;
        if (id) {
            container = document.createElement('span');
            container.classList.add(id);
        }
        return container;
    };

    const parsePosition = function(position) {
        return view.parsePosition(position);
    }

    let isDeIdentification = false;
    let isContactUs = false;
    let isMobile = false;
    const detectMobile = function() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // true for mobile device
            isMobile = true;
        }
        // isMobile = false;
    }

    let CONTINUE_WITH_HOVER = {
        enabled: true,
        distance: 5,
        original: 30
    };
    let SKIP_SCROLLING = false;

    let VIEW_OPTIONS = false;
    const createView = function(options) {
        // console.log(options);
        options.onProvider = triggerProvider;
        options.onFormEntry = triggerFormEntry;
        if (isMobile) {
            // options.button_theme = 'round-icons';
        }
        options.onLogin = triggerLogin;
        options.onBlur = triggerBlur;
        options.adjustHeader = triggerAdjustHeader;
        options.addEvent = addEvent;
        options.forceQuit = triggerClosePopup;
        options.onFocus = triggerFocus;
        options.onToggleMobile = triggerToggleMobile;
        SKIP_SCROLLING = options.skipScrolling ? options.skipScrolling : false;
        options.isContinueWith = true;
        TRIGGER_EVENT = {};

        if (typeof options.internalOnFormClose == 'function') {
            EVENT_CALLBACK.push(options.internalOnFormClose);
        }
        if (typeof options.onFormClose == 'function') {
            EVENT_CALLBACK.push(options.onFormClose);
        }

        EVENT_CALLBACK.push(() => {
            if (options.contact_us) {
                if (localStorage) {
                    localStorage.removeItem('breadbutter-start-contact-sign-in-' + btoa(document.location.pathname));
                }
            }
        })

        if (typeof options.show_login_focus != 'undefined') {
            DATA.show_login_focus = options.show_login_focus;
        } else {
            DATA.show_login_focus = true;
        }

        if (typeof options.hide_focus_text != 'undefined') {
            DATA.hide_focus_text = options.hide_focus_text;
        } else {
            DATA.hide_focus_text = false;
        }

        if (typeof options.hide_on_focus != 'undefined') {
            DATA.hide_on_focus = options.hide_on_focus;
        } else {
            DATA.hide_on_focus = true;
        }

        // if (isMobile) {
        // DATA.show_login_focus = false;
        // }
        CONTINUE_WITH_HOVER.enabled = options.continue_with_hover;
        CONTINUE_WITH_HOVER.distance = options.continue_with_hover_distance;

        closeForm();
        let popup = addView(POPUP_ID);

        if (!isMobile) {
            if (options.continue_with_position) {
                if (options.continue_with_position == 'center') {
                    popup.style.top = '50%';
                    popup.style.left = '50%';
                    popup.style.transform = 'translate(-50%, -50%)';
                } else {
                    if (options.continue_with_position.top) {
                        popup.style.top = parsePosition(options.continue_with_position.top);
                        CONTINUE_WITH_HOVER.original = options.continue_with_position.top;
                    } else if (options.continue_with_position.bottom) {
                        popup.style.bottom = parsePosition(options.continue_with_position.bottom);
                        CONTINUE_WITH_HOVER.enabled = false;
                    } else {
                        popup.style.top = '30px';
                    }
                    if (options.continue_with_position.left) {
                        popup.style.left = parsePosition(options.continue_with_position.left);
                    } else if (options.continue_with_position.right) {
                        popup.style.right = parsePosition(options.continue_with_position.right);
                    } else {
                        popup.style.right = '30px';
                    }
                }
            } else {
                popup.style.top = '30px';
                popup.style.right = '30px';
            }
        } else {
            popup.classList.add('bb-mobile-device');
        }
        //console.log(popup);

        let header = addView(POPUP_HEADER_ID);
        let holder = addView(POPUP_HOLDER_ID);
        let wrapper = addView(POPUP_WRAPPER_ID);
        popup.appendChild(wrapper);
        wrapper.appendChild(header);
        wrapper.appendChild(holder);

        if (isMobile) {
            header.appendChild(getMobileHandler())
        }
        header.appendChild(getTitle());
        if (!isMobile && !options.locked) {
            header.appendChild(getCloseIcon());
        }

        if (!isMobile && !isDeIdentification && !options.locked && !isContactUs) {
            setupScrollingMoveTrigger();
            setupScrollingTrigger();
        }
        document.body.append(popup);
        currentPopup = popup;
        if (isContactUs) {
            popup.classList.add('contactus-popup');
        }

        assignMask(options.locked);
        popup.style.zIndex = view.getIndex()
        VIEW_OPTIONS = options;
        return holder;
    };

    const triggerFocus = function(focus) {
        if (isMobile) {
            if (focus) {
                currentPopup.classList.add('bb-input-focusing');
            } else {
                currentPopup.classList.remove('bb-input-focusing');
            }
        }
    }

    const triggerBlur = function(height) {
        // console.log('triggerBlur');
        let wrapper = findChild(currentPopup, POPUP_WRAPPER_ID);
        if (height) {
            let b = findChild(wrapper, BLUR_HEADER_ID);
            if (!b) {
                b = addView(BLUR_HEADER_ID);
                wrapper.appendChild(b);
            }
            b.style.bottom = height + 'px';
        } else {
            let b = findChild(wrapper, BLUR_HEADER_ID);
            if (b) {
                b.remove();
            }
        }
    };

    const triggerAdjustHeader = function(show) {
        // console.log('triggerAdjustHeader');
        if (isContactUs)
            return;
        let wrapper = findChild(currentPopup, POPUP_WRAPPER_ID);
        let header = findChild(wrapper, POPUP_HEADER_ID);
        let title = findChild(header, FORM.TITLE);
        if (show) {
            title.innerText = getTitleText();
            title.classList.remove('bb-hide');
        } else {
            title.innerText = "";
            title.classList.add('bb-hide');
        }
    };

    const triggerLogin = function(advanced) {
        if (isContactUs)
            return;
        let wrapper = findChild(currentPopup, POPUP_WRAPPER_ID);
        let header = findChild(wrapper, POPUP_HEADER_ID);
        let title = findChild(header, FORM.TITLE);
        title.innerText = getTitleText2();
    }

    const triggerProvider = function(advanced) {
        if (advanced) {
            currentPopup.classList.add('advance');
            // setupScrollingTrigger();
        } else {
            let wrapper = findChild(currentPopup, POPUP_WRAPPER_ID);
            let holder = findChild(wrapper, POPUP_HOLDER_ID);
            holder.classList.add('basic');
        }
    };

    const triggerFormEntry = function(form) {
        let wrapper = findChild(currentPopup, POPUP_WRAPPER_ID);
        let holder = findChild(wrapper, POPUP_HOLDER_ID);
        let text_wrapper = findChild(currentPopup, TEXT_HOLDER_ID);
        const formMatch = new RegExp('-form');
        let clean_list = [];
        for (let i = 0; i < holder.classList.length; i++) {
            let cls = holder.classList[i];
            if (formMatch.test(cls)) {
                clean_list.push(cls);
            }
        }
        for (let i = 0; i < clean_list.length; i++) {
            holder.classList.remove(clean_list[i]);
            if (text_wrapper) {
                text_wrapper.classList.remove(clean_list[i]);
            }
        }
        holder.classList.add(form);
        if (isMobile && text_wrapper) {
            text_wrapper.classList.add(form);
        }
        holder.style.height = null;
    };

    let TRIGGER_EVENT = {};
    const addEvent = function(event, func) {
        if (!TRIGGER_EVENT[event]) {
            TRIGGER_EVENT[event] = [];
        }
        TRIGGER_EVENT[event].push(func);
    };

    const triggerEvent = function(event, params) {
        if (TRIGGER_EVENT && TRIGGER_EVENT[event]) {
            // console.log(TRIGGER_EVENT);
            for (let i = 0; i < TRIGGER_EVENT[event].length; i++) {
                let func = TRIGGER_EVENT[event][i];
                if (typeof func == 'function') {
                    func(params);
                }
            }
        }
    }

    let scrolling = false;
    let scrollPosition = false;
    let scrollTimer = false;

    const setupScrollingTrigger = function() {
        window.addEventListener('scroll', function(event) {
            if (currentPopup) {
                if (!event.target.classList || (
                    !event.target.classList.contains('breadbutter-ui') &&
                    !event.target.classList.contains('breadbutter-forms')
                )) {
                    scrollingTrigger(event);
                }
            }
        }, true);
    };

    const setupScrollingMoveTrigger = function() {
        window.addEventListener('scroll', function(event) {
            if (currentPopup) {
                if (!event.target.classList || (
                    !event.target.classList.contains('breadbutter-ui') &&
                    !event.target.classList.contains('breadbutter-forms')
                )) {
                    scrollingMoveTrigger(event);
                }
            }
        }, true);

    };

    let lastScroll = false;

    const scrollingTrigger = function(event) {
        let windowHeight = window.innerHeight;
        let scrollArea = windowHeight / 10;
        let scrollNow = event.target.scrollTop ? event.target.scrollTop : (event.target.scrollingElement ? event.target.scrollingElement.scrollTop : 0);
        if (event.target == document) {
            scrollNow = window.scrollY;
        }
        clearTimeout(scrollTimer);
        if (scrolling == false) {
            scrollPosition = scrollNow;
            scrolling = true;
        } else if (Math.abs(scrollNow - scrollPosition) > scrollArea && scrollNow > lastScroll) {
            if (!SKIP_SCROLLING) {
                addScrolling();
            }
            triggerEvent('scrolling');
        }
        lastScroll = scrollNow;
        scrollTimer = setTimeout(function() {
            scrolling = false;
            scrollPosition = false;
            lastScroll = false;
        }, 1500);
    };

    const addScrolling = function() {
        let wrapper = findChild(currentPopup, POPUP_WRAPPER_ID);
        let holder = findChild(wrapper, POPUP_HOLDER_ID);
        let height = holder.firstElementChild.offsetHeight;
        let position_set = false;
        if (!holder.classList.contains('scrolling')) {
            holder.style.height = height + 'px';
        }
        setTimeout(function() {
            holder.classList.add('scrolling');
        }, 50)

    }


    const scrollingMoveTrigger = function(event) {
        let scrollNow = event.target.scrollTop ? event.target.scrollTop : (event.target.scrollingElement ? event.target.scrollingElement.scrollTop : (event.target == document ? window.scrollY : 0));
        if (CONTINUE_WITH_HOVER.enabled) {
            let top = CONTINUE_WITH_HOVER.original;
            top -= scrollNow;
            if (top <= CONTINUE_WITH_HOVER.distance) {
                top = CONTINUE_WITH_HOVER.distance;
            }
            currentPopup.style.top = parsePosition(top);
        }
    };

    const assignMask = function(locked) {
        if (DATA.show_login_focus) {
            closeMask();
            currentMask = getMask(locked);
            currentMask.style.zIndex = view.getIndex();
            document.body.append(currentMask);

            if (!DATA.hide_focus_text) {
                assignTextLocation();
            }
        } else if (isMobile){
            closeMask();
            // DATA.hide_on_focus = true;
            currentMask = getMask(locked);
            currentMask.classList.add(TRANSPARENT_MASK_ID);
            currentMask.onclick = triggerCollapseMobile;
            currentMask.style.zIndex = view.getIndex();
            document.body.append(currentMask);
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
        let left = null;
        let bottom = null;

        let mobile_fit = false;

        if (offsetLeft > TEXT_MARGIN || offsetRight > TEXT_MARGIN) {
            fit = true;
        }

        if (windowHeight > MOBILE_TEXT_MARGIN) {
            mobile_fit = true;
        }

        if (popup.style.top) {
            bottom = true;
        }
        if (popup.style.bottom) {
            bottom = false
        }

        if (popup.style.right) {
            left = true;
        }
        if (popup.style.left) {
            left = false;
        }


        if (left === null) {
            if (offsetLeft >= offsetRight) {
                left = true;
            } else {
                left = false;
            }
        }

        if (bottom === null) {
            if (offsetBottom >= offsetTop) {
                bottom = true;
            } else {
                bottom = false;
            }
        }


        let text_holder = getTextHolder();
        currentPopup.appendChild(text_holder);
        if (fit) {
            text_holder.classList.add(left ? 'bb-left' : 'bb-right');
            text_holder.classList.add(bottom ? 'bb-bottom' : 'bb-top');

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
        } else if (mobile_fit) {
            text_holder.classList.add('mobile');
            text_holder.appendChild(getTextTitle());
            text_holder.appendChild(getText());
            text_holder.appendChild(getMessage());
            text_holder.appendChild(getArrowDownIcon());
        } else {
            text_holder.classList.add('nowhere');
            text_holder.appendChild(getTextTitle());
            text_holder.appendChild(getText());
            text_holder.appendChild(getMessage());
        }
    };

    const getTextHolder = function() {
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

    const getArrowDownIcon = function() {
        let svg = addView(ARROW_HOLDER_ID);
        svg.innerHTML = ArrowDown;

        return svg;
    }

    const getTitleText2 = function() {
        let text = Locale.POPUP.HEADER_BACK_1;
        if (APP_NAME) {
            text = lang.replace({APP_NAME}, Locale.POPUP.HEADER_BACK_2);
        }
        return text;
    };

    const getTitleText = function() {
        let text = Locale.POPUP.HEADER_1;
        if (APP_NAME) {
            text = lang.replace({APP_NAME}, Locale.POPUP.HEADER_2);
        }
        if (isContactUs) {
            // text = Locale.CONTACT_US.HEADER;
            text = "";
        }
        return text;
    };

    const getTitle = function() {
        // console.log(APP_NAME);
        let text = getTitleText();
        let b = view.addBlock('div', FORM.TITLE);
        b.innerHTML = text;
        if (isContactUs) {
            b.classList.add('bb-hide');
        }
        return b;
    };

    const getCloseIcon = function() {
        let b = view.addButton(FORM.CLOSE);
        b.innerHTML = getCloseIconSvg();
        b.onclick = triggerClosePopup;
        return b;
    };


    const getDropdownButton = function() {
        const button = view.addBlock('div', FORM.MOBILE_DROPDOWN);
        return button;
    };

    const getMobileHandler = function() {
        let b = view.addBlock('div', FORM.MOBILE_HANDLER);
        b.onclick = triggerToggleMobile;
        b.appendChild(getDropdownButton())
        return b;
    };


    function collapseSection(element) {
        // get the height of the element's inner content, regardless of its actual size
        let sectionHeight = element.scrollHeight;

        // temporarily disable all css transitions
        let elementTransition = element.style.transition;
        element.style.transition = '';

        // on the next frame (as soon as the previous style change has taken effect),
        // explicitly set the element's height to its current pixel height, so we
        // aren't transitioning out of 'auto'
        requestAnimationFrame(function() {
            element.style.height = sectionHeight + 'px';
            element.style.transition = elementTransition;

            // on the next frame (as soon as the previous style change has taken effect),
            // have the element transition to height: 0
            requestAnimationFrame(function() {
                element.style.height = 30 + 'px';
            });
        });


        currentPopup.setAttribute('transitioning', 'true');
        setTimeout(function() {
            currentPopup.setAttribute('transitioning', 'false');
            element.classList.add('bb-mobile-collpase');
        }, 500);

        // mark the section as "currently collapsed"
        element.setAttribute('data-collapsed', 'true');
    }


    function expandSection(element) {
        // get the height of the element's inner content, regardless of its actual size
        let sectionHeight = element.scrollHeight;

        // have the element transition to the height of its inner content
        element.style.height = sectionHeight + 'px';

        function removeListenerTransition(e) {
            element.removeEventListener('transitionend', removeListenerTransition);

            // remove "height" from the element's inline styles, so it can return to its initial value
            element.style.height = null;
        }

        // when the next css transition finishes (which should be the one we just triggered)
        element.addEventListener('transitionend', function(e) {
            // remove this event listener so it only gets triggered once
            removeListenerTransition(e);
        });

        currentPopup.setAttribute('transitioning', 'true');
        setTimeout(function() {
            currentPopup.setAttribute('transitioning', 'false');
            element.classList.remove('bb-mobile-collpase');
        }, 500);
        // mark the section as "currently not collapsed"
        element.setAttribute('data-collapsed', 'false');
    }

    function expandProviders(element) {
        // get the height of the element's inner content, regardless of its actual size
        let sectionHeight = element.scrollHeight;

        // have the element transition to the height of its inner content
        element.style.height = sectionHeight + 'px';

        //console.log(sectionHeight);
        function removeListenerTransition(e) {
            element.removeEventListener('transitionend', removeListenerTransition);

            // remove "height" from the element's inline styles, so it can return to its initial value
            element.style.height = null;
        }

        // when the next css transition finishes (which should be the one we just triggered)
        element.addEventListener('transitionend', function(e) {
            // remove this event listener so it only gets triggered once
            removeListenerTransition(e);
        });

        currentPopup.setAttribute('transitioning', 'true');
        setTimeout(function() {
            currentPopup.setAttribute('transitioning', 'false');
            element.classList.remove('bb-provider-collapse');
        }, 500);
        // mark the section as "currently not collapsed"
        element.setAttribute('data-collapsed', 'false');

    };

    const triggerCollapseMobile = function(e) {
        let holder = currentPopup.querySelector('.' + POPUP_HOLDER_ID);
        let mobileCollapsed = holder.querySelector('.bb-mobile-collapse');
        let limitCollapsed = holder.querySelector('.bb-limit-providers');


        // get the height of the element's inner content, regardless of its actual size
        let sectionHeight = currentPopup.offsetHeight;

        // temporarily disable all css transitions
        let elementTransition = currentPopup.style.transition;
        currentPopup.style.transition = '';

        // on the next frame (as soon as the previous style change has taken effect),
        // explicitly set the element's height to its current pixel height, so we
        // aren't transitioning out of 'auto'
        requestAnimationFrame(function() {
            currentPopup.style.height = sectionHeight + 'px';
            currentPopup.style.transition = elementTransition;

            // on the next frame (as soon as the previous style change has taken effect),
            // have the element transition to height: 0
            requestAnimationFrame(function() {
                currentPopup.style.height = 30 + 'px';
            });
        });


        currentPopup.setAttribute('transitioning', 'true');
        setTimeout(function() {
            currentPopup.setAttribute('transitioning', 'false');
            currentPopup.classList.add('bb-mobile-collpase');

            if (mobileCollapsed || limitCollapsed) {
                if (mobileCollapsed) {
                    mobileCollapsed.classList.remove('bb-mobile-collapse');
                }
                if (limitCollapsed) {
                    limitCollapsed.classList.remove('bb-limit-providers');
                }
            }
        }, 500);

        // mark the section as "currently collapsed"

        currentPopup.setAttribute('data-collapsed', 'true');

    };


    const triggerToggleMobile = function(e) {

        // console.log('triggerToggleMobile');

        let isCollapsed = currentPopup.getAttribute('data-collapsed') === 'true';
        let holder = currentPopup.querySelector('.' + POPUP_HOLDER_ID);
        let mobileCollapsed = holder.querySelector('.bb-mobile-collapse');
        let limitCollapsed = holder.querySelector('.bb-limit-providers');
        if (mobileCollapsed || limitCollapsed) {
            //collpase -> open
            //console.log('scrollheight');
            currentPopup.classList.add('bb-provider-collapse');
            if (mobileCollapsed) {
                mobileCollapsed.classList.remove('bb-mobile-collapse');
            }
            if (limitCollapsed) {
                limitCollapsed.classList.remove('bb-limit-providers');
            }
            if (VIEW_OPTIONS.button_theme == 'tiles') {
                let text_wrapper = findChild(currentPopup, TEXT_HOLDER_ID);
                if (text_wrapper) {
                    text_wrapper.classList.add('bb-hide');
                }
            }
            expandProviders(currentPopup);
            detectMobileEmailFocus();
        } else if (isCollapsed) {
            expandSection(currentPopup);
            currentPopup.setAttribute('data-collapsed', 'false')
            detectMobileEmailFocus();
        } else {
            collapseSection(currentPopup)
        }
    };

    const detectMobileEmailFocus = function() {
        if (isMobile) {
            let email = currentPopup.querySelector('input.form-email');
            if (email) {
                setTimeout(() => {
                    email.focus();
                    email.blur();
                }, 10);
            }
        }
    }

    const getMask = function(locked) {
        let m = addView(MASK_HOLDER_ID);
        // m.onclick = triggerCloseMask;
        if (DATA.hide_on_focus && !locked) {
            m.onclick = triggerClosePopup;
        }
        return m;
    }

    const getCloseIconSvg = function() {
        return view.getCloseIconSvg();
    };

    const cleanChild = function(holder) {
        if (holder) {
            while (holder.firstChild) {
                holder.removeChild(holder.lastChild);
            }
        }
    };

    const findChild = function(container, child) {
        let c = false;
        for (let i = 0; container.children && i < container.children.length; i++) {
            if (container.children[i].classList.contains(child)) {
                c = container.children[i];
            }
        }
        return c;
    };

    const findParents = function(el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls)) ;
        return el;
    };

    const triggerClosePopup = function() {
        if (currentPopup) {
            closeForm();
            for (let i = 0; i < EVENT_CALLBACK.length; i++) {
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


    this.addForm = addForm;
    this.addCustomForm = addCustomForm;
    this.addRegister = addRegister;
    this.addReset = addReset;
    this.addConfirm = addConfirm;
    this.addMagicLink = addMagicLink;
    this.addContactUs = addContactUs;
    this.deIdentification = deIdentification;
    this.init = init;
    this.close = closeForm;
};

export default VIEWPOPUP;