import API from './api.js';
import viewButton from './view-button';
import viewForm from './view-form';
import viewPopupClass from './view-popup';
import viewPolicy from './view-policy';
import viewUI from './view-ui';
import view from './view';
import constants from './constants';
import lang from './locale.js';
import engagement from './engagement';

import './scss/theme.scss';
import './scss/client.scss';

const providers = constants.providers;
const providers_hash = constants.providers_hash;
const providers_buttons = constants.providers_buttons;
const event_type = constants.event_type;
const gateway_emails = constants.gateway_emails;
const gateway_hash = constants.gateway_hash;
const encoded_action = constants.encoded_action;
const encoded_hash = constants.encoded_hash;
const html_attributes = constants.html_attributes;
const errors = constants.errors;

let Locale = {};

let viewPopup;

const loadLanguage = function(options) {
    let locale = lang.getLocale(options.language, options.locale);
    if (locale) {
        Locale = locale;
    }
};

const initialize = function() {
    loadFonts();
};

const loadFonts = function() {
    (function(d, s, id) {
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
        js.href = 'https://cdn.breadbutter.io/dist/fonts/fonts.css';
        fjs.append(js);
    })(document, 'link', 'logon-fonts');
};

let options = {
    app_id: false,
    app_secret: false,
    api_path: false,
    language: false,
    locale: false,
    app_name: false,
    destination_url: false,
    registration_destination_url: false,
    callback_url: false,
    client_data: false,
    page_view_tracking: true,
    force_reauthentication: null, //off/attempt/force/null
    button_theme: 'tiles', //'square-icons', 'round-icons', 'tiles'
    expand_email_address: true,
    show_login_focus: false,
    allow_sub_domain: false,
    remember_close: false,
    success_event_code: false,
    ga_measurement_id: false,
    continue_with_hover: false,
    continue_with_hover_distance: 5,
    hide_local_auth_domains: [],
    landing_redirect_url: false,
    window_open: false,
    onMagicLinkConfirm: false,
    custom_data_required: false,
    custom_data: [],
};

let profile_init = false;
let profile = {};
let suggested_provider = false;
let device_verified = false;
let content_preview = false;
let limit_content_preview_timer = false;
let access_content_preview = false;
let content_gating = false;
let limit_content_gating_timer = false;
let access_content_gating = false;


