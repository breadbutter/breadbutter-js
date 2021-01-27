import './scss/view-policy.scss';

import view from './view';
import viewForm from './view-form';

import api from './api.js';
import constants from './constants';
import lang from './locale.js';

const POLICY_ID = 'breadbutter-policy';
const POLICY_HOLDER_ID = 'breadbutter-policy-holder';
const POLICY_CONTENT_ID = 'breadbutter-policy-content';
const POLICY_BUTTON_HOLDER_ID = 'breadbutter-policy-button-holder';

const FORM = {
    MESSAGE: 'privacy_message',
    BUTTON_1: 'button-ok',
    BUTTON_2: 'button-read'
};

const CACHE_STORAGE = {
    CONFIRM: 'breadbutter-privacy-policy-confirm'
};

const EVENT = 'privacy_policy';

let Locale;
let policy_view = false;
let privacy_policy_link = false;

const loadLanguage = function (options) {
    if (options.language) {
        let locale = lang.getLocale(options.language, options.locale);
        if (locale) {
            Locale = locale;
        }
    }
};

const getCache = function() {
    let confirm = false;
    if (localStorage) {
        confirm = localStorage.getItem(CACHE_STORAGE.CONFIRM);
        if (confirm != 1 && confirm != '1') {
            confirm = false;
        }
    }
    return confirm;
};

const setCache = function() {
    if (localStorage) {
        localStorage.setItem(CACHE_STORAGE.CONFIRM, 1);
    }
};

const saveEvent = function(cb) {
    api.createEvent(constants.event_type.CUSTOM, {
        code: EVENT
    }, {
        url: document.location.href
    }, cb)
};

const addView = function (id) {
    let container = false;
    if (id) {
        container = document.createElement('div');
        container.classList.add(id);
    }
    return container;
};

const init = function(options) {
    let privacy_confirm = getCache();
    if (!privacy_confirm) {
        viewForm.checkProviders(function(res) {
            if (res &&
                res.settings &&
                res.settings.privacy_policy_url) {
                privacy_policy_link = res.settings.privacy_policy_url;
                loadLanguage(options);
                createView(options);
            }
        });
    }
};

const getContent = function() {
    let b = view.addBlock('p', FORM.MESSAGE);
    b.innerHTML = Locale.PRIVACY_POLICY.CONTENT;
    return b;
};

const getOkButton = function() {
    let b = view.addBlock('button', FORM.BUTTON_1);
    b.innerHTML = Locale.PRIVACY_POLICY.BUTTON_1;
    b.onclick = triggerOkButton;
    return b;
};

const getReadButton = function() {
    let b = view.addBlock('button', FORM.BUTTON_2);
    b.innerHTML = Locale.PRIVACY_POLICY.BUTTON_2;
    b.onclick = triggerReadButton;
    return b;

};

const triggerOkButton = function(e) {
    setCache();
    saveEvent(function(){
        document.body.removeChild(policy_view);
    });
};

const triggerReadButton = function() {
    window.open(privacy_policy_link);
};

const createView = function() {
    let privacy = addView(POLICY_ID);
    let holder = addView(POLICY_HOLDER_ID);
    let content = addView(POLICY_CONTENT_ID);
    let button_holder = addView(POLICY_BUTTON_HOLDER_ID);

    privacy.appendChild(holder);
    holder.appendChild(content);
    holder.appendChild(button_holder);

    content.appendChild(getContent());
    button_holder.appendChild(getOkButton());
    button_holder.appendChild(getReadButton());

    policy_view = privacy;

    document.body.append(policy_view);
};

export default {
    init
}