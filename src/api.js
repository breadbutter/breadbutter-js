import { request, redirect } from './request.js';

let API_PATH = 'https://api.breadbutter.io/';
let APP_ID;
let APP_SECRET;
let DESTINATION_URL;
let CALLBACK_URL;
let CLIENT_DATA;
let FORCE_REAUTHENTICATION;
let PAGE_VIEW_ID;
let ALLOW_SUB_DOMAIN;
let SUCCESS_EVENT_CODE;
let HIDE_LOCAL_AUTH_DOMAINS;

let LANDING_REDIRECT_URL;

let WINDOW_OPEN = false;

let DEVICE_ID;
const CACHE_STORAGE = {
    DEVICE_ID: 'breadbutter-sdk-device-id',
    SUCCESS_EVENT_CODE: 'breadbutter-sdk-success-event-code',
    LAST_SUCCESS_EVENT_CODE: 'breadbutter-sdk-last-success-event-code'
};

const cleanEventStorage = function() {
    // if (localStorage) {
    //     let LAST_EVENTS = [];
    //     for(let i = 0; i < localStorage.length; i++) {
    //         if (localStorage.key(i).indexOf(CACHE_STORAGE.LAST_SUCCESS_EVENT_CODE) != -1) {
    //             LAST_EVENTS.push(localStorage.key(i));
    //         }
    //     }
    //     for(let i = 0; i < LAST_EVENTS.length; i++) {
    //         localStorage.removeItem(LAST_EVENTS[i]);
    //     }
    // }
}

const assignEventStorage = function(data) {
    if (localStorage) {
        let EVENT = CACHE_STORAGE.LAST_SUCCESS_EVENT_CODE + '-' + btoa(data);
        localStorage.setItem(EVENT, data);
    }
}

const AUTH_TYPE = {
    SSO: 'sso',
    AUTH: 'password',
    MAGIC_LINK: 'magic_link'
};

const ERROR_MESSAGE = {
    DEVICE_ID: 'device_id not found.'
};

let DEVICE_QUEUE = [];
let DEVICE_PROCESS = false;

const resolveDevice = function(device_id) {
    while(DEVICE_QUEUE.length) {
        let resolve = DEVICE_QUEUE.pop();
        resolve(device_id);
    }
};

const cleanDeviceId = async function() {
  if (localStorage) {
      localStorage.removeItem(CACHE_STORAGE.DEVICE_ID);
  }
  if (ALLOW_SUB_DOMAIN) {
      await cleanCookie();
  }
};

const checkDeviceId = function(res) {
    return res && res.error && res.error.message && res.error.message.indexOf(ERROR_MESSAGE.DEVICE_ID) != -1;
}

const getDeviceIdFromCookie = function() {
    let cookie = parseCookie(document.cookie);
    let device_id = false;
    if (cookie[APP_ID]) {
        device_id = cookie[APP_ID];
        localStorage.setItem(CACHE_STORAGE.DEVICE_ID, device_id);
    }
    return device_id;
};

const setDeviceIdToCookie = function(device_id) {
    let domains = document.location.host.split('.');
    let domain = ("." + domains.slice(-2).join('.')).split(':')[0];
    let cookie = APP_ID + "=" + device_id + ";path=/;domain=" + domain;
    document.cookie = cookie;
};

const wait = function(ms) {
    ms = ms || 1000;
    return new Promise(function(resolve) {
        setTimeout(function(){
            resolve();
        }, ms)
    });
};

const cleanCookie = async function() {
    let device_id = getDeviceIdFromCookie();
    if (device_id) {
        let domains = document.location.host.split('.');
        let domain = ("." + domains.slice(-2).join('.')).split(':')[0];
        let cookie = APP_ID + "=" + device_id + ";path=/;domain=" + domain;
        cookie += ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
        document.cookie = cookie;
        await wait(100);
    }

};