const configure = function(opt) {
    if (typeof opt.content_preview != 'undefined') {
        content_preview = opt.content_preview;
    }
    if (typeof opt.app_name != 'undefined') {
        options.app_name = opt.app_name;
    }
    if (typeof opt.language != 'undefined') {
        options.language = opt.language;
    }

    if (typeof opt.locale != 'undefined') {
        options.locale = opt.locale;
    } else {
        options.locale = {};
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

    if (typeof opt.registration_destination_url != 'undefined') {
        options.registration_destination_url = opt.registration_destination_url
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
    }

    if (typeof opt.show_login_focus != 'undefined') {
        options.show_login_focus = opt.show_login_focus;
    }

    if (typeof opt.allow_sub_domain != 'undefined') {
        options.allow_sub_domain = opt.allow_sub_domain;
    }

    if (typeof opt.remember_close != 'undefined') {
        options.remember_close = opt.remember_close;
    }

    if (typeof opt.success_event_code != 'undefined') {
        options.success_event_code = opt.success_event_code;
    }

    if (typeof opt.hide_local_auth_domains != 'undefined') {
        options.hide_local_auth_domains = opt.hide_local_auth_domains;
    }

    if (typeof opt.landing_redirect_url != 'undefined') {
        options.landing_redirect_url = opt.landing_redirect_url;
    }

    if (typeof opt.ga_measurement_id != 'undefined') {
        options.ga_measurement_id = opt.ga_measurement_id;
    }

    if (typeof opt.window_open != 'undefined') {
        options.window_open = opt.window_open;
    }

    if (typeof opt.onMagicLinkConfirm == 'function') {
        options.onMagicLinkConfirm = opt.onMagicLinkConfirm;
    }

    if (typeof opt.custom_data == 'object') {
        options.custom_data = opt.custom_data;
        if (options.custom_data.length) {
            options.custom_data_required = true;
        }
    }


    api.configure({
        app_id: options.app_id,
        app_secret: options.app_secret,
        api_path: options.api_path,
        destination_url: options.destination_url,
        callback_url: options.callback_url,
        force_reauthentication: options.force_reauthentication,
        client_data: options.client_data,
        allow_sub_domain: options.allow_sub_domain,
        success_event_code: options.success_event_code,
        hide_local_auth_domains: options.hide_local_auth_domains,
        landing_redirect_url: options.landing_redirect_url,
        window_open: options.window_open,
        registration_destination_url: options.registration_destination_url,
        custom_data_required: options.custom_data_required
    });



    startup.beforeProfile();
    loadLanguage(options);
    viewPopup = new viewPopupClass();
    viewUI.init(options);

    return new Promise(function(resolve) {
        api.getProfile(function(up, suggested, dv) {
            resumePage();
            profile_init = true;
            processProfileQueue();
            resolve(up, dv);
            startup.completeProfile(opt);
            handleLimitContentPreview();
            handleUrl();
            handleCustomData();
            if (!GATED_PAGE_NOW) {
                tracking();
            }
        })
    });
};

const checkContentLimitPreviewLinks = () => {
    let limited_page = true;
    if (content_preview.restricted_links instanceof Array) {
        limited_page = false;
        let urls = content_preview.restricted_links;
        for (let i = 0; i < urls.length; i++) {
            let url = urls[i];
            let wildgate = false;
            if (url.indexOf('*') != -1) {
                wildgate = true;
                url = url.replace('/*', '');
            }
            let pathname = document.location.pathname;
            if (wildgate) {
                if (pathname.indexOf(url) == 0 && pathname.replace(url, '').indexOf('/') == 0) {
                    limited_page = true;
                }
            } else {
                if (pathname == url) {
                    limited_page = true;
                }
            }
        }
    }
    return limited_page;
};

const stopLimitPreviewCheck = ()=> {
    window.removeEventListener('scroll', calculateScrollLimitPreview, true);
    if (limit_content_preview_timer) {
        clearTimeout(limit_content_preview_timer);
    }
};
const stopLimitGatingCheck = ()=> {
    window.removeEventListener('scroll', calculateScrollLimitGating, true);
    if (limit_content_gating_timer) {
        clearTimeout(limit_content_gating_timer);
    }
};

let has_content_preview = false;
let has_content_gating = false;

const waitLimitContentPreview = ()=> {
    let opt = parsingUrl({});
    if (opt && opt.mode) {
        triggerContentPreview();
        return;
    }

    has_content_preview = true;
    if (isNaN(content_preview.scroll_limit) && isNaN(content_preview.time_limit)) {
        triggerContentPreview();
    } else {
        if (!isNaN(content_preview.scroll_limit)) {
            window.addEventListener('scroll', calculateScrollLimitPreview, true);
        }
        if (!isNaN(content_preview.time_limit)) {
            limit_content_preview_timer = setTimeout(() => {
                triggerContentPreview();
            }, Number(content_preview.time_limit) * 1000);
        }
    }
};

const waitLimitContentGating = ()=> {
    let opt = parsingUrl({});
    if (opt && opt.mode) {
        triggerContentGating();
        return;
    }

    has_content_gating = true;
    if (isNaN(content_gating.scroll_limit) && isNaN(content_gating.time_limit)) {
        triggerContentGating();
    } else {
        if (!isNaN(content_gating.scroll_limit)) {
            window.addEventListener('scroll', calculateScrollLimitGating, true);
        }
        if (!isNaN(content_gating.time_limit)) {
            limit_content_gating_timer = setTimeout(() => {
                triggerContentGating();
            }, Number(content_gating.time_limit) * 1000);
        }
    }
};

let accessLimitContentPreview = false;
let accessLimitContentGating = false;
const handleLimitContentPreview = () => {
    if (accessLimitContentPreview) {
        return;
    }
    accessLimitContentPreview = true;
    if (!device_verified) {
        if (content_preview && checkContentLimitPreviewLinks()) {
            waitLimitContentPreview();
        }
    }
};

const handleLimitContentGating = () => {
    if (accessLimitContentGating) {
        return;
    }
    accessLimitContentGating = true;
    if (!device_verified) {
        if (content_gating) {
            waitLimitContentGating();
        }
    }
};



const calculateScrollLimitPreview = (event) => {
    let windowHeight = window.innerHeight;
    let scrollMax = (event.target == document) ? document.body.scrollHeight : event.target.scrollHeight;
    let scrollArea = scrollMax - windowHeight;
    let scrollNow = event.target.scrollTop ? event.target.scrollTop : (event.target.scrollingElement ? event.target.scrollingElement.scrollTop : (event.target == document ? window.scrollY : 0));
    if (scrollNow >= scrollArea * Number(content_preview.scroll_limit)) {
        stopLimitPreviewCheck();
        if (!access_content_preview) {
            access_content_preview = true;
            triggerContentPreview();
        }
    }
};

const calculateScrollLimitGating = (event) => {
    let windowHeight = window.innerHeight;
    let scrollMax = (event.target == document) ? document.body.scrollHeight : event.target.scrollHeight;
    let scrollArea = scrollMax - windowHeight;
    let scrollNow = event.target.scrollTop ? event.target.scrollTop : (event.target.scrollingElement ? event.target.scrollingElement.scrollTop : (event.target == document ? window.scrollY : 0));
    if (scrollNow >= scrollArea * Number(content_gating.scroll_limit)) {
        stopLimitGatingCheck();
        if (!access_content_gating) {
            access_content_gating = true;
            triggerContentGating();
        }
    }
};

const removeAllPopups = ()=> {
    let newsletters = document.querySelectorAll('.breadbutter-ui-newsletter-popup');
    let continueWiths = document.querySelectorAll('.breadbutter-popup');
    for(let i = 0; i < newsletters.length; i++) {
        newsletters[i].remove();
    }
    for(let i = 0; i < continueWiths.length; i++) {
        continueWiths[i].remove();
    }
}

const triggerContentPreview = ()=> {
    stopLimitPreviewCheck();
    removeAllPopups();
    BreadButter.ui.showContentPreview({
        ...content_preview,
        app_name: options.app_name
    });
};

const triggerContentGating = ()=> {
    stopLimitGatingCheck();
    removeAllPopups();
    BreadButter.ui.showContentGating({
        ...content_gating,
        app_name: options.app_name
    });
};

const delayCheckContinueWith = ()=> {
    setTimeout(()=> {
        if (!ishandlingQueryString) {
            widgets.continueWith();
        }
    }, 1500);
};

const handleUrl = function() {
  // isParsingUrl = true;
  let opt = parsingUrl({});
  // console.log(opt);
  if (opt && opt.mode) {
      switch(opt.mode) {
          case constants.mode.DEIDENTIFICATION:
              if (!isParsingDeIdentification) {
                  widgets.deIdentification(opt);
              }
              break;
          default:
              delayCheckContinueWith();
              break;
      }
  }
};

const handleCustomData = function() {
    if (requireCustomData()) {
        setTimeout(()=> {
            if (!ishandlingCustomData) {
                widgets.continueWith();
            }
        }, 1500);
    }
};

const resumePage = function() {
    window.addEventListener('pageshow', function() {
        console.log('Page resume from history.')
        let o_up = Object.assign({}, profile);
        let o_dv = device_verified;
        setTimeout(()=> {
            api.getProfile(function(up, suggested, dv) {
                if (o_dv != dv) {
                    window.location.reload();
                }
            })
        }, 10);
    });
};

const api = new (function() {
    this.configure = function(opt) {
        API.configure({
            ...opt
        });
    };

    this.getProfile = function(callback) {
        API.getClientSettings(false, function(response) {
            if (response) {
                let up = response.user_profile, suggested = response.suggested_provider, dv = response.device_verified;
                device_verified = dv;
                suggested_provider = suggested;
                profile = up;
                if (callback) {
                    callback(up, suggested, dv);
                }
            }
        })
    };

    this.resetDeviceVerification = function(callback) {
        API.resetDeviceVerification(function(){
            if (typeof callback == 'function') {
                callback();
            }
        });
    };

    this.identifyUser = function(email_address, first_name, last_name, callback) {
        API.identifyUser({email_address, first_name, last_name, callback});
    };

    this.getProviders = API.getProviders;
    
    this.ping = API.ping;
})();

let PAGE_VIEW_EVENT_READY = false;
let CUSTOM_EVENT_QUEUE = [];

const processEvent = function() {
    while(QUEUE_ACTIONS.length > 0) {
        let call = QUEUE_ACTIONS.shift();
        if (typeof call.fn == 'function') {
            call.fn.apply(this, call.params);
        }
    }
    while (CUSTOM_EVENT_QUEUE.length > 0) {
        let event = CUSTOM_EVENT_QUEUE.splice(0, 1)[0];
        API.createEvent(event.custom, event.data, false, event.callback);
    }
};

const queueEvent = function(custom, data, callback) {
    CUSTOM_EVENT_QUEUE.push({
        custom,
        data,
        callback
    });
};

let QUEUE_ACTIONS = [];

const queueAction = function(fn, params) {
    QUEUE_ACTIONS.push({
        fn,
        params
    })
}

const events = new (function() {
    this.initialengagement = function() {
        if(PAGE_VIEW_EVENT_READY) {
            engagement.initialize(events);
        } else {
            queueAction(engagement.initialize, [events]);
        }
    };
    this.engagement = function(content, callback) {
        API.incrementPageEngagement(content, callback);
    };
    this.custom = function(custom, callback) {
        if (PAGE_VIEW_EVENT_READY) {
            API.createEvent(custom, false, false, callback);
        } else {
            queueEvent(custom, false, callback);
        }
    };
    this.redirect = function(custom, link) {
        const callback = function() {
            document.location.assign(link);
        };
        if (PAGE_VIEW_EVENT_READY) {
            API.createEvent(custom, false, false, callback);
        } else {
            queueEvent(custom, false, callback);
        }
    };
    this.pageview = function(callback, referrer, options) {
        let data = {
            title: document.title,
            url: document.location.href
        };
        if (options) {
            data = Object.assign(data, options);
        }
        API.createEvent(event_type.PAGE_VIEW, data, referrer, function(res) {
            let first_initiated = false;
            if (res.event_id) {
                API.setPageViewId(res.event_id);
                if (!PAGE_VIEW_EVENT_READY) {
                    first_initiated = true;
                }
                PAGE_VIEW_EVENT_READY = true;
            }
            if (typeof callback == 'function') {
                callback(res);
            }
            if (first_initiated) {
                processEvent();
            }
        });

    };
})();

let GATED_PAGE_NOW = false;
let DELAY_FOR_GA = false;
let WAIT_FOR_GA = false;
let NO_GA = false;
let VALID_GA = true;

const getGAData = async (callback)=> {
    WAIT_FOR_GA = false;
    NO_GA = false;
    if (options.ga_measurement_id) {
        if (typeof window.gtag == 'undefined') {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
        }
        try {
            const client_id = await new Promise((resolve) => {
                gtag('get', options.ga_measurement_id, 'client_id', resolve);
            });

            if (client_id) {
                callback({ ga_data: { cid: client_id } });
            } else {
                callback();
            }
        } catch (error) {
            callback();
        }
    } else {
        let cookie = parseCookie(document.cookie);
        if (typeof ga == 'function' && VALID_GA) {
            WAIT_FOR_GA = true;
            if (typeof ga.getAll == 'function') {
                WAIT_FOR_GA = false;
                let data = ga.getAll().reduce((data, tracker)=> {
                    if (data === false) {
                        let cid = tracker.get('clientId');
                        let uid = tracker.get('userId');

                        return { ga_data: { cid, uid } };
                    } else {
                        return data;
                    }
                }, false);
                if (data === false) {
                    VALID_GA = false;
                    await getGAData(callback);
                } else {
                    callback(data);
                }
            } else if (!DELAY_FOR_GA){
                WAIT_FOR_GA = false;
                DELAY_FOR_GA = true;
                setTimeout(async () => {
                    await getGAData(callback);
                }, 150);
                return;
            } else {
                callback();
            }
        } else if (cookie['_ga']) {
            let client_id = cookie['_ga'].split('.').slice(2).join('.');
            callback({ ga_data: { cid: client_id } });
        } else {
            NO_GA = true;
            callback();
        }
    }
};

const getGAPromise = async () => {
    try {
        return await new Promise((resolve) => {
            getGAData((response) => {
                resolve(response || {});
            });
        });
    } catch (error) {
        return {};
    }
};


const getSegment = async (callback, count) => {
    try {
        if (typeof analytics != 'undefined') {
            if (typeof analytics.user != 'undefined' && typeof analytics.user().anonymousId != 'undefined') {
                const anonymousId = analytics.user().anonymousId();
                if (anonymousId) {
                    callback({
                        segment_anonymous_id: anonymousId
                    });
                } else {
                    callback();
                }
            } else {
                if (count > 5) {
                    callback();
                } else {
                    setTimeout(async () => {
                        await getSegment(callback, ++count);
                    }, 150 * count);
                }
            }
        } else {
            callback();
        }
    } catch (e) {
        callback();
    }
};

const getSegmentPromise = async () => {
    try {
        return await new Promise((resolve) => {
            getSegment((response) => {
                resolve(response || {});
            }, 1);
        });
    } catch (error) {
        return {};
    }
};

const tracking = async () => {
    if (options.page_view_tracking) {

        let referrer = document.referrer;
        if (document.referrer.indexOf(document.location.origin) == 0) {
            referrer = false;
        }
        if (querystring && querystring['bb_noref'] &&  querystring['bb_noref'] == "true") {
            referrer = false;
        }

        let data = {};

        window.addEventListener('hashchange', function() {
            events.pageview();
        });

        window.addEventListener('bb-new-device-id', function() {
            events.pageview();
        });
        const promises = [getGAPromise(), getSegmentPromise()];

        Promise.all(promises)
            .then(([gaData, segmentData]) => {
                // gaData and segmentData will contain the resolved values from getGAPromise and getSegmentPromise respectively
                // You can handle the data here
                // console.log('Google Analytics Data:', gaData);
                // console.log('Segment Data:', segmentData);
                events.pageview(false, referrer, {
                    ...gaData,
                    ...segmentData
                });

                let WAIT_SEGMENT = segmentData && segmentData.segment_anonymous_id ? false : true;

                // Your further processing code here
                if(PAGE_VIEW_EVENT_READY) {
                    engagement.initialize(events, WAIT_FOR_GA, false, WAIT_SEGMENT);
                } else {
                    queueAction(engagement.initialize, [events, WAIT_FOR_GA, NO_GA, WAIT_SEGMENT]);
                }
            })
            .catch((error) => {
                // Handle any errors that occurred in either getGAPromise or getSegmentPromise
                console.error('Error:', error);
            });
    }
}

const applyOptions = function(opt, key) {
    if (typeof opt[key] == 'undefined' && typeof options[key] != 'undefined') {
        opt[key] = options[key];
    }
};
const MANUAL_CLOSE = 'breadbutter-sdk-manual-close';
const MANUAL_CLOSE_TIMER = 'breadbutter-sdk-manual-close-timer';


const internalOnFormClose = function() {
    let close = checkCloseAlready();
    if (!close) {
        if (localStorage) {
            localStorage.setItem(MANUAL_CLOSE, 1);
            localStorage.setItem(MANUAL_CLOSE_TIMER, Date.now());
        }
    }
};

const checkCloseAlready = function() {
    let close = false;
    if (localStorage) {
        close = parseInt(localStorage.getItem(MANUAL_CLOSE));
        if (close) {
            let timer = localStorage.getItem(MANUAL_CLOSE_TIMER);
            if (!timer) {
                close = false;
            } else {
                let expired = parseInt(timer) + 2 * 60 * 60 * 1000;
                let now = Date.now();
                if (now > expired) {
                    close = false;
                } else {
                    close = true;
                }
            }
        }
    }
    return close;
}

const checkRememberClose = function(options) {
    let should_remain_close = options.remember_close && checkCloseAlready();
    return should_remain_close;
}

const loadOptions = function(opt) {
    if (!opt) {
        opt = {};
    }

    if (options.language) {
        opt['language'] = options.language;
    }

    if (options.locale) {
        opt['locale'] = Object.assign(options.locale, opt['locale']);
    }

    if (options.app_name && !opt['app_name']) {
        opt['app_name'] = options.app_name;
    }

    if (options.app_id) {
        opt['app_id'] = options.app_id;
    }

    if (options.onMagicLinkConfirm) {
        opt['onMagicLinkConfirm'] = options.onMagicLinkConfirm;
    }

    applyOptions(opt, 'destination_url');
    applyOptions(opt, 'registration_destination_url');
    applyOptions(opt, 'callback_url');
    applyOptions(opt, 'client_data');
    applyOptions(opt, 'force_reauthentication');
    applyOptions(opt, 'button_theme');
    applyOptions(opt, 'expand_email_address');
    applyOptions(opt, 'continue_with_position');
    applyOptions(opt, 'show_login_focus');
    applyOptions(opt, 'remember_close');
    applyOptions(opt, 'success_event_code');
    applyOptions(opt, 'continue_with_hover');
    applyOptions(opt, 'continue_with_hover_distance');
    applyOptions(opt, 'custom_data');
    applyOptions(opt, 'custom_data_required');

    opt.internalOnFormClose = internalOnFormClose;
    return opt;
};

const initUI = function(opt) {
    opt = loadOptions(opt);
    viewPopup.init(opt);
    viewButton.init(opt);
};

const UI = new (function() {
    (this.deIdentification = function(options) {
        isParsingDeIdentification = true;
        options.hide_focus_text = true;
        options.show_login_focus = true;
        options.hide_on_focus = false;
        options.continue_with_position = 'center';
        initUI(options);
        let form = new viewForm();
        form.init(options);
        if (options['email_address']) {
            if (localStorage) {
                localStorage.setItem(
                    'breadbutter-sdk-email-address',
                    options['email_address']
                );
            }
        }
        viewPopup.deIdentification(options, form);
    }),
    (this.customForm = function(options) {
        options.hide_focus_text = true;
        options.show_login_focus = true;
        options.hide_on_focus = false;
        options.continue_with_position = 'center';
        initUI(options);
        options.profile = profile;
        let form = new viewForm();
        form.init(options);
        viewPopup.addCustomForm(options, form);
        //viewPopup.deIdentification(options, form);
    }),
    (this.optIn = function(id, options) {
        if (typeof id != 'string') {
            options = id;
            id = false;
        }
        initUI(options);
        let form = new viewForm();
        form.init(options);
        form.optInForm(id, options);
    }),
    (this.contactUs = function(id, opt) {
        if (typeof id != 'string') {
            opt = id;
            id = false;
        }
        initUI(opt);
        removeAllPopups();

        let popup = new viewPopupClass();
        popup.init(opt);
        let form = new viewForm();
        form.init(opt);

        if (id) {
            form.addContactUs(id, opt);
        } else {
            popup.addContactUs(opt, form);
        }
    }),
    (this.confirmEmail = function(id, options) {
        if (typeof id != 'string') {
            options = id;
            id = false;
        }
        initUI(options);
        let form = new viewForm();
        form.init(options);
        if (options['email_address']) {
            if (localStorage) {
                localStorage.setItem(
                    'breadbutter-sdk-email-address',
                    options['email_address']
                );
            }
        }

        if (id) {
            form.addConfirm(id, options);
        } else {
            viewPopup.addConfirm(options, form);
        }
    }),
    (this.resetPassword = function(id, options) {
        if (typeof id != 'string') {
            options = id;
            id = false;
        }
        //options required token
        initUI(options);
        let form = new viewForm();
        form.init(options);
        if (options['email_address']) {
            if (localStorage) {
                localStorage.setItem(
                    'breadbutter-sdk-email-address',
                    options['email_address']
                );
            }
        }

        if (id) {
            form.addReset(id, options);
        } else {
            viewPopup.addReset(options, form);
        }
    }),
    (this.magicLink = function(id, options) {
        if (typeof id != 'string') {
            options = id;
            id = false;
        }
        //options required token
        initUI(options);
        let form = new viewForm();
        form.init(options);
        // if (options['email_address']) {
        //     if (localStorage) {
        //         localStorage.setItem(
        //             'breadbutter-sdk-email-address',
        //             options['email_address']
        //         );
        //     }
        // }

        if (id) {
            form.addMagicLink(id, options);
        } else {
            viewPopup.addMagicLink(options, form);
        }
    }),
    (this.form = function(id, options) {
        if (typeof id != 'string') {
            options = id;
            id = false;
        }
        initUI(options);
        let form = new viewForm();
        form.init(options);
        if (id) {
            form.addForm(id, options);
        } else {
            viewPopup.addForm(options, form);
        }
    }),
    (this.invitation = function(id, options) {
        if (typeof id != 'string') {
            options = id;
            id = false;
        }
        initUI(options);
        let form = new viewForm();
        form.init(options);
        if (options['email_address']) {
            if (localStorage) {
                localStorage.setItem(
                    'breadbutter-sdk-email-address',
                    options['email_address']
                );
            }
        }
        if (id) {
            form.addRegister(id, options);
        } else {
            viewPopup.addRegister(options, form);
        }
    }),
    (this.button = function(id, options) {
        initUI(options);

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

        if (typeof options['register'] == 'undefined') {
            options['register'] = true;
        }

        if (providers.length === 0) {
            api.getProviders(email_address, function(res) {
                let list = [];
                if (res && res.providers) {
                    for (let i = 0; i < res.providers.length; i++) {
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

const querystring = function() {
    var name, value
    var params = {};
    var hash = window.location.hash;
    var search = window.location.search;
    var target = search;
    if (search.length == 0) {
        target = hash
    }
    var p = target.split('?');
    if (p.length > 1) {
        var param_array = target.split('?')[1].split('&'), x;
        // console.log(param_array);
        // for(var i in param_array) {
        for (let i = 0; i < param_array.length; i++) {
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

let isParsingUrl = false;
let isParsingDeIdentification = false;
let ishandlingQueryString = false;
let ishandlingCustomData = false;

const parsingUrl = function(opt) {
    // console.log(opt);
    if (opt && opt.mode) {
        return opt;
    }
    isParsingUrl = true;
    // console.log(querystring);
    if (querystring[errors.ERROR]) {
        let error = querystring[errors.ERROR];
        switch(error) {
            case errors.NULL_EMAIL:
                opt.mode = error;
                break;
        }
    } else if (querystring[encoded_action.TARGET]) {
        let data = false;
        try {
            let action_code = querystring[encoded_action.TARGET];
            let json = atob(action_code);
            data = JSON.parse(json);
            // console.log(json);
        } catch (e) {
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

        switch(gateway_hash[type]) {
            case 'deidentification':
                if (!opt) {
                    opt = {};
                }
                opt.mode = gateway_hash[type];
                if (email) {
                    opt.email_address = email;
                }
                if (pin) {
                    opt.pin = pin;
                }
                break;
            default:
                if (email && pin && app_id == options.app_id) {
                    if (!opt) {
                        opt = {};
                    }
                    opt.mode = gateway_hash[type];
                    opt.email_address = email;
                    opt.pin = pin;
                }
                break;
        }
    } else if (querystring[constants.magic_link_code]) {
        if (!opt) {
            opt = {};
        }
        opt.mode = constants.mode.MAGIC_LINK;
        opt.pin = querystring[constants.magic_link_code];
    }

    return opt;
}
// BB.ui.gatePages(pages: [], redirect: '', exceptions: []) --Maybe redirects with querystring?
// BB.ui.gateLink(pages: [], blurOptions? : {})
// BB.ui.gateRoute(pages: [], redirect: '', blurOptions? : {}, exceptions: []) --Maybe redirects with querystring?

let profile_queue = [];

let isVerifiedState = function() {
    return device_verified && profile && profile.state == 'verified';
}

let isProfileVerifiedState = function() {
    return profile && profile.state == 'verified';
}

let requireCustomData = function() {
    // profile.custom_data_required = true;
    return isVerifiedState() && profile && profile.custom_data_required && options.custom_data;
}

let processProfileQueue = function() {
    if (profile_queue.length) {
        let x = profile_queue.shift();
        ui[x.call].apply(ui, x.params);
        processProfileQueue();
    }
}

let isProfileInit = function(queue) {
    if (!profile_init) {
        profile_queue.push(queue);
        return false;
    }
    return true;
}

let isFieldExist = function(field) {
    return field;
}

const onBlurLogin = function(target) {
    target.onkeydown = function() {
        return false;
    };
    target.onclick = function() {
        this.blur();
        let show_login_focus = true;
        // if (typeof options['show_login_focus'] != 'undefined') {
        //     show_login_focus = options['show_login_focus'];
        // }
        widgets.continueWith({
            show_login_focus: show_login_focus,
            destination_url: document.location.href
        });
    }
};

const onBlurQueryUnderForm = function(form, type) {
    let list = form.querySelectorAll(type);
    for(let i = 0; i < list.length; i++) {
        let item = list[i];
        onBlurLogin(item);
    }
}

const CACHE_STORAGE = {
    DEVICE_ID: 'breadbutter-sdk-device-id',
    SUCCESS_EVENT_CODE: 'breadbutter-sdk-success-event-code',
    LAST_SUCCESS_EVENT_CODE: 'breadbutter-sdk-last-success-event-code',
    START_CONTACT: 'breadbutter-start-contact-sign-in'
};

const hasPreviousContactIconOpen = function() {
    let event = false;
    if (localStorage) {
        event = localStorage.getItem(CACHE_STORAGE.START_CONTACT + '-' + btoa(document.location.pathname));
    }
    return event;
}

const checkEventStorage = function(custom_event_code) {
    let event = false;
    if (localStorage) {
        let EVENT = CACHE_STORAGE.LAST_SUCCESS_EVENT_CODE + '-' + btoa(custom_event_code);
        event = localStorage.getItem(EVENT);
    }
    return event;
};

const getViewedCode = function(data) {
    return data + '_VIEWED';
}

const startup = new (function(){
    this.beforeProfile = function() {
        startup.hideAllControlContent();
    };
    this.hideAllControlContent = function() {
        let contents = document.querySelectorAll('[' + html_attributes.VISIBLE_CONTROL + ']');
        for(let i = 0; i < contents.length; i++) {
            let c = contents[i];
            c.classList.add(html_attributes.HIDDEN_DIV);
        }
    };
    this.completeProfile = function(opt){
        startup.handleGateContent();
        startup.handleControlContent();
        startup.handleFormControl();
        startup.handleProfileWidget();
        startup.handleContinueWith();
        if (opt && opt.newsletter && opt.newsletter.custom_event_code) {
            if (localStorage) {
                let cached = checkEventStorage(opt.newsletter.custom_event_code);
                if (cached != getViewedCode(opt.newsletter.custom_event_code)) {
                    BreadButter.ui.addNewsletterWidget(opt.newsletter);
                }
            }
        }
    };
    this.handleFormControl = function() {
        let contents = document.querySelectorAll('[' + html_attributes.FORM_CONTROL + ']');
        let form_event = document.querySelector('['+ html_attributes.FORM_EVENT + ']')
        let event = (form_event && form_event.attributes[html_attributes.FORM_EVENT].value) ? form_event.attributes[html_attributes.FORM_EVENT].value : "form_submission";
        let form_info = {};
        for(let i = 0; i < contents.length; i++) {
            let c = contents[i];
            let value = c.attributes[html_attributes.FORM_CONTROL].value.toUpperCase();
            if(html_attributes.control[value]) {
                form_info[html_attributes.control[value]] = c;
            }
        }
        if (form_info.form && form_info.submit) {
            if (isVerifiedState()) {
                if (form_info.name) {
                    const name = form_info.name;
                    if (name && profile.first_name) {
                        name.value = (profile.first_name + " " + (profile.last_name ? profile.last_name : "")).trim();
                        name.disabled = 'disabled';
                    }
                }

                if (form_info.first_name) {
                    const name = form_info.first_name;
                    if (name && profile.first_name) {
                        name.value = (profile.first_name).trim();
                        name.disabled = 'disabled';
                    }
                }

                if (form_info.last_name) {
                    const name = form_info.last_name;
                    if (name && profile.last_name) {
                        name.value = (profile.last_name).trim();
                        name.disabled = 'disabled';
                    }
                }
                if (form_info.email) {
                    const email = form_info.email;
                    if (email) {
                        email.value = profile.email_address;
                        email.disabled = 'disabled';
                    }
                }

                form_info.form.addEventListener('submit', function(){
                    events.custom(event);
                });
            } else {
                const types = ['textarea', 'input'];
                for (let i = 0; form_info.form && i < types.length; i++) {
                    onBlurQueryUnderForm(form_info.form, types[i]);
                }
                form_info.submit.disabled = 'disabled';
            }
        }
    };
    this.handleControlContent = function() {
        let contents = document.querySelectorAll('[' + html_attributes.VISIBLE_CONTROL + ']');
        let verified = isVerifiedState();
        for(let i = 0; i < contents.length; i++) {
            let c = contents[i];
            let value = c.attributes[html_attributes.VISIBLE_CONTROL].value;
            if ((verified && value == html_attributes.control.VERIFIED) || (!verified && value == html_attributes.control.NOT_VERIFIED)) {
                c.classList.remove(html_attributes.HIDDEN_DIV);
            } else {
                c.classList.add(html_attributes.HIDDEN_DIV);
            }
        }
    };
    this.handleGateContent = function() {
        let content = document.querySelector('[' + html_attributes.PAGE_CONTROL + ']');
        let redirect = document.querySelector('[' + html_attributes.PAGE_REDIRECT + ']');
        let verified = isVerifiedState();
        if (content && redirect) {
            let url = redirect.attributes[html_attributes.PAGE_REDIRECT].value;
            let value = content.attributes[html_attributes.PAGE_CONTROL].value;
            if ((value == html_attributes.control.VERIFIED && !verified) || (value == html_attributes.control.NOT_VERIFIED && verified)) {
                GATED_PAGE_NOW = true;
                document.location.assign(url);
            }

        }
    };

    this.handleProfileWidget = function() {
        let field = document.querySelector('[' + html_attributes.PROFILE_WIDGET + ']');
        let verified = isVerifiedState();
        if (field && verified) {
            field.innerHTML = viewUI.getProfileWidget(profile, suggested_provider);
            let content = field.querySelector('.breadbutter-ui-profile-widget-container');
            if (content && content.getBoundingClientRect().x < 375) {
                content.classList.add('breadbutter-ui-left-aligned-container');
            }
            const logout_button = field.querySelector('.breadbutter-ui-profile-dashboard-logout-button');
            if (logout_button) {
                logout_button.onclick = async function() {
                    await API.resetDeviceVerification();
                    window.location.reload();
                };
            }
        } else if (field) {
            field.innerHTML = viewUI.getLoginWidget();
            field.onclick = function(){
                let show_login_focus = false;
                if (typeof options['show_login_focus'] != 'undefined') {
                    show_login_focus = options['show_login_focus'];
                }
                widgets.continueWith({
                    show_login_focus: show_login_focus,
                    ...options
                });
            };
        }
    };
    this.handleContinueWith = function() {
        let field = document.querySelector('[' + html_attributes.CONTINUE_WITH_SHOW + ']');
        let verified = isVerifiedState();
        if (field && !verified) {
            let value = field.attributes[html_attributes.CONTINUE_WITH_SHOW].value;
            let options = false;
            if (value) {
                try {
                    options = JSON.parse(value);
                    if (typeof options != 'object') {
                        options = false;
                    }
                } catch(e) {
                    options = false;
                }
            }
            widgets.continueWith(options);
        }
    };
})();

const NotifyHubspot = function(holder) {
    function doEvent(obj, name) {
        try {
            let event = new Event(name, {target: obj, bubbles: true});
            return obj ? obj.dispatchEvent(event) : false;
        } catch (e) {
            let event = document.createEvent('Event');
            event.initEvent(name, true, true);
            obj.dispatchEvent(event);
        }
    }
    doEvent(holder, 'change');
    doEvent(holder, 'input');
    doEvent(holder, 'blur');
};

let jotFormRetry = 0;

const detectMobile = function() {
    let isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // true for mobile device
        isMobile = true;
    }
    return isMobile;
}

const ui = new (function() {
    this.addEventToLink = function(link_id, event) {
        const link = document.getElementById(link_id);
        if (link) {
            link.onclick = function() {
                let url = this.href;
                events.redirect(event, url);
                return false;
            };
        }
    };
    this.gateSection = function(unauthorized, authorized, hidden_class) {
        if (!isProfileInit({
            call: 'gateSection',
            params: [unauthorized, authorized, hidden_class]
        }))
            return;

        hidden_class = hidden_class || 'bb-hidden-div';
        const initial_class = 'bb-hidden-div';

        if (typeof unauthorized == 'string') {
            unauthorized = [unauthorized];
        }
        if (typeof authorized == 'string') {
            authorized = [authorized];
        }

        const handleDivHidden = function(targets, remove) {
            for(let i =0; targets && i < targets.length; i++) {
                let query = targets[i];
                let match = /[.#]{1}/.exec(query);
                if (!match || match.index != 0) {
                    query = '#' + query;
                }
                let divs = document.querySelectorAll(query);
                for(let j = 0; divs && j < divs.length; j++) {
                    let div = divs[j];
                    if (remove) {
                        div.classList.remove(hidden_class);
                        if (div.classList.contains(initial_class)) {
                            div.classList.remove(initial_class);
                        }
                    } else {
                        div.classList.add(hidden_class);
                        if (!div.classList.contains(initial_class)) {
                            div.classList.add(initial_class);
                        }
                    }
                }
            }

        }

        if (isVerifiedState()) {
            handleDivHidden(unauthorized);
            handleDivHidden(authorized, true);
        } else {
            handleDivHidden(unauthorized, true);
            handleDivHidden(authorized);
        }


    };
    this.gateContent = function(urls, redirect) {
        if (!isProfileInit({
            call: 'gateContent',
            params: [urls, redirect]
        }))
            return;

        if (isVerifiedState())
            return;

        for (let i = 0; i < urls.length; i++) {
            let url = urls[i];
            let pathname = document.location.pathname;
            let wildgate = false;
            if (url.indexOf('*') != -1) {
                wildgate = true;
                url = url.replace('/*', '');
                //all sub-path of this need to be blocked.
            }
            if (wildgate) {
                if (pathname.indexOf(url) == 0 && pathname.replace(url, '').indexOf('/') == 0) {
                    GATED_PAGE_NOW = true;
                    document.location.assign(redirect);
                }
            } else {
                if (pathname == url) {
                    GATED_PAGE_NOW = true;
                    document.location.assign(redirect);
                }
            }
        }
    };
    this.gateLink = function(urls, options) {
        if (!isProfileInit({
            call: 'gateLink',
            params: [urls]
        }))
            return;
        if (isVerifiedState())
            return;

        options = options ? options : {};
        const linkAssign = function(a, url) {
            a.onclick = function() {
                let show_login_focus = true;
                if (typeof options['show_login_focus'] != 'undefined') {
                    show_login_focus = options['show_login_focus'];
                }
                widgets.continueWith({
                    show_login_focus: show_login_focus,
                    destination_url: url
                });
                return false;
            };
        };

        let all_links = document.getElementsByTagName('a');
        for (let i = 0; i < urls.length; i++) {
            let url = urls[i];
            let wildgate = false;
            if (url.indexOf('*') != -1) {
                wildgate = true;
                url = url.replace('/*', '');
            }

            for (let i = 0; i < all_links.length; i++) {
                let a = all_links[i];
                let href = a.href.replace(document.location.origin, '');
                let target_url = a.href;
                if (target_url.indexOf('http') != 0) {
                    let paths = document.location.pathname.split('/');
                    let newpath = target_url.split('/').reduce(function(a, b){
                        if (!a) {
                            return b;
                        }
                        if (typeof a != 'object' || !a.length) {
                            a = [a];
                        }
                        return a.concat(b);
                    });
                    newpath = [-1, 1].concat(newpath);
                    Array.prototype.splice.apply(paths, newpath);
                    target_url = document.location.origin + paths.join('/');
                }
                if (wildgate) {
                    if (href.indexOf(url) == 0 && href.replace(url, '').indexOf('/') == 0) {
                        linkAssign(a, target_url);
                    }
                } else if (href == url) {
                    linkAssign(a, target_url);
                }
            }
        }
    };
    this.gateRoute = function(urls, redirect, options) {
        if (!isProfileInit({
            call: 'gateRoute',
            params: [urls, redirect, options]
        }))
            return;
        if (isVerifiedState())
            return;
        this.gateContent(urls, redirect);
        this.gateLink(urls, options);
    };
    this.contentPreview = function(options) {
        if (!isProfileInit({
            call: 'contentPreview',
            params: [options]
        }))
            return;
        if (isVerifiedState())
            return;

        if (typeof options != 'undefined') {
            content_preview = options;
        }
        handleLimitContentPreview();
    };
    this.contentGating = function(options) {
        if (!isProfileInit({
            call: 'contentGating',
            params: [options]
        }))
            return;
        if (isVerifiedState())
            return;

        if (typeof options != 'undefined') {
            content_gating = options;
        }
        handleLimitContentGating();
    };
    this.applyHubspotForm = function() {
        if (!isProfileInit({
            call: 'applyHubspotForm',
            params: []
        }))
            return;

        // window.jQuery = window.jQuery || (() => ({change: () => {}, trigger: () => {},}));

        let content = false;

        if (document.querySelector('.hs-form-iframe')) {
            content = document.querySelector('.hs-form-iframe').contentDocument;
        } else if (document.querySelector('.hs-custom-form')) {
            content = document.querySelector('.hs-custom-form');
        } else if (document.querySelector('.hs-form-private')) {
            content = document.querySelector('.hs-form-private');
        }


        const prefillContent = function(name, detail) {
            let d = content.querySelector(`input[name=${name}]`);
            if (d) {
                d.value = detail;
                NotifyHubspot(d);
            }
        }

        if (content) {
            if (isVerifiedState()) {
                if (profile.first_name) {
                    prefillContent('firstname', profile.first_name);
                }
                if (profile.last_name) {
                    prefillContent('lastname', profile.last_name);
                }
                prefillContent('email', profile.email_address);
                content.querySelectorAll('input[name=firstname],input[name=lastname],input[name=email]').forEach(function(c) {
                    c.addEventListener('click', function(e){
                        e.target.blur();
                    });
                });
            } else {
                content.querySelectorAll('input:not([type=submit],[type=hidden]),textarea')
                    .forEach(function(c) {
                    c.addEventListener('click', function(e){
                        e.target.blur();
                        widgets.continueWith({
                            show_login_focus: true,
                            destination_url: window.location.href
                        });
                    });
                });
                content.querySelector('input[type=submit]').addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                });
            }
        }
    };

    this.applyJotForm = function(event) {
        if (!isProfileInit({
            call: 'applyJotForm',
            params: [event]
        }))
            return;

        let content = false;

        if (document.querySelector('form.jotform-form')) {
            content = document.querySelector('form.jotform-form');
        } else {
            let iframes = document.querySelectorAll('iframe');
            for(let i = 0; i < iframes.length; i++) {
                let iframe = iframes[i];
                if (iframe.contentDocument) {
                    let c = iframe.contentDocument;
                    let form = c.querySelector('form');
                    let id = c.querySelector('input[name=formID]');
                    if (form && id && id.value == iframe.id) {
                        content = form;
                    }
                }
            }
        }

        const prefillContent = function(name, detail) {
            let d = content.querySelector(`input[data-component=${name}]`);
            if (d) {
                d.value = detail;
                // d.disabled = ' disabled';
                // NotifyHubspot(d);
                d.addEventListener('click', function(e){
                    e.target.blur();
                });
            }
        }

        if (content) {
            jotFormRetry = 0;
            if (isVerifiedState()) {
                prefillContent('first', profile.first_name);
                prefillContent('last', profile.last_name);
                prefillContent('email', profile.email_address);
                prefillContent('emailConfirmation', profile.email_address);
                content.querySelector('button[type=submit]').addEventListener('click', function(e) {
                    if (event) {
                        BreadButter.events.custom(event);
                    }
                });
            } else {
                content.querySelectorAll('input,textarea')
                    .forEach(function(c) {
                        c.addEventListener('click', function(e){
                            e.target.blur();
                            widgets.continueWith({
                                show_login_focus: true,
                                destination_url: window.location.href
                            });
                        });
                    });
                content.querySelector('button[type=submit]').addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    widgets.continueWith({
                        show_login_focus: true,
                        destination_url: window.location.href
                    });
                });
            }
        } else if (jotFormRetry < 3) {
            jotFormRetry++;
            setTimeout(()=> {
                ui.applyJotForm(event);
            }, 500);
        }
    };

    this.applyFormControl = function(form_info, options) {
        if (!isProfileInit({
            call: 'applyFormControl',
            params: [form_info, options]
        }))
            return;

        form_info = form_info ? form_info : {};
        options = options ? options : {};

        const form = document.getElementById(form_info.form);

        const submit = document.getElementById(form_info.submit);

        if (form && submit) {
            if (isVerifiedState()) {
                if (form_info.name) {
                    const name = document.getElementById(form_info.name);
                    if (name) {
                        name.value = ((profile.first_name ? profile.first_name : "") + " " + (profile.last_name ? profile.last_name : "")).trim();
                        if (name.value.length) {
                            name.disabled = 'disabled';
                        }
                    }
                }

                if (form_info.first_name && profile.first_name) {
                    const name = document.getElementById(form_info.first_name);
                    if (name) {
                        name.value = (profile.first_name).trim();
                        name.disabled = 'disabled';
                    }
                }

                if (form_info.last_name && profile.last_name) {
                    const name = document.getElementById(form_info.last_name);
                    if (name) {
                        name.value = (profile.last_name).trim();
                        name.disabled = 'disabled';
                    }
                }
                if (form_info.email) {
                    const email = document.getElementById(form_info.email);
                    if (email) {
                        email.value = profile.email_address;
                        email.disabled = 'disabled';
                    }
                }
                if (form_info.email_confirm) {
                    const email = document.getElementById(form_info.email_confirm);
                    if (email) {
                        email.value = profile.email_address;
                        email.disabled = 'disabled';
                    }
                }

                let event = form_info.event ? form_info.event : "form_submission";
                form.addEventListener('submit', function(){
                   events.custom(event);
                });
            } else {
                const types = ['textarea', 'input'];
                for (let i = 0; form && i < types.length; i++) {
                    onBlurQueryUnderForm(form, types[i]);
                }
                submit.disabled = 'disabled';
            }
        }
    };
    this.handleLogout = function(field_id) {
        if (!isProfileInit({
            call: 'handleLogout',
            params: [field_id]
        }))
            return;

        const field = document.getElementById(field_id);
        if (!isFieldExist(field))
            return;

        field.addEventListener("click", async (event) => {
            // window.localStorage.clear();
            await API.resetDeviceVerification();
            window.location.reload();
        });
        if (!isVerifiedState()) {
            field.style.display = 'none';
        }
    };
    this.handleLogin = function(field_id, options) {
        if (!isProfileInit({
            call: 'handleLogin',
            params: [field_id, options]
        }))
            return;

        options = options ? options : {};
        const field = document.getElementById(field_id);
        if (!isFieldExist(field))
            return;

        field.addEventListener("click", async (event) => {
            await API.resetDeviceVerification();
            widgets.continueWith(options);
        });
        if (isVerifiedState()) {
            field.style.display = 'none';
        }
    };

    this.handleContactUs = function(field_id, options) {
        if (!isProfileInit({
            call: 'handleContactUs',
            params: [field_id, options]
        }))
            return;

        options = options ? options : {};
        options = {
            continue_with_position: 'center',
            ...options
        };
        const field = document.getElementById(field_id);
        if (!isFieldExist(field))
            return;

        field.addEventListener("click", async (event) => {
            ui.contactUsForm(false, options);
        });

        if (hasPreviousContactIconOpen() && isVerifiedState()) {
            ui.contactUsForm(false, options);
        }
    };

    this.toggleLoginLogout = function(field_id, ui_options) {
        if (!isProfileInit({
            call: 'toggleLoginLogout',
            params: [field_id, ui_options]
        }))
            return;

        ui_options = ui_options ? ui_options : {};
        options = options ? options : {};

        const field = document.getElementById(field_id);
        if (!isFieldExist(field))
            return;

        if (isVerifiedState()) {
            field.addEventListener("click", event => {
                // window.localStorage.clear();
                window.location.reload();
            });
            field.innerText = ui_options.logout_text || Locale.UI.LOGOUT || 'Sign out';
        } else {
            field.addEventListener("click", event => {
                widgets.continueWith(options);
            });
            field.innerText = ui_options.login_text || Locale.UI.LOGIN || 'Sign in';
        }
    };

    this.applyText = function(field_id, template, ui_options) {
        if (!isProfileInit({
            call: 'applyText',
            params: [field_id, template, ui_options]
        }))
            return;

        ui_options = ui_options ? ui_options : {};

        const field = document.getElementById(field_id);
        if (!isFieldExist(field))
            return;

        if (isVerifiedState()) {
            let new_string = lang.replace({
                'FIRST_NAME': profile.first_name ? profile.first_name : "",
                'LAST_NAME': profile.last_name ? profile.last_name : "",
                'NAME': ((profile.first_name ? profile.first_name : "") + " " + (profile.last_name ? profile.last_name : "")).trim(),
                'EMAIL': profile.email_address
            }, template);
            switch(ui_options.type) {
                case 'html':
                    field.innerHTML = new_string;
                    break;
                case 'text':
                default:
                    field.innerText = new_string;
                    break;
            }
        } else {
            if (ui_options.hide_on_logout) {
                field.style.display = "none";
            }
        }
    };

    this.addProfileWidget = function(field_id, options) {
        if (!isProfileInit({
            call: 'addProfileWidget',
            params: [field_id, options]
        }))
            return;

        options = options ? options : {};

        let field = document.getElementById(field_id);
        if (!field)
            return;

        if (isVerifiedState()) {
            let isMobile = detectMobile();
            field.innerHTML = viewUI.getProfileWidget(profile, suggested_provider, isMobile);
            let content = field.querySelector('.breadbutter-ui-profile-widget-container');
            if (content && content.getBoundingClientRect().x < 375) {
                content.classList.add('breadbutter-ui-left-aligned-container');
            }
            const logout_button = field.querySelector('.breadbutter-ui-profile-dashboard-logout-button');
            if (logout_button) {
                logout_button.onclick = async function() {
                    await API.resetDeviceVerification();
                    let reload = true;
                    if (typeof options.onLogout == 'function') {
                        reload = options.onLogout();
                    }
                    if (reload) {
                        window.location.reload();
                    }
                };
            }
        } else {
            let field = document.getElementById(field_id);
            field.innerHTML = viewUI.getLoginWidget();
            field.onclick = function(){
                let show_login_focus = false;
                if (typeof options['show_login_focus'] != 'undefined') {
                    show_login_focus = options['show_login_focus'];
                }
                widgets.continueWith({
                    show_login_focus: show_login_focus,
                    ...options
                });
                // widgets.continueWith(options);
            };
        }
    };

    this.applyContinueWithTrigger = function(field_id, options) {
        if (!isProfileInit({
            call: 'applyContinueWithTrigger',
            params: [field_id, options]
        }))
            return;

        options = options ? options : {};

        const field = document.getElementById(field_id);
        if (!isFieldExist(field))
            return;

        field.addEventListener('click', ()=> {
            widgets.continueWith({
                destination_url: document.location.href,
                ...options
            });
        });
    };
    this.profileWidget = function(options) {
        if (!isProfileInit({
            call: 'profileWidget',
            params: [options]
        }))
            return;

        if (isVerifiedState()) {
            let field = viewUI.getContinueWithSignInHolder(options);
            document.body.appendChild(field);
            field.appendChild(viewUI.getContinueWithSignInWidget(profile, suggested_provider));
            let content = field.querySelector('.breadbutter-ui-profile-widget-container');
            if (content && content.getBoundingClientRect().x < 375) {
                content.classList.add('breadbutter-ui-left-aligned-container');
            }
            const logout_button = field.querySelector('.breadbutter-ui-profile-dashboard-logout-button');
            if (logout_button) {
                logout_button.onclick = async function() {
                    await API.resetDeviceVerification();
                    let reload = true;
                    if (typeof options.onLogout == 'function') {
                        reload = options.onLogout();
                    }
                    if (reload) {
                        window.location.reload();
                    }
                };
            }
        }

    };
    this.continueWith = function(options) {
        if (!isProfileInit({
            call: 'continueWith',
            params: [options]
        }))
            return;


        options = options ? options : {};

        options = {
            hide_verified: true,
            show_logged_in_profile: false,
            ...options
        };
        applyOptions(options, 'show_login_focus');
        applyOptions(options, 'continue_with_position');

        options = parsingUrl(options);
        
        let mode = (options && options.mode) ? options.mode : false;

        if (options.show_only && options.show_only.length) {
            let found = false;
            let show_only = options.show_only;
            
            switch(typeof options.show_only) {
                case 'string':
                    if (document.location.pathname.endsWith(show_only)) {
                        found = true;
                    }
                    break;
                case 'object':
                    for(let i = 0; !found && i < show_only.length; i++) {
                        let show = show_only[i];
                        if (document.location.pathname.endsWith(show)) {
                            found = true;
                        }
                    }
                    break;
                default:
                    break;
            }
            if (!found) {
                return;
            }
        }
        
        let callContinueWith = (o) => {
            widgets.continueWith(o);
        }
        if (options && options.delay_seconds && options.delay_seconds > 0) {
            callContinueWith = (o) => {
                let now = Date.now();
                setTimeout(() => {
                    let delayed = Date.now() - now;
                    widgets.continueWith(o);
                }, options.delay_seconds * 1000);
            };
        }
        
        if (mode) {
            widgets.continueWith(options);
        } else if (isVerifiedState()) {
            if (options.show_logged_in_profile) {
                let field = viewUI.getContinueWithSignInHolder(options);
                document.body.appendChild(field);
                field.appendChild(viewUI.getContinueWithSignInWidget(profile, suggested_provider));
                let content = field.querySelector('.breadbutter-ui-profile-widget-container');
                if (content && content.getBoundingClientRect().x < 375) {
                    content.classList.add('breadbutter-ui-left-aligned-container');
                }
                const logout_button = field.querySelector('.breadbutter-ui-profile-dashboard-logout-button');
                if (logout_button) {
                    logout_button.onclick = async function() {
                        await API.resetDeviceVerification();
                        let reload = true;
                        if (typeof options.onLogout == 'function') {
                            reload = options.onLogout();
                        }
                        if (reload) {
                            window.location.reload();
                        }
                    };
                }
            }
        } else if (isProfileVerifiedState()) {
            if (!options.hide_verified) {
                if (profile && profile.email_address && !options['show_login_focus'] && !detectMobile()) {
                    // console.log('here?');
                    API.getClientSettings(profile.email_address, (response)=> {
                        // console.log(response);
                        let field = viewUI.getContinueWithVerifiedUserHolder(response.user_profile, response.suggested, options);
                        document.body.appendChild(field);
                        document.body.classList.add('breadbutter-ui-verified-showing');
                        field.onclick = async function() {
                            document.body.classList.remove('breadbutter-ui-verified-showing');
                        };
                        options.skipScrolling = true;
                        widgets.continueWith(options);
                        if (typeof options.addEvent == 'function') {
                            options.addEvent('scrolling', (x) => {
                                // console.log('11');
                                if (!document.body.classList.contains('breadbutter-ui-verified-showing')) {
                                    document.body.classList.add('breadbutter-ui-verified-showing');
                                }
                            });
                        }
                    })
                } else {
                    callContinueWith(options);
                }
            } else {
                if (profile && profile.email_address && options['show_login_focus']) {
                    callContinueWith(options);
                }
            }
        } else {
            callContinueWith(options);
        }
    };

    this.contactUsForm = function(field_id, options) {
        if (!isProfileInit({
            call: 'contactUsForm',
            params: [field_id, options]
        }))
            return;

        options = options ? options : {};
        widgets.contactUs(field_id, options);
    };
    this.contactUs = function(options) {
        if (!isProfileInit({
            call: 'contactUs',
            params: [options]
        }))
            return;

        options = options ? options : {};
        if (options.continue_with_position) {
            if (!options.continue_with_position.top && !options.continue_with_position.bottom) {
                options.continue_with_position.bottom = '10px';
            }
            if (!options.continue_with_position.left && !options.continue_with_position.right) {
                options.continue_with_position.right = '10px';
            }
        } else {
            options.continue_with_position = {
                bottom: '10px',
                right: '10px'
            }
        }

        viewUI.init(options);
        // let message = options.locale && options.locale.CONTACT_US && options.locale.ICON_NOTE ? options.locale.ICON_NOTE : Locale.CONTACT_US.ICON_NOTE;
        let field = viewUI.getContactUsIcon(options);
        let note = viewUI.getContactUsIconMessage(options);
        let isMobile = detectMobile();
        if (isMobile) {
            field.classList.add('bb-mobile');
            note.classList.add('bb-mobile');
        }

        document.body.appendChild(field);
        document.body.appendChild(note);
        field.addEventListener('click', () => {
            widgets.contactUs(false, options);
            setTimeout(()=> {
                note.classList.remove('bb-hide');
            }, 1000);
        });
        note.addEventListener('click', () => {
            widgets.contactUs(false, options);
            setTimeout(()=> {
                note.classList.remove('bb-hide');
            }, 1000);
        });

        if (hasPreviousContactIconOpen() && isVerifiedState()) {
            ui.contactUsForm(false, options);
        }
    };

    this.optIn = function(field_id, options) {
        if (!isProfileInit({
            call: 'optIn',
            params: [field_id, options]
        }))
            return;

        options = options ? options : {};

        if (!isVerifiedState()) {
            widgets.optIn(field_id, options);
        }
    };
    this.signIn = function(field_id, options) {
        if (!isProfileInit({
            call: 'signIn',
            params: [field_id, options]
        }))
            return;

        options = options ? options : {};

        if (!isVerifiedState()) {
            widgets.signIn(field_id, options);
        }
    };

    this.showContentPreview = function(options) {
        if (!isProfileInit({
            call: 'showContentPreview',
            params: [options]
        }))
            return;

        options = options ? options : {};
        const RESET_FORM = 'reset-form';
        const CONFIRM_FORM = 'confirm-form';
        const INCOGNITO_FORM = 'incognito-form';
        const MAGIC_LINK_FORM = 'magic-link-form';
        const EMAIL_FORM = 'email-form';
        const LOGIN_FORM = 'login-form';
        const LOCAL_LOGIN_FORM = 'local-login-form';
        const REGISTER_FORM = 'register-form';
        const FORGOT_FORM = 'forgot-form';
        let view = viewUI.getContentGatingCoverPage(options);
        document.body.appendChild(view);
        let opt = {
            ...options,
            destination_url: document.location.href.split('?')[0],
            onFormChange: (form, exit)=> {
                if (exit) {
                    view.classList.remove('bb-hide-title');
                } else {
                    switch(form) {
                        case FORGOT_FORM:
                        case RESET_FORM:
                        case CONFIRM_FORM:
                            view.classList.add('bb-hide-title');
                            break;
                        default:
                            view.classList.remove('bb-hide-title');
                            break;
                    }
                }
            },
        };
        widgets.signIn("breadbutter-ui-content-gating-content-holder", opt);
        document.body.classList.add('breadbutter-locked-limit-content');

        setTimeout(()=> {
            view.classList.add('animate-in');
        }, 200);
    };

    this.showContentGating = function(options) {
        if (!isProfileInit({
            call: 'showContentGating',
            params: [options]
        }))
            return;

        if (!isVerifiedState()) {
            has_content_preview = true;
            options = options ? options : {};
            // viewPopup.close();
            const RESET_FORM = 'reset-form';
            const CONFIRM_FORM = 'confirm-form';
            const INCOGNITO_FORM = 'incognito-form';
            const MAGIC_LINK_FORM = 'magic-link-form';
            const EMAIL_FORM = 'email-form';
            const LOGIN_FORM = 'login-form';
            const LOCAL_LOGIN_FORM = 'local-login-form';
            const REGISTER_FORM = 'register-form';
            const FORGOT_FORM = 'forgot-form';
            let view = viewUI.getContentGatingCenterPage(options);
            document.body.appendChild(view);
            let opt = {
                ...options,
                destination_url: document.location.href.split('?')[0],
                onFormChange: (form, exit) => {
                    if (exit) {
                        view.classList.remove('bb-hide-title');
                    } else {
                        switch (form) {
                            case FORGOT_FORM:
                            case RESET_FORM:
                            case CONFIRM_FORM:
                                view.classList.add('bb-hide-title');
                                break;
                            default:
                                view.classList.remove('bb-hide-title');
                                break;
                        }
                    }
                },
            };
            let exit_button = view.querySelector('.breadbutter-ui-content-gating-close');
            if (exit_button) {
                exit_button.addEventListener('click', () => {
                    has_content_preview = false;
                    view.remove();
                });
            }
            widgets.signIn("breadbutter-ui-content-gating-content-holder", opt);
            document.body.classList.add('breadbutter-locked-limit-content');
        }
    };

    this.addNewsletterWidget = function(field_id, options) {
        if (!isProfileInit({
            call: 'addNewsletterWidget',
            params: [field_id, options]
        }))
            return;

        let on_page = true;
        if (typeof field_id == 'object') {
            on_page = false;
            options = field_id;
        }
        if (!options.custom_event_code) {
            return;
        }
        if (hasPreviousContactIconOpen()) {
            return;
        }

        if (document.querySelector('.contactus-popup') &&
            document.querySelector('.contactus-popup').checkVisibility()) {
            return;
        }

        if (document.querySelector('.breadbutter-mask') &&
            document.querySelector('.breadbutter-mask').checkVisibility()) {
            return;
        }

        let verified = isVerifiedState();
        let cached = viewUI.checkEventStorage(options.custom_event_code);
        if (!on_page && cached != options.custom_event_code) {
            if (options.delay_seconds && !isNaN(options.delay_seconds)) {
                let time = Number(options.delay_seconds);
                delete options.delay_seconds;
                let opt = parsingUrl({});
                if (opt && opt.mode) {
                    ui.addNewsletterWidget(options);
                } else {
                    setTimeout(() => {
                        ui.addNewsletterWidget(options);
                    }, time * 1000);
                }
                return;
            }
        }

        if (!on_page && has_content_preview) return;

        options = options ? options : {};


        if (typeof options.show_focus == 'undefined') {
            options.show_focus = true;
        }

        let field, result, mask;
        if (on_page) {
            field = document.getElementById(field_id);
            if (!field)
                return;

            options.verified = verified;
            options.profile = profile;
            result = viewUI.getNewsletterWidget(options);
            if (!result) {
                return;
            }
            field.innerHTML = result.html;
        } else if (!has_content_preview) {
            let isMobile = detectMobile();
            if (cached == viewUI.getViewedCode(options.custom_event_code)) {
                return;
            }
            options.verified = verified;
            options.profile = profile;
            result = viewUI.getNewsletterPopupWidget(options, isMobile);
            if (!result) {
                return;
            }

            field = document.createElement('div');
            field.classList.add('breadbutter-ui-newsletter-popup');
            field.innerHTML = result.html;
            if (isMobile) {
                field.classList.add('bb-mobile');
                let mask = document.createElement('div');
                mask.classList.add('breadbutter-ui-newsletter-widget-mask');
                field.appendChild(mask)
            }
            document.body.appendChild(field);
            field.style.zIndex = view.getIndex();

            // if (options.show_focus) {
            //     mask = document.createElement('div');
            //     mask.classList.add('breadbutter-newsletter-mask');
            //     document.body.appendChild(mask);
            // }
            // field = document.body.querySelector('.breadbutter-ui-newsletter-popup');
            let exit_button = field.querySelector('.breadbutter-ui-newsletter-widget-close');
            if (exit_button) {
                exit_button.addEventListener('click', () => {
                    field.remove();
                    if (mask)
                        mask.remove();
                });
            }
        }

        if (!isVerifiedState()) {
            let opt = {
                ...options
            };
            // opt.button_theme = 'round-icons';
            opt.success_event_code = options.custom_event_code;
            opt.destination_url = document.location.href.split('?')[0];
            widgets.signIn(result.index, opt);
        } else {
            let button = field.querySelector('.breadbutter-ui-newsletter-subscribe');
            if (button) {
                button.addEventListener('click', (event) => {
                    // console.log(event.target);
                    let parent = event.target.parentElement;
                    event.target.remove();
                    let loader = document.createElement('div');
                    loader.classList.add('breadbutter-ui-newsletter-loader');
                    parent.appendChild(loader);
                    events.custom(options.custom_event_code, () => {
                        if (typeof field_id != 'string') {
                            field.remove();
                            if (mask)
                                mask.remove();
                        }
                        API.assignEventStorage(options.custom_event_code);
                        BreadButter.ui.addNewsletterWidget(field_id, options);
                    });
                });
            }
        }
    };
})();

let triggerBlurScreen = false;
const widgets = new (function() {
    this.deIdentification = function(opt) {
        if (has_content_preview) return;
        opt = parsingUrl(opt);
        // console.log(opt);
        let mode = (opt && opt.mode) ? opt.mode : false;
        opt = loadOptions(opt);
        // if (!triggerBlurScreen) {
        //     triggerBlurScreen = true;
        //     events.custom('blur_screen');
        // }
        UI.deIdentification(opt);
    };
    this.continueWith = function(opt) {
        if (has_content_preview) return;
        opt = opt ? opt : {};
        if (!opt.destination_url) {
            opt.destination_url = document.location.href.split('?')[0];
        }
        opt = parsingUrl(opt);
        ishandlingQueryString = true;
        let mode = (opt && opt.mode) ? opt.mode : false;

        opt = loadOptions(opt);
        if (!triggerBlurScreen && opt['show_login_focus']) {
            triggerBlurScreen = true;
            events.custom('blur_screen');
        }
        // console.log(opt);
        // console.log('!!!!@#!@#!@#');
        // console.log(mode);
        if (requireCustomData()) {
            ishandlingCustomData = true;
            UI.customForm(opt);
        } else if (!mode) {
            if (!checkRememberClose(opt)) {
                UI.form(opt);
            }
        } else {
            switch (mode) {
                case constants.mode.NULL_EMAIL_ERROR:
                    UI.form(opt);
                    break;
                case constants.mode.DEIDENTIFICATION:
                    UI.deIdentification(opt);
                    break;
                case constants.mode.CONFIRM_EMAIL:
                    UI.confirmEmail(opt);
                    break;
                case constants.mode.RESET_PASSWORD:
                    UI.resetPassword(opt);
                    break;
                case constants.mode.INVITATION:
                    UI.invitation(opt);
                    break;
                case constants.mode.MAGIC_LINK:
                    UI.magicLink(opt);
                    break;
                default:
                    UI.form(opt);
                    break;
            }
        }
    };
    this.contactUs = function(id, opt) {
        // console.log('contactus');
        if (typeof opt.expand_email_address == 'undefined') {
            opt.expand_email_address = false;
        }

        opt = loadOptions(opt);
        // console.log(opt);
        opt.destination_url = document.location.href.split('?')[0];
        opt.contact_us = true;


        if (!opt.locale) {
            opt.locale = {};
        }
        if (!opt.locale.CONTACT_US || JSON.stringify(opt.locale.CONTACT_US) == '{}') {
            opt.locale.CONTACT_US = Locale.CONTACT_US;
        } else {
            opt.locale.CONTACT_US = Object.assign(Locale.CONTACT_US, opt.locale.CONTACT_US);
        }
        if (!opt.locale.REGISTER) {
            opt.locale.REGISTER = {};
        }
        if (!opt.locale.INCOGNITO) {
            opt.locale.INCOGNITO = {};
        }
        if (!opt.locale.LOGIN) {
            opt.locale.LOGIN = {
                CONTENT: ""
            };
        }
        // opt.locale.LOGIN.TITLE = opt.locale.CONTACT_US.HEADER;
        // opt.locale.REGISTER.TITLE = opt.locale.CONTACT_US.HEADER;
        // opt.locale.INCOGNITO.TITLE = opt.locale.CONTACT_US.HEADER;
        if (isVerifiedState()) {
            let name = profile.first_name ? profile.first_name : "";
            opt.locale.CONTACT_US.HEADER = lang.replace({
                FIRST_NAME: name
            }, opt.locale.CONTACT_US.SUB_HEADER)
        }

        if (!id) {
            document.body.classList.remove('breadbutter-ui-verified-showing');
            UI.contactUs(opt);
        } else {
            UI.contactUs(id, opt);
        }
    };
    this.optIn = function(id, opt) {
        opt = parsingUrl(opt);
        opt = loadOptions(opt);
        // opt.button_theme = 'round-icons';

        opt.destination_url = document.location.href.split('?')[0];
        opt.expand_email_address = true;
        opt.opt_in = true;
        if (!id) {
            UI.optIn(opt);
        } else {
            UI.optIn(id, opt);
        }
    };
    this.signIn = function(id, opt) {
        opt = parsingUrl(opt);
        let mode = (opt && opt.mode) ? opt.mode : false;
        ishandlingQueryString = true;
        // ishandlingCustomData = true;

        opt = loadOptions(opt);
        if (!mode) {
            UI.form(id, opt);
        } else {
            switch (mode) {
                case constants.mode.NULL_EMAIL_ERROR:
                    UI.form(id, opt);
                    break;
                case constants.mode.CONFIRM_EMAIL:
                    UI.confirmEmail(id, opt);
                    break;
                case constants.mode.RESET_PASSWORD:
                    UI.resetPassword(id, opt);
                    break;
                case constants.mode.INVITATION:
                    UI.invitation(id, opt);
                    break;
                case constants.mode.MAGIC_LINK:
                    UI.magicLink(id, opt);
                    break;
                default:
                    UI.form(id, opt);
                    break;
            }
        }
    };
    this.cookie = function() {
        if (has_content_preview) return;
        let opt = loadOptions();
        viewPolicy.init(opt);
    };
    this.buttons = function(id, options) {
        options = loadOptions(options);
        UI.button(id, options);
    };
})();

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
};

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position)
            || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

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
