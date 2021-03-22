import API from './api.js';
import viewButton from './view-button';
import viewForm from './view-form';
import viewPopup from './view-popup';
import viewPolicy from './view-policy';
import constants from './constants';

const providers = constants.providers;
const providers_hash = constants.providers_hash;
const providers_buttons = constants.providers_buttons;
const event_type = constants.event_type;
const gateway_emails = constants.gateway_emails;
const gateway_hash = constants.gateway_hash;
const encoded_action = constants.encoded_action;
const encoded_hash = constants.encoded_hash;

const initialize = function () {
    loadFonts();
};

const loadFonts = function () {
    (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (!fjs) {
            fjs = d.getElementsByTagName('head')[0];
        } else {
            fjs = fjs.parentNode;
        }
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.rel = 'stylesheet';
        js.href = 'https://cdn.logonlabs.com/dist/fonts/fonts.css';
        fjs.append(js);
    })(document, 'link', 'logon-fonts');
};

let options = {
    app_id: false,
    app_secret: false,
    api_path: false,
    language: 'en',
    locale: false,
    app_name: false,
    destination_url: false,
    callback_url: false,
    client_data: false,
    page_view_tracking: true,
    force_reauthentication: null, //off/attempt/force/null
    button_theme: 'round-icons', //'square-icons', 'round-icons', 'tile'
    expand_email_address: true,
    show_login_focus: true,
    allow_sub_domain: false
};

const configure = function (opt) {
    if (typeof opt.app_name != 'undefined') {
        options.app_name = opt.app_name;
    }
    if (typeof opt.language != 'undefined') {
        options.language = opt.language;
    }

    if (typeof opt.locale != 'undefined') {
        options.locale = opt.locale;
    }

    if (typeof opt.app_id != 'undefined') {
        options.app_id = opt.app_id.replace(/-/g, '');
    }

    if (typeof opt.app_secret != 'undefined') {
        options.app_secret = opt.app_secret;
    }

    if (typeof opt.api_path != 'undefined') {
        options.api_path = opt.api_path;
    }

    if (typeof opt.destination_url != 'undefined') {
        options.destination_url = opt.destination_url;
    }

    if (typeof opt.callback_url != 'undefined') {
        options.callback_url = opt.callback_url;
    }

    if (typeof opt.client_data != 'undefined') {
        options.client_data = opt.client_data;
    }

    if (typeof opt.force_reauthentication != 'undefined') {
        options.force_reauthentication = opt.force_reauthentication;
    }

    if (typeof opt.page_view_tracking != 'undefined') {
        options.page_view_tracking = opt.page_view_tracking;
    }

    if (typeof opt.button_theme != 'undefined') {
        options.button_theme = opt.button_theme;
    }
    if (typeof opt.expand_email_address != 'undefined') {
        options.expand_email_address = opt.expand_email_address;
    }

    if (typeof opt.continue_with_position != 'undefined' && typeof opt.continue_with_position == 'object') {
        options.continue_with_position = opt.continue_with_position;
    }encoded_action

    if (typeof opt.show_login_focus != 'undefined') {
        options.show_login_focus = opt.show_login_focus;
    }

    if (typeof opt.allow_sub_domain != 'undefined') {
        options.allow_sub_domain = opt.allow_sub_domain;
    }

    api.configure({
        app_id: options.app_id,
        app_secret: options.app_secret,
        api_path: options.api_path,
        destination_url: options.destination_url,
        callback_url: options.callback_url,
        force_reauthentication: options.force_reauthentication,
        client_data: options.client_data,
        allow_sub_domain: options.allow_sub_domain
    });

    tracking();
};

const api = new (function () {
    this.configure = function (opt) {
        API.configure({
            app_id: opt.app_id,
            app_secret: opt.app_secret,
            api_path: opt.api_path,
            auto_redirect: opt.auto_redirect,
            destination_url: opt.destination_url,
            callback_url: opt.callback_url,
            force_reauthentication: opt.force_reauthentication,
            client_data: opt.client_data,
            allow_sub_domain: opt.allow_sub_domain
        });
    };

    this.getProfile = function(callback) {
        API.getClientSettings(false, function(response) {
            if (response && response.user_profile) {
                if (callback) {
                    callback(response.user_profile);
                }
            }
        })
    };

    this.getProviders = API.getProviders;
    this.ping = API.ping;
})();