const getDeviceId = function() {
    return new Promise(function(resolve){
        let device_id = DEVICE_ID ? DEVICE_ID : localStorage.getItem(CACHE_STORAGE.DEVICE_ID);

        if (ALLOW_SUB_DOMAIN) {
            let cookie = getDeviceIdFromCookie();
            if (cookie) {
                device_id = cookie;
                localStorage.setItem(CACHE_STORAGE.DEVICE_ID, device_id);
            } else if (device_id) {
                setDeviceIdToCookie(device_id);
            }
        }
        if (!device_id || device_id == 'undefined') {
            if (!DEVICE_PROCESS) {
                DEVICE_PROCESS = true;
                DEVICE_QUEUE.push(resolve);
                registerDevice(function(res){
                    PAGE_VIEW_ID = false;
                    DEVICE_ID = false;
                    device_id = false;
                    if (res && !res.error) {
                        device_id = res.device_id;
                        if (device_id) {
                            localStorage.setItem(CACHE_STORAGE.DEVICE_ID, device_id);
                            if (ALLOW_SUB_DOMAIN) {
                                setDeviceIdToCookie(device_id);
                            }
                        }
                    }
                    DEVICE_ID = device_id;
                    resolveDevice(device_id);
                    if (device_id) {
                        window.dispatchEvent(new Event('bb-new-device-id'));
                    }
                    DEVICE_PROCESS = false
                })
            } else {
                DEVICE_QUEUE.push(resolve);
            }
        }  else {
            DEVICE_ID = device_id;
            resolve(device_id);
        }
    });
};

const LoginOptionData = function(data) {
    let request_data = OptionData(data);

    if (data.force_reauthentication) {
        request_data['force_reauthentication'] = data.force_reauthentication;
    } else if (FORCE_REAUTHENTICATION) {
        request_data['force_reauthentication'] = FORCE_REAUTHENTICATION;
    }

    if (data.success_event_code) {
        request_data['success_event_code'] = data.success_event_code;
    } else if (SUCCESS_EVENT_CODE) {
        request_data['success_event_code'] = SUCCESS_EVENT_CODE;
    }



    return request_data;
};

const OptionData = function(data) {
    let request_data = {};

    if (data.client_data) {
        request_data['client_data'] = data.client_data;
    } else if (CLIENT_DATA) {
        request_data['client_data'] = CLIENT_DATA;
    }

    if (typeof request_data['client_data'] == 'object') {
        request_data['client_data'] = JSON.stringify(
            request_data['client_data']
        );
    }

    if (data.callback_url) {
        request_data['callback_url'] = data.callback_url;
    } else if (CALLBACK_URL) {
        request_data['callback_url'] = CALLBACK_URL;
    }

    if (data.destination_url) {
        request_data['destination_url'] = data.destination_url;
    } else if (DESTINATION_URL) {
        request_data['destination_url'] = DESTINATION_URL;
    }

    return request_data;
};

const PasswordData = function (data) {
    let request_data = {};

    if (data.password) {
        request_data['password'] = data.password;
    }

    return request_data;
};

const ProviderData = function (data) {
    let request_data = {};

    if (data.idp) {
        request_data['idp'] = data.idp;
    }

    if (data.id) {
        request_data['id'] = data.id;
    }

    return request_data;
};

const setPageViewId = function(id) {
    PAGE_VIEW_ID = id;
};

