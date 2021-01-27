const ID = 'breadbutter-buttons';
const HOLDER_ID = 'breadbutter-buttons-ui';
const CONTAINER_ID = 'breadbutter-buttons-containers';
import './scss/view-button.scss';
import VIEW from './view.js';
import viewAlert from './view-alert';
import api from './api.js';

import lang from './locale.js';
let Locale = {};

const showAlert = viewAlert.showAlert;

const init = function (options) {
    loadOptions(options);
};

const loadOptions = function (options) {
    loadLanguage(options);
};

const loadLanguage = function (options) {
    if (options.language) {
        let locale = lang.getLocale(options.language, options.locale);
        if (locale) {
            Locale = locale;
        }
    }
};

const addButtons = function (id, providers, options) {
    let { container, error } = getButtonLists(providers, options);
    let holder2 = VIEW.addView(CONTAINER_ID);
    holder2.appendChild(container);
    let holder = VIEW.addView(HOLDER_ID);
    holder.appendChild(holder2);
    VIEW.initView(id, options, holder, error);
};

const getButtonLists = function (providers, options) {
    // loadClientData(options);
    let button_theme = options.button_theme ? options.button_theme : false;
    const pass = options.pass ? options.pass : false;
    const pin = options.pin ? options.pin : false;
    const register = options.register ? options.register : false;
    const suggested = options.suggested ? options.suggested : false;
    const email_address = options.email_address ? options.email_address : false;
    const collapsible = options.collapsible ? options.collapsible : false;
    const container = VIEW.addView(ID);
    let error = false;
    if (button_theme == 'icon' || button_theme == 'square-icons' || button_theme == 'round-icons') {
        container.classList.add('icon');
        if (button_theme == 'round-icons') {
            container.classList.add('round');
        }
        button_theme = 'icon';
    }
    if (providers) {
        if (providers.length) {
            for (let i = 0; i < providers.length; i++) {
                let first = i == 0 && providers.length > 1;
                if (providers[i].idp != 'local') {
                    container.appendChild(
                        buttons(
                            providers[i],
                            {
                                button_theme,
                                pass,
                                register,
                                pin,
                                email_address,
                            },
                            first
                        )
                    );
                }
            }
        } else {
            //container.appendChild(messages('Need to enable at least 1 identity providers.'));
            // container.className += 'error';
            error = 'Need to enable at least 1 identity provider.';
        }
    } else {
        // container.appendChild(messages('Need to add ' + window.location.origin + ' to CORS whitelist.'));
        // container.className += 'error';
        error = 'Need to add ' + window.location.origin + ' to CORS whitelist.';
    }

    if (
        suggested != 'local' &&
        providers.length > 1 &&
        button_theme != 'icon' &&
        collapsible
    ) {
        container.classList.add('collapsed');
        container.prepend(getMoreButton(triggerMore));
    }

    return { container, error, button_theme };
};

const buttons = function (
    provider,
    { button_theme, pass, register, pin, email_address },
    first
) {
    var div = document.createElement('div');
    if (provider.type == 'enterprise') {
        if (button_theme == 'icon') {
            div.innerHTML = VIEW.svgIcons_e(provider);
        } else {
            div.innerHTML = VIEW.svgButtons_e(provider, register);
        }
    } else {
        if (button_theme == 'icon') {
            div.innerHTML = VIEW.svgIcons(provider.idp);
        } else {
            div.innerHTML = VIEW.svgButtons(provider.idp, provider, register);
        }
    }
    var name = document.createAttribute('name');
    name.value = provider.idp;
    div.setAttributeNode(name);
    if (provider.id) {
        div.classList.add('enterprise');
        var idp_id = document.createAttribute('provider_id');
        idp_id.value = provider.id;
        div.setAttributeNode(idp_id);
    }

    if (first && button_theme != 'icon') {
        div.classList.add('first');
    }

    if (pin) {
        div.pin = pin;
    }

    if (email_address) {
        div.email_address = email_address;
    }

    if (!pass) {
        if (!register) {
            div.onclick = trigger;
        } else {
            div.onclick = triggerRegister;
        }
    }
    // var node = document.createTextNode(provider.name);
    // div.appendChild(node);
    return div;
};
const getMoreButton = function (cb) {
    let div = VIEW.addBlock('div', 'more-block');
    let more = VIEW.addBlock('div', 'more');
    let svg =
        '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">\n' +
        '<path d="M9.16,14.88l-5.7-9.11C3.05,5.1,3.52,4.24,4.31,4.24H15.7c0.79,0,1.26,0.86,0.85,1.53l-5.7,9.11C10.46,15.51,9.55,15.51,9.16,14.88z"/>\n' +
        '</svg>';
    more.insertAdjacentHTML('beforeend', svg);
    div.appendChild(more);
    if (cb) {
        more.onclick = cb;
    }
    return div;
};

const triggerMore = function (e) {
    // console.log('triggerMore');
    const more = e.currentTarget;
    let classList = more.parentElement.parentElement.classList;
    if (classList.contains('collapsed')) {
        classList.remove('collapsed');
    } else {
        classList.add('collapsed');
    }
    e.stopImmediatePropagation();
};

const triggerIdentityProvider = function (func, data, button) {
    let top = button.parentElement.parentElement.parentElement;
    if (func) {
        func(data, function (res) {
            if (res && res.authentication_token) {
                api.redirectAuthentication(res.authentication_token, true);
            } else if (res && res.error) {
                let alert = Object.assign(
                    {
                        MESSAGE: res.error.message,
                    },
                    Locale.ERROR.API_ERROR
                );
                showAlert(top, alert);
            }
        });
    }
};

const trigger = function (e) {
    // console.log('trigger');
    let name = e.currentTarget.getAttribute('name');
    let provider_id = e.currentTarget.getAttribute(
        'provider_id'
    );
    let email_address = e.currentTarget.email_address;
    let data = {};
    if (email_address) {
        data['email_address'] = email_address;
    }
    data = VIEW.applyData(e.currentTarget, data);
    if (provider_id) {
        data['id'] = provider_id;
        triggerIdentityProvider(api.login, data, e.currentTarget);
    } else if (name) {
        data['idp'] = name;
        triggerIdentityProvider(api.login, data, e.currentTarget);
    }
};

const triggerRegister = function (e) {
    //update for register
    // console.log('triggerRegister');
    let name = e.currentTarget.getAttribute('name');
    let pin = e.currentTarget.pin;
    let email_address = e.currentTarget.email_address;
    let provider_id = e.currentTarget.getAttribute(
        'provider_id'
    );
    let data = {};
    if (email_address) {
        data['email_address'] = email_address;
    }
    data = VIEW.applyData(e.currentTarget, data);

    if (provider_id) {
        data['id'] = provider_id;
        triggerIdentityProvider(api.register, data, e.currentTarget);
    } else if (name) {
        data['idp'] = name;
        triggerIdentityProvider(api.register, data, e.currentTarget);
    }
};

export default {
    addButtons,
    getButtonLists,
    getMoreButton,
    buttons,
    init,
};