const events = new (function(){
    this.custom = function(custom, callback){
        API.createEvent(custom, callback);
    };
    this.pageview = function(callback){
        API.createEvent(event_type.PAGE_VIEW, {
            title: document.title,
            url: document.location.href
        }, function(res){
            if (res.event_id) {
                API.setPageViewId(res.event_id);
            }
            if (typeof callback == 'function') {
                callback(res);
            }
        });

    };
})();

const tracking = function () {
    if (options.page_view_tracking) {
        events.pageview();
        window.addEventListener('hashchange', function(){
            events.pageview();
        });
    }
}

const applyOptions = function(opt, key) {
    if (typeof opt[key] == 'undefined' && typeof options[key] != 'undefined') {
        opt[key] = options[key];
    }
};


const loadOptions = function (opt) {
    if (!opt) {
        opt = {};
    }

    if (options.language) {
        opt['language'] = options.language;
    }

    if (options.locale) {
        opt['locale'] = options.locale;
    }

    if (options.app_name) {
        opt['app_name'] = options.app_name;
    }

    applyOptions(opt, 'destination_url');
    applyOptions(opt, 'callback_url');
    applyOptions(opt, 'client_data');
    applyOptions(opt, 'force_reauthentication');
    applyOptions(opt, 'button_theme');
    applyOptions(opt, 'expand_email_address');
    applyOptions(opt, 'continue_with_position');
    applyOptions(opt, 'show_login_focus');

    return opt;
};

const initUI = function (options) {
    options = loadOptions(options);
    viewPopup.init(options);
    viewButton.init(options);
    viewForm.init(options);
};

const ui = new (function () {
    (this.confirmEmail = function (id, options) {
        if (typeof id != 'string') {
            options = id;
            id = false;
        }
        initUI(options);
        options = loadOptions(options);
        if (options['email_address']) {
            if (localStorage) {
                localStorage.setItem(
                    'breadbutter-sdk-email-address',
                    options['email_address']
                );
            }
        }

        if (id) {
            viewForm.addConfirm(id, options);
        } else {
            viewPopup.addConfirm(options);
        }
    }),
        (this.resetPassword = function (id, options) {
            if (typeof id != 'string') {
                options = id;
                id = false;
            }
            //options required token
            initUI(options);
            options = loadOptions(options);

            if (options['email_address']) {
                if (localStorage) {
                    localStorage.setItem(
                        'breadbutter-sdk-email-address',
                        options['email_address']
                    );
                }
            }

            if (id) {
                viewForm.addReset(id, options);
            } else {
                viewPopup.addReset(options);
            }
        }),
        (this.form = function (id, options) {
            if (typeof id != 'string') {
                options = id;
                id = false;
            }
            initUI(options);
            options = loadOptions(options);

            if (id) {
                viewForm.addForm(id, options);
            } else {
                viewPopup.addForm(options);
            }
        }),
        (this.invitation = function (id, options) {
            if (typeof id != 'string') {
                options = id;
                id = false;
            }
            initUI(options);
            options = loadOptions(options);

            if (options['email_address']) {
                if (localStorage) {
                    localStorage.setItem(
                        'breadbutter-sdk-email-address',
                        options['email_address']
                    );
                }
            }

            if (id) {
                viewForm.addRegister(id, options);
            } else {
                viewPopup.addRegister(options);
            }
        }),
        (this.button = function (id, options) {
            initUI(options);
            options = loadOptions(options);

            let email_address = false;
            if (options['email_address']) {
                email_address = options['email_address'];
            }

            let providers = [];
            if (
                options['providers'] &&
                Array.isArray(options['providers'])
            ) {
                providers =
                    options['providers'];
            }

            if (providers.length === 0) {
                api.getProviders(email_address, function (res) {
                    let list = [];
                    if (res && res.providers) {
                        for(let i = 0; i < res.providers.length; i++) {
                            let provider = res.providers[i];
                            if (provider.idp && providers_hash[provider.idp]) {
                                list.push(provider);
                            }
                        }
                    }
                    // identityProviderListParsing('social_identity_providers');
                    // identityProviderListParsing('enterprise_identity_providers');

                    if (list.length === 0) {
                        list = false;
                    }

                    viewButton.addButtons(id, list, options);
                });
            } else {
                let list = [];

                // console.log(identity_providers);

                for (let i = 0; i < providers.length; i++) {
                    if (providers_hash[providers[i].idp]) {
                        list.push(providers[i]);
                    }
                }

                // console.log(list);

                viewButton.addButtons(id, list, options);
            }
        });
})();