const configure = async function (data) {
    if (typeof data.api_path != 'undefined' && data.api_path) {
        API_PATH = data.api_path.replace(/\/?$/, '/');

        // console.log('API_PATH = ' + API_PATH);
    }

    if (typeof data.app_id != 'undefined' && data.app_id) {
        APP_ID = data.app_id;

        // console.log('APP_ID = ' + APP_ID);
    }

    if (typeof data.app_secret != 'undefined' && data.app_secret) {
        APP_SECRET = data.app_secret;
    }

    if (typeof data.destination_url != 'undefined' && data.destination_url) {
        DESTINATION_URL = data.destination_url;
    }
    if (typeof data.callback_url != 'undefined' && data.callback_url) {
        CALLBACK_URL = data.callback_url;
    }
    if (typeof data.force_reauthentication != 'undefined' && data.force_reauthentication) {
        FORCE_REAUTHENTICATION = data.force_reauthentication;
    }

    if (typeof data.client_data != 'undefined' && data.client_data) {
        CLIENT_DATA = data.client_data;
    }

    if (typeof data.allow_sub_domain != 'undefined') {
        ALLOW_SUB_DOMAIN = data.allow_sub_domain;
    }

    if (typeof data.success_event_code != 'undefined') {
        SUCCESS_EVENT_CODE = data.success_event_code;
    }

    if (typeof data.hide_local_auth_domains != 'undefined') {
        HIDE_LOCAL_AUTH_DOMAINS = data.hide_local_auth_domains;
    }

    if (typeof data.landing_redirect_url != 'undefined') {
        LANDING_REDIRECT_URL = data.landing_redirect_url;
    }

    if (typeof data.window_open != 'undefined') {
        WINDOW_OPEN = data.window_open;
    }
};

const parseCookie = (str) => {
    if (!str) {
        return {};
    }
    return str
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});
}

const startLogin = async function (data, callback) {
    await startAuthentication({
        email_address: data.email_address,
        auth_type: AUTH_TYPE.SSO,
        provider: ProviderData(data),
        user: false,
        options: LoginOptionData(data),
        callback});
};

const redirectLogin = function (pin, auto_redirect) {
    let url = API_PATH + 'redirect';

    let request_data = {
        pin: pin,
    };

    if (LANDING_REDIRECT_URL) {
        url = LANDING_REDIRECT_URL + "?redirect=" + encodeURIComponent(url);
    }

    return redirect(url, request_data, auto_redirect, WINDOW_OPEN);
};

const redirectAuthentication = function(pin, auto_redirect) {
    let url = API_PATH +
        'apps/' +
        APP_ID +
        '/authentications/' +
        pin +
        '/redirect';

    //console.log(LANDING_REDIRECT_URL)
    if (LANDING_REDIRECT_URL) {
        url = LANDING_REDIRECT_URL + "?redirect=" + encodeURIComponent(url);
    }

    return redirect(url, false, auto_redirect, WINDOW_OPEN);
};

const validateLogin = function (pin, callback) {
    let url = API_PATH + 'validate';

    let request_data = {
        app_id: APP_ID,
        app_secret: APP_SECRET,
        pin: pin,
    };

    return request(url, request_data, 'POST', callback);
};

const refreshToken = function (provider_id, token, callback) {
    let url = API_PATH + 'refresh';

    let request_data = {
        app_id: APP_ID,
        provider_id: provider_id,
        token: token,
    };

    return request(url, request_data, 'POST', callback);
};

const revokeToken = function (provider_id, token, callback) {
    let url = API_PATH + 'revoke';

    let request_data = {
        app_id: APP_ID,
        provider_id: provider_id,
        token: token,
    };

    return request(url, request_data, 'POST', callback);
};

const getProviders = async function (email_address, callback) {
    const callback2 = function(res){
        if (callback) {
            callback(res);
        }
    };
    await getClientSettings(email_address, callback2);
};

const isEmailInDomain = function(email_address) {
    let found = false;
    let domains = HIDE_LOCAL_AUTH_DOMAINS ? HIDE_LOCAL_AUTH_DOMAINS : [];
    for(let i = 0; email_address && i < domains.length && !found; i++) {
        if (email_address.indexOf(domains[i]) !== -1 && (email_address.indexOf(domains[i]) + domains[i].length) == email_address.length) {
            found = true;
        }
    }
    return found;
}

let CLIENT_SETTINGS_QUEUE = [];
let INITIAL_CLIENT_SETTINGS_RUNNING = false;
let INITIAL_CLIENT_SETTINGS_CALLS = false;

const handleClientSettings = function(res) {
    // console.log('process queue');
    INITIAL_CLIENT_SETTINGS_RUNNING = false;
    while(CLIENT_SETTINGS_QUEUE.length) {
        let resolve = CLIENT_SETTINGS_QUEUE.pop();
        if (typeof resolve == 'function') {
            resolve(res);
        }
    }
};

const getClientSettings = async function(email_address, callback) {
    let url = API_PATH + 'apps/' + APP_ID + '/client_settings';

    let request_data = {
    };

    let device_id = await getDeviceId();
    request_data['device_id'] = device_id;

    if (email_address) {
        request_data['email_address'] = encodeURIComponent(email_address);
    }

    if (PAGE_VIEW_ID) {
        request_data['page_view_id'] = PAGE_VIEW_ID;
    }

    if (!email_address) {
        if (INITIAL_CLIENT_SETTINGS_CALLS && INITIAL_CLIENT_SETTINGS_RUNNING) {
            CLIENT_SETTINGS_QUEUE.push(callback);
            return;
        }
        if (!INITIAL_CLIENT_SETTINGS_CALLS) {
            INITIAL_CLIENT_SETTINGS_RUNNING = true;
            INITIAL_CLIENT_SETTINGS_CALLS = true;
        }
    }

    const handlingCallback = function(res) {
        // for(let i = 0; i < 1; i++) {
        //     res.providers = res.providers.concat(res.providers);
        // }
        if (res.settings) {
            if (res.settings.discovery_required || res.settings.invite_required) {
                if (res.settings.password_settings && res.settings.password_settings.enabled) {
                    if (res.user_profile && res.user_profile.email_address && isEmailInDomain(res.user_profile.email_address)) {
                        res.settings.password_settings = false;
                        res.user_profile.has_password = false;
                    }
                }
            }
        }

        // console.log(res);
        if (typeof callback == 'function') {
            callback(res);
        }
        handleClientSettings(res);
    }

    const deviceCheckCallback = async function(res) {
        if (checkDeviceId(res)) {
            await cleanDeviceId();
            getClientSettings(email_address, callback);
        } else {
            handlingCallback(res);
        }
    };

    return request(url, request_data, 'GET', deviceCheckCallback);
};

const incrementPageEngagement = async function(content, callback) {
    let url = API_PATH + 'apps/' + APP_ID + '/prerelease/page_engagement';

    const _default = {
        c: 0,
        s: 0,
        m: 0
    };

    let request_data = {
        ..._default,
        ...content
    };

    let device_id = await getDeviceId();
    request_data['device_id'] = device_id;

    if (PAGE_VIEW_ID) {
        request_data['page_view_id'] = PAGE_VIEW_ID;
    }

    const deviceCheckCallback = async function(res) {
        if (checkDeviceId(res)) {
            await cleanDeviceId();
            incrementPageEngagement(data, callback);
        } else if (typeof callback == 'function') {
            callback(res);
        }
    };
    return request(url, request_data, 'POST', deviceCheckCallback);

}

const ping = function (callback) {
    let url = API_PATH + 'ping';

    let request_data = {
        app_id: APP_ID,
    };

    return request(url, request_data, 'GET', callback);
};

const startMagicLink = async function(data, callback) {
    await startAuthentication({
        email_address: data.email_address,
        auth_type: AUTH_TYPE.MAGIC_LINK,
        options: LoginOptionData(data),
        callback});
};

const login = async function (data, callback) {
    await startAuthentication({
        email_address: data.email_address,
        auth_type: AUTH_TYPE.SSO,
        provider: ProviderData(data),
        user: false,
        options: LoginOptionData(data),
        callback});
};

const loginWithPassword = async function (data, callback) {
    let request_data = PasswordData(data);

    await startAuthentication({
        email_address: data.email_address,
        auth_type: AUTH_TYPE.AUTH,
        provider: false,
        user: request_data,
        options: LoginOptionData(data),
        callback});
};