const parsingUrl = function(opt) {
    // console.log(opt);
    if (opt && opt.mode) {
        return opt;
    }

    const querystring = function() {
        var name, value
        var params = {};
        var hash = window.location.hash;
        var search = window.location.search;
        var target = search;
        if(search.length == 0) {
            target = hash
        }
        var p = target.split('?');
        if (p.length > 1) {
            var param_array = target.split('?')[1].split('&'), x;
            for( var i in param_array) {
                x = param_array[i].split('=');
                name = x[0];
                value = x[1];
                if (typeof value == 'undefined') {
                    value = null;
                }

                value = decodeURIComponent(value);

                if (name.length > 0) {
                    // params[name[0].toUpperCase() + name.substring(1)] = value;
                    // params[name[0].toLowerCase() + name.substring(1)] = value;
                    params[name.toLowerCase()] = value;
                    params[name] = value;

                    // me.keys[name[0].toUpperCase() + name.substring(1)] = name;
                    // me.keys[name[0].toLowerCase() + name.substring(1)] = name;
                    // me.keys[name.toLowerCase()] = name;
                    // me.keys[name] = name;
                }
            }
        }
        return params;
    }();
    // console.log(querystring);
    if (querystring[encoded_action.TARGET]) {
        let data = false;
        try {
            let action_code =querystring[encoded_action.TARGET];
            let json = atob(action_code);
            data = JSON.parse(json);
            // console.log(json);
        } catch(e) {
            return opt;
        }
        let type = data[encoded_action.TYPE];
        let app_id = data[encoded_action.APP_ID];
        let email = data[encoded_action.EMAIL];
        let pin = data[encoded_action.PIN];

        if (typeof encoded_hash[type] != 'undefined' &&
            email && pin && app_id == options.app_id) {
            if (!opt) {
                opt = {};
            }
            opt.mode = encoded_hash[type];
            opt.email_address = email;
            opt.pin = pin;
        }
    } else if (querystring[gateway_emails.TYPE]) {
        let type = querystring[gateway_emails.TYPE];
        let app_id = querystring[gateway_emails.APP_ID];
        let pin = querystring[gateway_emails.PIN];
        let email = querystring[gateway_emails.EMAIL];

        if (typeof gateway_hash[type] != 'undefined' &&
            email && pin && app_id == options.app_id) {
            if (!opt) {
                opt = {};
            }
            opt.mode = gateway_hash[type];
            opt.email_address = email;
            opt.pin = pin;
        }
    }

    return opt;
}

const widgets = new (function(){
    this.continueWith = function(opt) {
        opt = parsingUrl(opt);
        let mode = (opt && opt.mode) ? opt.mode : false;

        if (!mode) {
            ui.form(opt);
        } else {
            switch (mode) {
                case constants.mode.CONFIRM_EMAIL:
                    ui.confirmEmail(opt);
                    break;
                case constants.mode.RESET_PASSWORD:
                    ui.resetPassword(opt);
                    break;
                case constants.mode.INVITATION:
                    ui.invitation(opt);
                    break;
            }
        }
    };
    this.signIn = function(id, opt) {
        opt = parsingUrl(opt);
        let mode = (opt && opt.mode) ? opt.mode : parsingUrl();

        if (!mode) {
            ui.form(id, opt);
        } else {
            switch (mode) {
                case constants.mode.CONFIRM_EMAIL:
                    ui.confirmEmail(id, opt);
                    break;
                case constants.mode.RESET_PASSWORD:
                    ui.resetPassword(id, opt);
                    break;
                case constants.mode.INVITATION:
                    ui.invitation(id, opt);
                    break;
            }
        }
    };
    this.cookie = function() {
        let opt = loadOptions();
        viewPolicy.init(opt);
    };
    this.buttons = function(id, options) {
        ui.button(id, options);
    };
})();

export default {
    configure,
    initialize,
    api,
    ui,
    providers,
    providers_buttons,
    events,
    widgets,
    mode: constants.mode
};