const register = async function (data, callback) {
    await startAuthentication({
        email_address: data.email_address,
        auth_type: AUTH_TYPE.SSO,
        provider: ProviderData(data),
        user: false,
        options: LoginOptionData(data),
        callback});
};

const registerWithPassword = async function (data, callback) {
    let request_data = PasswordData(data);

    if (data.first_name) {
        request_data['first_name'] = data.first_name;
    }

    if (data.last_name) {
        request_data['last_name'] = data.last_name;
    }

    if (data.pin) {
        request_data['pin'] = data.pin;
    }
    await startAuthentication({
        email_address: data.email_address,
        auth_type: AUTH_TYPE.AUTH,
        provider: false,
        user: request_data,
        options: LoginOptionData(data),
        callback});
};

const resetPassword = function (email_address, callback) {
    let url = API_PATH +
        'apps/' +
        APP_ID +
        '/users/reset_password';

    let request_data = {
        app_id: APP_ID,
    };

    if (email_address) {
        request_data['email_address'] = email_address;
    }

    return request(url, request_data, 'POST', callback);
};

const confirmResetPassword = function (email_address, pin, password, callback) {
    let url = API_PATH +
        'apps/' +
        APP_ID +
        '/users/confirm_password';

    let request_data = {
        app_id: APP_ID,
    };

    if (email_address) {
        request_data['email_address'] = email_address;
    }
    if (pin) {
        request_data['pin'] = pin;
    }
    if (password) {
        request_data['password'] = password;
    }

    return request(url, request_data, 'POST', callback);
};

const confirmUser = async function (data, callback) {
    let url = API_PATH +
        'apps/' +
        APP_ID +
        '/users/confirm';

    let request_data = {};

    request_data['options'] = LoginOptionData(data);

    let device_id = await getDeviceId();
    request_data['device_id'] = device_id;

    if (data.email_address) {
        request_data['email_address'] = data.email_address;
    }
    if (data.pin) {
        request_data['pin'] = data.pin;
    }


    const deviceCheckCallback = async function(res) {
        if (checkDeviceId(res)) {
            await cleanDeviceId();
            confirmUser(data, callback);
        } else if (typeof callback == 'function') {
            callback(res);
        }
    };
    return request(url, request_data, 'POST', deviceCheckCallback);
};

const resendConfirmationEmail = function (email_address, callback) {
    let url = API_PATH +
        'apps/' +
        APP_ID +
        '/users/resend_confirmation';

    let request_data = {};

    if (email_address) {
        request_data['email_address'] = email_address;
    }

    return request(url, request_data, 'POST', callback);
};

const registerDevice = function(callback) {
    let url = API_PATH + 'apps/' + APP_ID + '/devices';

    let request_data = {
    };

    return request(url, request_data, 'POST', callback);
};

const createEvent = async function (code, data, referrer, callback) {
    let url = API_PATH + 'apps/' + APP_ID + '/events';

    let request_data = {};

    let device_id = await getDeviceId();
    request_data['device_id'] = device_id;

    if (code) {
        request_data['code'] = code;
    }
    if (data) {
        request_data['data'] = data;
    }
    if (referrer) {
        request_data['referrer_url'] = referrer;
    }

    if (code !== 'page_view') {
        if (PAGE_VIEW_ID) {
            request_data['page_view_id'] = PAGE_VIEW_ID;
        }
    }

    const deviceCheckCallback = async function(res) {
        if (checkDeviceId(res)) {
            await cleanDeviceId();
            createEvent(code, data, referrer, callback);
        } else if (typeof callback == 'function') {
            callback(res);
        }
    };

    return request(url, request_data, 'POST', deviceCheckCallback);
};

const startDeIdentification= async function({
    email_address, auth_type, provider, user, options, callback
}) {
    let url = API_PATH +
        'apps/' +
        APP_ID +
        '/users/start_deidentification';
    return startProcess(url, startDeIdentification, {
        email_address, auth_type, provider, user, options, callback
    });
};

const startAuthentication = async function({
   email_address, auth_type, provider, user, options, callback
}) {
    let url = API_PATH +
        'apps/' +
        APP_ID +
        '/authentications';

    cleanEventStorage();

    const cb = function(response) {
        if (response && !response.error) {
            if (options.success_event_code) {
                assignEventStorage(options.success_event_code);
            }
        }
        if (typeof callback == 'function') {
            callback(response);
        }
    }
    return startProcess(url, startAuthentication, {
        email_address, auth_type, provider, user, options, callback: cb
    });
};

const startProcess = async function(url, retry, {
    email_address, auth_type, provider, user, options, callback
}) {
    let request_data = {
        options: options
    };

    let device_id = await getDeviceId();
    request_data['device_id'] = device_id;

    switch(auth_type) {
        case AUTH_TYPE.SSO:
            request_data['auth_type'] = AUTH_TYPE.SSO;
            request_data['provider'] = provider;
            break;
        case AUTH_TYPE.MAGIC_LINK:
            request_data['auth_type'] = AUTH_TYPE.MAGIC_LINK;
            break;
        case AUTH_TYPE.AUTH:
            request_data['auth_type'] = AUTH_TYPE.AUTH;
            request_data['user'] = user;
            break;
    }

    if (email_address) {
        request_data['email_address'] = email_address;
    }

    if (PAGE_VIEW_ID) {
        request_data['page_view_id'] = PAGE_VIEW_ID;
    }

    const deviceCheckCallback = async function(res) {
        if (checkDeviceId(res)) {
            await cleanDeviceId();
            retry({
                email_address, auth_type, provider, user, options, callback
            });
        } else if (typeof callback == 'function') {
            callback(res);
        }
    };
    return request(url, request_data, 'POST', deviceCheckCallback);
};

const confirmMagicLinkCode = function(magic_link_code, callback) {
    let url = API_PATH + 'apps/' + APP_ID + '/magic_link';

    let request_data = {
        magic_link_code: magic_link_code,
    };

    return request(url, request_data, 'POST', callback);
};

const getMagicLinkAuthenticated = function(authentication_token, callback) {
    let url = API_PATH + 'apps/' + APP_ID + '/magic_link/' + authentication_token;
    return request(url, {}, 'GET', callback);
};

const resetDeviceVerification = async function(callback) {
    cleanEventStorage();
    let device_id = await getDeviceId();
    let url = API_PATH + 'apps/' + APP_ID + '/devices/' + device_id + '/reset_verification';
    let request_data = {
    };
    return request(url, request_data, 'POST', callback);
};

const confirmDeIdentification = async function({
    email_address, pin }, callback) {
    let url = API_PATH + 'apps/' + APP_ID + '/users/confirm_deidentification';

    let device_id = await getDeviceId();
    let request_data = {
        pin,
        device_id
    };

    if (email_address) {
        request_data['email_address'] = email_address;
    }

    if (PAGE_VIEW_ID) {
        request_data['page_view_id'] = PAGE_VIEW_ID;
    }

    return request(url, request_data, 'POST', callback);
};

export default {
    configure,
    setPageViewId,
    getProviders,
    startLogin,
    redirectLogin,
    validateLogin,
    ping,
    login,
    loginWithPassword,
    register,
    registerWithPassword,
    resetPassword,
    confirmResetPassword,
    confirmUser,
    resendConfirmationEmail,
    registerDevice,
    createEvent,
    getClientSettings,
    redirectAuthentication,
    startAuthentication,
    startMagicLink,
    confirmMagicLinkCode,
    getMagicLinkAuthenticated,
    resetDeviceVerification,
    incrementPageEngagement,
    startDeIdentification,
    confirmDeIdentification,
    assignEventStorage,
    cleanEventStorage
};
