const UI_ID = 'breadbutter-ui';
const ID = 'breadbutter-forms';
const EMAIL_ID = 'breadbutter-email';
const LOGIN_ID = 'breadbutter-login';
const BUTTON_ID = 'breadbutter-buttons';
const BUTTON_HOLDER_ID = 'breadbutter-buttons-holder';
const REGISTER_ID = 'breadbutter-register';
const REGISTER_HOLDER_ID = 'breadbutter-register-holder';
const FORGOT_ID = 'breadbutter-forgot';
const RESET_ID = 'breadbutter-reset';
const RESET_TITLE_ID = 'breadbutter-reset-title';
const CONFIRM_TITLE_ID = 'breadbutter-confirm-title';
const RESET_FORM_ID = 'breadbutter-reset-form';
const CONFIRM_FORM_ID = 'breadbutter-confirm-form';
const CONFIRM_ID = 'breadbutter-confirm';
const ALERT_ID = 'breadbutter-alert';
const ERROR_ID = 'breadbutter-error';
const FORGOT_FORM_ID = 'breadbutter-forgot-form';
const FORGOT_BUTTON_ID = 'breadbutter-forgot-buttons';
const SWITCH_HOLDER_ID = 'breadbutter-switch-login';
const PASSWORD_VALIDATION_ID = 'breadbutter-password-validation';
const EXPIRE_ID = 'breadbutter-expire';
const EXPIRE_FORM_ID = 'breadbutter-expire-form';
const EXPIRE_BUTTON_ID = 'breadbutter-expire-buttons';
const INCOGNITO_ID = 'breadbutter-incognito';
const INCOGNITO_TITLE_ID = 'breadbutter-incognito-title';
const INCOGNITO_HOLDER_ID = 'breadbutter-incognito-holder';
const INCOGNITO_LOGIN_ID = 'breadbutter-incognito-login';
const INCOGNITO_REGISTER_ID = 'breadbutter-incognito-register';
const DEIDENTIFY_FORM_ID = 'breadbutter-deidentify-form';
const DEIDENTIFY_ID = 'breadbutter-deidentify';

const TERM_POLICY_HOLDER_ID = 'breadbutter-term-policy-holder';
const TERM_POLICY_ID = 'breadbutter-term-policy';

const MODULE_MAGIC_LINK = 'breadbutter-module-magic-link';
const MAGIC_LINK_BUTTON_ID = 'breadbutter-magic-link-button';
const MAGIC_LINK_WAND_ID = 'breadbutter-magic-link-wand';

const MAGIC_LINK_MASK_ID = 'breadbutter-magic-link-mask';
const MAGIC_LINK_MASK_TEXT_ID = 'breadbutter-magic-link-mask-text';
const MAGIC_LINK_MASK_ARROW_ID = 'breadbutter-magic-link-mask-arrow';

const MAGIC_LINK_ID = 'breadbutter-magic-link';
const MAGIC_LINK_VIEW_ID = 'breadbutter-magic-link-view';
const MAGIC_LINK_PLANE_ID = 'breadbutter-magic-link-plane';
const MAGIC_LINK_TITLE_ID = 'breadbutter-magic-link-title';
const MAGIC_LINK_TITLE_CONFIRMING_ID = 'breadbutter-magic-link-title-confirming';
const MAGIC_LINK_TITLE_LOGGING_ID = 'breadbutter-magic-link-title-logging';
const MAGIC_LINK_EMAIL_ID = 'breadbutter-magic-link-email';
const MAGIC_LINK_MESSAGE_ID = 'breadbutter-magic-link-message';

const BLUR_HOLDER_ID = 'breadbutter-buttons-blur-holder';
const CONTIUNUE_WITH_EMAIL_ID = 'continue-email-address';
const BLUR_CLASS = 'bb-blur';

const DISCOVERY_ID = 'breadbutter-discovery';

const MODULE_EMAIL_DISCOVERY = 'breadbutter-module-email-discovery';
const MODULE_HEADER = 'breadbutter-module-header-discovery';
const MODULE_SPACER = 'breadbutter-module-spacer';
const MODULE_POWEREDBY = 'breadbutter-module-poweredby';
const MODULE_HALF_SPACER = 'breadbutter-module-half-spacer';
const MODULE_PLACEHOLDER = 'breadbutter-module-placeholder';
const MODULE_PASSWORD = 'breadbutter-module-password';
const MODULE_FORM_INPUT = 'breadbutter-module-form-input';
const MODULE_MORE_INFO = 'breadbutter-module-more-information';
const MODULE_DROPDOWN = 'breadbutter-module-dropdown';

const AUTH_TYPE = {
    SSO: 'sso',
    AUTH: 'password',
    MAGIC_LINK: 'magic_link'
};

import lang from './locale.js';
import logger from './logger.js';
import hover from './utils/hover.js';
import val from './utils/validator.js';
import loader from './utils/loader.js';

import './scss/view-form.scss';

const FORM = {
    BACK: 'form-back',
    EMAIL: 'form-email',
    DISABLED_EMAIL: 'form-disabled-email',
    FORGOT: 'form-forgot',
    FORGOT_RESET: 'form-forgot-reset',
    PASSWORD: 'form-password',
    RE_PASSWORD: 'form-re-password',
    RESET_PASSWORD: 'form-reset-password',
    PASSWORD_CONTENT: 'form-password-content',
    TITLE: 'form-title',
    TITLE_ERROR: 'form-title-error',
    CONFIRM_EMAIL: 'form-confirm-email',
    SUBTITLE: 'form-subtitle',
    SUBTITLE_ERROR: 'form-subtitle-error',
    BUTTON_HOLDER: 'form-button-holder',
    NEXT: 'form-next',
    NEXT_HOLDER: 'form-next-holder',
    MESSAGE: 'form-message',
    OPTIONS: 'form-options',
    FIRST_NAME: 'form-first-name',
    LAST_NAME: 'form-last-name',
    REGISTER: 'form-register',
    LOGIN: 'form-login',
    LOGIN_HOLDER: 'form-login-holder',
    TOKEN: 'form-token',
    TOKEN_PIN: 'form-token-pin',
    CANCEL: 'form-cancel',
    ALERT_CONFIRM: 'form-alert-confirm',
    ALERT_CONFIRM_2: 'form-alert-confirm-2',
    SWITCH_LOGIN: 'form-switch-login',
    SWITCH_MAGIC_LINK: 'form-switch-magic-link',
    PASSWORD_TOGGLE: 'form-password-toggle',
    NEW_USER: 'form-new-user',
    SUB_MESSAGE: 'form-sub-message',
    HINT: 'form-hint',
    HINT_TITLE: 'form-hint-title',
    PIN: 'form-pin',
    ERROR_MESSAGE: 'form-error-message',
    INCOGNITO_NEXT: 'form-incognito-next',
    NEXT_ICON: 'form-next-icon',
    MORE_INFO: 'form-more-information',
    EXPAND_ICON: 'form-expand-icon',
    DE_IDENTIFICATION: 'form-deidentify-me',
    CONFIRM_PIN: 'form-confirm-pin'
};

const PASSWORD_STORAGE = {
    MINIMUM: 'breadbutter-sdk-password-length',
    LOWER: 'breadbutter-sdk-password-lowercase',
    UPPER: 'breadbutter-sdk-password-uppercase',
    SYMBOL: 'breadbutter-sdk-password-symbol',
    NUMBER: 'breadbutter-sdk-password-number',
};

const CACHE_STORAGE = {
    EMAIL: 'breadbutter-sdk-email-address',
    FIRST_NAME: 'breadbutter-sdk-first-name',
    INVITE_REQUIRED: 'breadbutter-sdk-invite-required'
};

const PASSWORD_VALIDATION = {
    MINIMUM: 'MINIMUM',
    LOWER: 'LOWER',
    UPPER: 'UPPER',
    SYMBOL: 'SYMBOL',
    NUMBER: 'NUMBER',
    NO_EMAIL: 'NO_EMAIL',
    MATCH: 'MATCH',
};

const PASSWORD_LIST = [
    PASSWORD_VALIDATION.MINIMUM,
    PASSWORD_VALIDATION.LOWER,
    PASSWORD_VALIDATION.UPPER,
    PASSWORD_VALIDATION.SYMBOL,
    PASSWORD_VALIDATION.NUMBER,
];
const PASSWORD_HINT = {
    NO_OLD_PASSWORD: 'NO_OLD_PASSWORD',
};

const USER_STATE = {
    NEW: 'new',
    INVITED: 'invited',
    REGISTERED: 'registered',
    PENDING: 'pending',
    PASSWORD_EXPIRED: 'password_expired',
    ANONYMOUS: 'anonymous',
    IDENTIFIED: 'identified',
    VERIFIED: 'verified'
};

const RESET_FORM = 'reset-form';
const CONFIRM_FORM = 'confirm-form';
const INCOGNITO_FORM = 'incognito-form';
const MAGIC_LINK_FORM = 'magic-link-form';
const EMAIL_FORM = 'email-form';
const LOGIN_FORM = 'login-form';
const LOCAL_LOGIN_FORM = 'local-login-form';
const REGISTER_FORM = 'register-form';
const DEIDENTIFY_FORM = 'deidentify-form';


import api from './api.js';
import constants from './constants';
import view from './view.js';
import viewButton from './view-button.js';


const providers = constants.providers;
const providers_hash = constants.providers_hash;
const providers_buttons = constants.providers_buttons;
const providers_list = constants.providers_list;
const errors = constants.errors;

import {
    DEV_LOCAL, DEV_NO_LOCAL, DEV_HV_LOCAL,
    DEV_NOT_HV_LOCAL, DEV_LOCAL_SUGGESTION,
    DEV_NON_SUGGESTION, DEV_SUGGESTION,
    DEV_EMPTY_PROVIDER, DEV_ONE_PROVIDER,
    DEV_USER_STATUS, DEV_NEED_INVITE,
    DEV_NO_INVITE, DEV_RESET_REQUEST,
    DEV_NEED_DISCOVERY, DEV_NO_DISCOVERY,
    DEV_PENDING_ON, DEV_PENDING_OFF,
    DEV_RESPONSE
} from './dev.json';

const VIEWFORM = function() {
    let Locale = {};
    let RESET_REQUIRED = false;
    let APP_NAME = false;
    let OPTS = {};
    let loading = false;
    let PRIVACY_LINK = false;
    let TOC_LINK = false;
    let MAGIC_LINK_ENABLED = false;
    let MAGIC_LINK_REGISTRATION_ENABLED = false;
    let PROFILE_DATA = false;
    let DEVICE_VERIFIED = false;

    let CLIENT_SETTINGS = false;

    const applyDev = function(res) {

        if (res) {
            if (DEV_LOCAL_SUGGESTION) {
                // res.suggested_identity_provider = 'local';
            }
            if (DEV_SUGGESTION) {
                res.suggested_provider = providers_hash[DEV_SUGGESTION];
                // res.suggested_identity_provider = DEV_SUGGESTION;
            }
            if (DEV_NON_SUGGESTION) {
                res.suggested_provider = false;
            }
            if (DEV_ONE_PROVIDER) {
                // res.social_providers = [res.social_providers[0]];
                // res.enterprise_providers = [];
                res.providers = [res.providers[0]];
            }
            if (DEV_EMPTY_PROVIDER) {
                res.providers = [];
            }
            if (DEV_LOCAL) {
                res.settings.password_settings.enabled = true;
            }
            if (DEV_NO_LOCAL) {
                res.settings.password_settings.enabled = false;
            }
            if (DEV_HV_LOCAL) {
                if (res.user_profile) {
                    res.user_profile.has_password = true;
                }
            }
            if (DEV_NOT_HV_LOCAL) {
                if (res.user_profile) {
                    res.user_profile.has_password = false;
                }
            }
            if (DEV_USER_STATUS) {
                if (res.user_profile) {
                    res.user_profile.state = DEV_USER_STATUS;
                }
            }
            if (DEV_NEED_INVITE) {
                if (res.settings) {
                    res.settings.invite_required = true;
                }
            }
            if (DEV_NO_INVITE) {
                if (res.settings) {
                    res.settings.invite_required = false;
                }
            }
            if (DEV_NEED_DISCOVERY) {
                if (res.settings) {
                    res.settings.discovery_required = true;
                }
            }
            if (DEV_NO_DISCOVERY) {
                if (res.settings) {
                    res.settings.discovery_required = false;
                }
            }

            if (DEV_RESET_REQUEST) {
                if (res.user_profile) {
                    res.user_profile.reset_required = DEV_RESET_REQUEST;
                }
            }

            if (DEV_PENDING_ON) {
                if (res.user_profile) {
                    res.user_profile.pending_pin_confirmation = true;
                }
            }
            if (DEV_PENDING_OFF) {
                if (res.user_profile) {
                    res.user_profile.pending_pin_confirmation = false;
                }
            }

            if (typeof DEV_RESPONSE == 'object') {
                res = DEV_RESPONSE
            }
        }
        return res;
    };


    let isMobile = false;
    const detectMobile = function() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // true for mobile device
            isMobile = true;
        }
    }

    const findParents = function(el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls)) ;
        return el;
    };

    const findChild = function(container, child) {
        let c = false;
        for (let i = 0; container.children && i < container.children.length && c === false; i++) {
            if (container.children[i].classList.contains(child)) {
                c = container.children[i];
            }
        }
        return c;
    };

    const removeChild = function(container, child) {
        let c = findChild(container, child);
        if (c) {
            container.removeChild(c);
        }
    };

    const cleanChild = function(holder) {
        if (holder) {
            while (holder.firstChild) {
                holder.removeChild(holder.lastChild);
            }
        }
    };

    const insertAfter = function(newNode, referenceNode) {
        if (referenceNode.nextSibling) {
            referenceNode.parentNode.insertBefore(
                newNode,
                referenceNode.nextSibling
            );
        } else {
            referenceNode.parentNode.appendChild(newNode);
        }
    };

    const assignErrorMessage = function(alert, params) {
        let message = lang.replace(params, alert.MESSAGE);
        return message;
    };

    const insertError = function(target, text) {
        cleanError(target);
        if (!target.classList.contains('error')) {
            target.classList.add('error');
        }
        let msg = getErrorMessage(text);
        if (
            target.classList.contains(FORM.PASSWORD) ||
            target.classList.contains(FORM.RE_PASSWORD)
        ) {
            target = target.nextSibling;
        }

        insertAfter(msg, target);
    };

    const cleanError = function(target) {
        if (target) {
            if (target.nextSibling) {
                if (target.nextSibling.classList.contains(FORM.ERROR_MESSAGE)) {
                    target.parentNode.removeChild(target.nextSibling);
                } else if (target.nextSibling.nextSibling) {
                    if (
                        target.nextSibling.nextSibling.classList.contains(
                            FORM.ERROR_MESSAGE
                        )
                    ) {
                        target.parentNode.removeChild(target.nextSibling.nextSibling);
                    }
                }
            }
            target.classList.remove('error');
        }
    };

    const cleanBlur = function(target) {
        let top = target.parentElement;
        let blurs = top.querySelectorAll('.bb-blur');
        for(let i = 0; i < blurs.length;i++) {
            let blur = blurs[i];
            blur.classList.remove('bb-blur');
        }
    }

    const showAlert = function(top, alert, params, callbacks) {
        let title = lang.replace(params, alert.TITLE);
        let message = lang.replace(params, alert.MESSAGE);
        let confirm = lang.replace(params, alert.CONFIRM);
        let confirm2 = false;
        if (alert.CONFIRM_2) {
            confirm2 = lang.replace(params, alert.CONFIRM_2);
        }
        let ui = top.parentElement;
        ui.classList.add('alert');

        const container = view.addView(ALERT_ID);
        if (params && params.cls) {
            container.classList.add(params.cls);
        }
        container.appendChild(getTitle(title));
        container.appendChild(getParagraph(message));
        if (callbacks) {
            container.appendChild(
                getButton(confirm, FORM.ALERT_CONFIRM, callbacks)
            );
            if (confirm2) {
                container.appendChild(
                    getButton(confirm2, FORM.ALERT_CONFIRM_2, callbacks)
                );
            }
        } else {
            container.appendChild(
                getButton(confirm, FORM.ALERT_CONFIRM, triggerAlertConfirm)
            );
        }
        ui.appendChild(container);
    };
//----------------------------------------------------------------------------------------

    const init = function(options) {
        detectMobile();
        loadOptions(options);
        loadApp(options);
    };

    let onProvider = false;
    let onFormEntry = false;
    let onMagicLinkConfirm = false;

    const loadOptions = function(options) {
        loadLanguage(options);
        //loadClientData(options);
        if (typeof options.button_theme != 'undefined') {
            OPTS.button_theme = options['button_theme'];
        }
        if (typeof options.expand_email_address != 'undefined') {
            OPTS.expand_email_address = options['expand_email_address'];
        }

        onMagicLinkConfirm = options.onMagicLinkConfirm;
        onProvider = options.onProvider;
        onFormEntry = options.onFormEntry;

    };

    const formEntry = function(form) {
        if (typeof onFormEntry == 'function') {
            onFormEntry(form);
        }
    };

    const saveInviteRequired = function(res) {
        let invite_required = res.settings && res.settings.invite_required;
        if (localStorage) {
            localStorage.setItem(CACHE_STORAGE.INVITE_REQUIRED, invite_required);
        }
    };

    const getInviteRequired = function() {
        let invite_required;
        if (localStorage) {
            invite_required = localStorage.getItem(CACHE_STORAGE.INVITE_REQUIRED);
            if (invite_required == 'false') {
                invite_required = false;
            }
        }
        return invite_required;
    };

    const getClientEmail = function(email, res) {
        if (!email) {
            if (res && res.user_profile && res.user_profile.state == USER_STATE.VERIFIED) {
                email = res.user_profile.email_address;
            }
        }
        return email;
    }

    const getLocalEmail = function(email) {
        let email_address = email;
        if (localStorage && !email) {
            try {
                email_address = localStorage.getItem(CACHE_STORAGE.EMAIL);
            } catch (exceptions) {
                email_address = false;
            }
        }
        return email_address;
    };

    const saveLocalEmail = function(email) {
        if (localStorage && email) {
            localStorage.setItem(CACHE_STORAGE.EMAIL, email);
        }
    };

    const removeLocalEmail = function() {
        if (localStorage) {
            localStorage.removeItem(CACHE_STORAGE.EMAIL);
        }
    };

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
//----------------------------------------------------------------------------------------

    const updateTermPrivacyLink = function(res) {
        TOC_LINK = false;
        PRIVACY_LINK = false;
        if (res.settings) {
            if (res.settings.privacy_policy_url) {
                PRIVACY_LINK = res.settings.privacy_policy_url;
            }

            if (res.settings.terms_and_conditions_url) {
                TOC_LINK = res.settings.terms_and_conditions_url;
            }
        }
    }

    const updateMagicLinkEnabled = function(res) {
        MAGIC_LINK_ENABLED = false;
        MAGIC_LINK_REGISTRATION_ENABLED = false;
        if (res.settings) {
            if (res.settings.magic_link_settings) {
                if (res.settings.magic_link_settings.enabled) {
                    MAGIC_LINK_ENABLED = true;
                }
                if (res.settings.magic_link_settings.registration_enabled) {
                    MAGIC_LINK_REGISTRATION_ENABLED = true;
                }
            }
        }
    }

    const updateProfileData = function(res) {
        PROFILE_DATA = false;
        DEVICE_VERIFIED = false;
        if (res) {
            DEVICE_VERIFIED = res.device_verified;

            if (res.user_profile) {
                PROFILE_DATA = res.user_profile;
            }
        }
    }

    const checkProviders = function(cb) {
        //loader.start(container, true);
        api.getClientSettings(false, function(res) {
            // loader.remove();
            if (res) {
                res = applyDev(res);
                updateProfileData(res);
                updateTermPrivacyLink(res);
                updateMagicLinkEnabled(res);
                updatePopupDiscovery(res);
                saveInviteRequired(res);
                loadPasswordRegulation(res);

                if (typeof onProvider == 'function') {
                    let invite_required = res.settings.invite_required;
                    let discovery_required = res.settings.discovery_required;
                    onProvider(!invite_required && !discovery_required && hasProviders(res));
                }

                CLIENT_SETTINGS = res;
                cb(res);
            }
        });
    };

    const getProviders = function(email, cb) {
        //loader.start(container, true);
        document.activeElement.blur();
        api.getClientSettings(email, function(res) {
            // loader.remove();
            if (res) {
                res = applyDev(res);
                updateProfileData(res);
                updateTermPrivacyLink(res);
                updateMagicLinkEnabled(res);
                updatePopupDiscovery(res);
                saveInviteRequired(res);
                loadPasswordRegulation(res);

                if (typeof onProvider == 'function') {
                    let invite_required = res.settings.invite_required;
                    let discovery_required = res.settings.discovery_required;
                    onProvider(!invite_required && !discovery_required && hasProviders(res));
                }

                CLIENT_SETTINGS = res;
                cb(res);
            }
        });
    };

    const updatePopupDiscovery = function() {

    }

//----------------------------------------------------------------------------------------

    const addUI = function(options) {
        const button_theme = options.button_theme ? options.button_theme : false;
        const email_address = options.email_address ? options.email_address : false;
        const pin = options.pin ? options.pin : false;
        const popup = options.popup ? options.popup : false;


        const container = view.addView(ID);
        container.button_theme = button_theme;
        container.popup = popup;
        //options here.



        return container;
    };

    const addDiscoveryForm = function(id, res, options) {
        const email_address = options.email_address ? options.email_address : false;
        options.hasProvidersAndLocal = false;
        let container = addUI(options);
        let form = discoveryForm(res, email_address, options);
        container.appendChild(form);

        view.initView(id, options, container);

        const enteringDiscovery = () => {
            let local_login = res.settings.password_settings && res.settings.password_settings.enabled;
            let magic_enabled = res.settings.magic_link_settings && res.settings.magic_link_settings.enabled;
            let providers = res.providers && res.providers.length;

            if (!local_login && !providers && magic_enabled) {
                return;
            }
            if (email_address) {
                loader.start(container, true);
                enterDiscovery(email_address, form).then(() => {
                    loader.remove();
                });
            }
        };

        if (options.mode == errors.NULL_EMAIL) {
            showAlert(form, Locale.ERROR.NULL_EMAIL_ERROR, {
                cls: ERROR_ID
            }, (e)=> {
                triggerAlertConfirm(e);
                removeChild(container, MODULE_POWEREDBY)
                enteringDiscovery();
            });
            insertPoweredByModule(container);
        } else {
            enteringDiscovery();
        }

    };

    const discoveryForm = function(res, email_address, options) {
        let invite_required = res.settings.invite_required;
        let discovery_required = res.settings.discovery_required;
        let form;
        if (!invite_required && !discovery_required && hasProviders(res)) {
            form = incognitoForm(res, email_address, options);
        } else {
            form = emailForm(res, email_address, options);
        }
        return form;
    };

    const enterDiscovery = function(email_address, holder, email_input) {
        return new Promise((resolve, reject) => {
            let ready = function() {
                loader.remove();
                resolve();
            };
            loading = true;
            getProviders(email_address, function(res) {
                loading = false;

                let settings = res.settings;
                let profile = res.user_profile;

                logger.debug('breadbutter-ui > api.getClientSettings enterDiscovery:', res);

                let top = holder.parentElement;

                if (!res || res.error) {
                    if (res.error) {
                        switch (res.error.code) {
                            case 'reset_required':
                                applyPasswordExpired(holder, email_address);
                                break;
                            default:
                                let message = res.error.message;
                                if (Locale.RES_MAPPING[res.error.code]) {
                                    message = Locale.RES_MAPPING[res.error.code];
                                }
                                if (email_input) {
                                    insertError(email_input, message);
                                } else {
                                    showAlert(holder, Object.assign({
                                        MESSAGE: message
                                    }, Locale.ERROR.INLINE));
                                }
                                break;
                        }
                    } else {
                        showAlert(holder, Locale.ERROR.NO_PROVIDERS);
                    }
                    ready();
                    return;
                }

                if (
                    settings &&
                    settings.invite_required &&
                    (profile.state == USER_STATE.ANONYMOUS ||
                        profile.state == USER_STATE.IDENTIFIED) &&
                    !profile.invited) {
                    ready();
                    showAlert(holder, Locale.ERROR.ACCOUNT_NOT_FOUND);
                    return;
                }

                if (profile &&
                    profile.reset_required) {
                    RESET_REQUIRED = email_address;
                }


                if (email_address) {
                    saveLocalEmail(email_address);
                } else {
                    removeLocalEmail();
                }

                loadPasswordRegulation(res);
                loadFirstName(res);

                let {suggested} = processProviders(res, true);

                ready();


                let providers = res.providers && res.providers.length;
                let password_settings = res.settings.password_settings && res.settings.password_settings.enabled;
                let magic_link_settings = res.settings.magic_link_settings && res.settings.magic_link_settings.enabled;
                if (!providers && !password_settings && magic_link_settings) {
                    forceMagicLinkClick(holder);
                    return;
                }

                if (profile && profile.pending_pin_confirmation && !suggested) {
                    switchConfirmation(top);
                } else if (profile.state == USER_STATE.ANONYMOUS ||
                    profile.state == USER_STATE.IDENTIFIED) {
                    checkRegistration(holder, res);
                } else if (profile &&
                    profile.reset_required &&
                    profile.has_password) {
                    // res.suggested_identity_provider == 'local'){
                    applyPasswordExpired(holder, email_address);
                } else {
                    goLogin(holder, res);
                }
                return;
            });
        });
        // let email = getLocalEmail();
        // if (res.user_details.state == USER_STATE.PENDING) {
        //     switchConfirmation(top);
        // } else if (res.user_details.reset_required) {
        //     applyPasswordExpired(top, email);
        // } else if (res.user_details.has_password) {
        //     switchLoginIncognito(res, holder);
        // } else {
        //     switchRegisterIncognito(res, holder);
        // }

    };

//----------------------------------------------------------------------------------------

    const addRegister = function(id, options) {
        //should only dealing with register with password/token
        loadOptions(options);
        let email_address = getLocalEmail(options.email_address);
        let pin = options.pin ? options.pin : false;

        loading = true;
        // checkProviders((res) => {
        //     loading = false;
        //
        //     let container = addUI(options);
        //     view.initView(id, options, container);
        //     goLocalRegistration(container, token);
        // });
        checkProviders((res) => {
            loading = false;
            options.email_address = getLocalEmail(options.email_address);
            addDiscoveryForm(id, res, options)
        });
    };

    const addForm = function(id, options) {

        loadOptions(options);
        checkProviders((res) => {
            options.email_address = getLocalEmail(options.email_address);
            options.email_address = getClientEmail(options.email_address, res);
            addDiscoveryForm(id, res, options)
        });
    };

    const addMagicLink = function(id, options) {
        loadOptions(options);
        let email_address = getLocalEmail(options.email_address);
        let pin = options.pin ? options.pin : false;

        let container = addUI(options);
        loading = true;
        getProviders(email_address, function(res) {
            loading = false;
            loadFirstName(res);
            let form = magicLinkForm(email_address, false, pin);
            // updateTitle(findChild(reset_form, MODULE_HEADER));
            container.appendChild(form);
            view.initView(id, options, container);
            showPopupTitle(container, true);
        });

    };

    const addReset = function(id, options) {
        loadOptions(options);
        let email_address = getLocalEmail(options.email_address);
        let pin = options.pin ? options.pin : false;

        let container = addUI(options);
        loading = true;
        getProviders(email_address, function(res) {
            loading = false;
            loadFirstName(res);
            let reset_form = resetForm(email_address, pin);
            updateTitle(findChild(reset_form, MODULE_HEADER));
            container.appendChild(reset_form);
            view.initView(id, options, container);
            showPopupTitle(container, false);
        });
    };

    const deIdentification = function(id, options) {
        options.adjustHeader(false);

        loadOptions(options);
        let email_address = getLocalEmail(options.email_address);

        const addInView = function(id, options, container, form) {
            container.appendChild(form);

            showPopupTitle(container, false);
            view.initView(id, options, container);
        }
        let container = addUI(options);
        options.adjustHeader(false);
        if (options.pin  && options.mode) {
            let form = deIdentifyPinForm(options);
            addInView(id, options, container, form);
            if (options.pin) {
                continueDeIdentifyPin(form);
            }
        } else {
            getProviders(email_address, (res) => {
                options.email_address = getClientEmail(options.email_address, res);
                let form = deIdentifyForm(res, options);
                addInView(id, options, container, form);
            });
        }
    };


    const addConfirm = function(id, options) {
        loadOptions(options);
        let email_address = getLocalEmail(options.email_address);
        let pin = options.pin ? options.pin : false;

        let container = addUI(options);
        let form = confirmForm(email_address, pin);
        container.appendChild(form);

        showPopupTitle(container, false);
        view.initView(id, options, container);

        if (pin) {
            continueConfirmUser(form);
        }
    }

    const loadPasswordRegulation = function(res) {
        if (res && res.settings && res.settings.password_settings) {
            let user_password = res.settings.password_settings;
            if (localStorage) {
                if (user_password.min_length) {
                    localStorage.setItem(
                        PASSWORD_STORAGE.MINIMUM,
                        user_password.min_length
                    );
                } else {
                    localStorage.removeItem(
                        PASSWORD_STORAGE.MINIMUM
                    );
                }
                if (user_password.min_lowercase_chars) {
                    localStorage.setItem(
                        PASSWORD_STORAGE.LOWER,
                        user_password.min_lowercase_chars
                    );
                } else {
                    localStorage.removeItem(
                        PASSWORD_STORAGE.LOWER
                    );
                }
                if (user_password.min_uppercase_chars) {
                    localStorage.setItem(
                        PASSWORD_STORAGE.UPPER,
                        user_password.min_uppercase_chars
                    );
                } else {
                    localStorage.removeItem(
                        PASSWORD_STORAGE.UPPER
                    );
                }
                if (user_password.min_numeric_chars) {
                    localStorage.setItem(
                        PASSWORD_STORAGE.NUMBER,
                        user_password.min_numeric_chars
                    );
                } else {
                    localStorage.removeItem(
                        PASSWORD_STORAGE.NUMBER
                    );
                }
                if (user_password.min_symbol_chars) {
                    localStorage.setItem(
                        PASSWORD_STORAGE.SYMBOL,
                        user_password.min_symbol_chars
                    );
                } else {
                    localStorage.removeItem(
                        PASSWORD_STORAGE.SYMBOL
                    );
                }
            }
        }
    };

    const loadFirstName = function(res) {
        if (res && res.settings &&
            res.user_profile &&
            res.user_profile.first_name) {
            if (localStorage) {
                localStorage.setItem(
                    CACHE_STORAGE.FIRST_NAME,
                    res.user_profile.first_name
                );
            }
        } else {
            if (localStorage) {
                localStorage.removeItem(CACHE_STORAGE.FIRST_NAME);
            }
        }
    };

    const switchConfirmation = function(holder) {
        showPopupTitle(holder, false);
        const email_address = getLocalEmail();
        // let top = holder.parentElement;
        cleanChild(holder);
        let form = confirmForm(email_address);
        holder.appendChild(form);
    };

    const hasProviders = function(res) {
        let count = 0;
        count += res.providers.length;
        return count > 0;
    }

    const switchLogin = function(holder) {
        showPopupTitle(holder, true);
        checkProviders((res) => {
            let invite_required = res.settings.invite_required;
            let discovery_required = res.settings.discovery_required;
            const email_address = getLocalEmail();
            let top = holder.parentElement;

            loader.remove();
            cleanChild(top);
            if (!invite_required && !discovery_required && hasProviders(res)) {
                let form = incognitoForm(res, email_address);
                top.appendChild(form);
                if (email_address) {
                    continueEmailLookup(findChild(form, INCOGNITO_HOLDER_ID));
                }
            } else {
                let form = emailForm(res, email_address, false, top);
                top.appendChild(form);
                if (email_address) {
                    continueEmailLookup(form);
                }
            }
        });
    };

    const switchMagicLinkConfirmation = function(holder, email_address, authentication_token, magic_link_code) {
        showPopupTitle(holder, true);
        cleanChild(holder);
        let form = magicLinkForm(email_address, authentication_token, magic_link_code);
        holder.appendChild(form);
    }

    const insertSwitchLogin = function(top, skip, registering) {

        removeChild(top, SWITCH_HOLDER_ID);
        removeChild(top, MODULE_SPACER);
        let holder = view.addView(SWITCH_HOLDER_ID);
        if (!skip) {
            if (getInviteRequired()) {
                let new_user = getNewUser();
                hover.addHoverEffect(new_user, Locale.HOVER.NEW_USER);
                holder.appendChild(new_user);
            }
        } else {
            holder.appendChild(getForgot(triggerForgot));
        }
        holder.appendChild(getSwitchLogin(triggerSwitchLogin));
        top.appendChild(holder);
        insertMoreInformation(top, registering);
        insertPoweredByModule(top);
    };

    const insertMoreInformation = function(top, registering) {
        if (!registering || MAGIC_LINK_REGISTRATION_ENABLED) {
            insertMagicLinkButton(top, false, registering);
        }

        removeChild(top, MODULE_MORE_INFO);
        let holder = view.addView(MODULE_MORE_INFO);
        let more_info = getButton(Locale.BUTTON.MORE_INFO, FORM.MORE_INFO);
        hover.addHoverEffect(more_info, Locale.HOVER.MORE_INFO);
        holder.appendChild(more_info);
        top.appendChild(holder);

        insertTermPolicyHolder(top);
    };

    const getArrowDown = function() {
        let b = view.addBlock('div', 'breadbutter-provider-limit');
        // b.innerHTML = `<svg data-v-6ac8759e="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" class="drop-down-icon"><path d="M12.1 15.6L6.3 9.4h12.4z"></path></svg>`;
        b.innerHTML = `<div class="drop-down-icon">
<svg xmlns="http://www.w3.org/2000/svg" width="30.473" height="6.473" viewBox="0 0 30.473 6.473">
  <g id="Group_4477" data-name="Group 4477" transform="translate(-5852.264 -3663.264)">
    <g id="Group_4398" data-name="Group 4398" transform="translate(6194 368) rotate(90)">
      <line id="Line_42" data-name="Line 42" y1="14" x2="4" transform="translate(3296.5 326.5)" fill="none" stroke="#878787" stroke-linecap="round" stroke-width="2"/>
    </g>
    <line id="Line_140" data-name="Line 140" x2="4" y2="14" transform="translate(5867.5 3668.5) rotate(-90)" fill="none" stroke="#878787" stroke-linecap="round" stroke-width="2"/>
  </g>
</svg></div>`;
        return b;
    };

    const getMagicLinkPlane = function() {
        let b = view.addBlock('div', MAGIC_LINK_PLANE_ID);
        b.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="119.287" height="116.358" viewBox="0 0 119.287 116.358">
  <defs>
    <linearGradient id="linear-gradient-plane" x1="-0.098" y1="0.555" x2="0.917" y2="0.555" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#eac040"/>
      <stop offset="0" stop-color="#a0a0a0"/>
      <stop offset="1" stop-color="#fafafc"/>
    </linearGradient>
    <linearGradient id="linear-gradient-plane-2" x1="-0.068" y1="0.585" x2="0.936" y2="0.585" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#c9c8c8"/>
      <stop offset="1" stop-color="#fff"/>
    </linearGradient>
    <linearGradient id="linear-gradient-plane-3" x1="-0.115" y1="0.555" x2="0.907" y2="0.555" xlink:href="#linear-gradient-plane-2"/>
  </defs>
  <g id="Group_15568" data-name="Group 15568" transform="translate(-946.841 -582.253)">
    <g id="Group_15523" data-name="Group 15523" transform="translate(950.399 585.81)">
      <path id="Path_13894" data-name="Path 13894" d="M976.175,750.909l21.052,16.974,12.564,2.134-.039,7.949,25.545,20.522,39.3-61.212Z" transform="translate(-969.297 -685.688)" opacity="0.094" style="mix-blend-mode: multiply;isolation: isolate"/>
      <g id="Group_15522" data-name="Group 15522">
        <g id="Group_15518" data-name="Group 15518">
          <g id="Group_15516" data-name="Group 15516" transform="translate(25.427)">
            <path id="Path_13895" data-name="Path 13895" d="M1028.32,628.292l4.148,20.97,82.6-57.008Z" transform="translate(-1028.32 -592.253)" fill="url(#linear-gradient-plane)"/>
          </g>
          <g id="Group_15517" data-name="Group 15517">
            <path id="Path_13896" data-name="Path 13896" d="M1069.014,592.253l-86.746,36.038-25.427-20.5Z" transform="translate(-956.841 -592.253)" fill="url(#linear-gradient-plane-2)"/>
          </g>
        </g>
        <g id="Group_15521" data-name="Group 15521" transform="translate(29.575)">
          <g id="Group_15519" data-name="Group 15519">
            <path id="Path_13897" data-name="Path 13897" d="M1045.944,636.435l-5.964,12.827,82.6-57.008Z" transform="translate(-1039.98 -592.253)" fill="#4eaff7"/>
          </g>
          <g id="Group_15520" data-name="Group 15520" transform="translate(5.964)">
            <path id="Path_13898" data-name="Path 13898" d="M1133.379,592.253l-76.634,44.181,31.846,25.585Z" transform="translate(-1056.745 -592.253)" fill="url(#linear-gradient-plane-3)"/>
          </g>
        </g>
      </g>
    </g>
    <path id="Path_13899" data-name="Path 13899" d="M1065.569,583.894a3.556,3.556,0,0,0-3.485-1.607L949.911,597.824a3.557,3.557,0,0,0-1.745,6.293l24.421,19.69,3.9,19.7a3.557,3.557,0,0,0,5.51,2.238l9.614-6.635,23.948,19.239a3.558,3.558,0,0,0,5.221-.851l44.788-69.767A3.558,3.558,0,0,0,1065.569,583.894Zm-47.785,71.683-26.014-20.9-2.047,1.413-9.749,6.728-4.148-20.97-25.427-20.5,112.173-15.537Z"/>
  </g>
</svg>
`;
        return b;
    };

    const getMagicLinkIcon = function() {
        let b = view.addBlock('div', MAGIC_LINK_WAND_ID);
        b.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24.164" height="24.4" viewBox="0 0 24.164 24.4">
  <defs>
    <radialGradient id="radial-gradient" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#fdd03a"/>
      <stop offset="0.648" stop-color="#d98b7a"/>
      <stop offset="1" stop-color="#9203fa"/>
    </radialGradient>
  </defs>
  <g id="Group_15318" data-name="Group 15318" transform="translate(479.338 -2635.516)">
    <g id="Group_14825" data-name="Group 14825" transform="translate(-503.977 2630.618)">
      <g id="Group_13895" data-name="Group 13895" transform="translate(30.624 4.898)">
        <path id="Path_13311" data-name="Path 13311" d="M57.655,7.512a.686.686,0,0,0-.97,0l-2.91,2.91a.686.686,0,0,0,.97.97l2.91-2.91a.686.686,0,0,0,0-.97ZM51.934,5.1a.686.686,0,0,0-1.167.485L50.76,9.695a.69.69,0,0,0,1.379,0L52.132,5.58a.68.68,0,0,0-.2-.485Zm8.138,8.138a.68.68,0,0,0-.485-.2l-4.115-.008a.689.689,0,1,0,0,1.379l4.115-.008a.686.686,0,0,0,.485-1.167ZM46.016,7.028a.686.686,0,0,0-.97.97l2.91,2.91a.686.686,0,1,0,.97-.97Zm9.214,9.214a.686.686,0,0,0-.97.97l2.91,2.91a.686.686,0,0,0,.97-.97ZM47.365,12.6a.669.669,0,0,0-.477-.2l-4.115.008a.682.682,0,0,0,0,1.364l4.115.008a.681.681,0,0,0,.477-1.175Zm5.2,5.2a.681.681,0,0,0-1.175.477l.008,4.114a.682.682,0,0,0,1.364,0l.008-4.115a.669.669,0,0,0-.2-.477Z" transform="translate(-42.091 -4.898)" fill="url(#radial-gradient)"/>
      </g>
      <g id="Group_13896" data-name="Group 13896" transform="translate(24.639 11.687)">
        <path id="Path_13312" data-name="Path 13312" d="M39.884,24.885a.712.712,0,0,0-.97,0L24.829,39.205a.713.713,0,0,0,0,.97l1.94,1.94a.713.713,0,0,0,.97,0l14.084-14.32a.712.712,0,0,0,0-.97ZM39.4,26.34l.97.97-3.88,3.88-.97-.97Z" transform="translate(-24.639 -24.694)"/>
      </g>
    </g>
  </g>
</svg>
`;
        return b;
    };

    const forceMagicLinkClick = function(holder) {
        let top = holder.parentElement;
        let link = top.querySelector('.' + MODULE_MAGIC_LINK);
        onClickMagicLink(link);
    }

    const insertMagicLinkButton = function(top, disabled, registering) {
        //MODULE_MAGIC_LINK
        let login = top.classList.contains(LOGIN_ID);
        removeChild(top, MODULE_MAGIC_LINK);
        if (MAGIC_LINK_ENABLED) {
            let holder = view.addView(MODULE_MAGIC_LINK);
            let content = getDiv(Locale.MAGIC_LINK.SEND_BUTTON_TEXT, MAGIC_LINK_BUTTON_ID);
            let icon = getMagicLinkIcon();
            content.appendChild(icon);
            holder.appendChild(content);
            top.appendChild(holder);
            top.classList.add('bb-magic-link');
            if (!disabled) {
                if (!login && !registering && !MAGIC_LINK_REGISTRATION_ENABLED) {
                    holder.onclick = ()=> {
                        highlightEmailFormMagicLink(top);
                    };
                } else {
                    holder.onclick = onClickMagicLink;
                }
            } else {
                holder.onclick = ()=> {
                    highlightEmailFormMagicLink(top);
                };
            }

            let mask = view.addView(MAGIC_LINK_MASK_ID);
            let text = view.addView(MAGIC_LINK_MASK_TEXT_ID);
            text.innerText = Locale.MAGIC_LINK.FOCUS_MASK_TEXT;
            let arrow = view.addView(MAGIC_LINK_MASK_ARROW_ID)
            mask.appendChild(text);
            mask.appendChild(arrow);
            holder.appendChild(mask);
        }
    };

    const onClickMagicLink = function(events) {
        let target = events.target ? events.target : events;
        if (!target.classList.contains(MODULE_MAGIC_LINK)) {
            target = findParents(target, MODULE_MAGIC_LINK);
            if (!target) {
                return false;
            }
        }


        let top = target.parentElement;
        let email_holder = top.querySelector('.' + FORM.EMAIL);
        let email = email_holder.email ? email_holder.email : email_holder.value;

        if (!val.isEmail(email)) {
            highlightEmailFormMagicLink(top);
            return;
        }
        cleanError(email_holder);
        cleanError(target);

        let values = {
            email_address: email
        };

        values = view.applyData(top, values);

        api.startMagicLink(values,
            async function(res) {
                if (res && res.authentication_token) {
                    switchMagicLinkConfirmation(top.closest('.' + ID), email, res.authentication_token);
                } else {
                    console.error('Something is wrong');
                    console.error(res.error);
                    if (res && res.error && res.error.message) {
                        insertError(target, res.error.message);
                    }
                }
            });

    }

    const insertTermPolicyHolder = function(top) {
        removeChild(top, TERM_POLICY_HOLDER_ID);
        if (TOC_LINK || PRIVACY_LINK) {
            let text;
            if (TOC_LINK && PRIVACY_LINK) {
                text = lang.replace({ APP_NAME, TOC_LINK, PRIVACY_LINK  }, APP_NAME ? Locale.TOC_PRIVACY.CONTENT_ALL : Locale.TOC_PRIVACY.NAMELESS_CONTENT_ALL);
            } else if (TOC_LINK) {
                text = lang.replace({ APP_NAME, TOC_LINK  }, APP_NAME ? Locale.TOC_PRIVACY.CONTENT_TOC : Locale.TOC_PRIVACY.NAMELESS_CONTENT_TOC);
            } else if (PRIVACY_LINK) {
                text = lang.replace({ APP_NAME, PRIVACY_LINK  }, APP_NAME ? Locale.TOC_PRIVACY.CONTENT_PRIVACY : Locale.TOC_PRIVACY.NAMELESS_CONTENT_PRIVACY);
            }
            let holder = view.addView(TERM_POLICY_HOLDER_ID);
            let content = getDiv(text, TERM_POLICY_ID);
            holder.appendChild(content);
            top.appendChild(holder);
            top.classList.add('bb-toc-term');
        }
    }

    const getDiv = function(text, cls) {
        cls = cls ? cls : '';
        let b = view.addBlock('div', cls);
        b.innerHTML = text;
        return b;
    };

    const getText = function(text, cls) {
        cls = cls ? cls : '';
        let b = view.addBlock('span', cls);
        b.innerHTML = text;
        return b;
    };

    const getTitle = function(text) {
        let b = view.addBlock('div', FORM.TITLE);
        b.innerHTML = text;
        return b;
    };

    const getErrorTitle = function(text) {
        let b = view.addBlock('div', FORM.TITLE_ERROR);
        b.innerHTML = text;
        return b;
    };

    const getSubtitle = function(text) {
        let b = view.addBlock('div', FORM.SUBTITLE);
        b.innerHTML = text;
        return b;
    };

    const getErrorSubtitle = function(text) {
        let b = view.addBlock('div', FORM.SUBTITLE_ERROR);
        b.innerHTML = text;
        return b;
    };

    const getErrorMessage = function(text) {
        let b = view.addBlock('div', FORM.ERROR_MESSAGE);
        b.innerHTML = text;
        return b;
    };

    const getSubMessage = function(text) {
        let b = view.addBlock('div', FORM.SUB_MESSAGE);
        b.innerHTML = text;
        return b;
    };

    const getHint = function(text, details) {
        let b = view.addBlock('div', FORM.HINT);
        if (details) {
            b.validation = details;
        }
        b.innerHTML = text;
        return b;
    };

    const getParagraph = function(text) {
        let b = view.addBlock('div', FORM.MESSAGE);
        b.innerHTML = text;
        return b;
    };

    const getFirstName = function() {
        let container = view.addView(MODULE_FORM_INPUT);
        container.classList.add(FORM.FIRST_NAME);
        let b = view.addBlock('input', FORM.FIRST_NAME);
        b.placeholder = Locale.PLACEHOLDER.FIRST_NAME;
        b.addEventListener('keyup', triggerFirstNameKeyup);
        b.addEventListener('blur', triggerFirstNameBlur);
        container.appendChild(b);
        return container;
    };

    const getLastName = function() {
        let container = view.addView(MODULE_FORM_INPUT);
        container.classList.add(FORM.LAST_NAME);
        let b = view.addBlock('input', FORM.LAST_NAME);
        b.placeholder = Locale.PLACEHOLDER.LAST_NAME;
        b.addEventListener('keyup', triggerLastNameKeyup);
        b.addEventListener('blur', triggerLastNameBlur);
        container.appendChild(b);
        return container;
    };

    const removeSubtitleFromModule = function(module) {
        removeChild(module, FORM.SUBTITLE);
    };

    const convertModuleEmailDiscoveryDisabled = function(module) {
        module.classList.add(FORM.DISABLED_EMAIL);
        let email_input = findChild(module, FORM.EMAIL);

        convertEmailToDisabled(email_input);
    };

    const convertEmailToDisabled = function(email_input, skip, cls) {
        //email_input.disabled = true;
        email_input.blur();
        email_input.addEventListener('focus', function(e) {
            this.blur();
        });
        email_input.type = 'text';
        if (!skip) {
            // hover.addHoverEffect(
            //     email_input,
            //     lang.replace({ app_name: APP_NAME }, Locale.HOVER.EMAIL_MATCH)
            // );
        }
        if (cls) {
            email_input.classList.add(cls);
        } else {
            email_input.classList.add(FORM.DISABLED_EMAIL);
        }

        email_input.classList.remove('font11');
        email_input.classList.remove('font12');
        email_input.classList.remove('font13');
        email_input.classList.remove('font14');
        email_input.classList.remove('font15');
        email_input.classList.remove('font16');

        let value = email_input.value;
        email_input.email = value;
        if (value.length > 42) {
            email_input.classList.add('font11');
            if (value.length > 46) {
                email_input.value = value.slice(0, 21) + '………' + value.slice(-21);
            }
        } else if (value.length > 39) {
            email_input.classList.add('font12');
        } else if (value.length > 36) {
            email_input.classList.add('font13');
        } else if (value.length > 33) {
            email_input.classList.add('font14');
        } else if (value.length > 30) {
            email_input.classList.add('font15');
        } else {
            email_input.classList.add('font16');
        }
    };

    const getEmail = function(email, lock, keyup, keydown) {
        let b = view.addBlock('input', FORM.EMAIL);
        b.type = 'email';
        b.placeholder = Locale.PLACEHOLDER.EMAIL_ADDRESS;

        if (email) {
            b.value = email;
        }

        if (lock) {
            convertEmailToDisabled(b);
        }

        if (keyup) {
            b.addEventListener('keyup', keyup);
        }
        if (keydown) {
            b.addEventListener('keydown', keydown);
        }

        b.addEventListener('focus', function() {
            this.classList.add('focus');
        });
        b.addEventListener('blur', function() {
            this.classList.remove('focus');
        });
        return b;
    };

    const getPin = function(cls, pin, trigger) {
        let b = view.addBlock('input', FORM.PIN);
        b.type = 'text';
        b.pattern = '[0-9]*';
        b.inputmode = 'numberic';
        b.setAttribute('maxlength', 1);

        if (pin) {
            b.value = pin;
        }

        if (cls) {
            b.classList.add(cls);
        }

        b.addEventListener('keyup', (e)=> {
            triggerPin(e, trigger);
        });
        b.addEventListener('paste', (e)=> {
            pastePin(e, trigger);
        });
        return b;
    };

    const getPinTokenSet = function(length, pin, trigger, cb) {
        let b = view.addBlock('div', FORM.TOKEN_PIN);

        if (pin) {
            pin = pin + '';
        }
        for (let i = 0; i < length; i++) {
            let cls = FORM.PIN + '-' + i;
            let p = pin ? pin[i] : false;
            let a = getPin(cls, p, trigger);
            b.appendChild(a);
        }

        if (cb) {
            b.callback = cb;
        }
        return b;
    };

    const getToken = function(pin, cb) {
        let b = view.addBlock('input', FORM.TOKEN);
        b.type = 'hidden';
        if (pin) {
            b.value = pin;
        } else {
            b.placeholder = Locale.PLACEHOLDER.PIN;
        }
        if (cb) {
            b.addEventListener('keyup', cb);
        }
        return b;
    };

    const getPassword = function(cb, placeholder) {
        let b = view.addBlock('input', FORM.PASSWORD);
        b.type = 'password';
        if (placeholder) {
            b.placeholder = placeholder;
        }
        if (cb) {
            b.addEventListener('keyup', cb);
        }
        return b;
    };

    const getReveal = function() {
        let b = view.addBlock('i', FORM.PASSWORD_TOGGLE);
        b.innerHTML = `
<svg class="visible" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="cls-1" d="M16,22.9H15c-7.7-.3-13.2-5.9-13.4-6.2a.9.9,0,0,1,0-1.3C1.9,15.1,8,9.2,16,9.2s13.8,6,14.1,6.2a1,1,0,0,1,0,1.3c-.3.2-5.5,5.3-12.6,6A3.9,3.9,0,0,1,16,22.9Zm0-11.8a4.9,4.9,0,0,0-.9,9.8h2.2A5.1,5.1,0,0,0,21,16.1,5,5,0,0,0,16,11.1ZM3.7,16a20,20,0,0,0,6.7,4,6.7,6.7,0,0,1-1.2-3.9,7,7,0,0,1,1.2-4A25,25,0,0,0,3.7,16Zm18-3.8a6.7,6.7,0,0,1,.1,7.5A22.6,22.6,0,0,0,28,16,23.3,23.3,0,0,0,21.7,12.2Z"/></svg>
<svg class="sight" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="cls-1" d="M16,22.9H15c-7.7-.3-13.2-5.9-13.4-6.2a.9.9,0,0,1,0-1.3C1.9,15.1,8,9.2,16,9.2s13.8,6,14.1,6.2a1,1,0,0,1,0,1.3c-.3.2-5.5,5.3-12.6,6A3.9,3.9,0,0,1,16,22.9Zm0-11.8a4.9,4.9,0,0,0-.9,9.8h2.2A5.1,5.1,0,0,0,21,16.1,5,5,0,0,0,16,11.1ZM3.7,16a20,20,0,0,0,6.7,4,6.7,6.7,0,0,1-1.2-3.9,7,7,0,0,1,1.2-4A25,25,0,0,0,3.7,16Zm18-3.8a6.7,6.7,0,0,1,.1,7.5A22.6,22.6,0,0,0,28,16,23.3,23.3,0,0,0,21.7,12.2Z"/><path class="cls-1" d="M9,26l-.6-.2a1.1,1.1,0,0,1-.2-1.4L21.6,6.8A1,1,0,0,1,23,6.7a.9.9,0,0,1,.2,1.4L9.8,25.6A1.2,1.2,0,0,1,9,26Z"/></svg>
`;
        b.onclick = togglePasswordOnSight;
        return b;
    };


    const getPasswordModule = function(cb, placeholder) {
        let container = view.addView(MODULE_PASSWORD);
        container.appendChild(
            getPassword(cb, placeholder)
        );
        container.appendChild(getReveal());
        return container;
    };

    const getSpacerModule = function() {
        let module = view.addView(MODULE_SPACER);
        return module;
    };

    const getPoweredByModule = function() {
        let module = view.addView(MODULE_POWEREDBY);
        module.innerHTML = view.svgPoweredByFooter();
        // let module = view.addView(MODULE_PLACEHOLDER);
        return module;
    };

    const getHalfSpacerModule = function() {
        let module = view.addView(MODULE_HALF_SPACER);
        return module;
    };

    const insertHalfSpacerModule = function(top) {
        top.appendChild(getHalfSpacerModule());
    };

    const insertSpacerModule = function(top) {
        top.appendChild(getSpacerModule());
    };

    const insertPoweredByModule = function(top) {
        removeChild(top, MODULE_POWEREDBY)
        top.appendChild(getPoweredByModule());
    };

    const getHeaderModule = function(title, content) {
        let module = view.addView(MODULE_HEADER);
        if (title) {
            module.appendChild(getTitle(title));
        }
        if (content) {
            module.appendChild(getSubtitle(content));
        }
        return module;
    };

    const getDiscoveryNextModule = function(email_address, callback, advance) {
        let module = view.addView(MODULE_EMAIL_DISCOVERY);
        let email = getEmail(email_address, false, function(e) {
            const input = e.srcElement;
            const holder = input.parentElement;
            if (e.code != 'Tab' && e.code != 'Enter') {
                cleanError(holder);
                cleanError(input);
                if (advance) {
                    cleanBlur(holder);
                }
            }
            if (e.code != 'Enter') {
                return;
            }
            if (callback) {
                callback(holder);
            }
        });
        let svgicon = getNextSvg(callback);
        module.append(email);
        module.append(svgicon);
        return module;
    };

    const getNextSvg = function(callback) {
        let b = view.addBlock('i', FORM.NEXT_ICON);
        b.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" ><path d="M398.826,242.084L213.278,119.006c-7.686-5.098-18.049-3-23.147,4.685c-5.099,7.685-3,18.049,4.685,23.147    l164.568,109.163L194.815,365.164c-7.686,5.098-9.784,15.461-4.685,23.147c5.099,7.686,15.461,9.784,23.147,4.685l185.548-123.08    c4.652-3.086,7.468-8.333,7.468-13.916S403.478,245.17,398.826,242.084z"/></svg>
`;
        b.onclick = function(e) {
            if (loading) return;
            const button = e.currentTarget;
            const holder = button.parentElement;
            if (callback) {
                callback(holder);
            }
        };
        return b;
    };

    const getRePassword = function(cb, placeholder) {
        let b = view.addBlock('input', FORM.RE_PASSWORD);
        b.type = 'password';
        if (placeholder) {
            b.placeholder = placeholder;
        }
        if (cb) {
            b.addEventListener('keyup', cb);
        }
        return b;
    };

    const getResetPassword = function(cb) {
        let b = view.addButton(FORM.RESET_PASSWORD);
        b.innerText = Locale.BUTTON.SET_PASSWORD;
        if (cb) {
            b.onclick = cb;
        }
        b.classList.add('disabled');
        return b;
    };

    const getButton = function(text, id, cb) {
        let b = view.addButton(id);
        b.innerText = text;
        if (cb) {
            b.onclick = cb;
        }
        return b;
    };

    const getNewCode = function() {
        let div = getParagraph('');
        div.classList.add('new_code');
        // div.appendChild(getText(Locale.NEW_CODE.CONTENT_1, 'break'));
        // div.appendChild(getText(Locale.NEW_CODE.CONTENT_2, 'break'));
        // div.appendChild(getText(Locale.NEW_CODE.CONTENT_OR));
        div.appendChild(getText(Locale.NEW_CODE.CONTENT));
        let button = getText(Locale.NEW_CODE.BUTTON, 'link');
        // console.log(div.innerHTML);
        div.innerHTML = div.innerHTML.replace('%BUTTON%', button.outerHTML);
        // div.appendChild(button);
        // div.appendChild(getText(Locale.NEW_CODE.CONTENT_3));

        let link = div.querySelector('.link');
        link.onclick = triggerNewCode;
        return div;
    };

    const getNewPinDeIdentify = function() {
        let div = getParagraph('');
        // div.classList.add('new_code');
        div.appendChild(getText(Locale.DE_IDENTIFICATION.GET_NEW_PIN));
        let button = getText(Locale.DE_IDENTIFICATION.NEW_PIN_BUTTON, 'link');
        // console.log(div.innerHTML);
        div.innerHTML = div.innerHTML.replace('%BUTTON%', button.outerHTML);
        // div.appendChild(button);
        // div.appendChild(getText(Locale.NEW_CODE.CONTENT_3));

        let link = div.querySelector('.link');
        link.onclick = triggerNewDeIdentify;
        return div;
    };

    const getForgot = function(cb) {
        return getButton(Locale.BUTTON.FORGOT_PASSWORD, FORM.FORGOT, cb);
    };

    const getForgotReset = function(cb) {
        return getButton(Locale.BUTTON.EMAIL_INSTRUCTION, FORM.FORGOT_RESET, cb);
    };

    const getNewUser = function(cb) {
        return getButton(Locale.BUTTON.NEW_USER, FORM.NEW_USER, cb);
    };

    const getSwitchLogin = function(cb) {
        return getButton(Locale.BUTTON.SWITCH_LOGIN, FORM.SWITCH_LOGIN, cb);
    };

    const getSwitchDeIdentify = function(cb) {
        return getButton(Locale.BUTTON.SWITCH_DE_IDENTIFY, FORM.SWITCH_LOGIN, cb);
    };

    const getRegisterButton = function(cb) {
        let button = getButton(Locale.BUTTON.REGISTER, FORM.REGISTER, cb);
        button.classList.add('disabled');
        return button;
    };

    const getDropdownButton = function(cb) {
        const button = view.addBlock('div', FORM.EXPAND_ICON);
        if (cb) {
            button.onclick = cb
        }
        button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="30.473" height="6.473" viewBox="0 0 30.473 6.473">
  <g id="Group_4477" data-name="Group 4477" transform="translate(-5852.264 -3663.264)">
    <g id="Group_4398" data-name="Group 4398" transform="translate(6194 368) rotate(90)">
      <line id="Line_42" data-name="Line 42" y1="14" x2="4" transform="translate(3296.5 326.5)" fill="none" stroke="#878787" stroke-linecap="round" stroke-width="2"/>
    </g>
    <line id="Line_140" data-name="Line 140" x2="4" y2="14" transform="translate(5867.5 3668.5) rotate(-90)" fill="none" stroke="#878787" stroke-linecap="round" stroke-width="2"/>
  </g>
</svg>
        `;
        return button;
    };

    const getModuleDropdown = function(cb) {
        const button = view.addBlock('div', MODULE_DROPDOWN);
        if (cb) {
            button.onclick = cb
        }
        button.appendChild(getDropdownButton());
        return button;
    }

    const getMoreModuleOptions = function(cb) {
        const button = getButton(Locale.BUTTON.OR_CONTINUE_WITH_EMAIL, FORM.OPTIONS, cb);
        return button;
    };

    const getMoreSignupModuleOptions = function(cb) {
        const button = getButton(Locale.BUTTON.OR_SIGN_UP_WITH_EMAIL_AND_PASSWORD, FORM.OPTIONS, cb);
        return button;
    };

    const magicLinkForm = function(email_address, authentication_token, magic_link_code) {
        formEntry(MAGIC_LINK_FORM);
        let has_first_name = false;
        let verified = false;
        if (PROFILE_DATA && PROFILE_DATA.state == 'verified') {
            verified = true;
        }
        if (PROFILE_DATA && PROFILE_DATA.first_name) {
            has_first_name = true;
        }
        let container = view.addView(MAGIC_LINK_ID);
        let form = view.addView(MAGIC_LINK_VIEW_ID);
        form.appendChild(getMagicLinkPlane());
        container.appendChild(form);

        let title_message = Locale.MAGIC_LINK.CHECK_YOUR_EMAIL;
        if (has_first_name) {
            title_message = lang.replace({
                FIRST_NAME: PROFILE_DATA.first_name
            }, Locale.MAGIC_LINK.CHECK_YOUR_EMAIL_2);
        }
        let title = getTitle(title_message);
        title.classList.add(MAGIC_LINK_TITLE_ID);
        let email = getEmail(email_address, true);
        email.classList.add(MAGIC_LINK_EMAIL_ID);
        let message = getDiv(Locale.MAGIC_LINK.CONFIRM_MESSAGE, MAGIC_LINK_MESSAGE_ID)
        container.appendChild(title);

        title = getTitle(Locale.MAGIC_LINK.CONFIRMING);
        title.classList.add(MAGIC_LINK_TITLE_CONFIRMING_ID);
        container.appendChild(title);
        title = getTitle(Locale.MAGIC_LINK.LOGGING_IN);
        title.classList.add(MAGIC_LINK_TITLE_LOGGING_ID);
        container.appendChild(title);

        container.appendChild(email);
        container.appendChild(message);


        let local_login = CLIENT_SETTINGS.settings.password_settings && CLIENT_SETTINGS.settings.password_settings.enabled;
        let providers = CLIENT_SETTINGS.providers && CLIENT_SETTINGS.providers.length;

        if (!local_login && !providers) {
            container.appendChild(
                getButton(Locale.BUTTON.SWITCH_LOGIN, FORM.SWITCH_MAGIC_LINK, triggerSwitchLogin)
            );
        } else {
            container.appendChild(
                getButton(Locale.MAGIC_LINK.LEAVE_MAGIC_LINK, FORM.SWITCH_MAGIC_LINK, triggerMagicLinkCancel)
            );
        }


        if (verified) {
            insertPoweredByModule(container);
        }

        if (authentication_token) {
            constantCheckMagicLink(container, authentication_token);
        }
        if (magic_link_code){
            verifyMagicLink(container, magic_link_code);
        }
        return container;

    }

    const verifyMagicLink = function(container, magic_link_code) {
        let view = findChild(container, MAGIC_LINK_VIEW_ID);
        loader.start(view, false, true, false);
        container.classList.remove('bb-logging');
        container.classList.add('bb-confirming');
        api.confirmMagicLinkCode(magic_link_code, async function(res) {
            if (res && res.authentication_token) {
                container.classList.add('bb-logging');
                container.classList.remove('bb-confirming');
                await loader.success_hold();
                api.redirectAuthentication(res.authentication_token, true);
                if (typeof onMagicLinkConfirm == 'function') {
                    onMagicLinkConfirm();
                }
            } else {
                await loader.failure_hold();
                switchLogin(container);
            }
        });
    };

    const constantCheckMagicLink = function(container, authentication_token) {
        setTimeout(function(){
            let view = findChild(container, MAGIC_LINK_VIEW_ID);
            api.getMagicLinkAuthenticated(authentication_token, async function(res) {
                if (res && !res.error) {
                    if (res.magic_link_authenticated){
                        container.classList.add('bb-logging');
                        loader.start(view, false, true, false);
                        await loader.success_hold();
                        api.redirectAuthentication(authentication_token, true);
                    } else {
                        constantCheckMagicLink(container, authentication_token);
                    }
                } else {
                    loader.start(view, false, true, false);
                    await loader.failure();
                    switchLogin(container);

                }
            })
        }, 5000);
    }

    const startDeIdentification = function(holder, {
        email_address, auth_type, provider, user, options
    }) {
        const top = holder.parentElement;
        const callback = function(res) {
            if (res && res.authentication_token) {
                api.redirectAuthentication(res.authentication_token, true);
            } else if (res && !res.error) {
                //change page with pin;
                let form = deIdentifyPinForm({email_address});
                let top_parent = top.parentElement;
                top.remove();
                top_parent.appendChild(form);
            } else if (res && res.error) {
                let target = findChild(holder, FORM.DE_IDENTIFICATION);
                insertError(target, res.error.message);
            }
        };

        api.startDeIdentification({
            email_address, auth_type, provider, user, options, callback
        });
    }

    const continueDeIdentificationEmail = function(holder) {
        const email_input = findChild(holder, FORM.EMAIL);
        const top = holder.parentElement;
        let email = email_input.email ? email_input.email : email_input.value;
        // console.log(email_address);

        let alert = false;

        if (!val.isEmail(email)) {
            alert = Locale.ERROR.VALID_EMAIL;
            insertError(email_input, alert.MESSAGE);
        } else {
            const callback = function(response) {
                if (response.user_profile && response.user_profile.state != 'verified') {
                    startDeIdentification(holder, {
                        email_address: response.user_profile.email_address
                    });
                } else {
                    const container = holder.parentElement;
                    container.querySelector('.' + FORM.SUBTITLE).innerHTML = Locale.DE_IDENTIFICATION.CONTENT_VERIFIED;
                    deIdentificationEmailProvider(holder, response);
                }
            };

            getProviders(email, callback);
        }
    }

    const triggerNewDeIdentify = function(event) {
        let span = event.target.parentElement;
        let message = span.parentElement;
        let holder = message.parentElement;
        let top = holder.parentElement;
        let form = deIdentifyForm(false, {});

        holder.remove();
        top.appendChild(form);
    }

    const continueDeIdentifyPin = function(holder) {
        // console.log(holder);
        let top = holder.parentElement;
        const form = findChild(holder, DEIDENTIFY_FORM_ID);
        const pin = findChild(form, FORM.TOKEN_PIN);
        const email_input = findChild(form, FORM.EMAIL);
        let email = email_input.email ? email_input.email : email_input.value;
        let value = '';
        for (let i = 0; pin.children && i < pin.children.length; i++) {
            value += pin.children[i].value;
        }

        let values = {
            email_address: email,
            pin: value,
        };
        // console.log(values);

        let pass = true;
        let alert = false;

        if (!values.pin) {
            pass = false;
            alert = Locale.ERROR.EMPTY_TOKEN;
        }

        if (pass) {
            loader.start(form);
            loading = true;
            pin.classList.add('hide');
            values = view.applyData(top, values);
            document.activeElement.blur();
            api.confirmDeIdentification(values, async function(res) {
                if (res && !res.error) {
                    await loader.success_hold();
                    view.getData(top, 'forceQuit')();
                } else if (res && res.error) {
                    view.unsetData(top, 'pin');
                    await loader.failure();
                    pin.classList.remove('hide');
                    let message = res.error.message;
                    if (Locale.RES_MAPPING[res.error.code]) {
                        message = Locale.RES_MAPPING[res.error.code];
                    }
                    insertError(pin, message);
                }
                loading = false;
            });
        } else if (alert) {
            insertError(pin, alert.MESSAGE);
        }
    }

    const triggerDeIdentifyPin = function(event) {
        const button = event.currentTarget;
        const holder = button.parentElement;
        continueDeIdentifyPin(holder.parentElement);
    }

    const triggerCheckDeIdentificationLocal = function(event) {
        let holder = event.target.parentElement;
        deIdentificationLocal(holder);
    };

    const triggerCheckDeIdentificationSSOButton = function(event) {
        let holder = event.target.parentElement;
        let name = event.currentTarget.getAttribute('name');
        let provider_id = event.currentTarget.getAttribute(
            'provider_id'
        );
        let email_address = event.currentTarget.email_address;
        deIdentificationSSO(holder, name, provider_id, email_address);
    };
    const triggerCheckDeIdentificationSSO = function(event) {
        let holder = event.target.parentElement;
        let buttons = findChild(holder, BUTTON_ID);
        let button = buttons.children[0];
        let name = button.getAttribute('name');
        let provider_id = button.getAttribute(
            'provider_id'
        );
        let email_address = button.email_address;
        deIdentificationSSO(holder, name, provider_id, email_address);
    };

    const deIdentificationSSO = function(holder, name, provider_id, email_address) {
        let provider = {};
        if (provider_id) {
            provider.id = provider_id;
        } else if (name) {
            provider.idp = name;
        }

        startDeIdentification(holder, {
            email_address,
            auth_type: AUTH_TYPE.SSO,
            provider
        });
    }

    const triggerCheckDeIdentificationEmail = function(event) {
        let holder = event.target.parentElement;
        continueDeIdentificationEmail(holder);
    }

    const triggerDeIdentificationPasswordKeyup = function(event) {
        const input = event.srcElement;
        const holder = input.parentElement.parentElement;
        cleanError(input);
        if (event.code != 'Enter') {
            return;
        }
        deIdentificationLocal(holder);

    }

    const deIdentificationLocal = function(holder) {
        const email_input = findChild(holder, FORM.EMAIL);

        const password_module = findChild(holder, MODULE_PASSWORD);
        const password_input = findChild(password_module, FORM.PASSWORD);

        let email = email_input.email ? email_input.email : email_input.value;
        startDeIdentification(holder, {
            email_address: email,
            auth_type: AUTH_TYPE.AUTH,
            user: {
                password: password_input.value
            }
        });
    };

    const deIdentificationEmailProvider = function(holder, response) {
        holder.innerHTML = ""; //clean out existing, proceed to process emaill and handling;
        let {
            list,
            suggested_list,
            suggested,
            local
        } = processProviders(response);
        let email_address = response.user_profile.email_address;
        if (suggested == 'local') {
            // console.log('local');
            holder.appendChild(getEmail(email_address, true));
            holder.appendChild(
                getPasswordModule(triggerDeIdentificationPasswordKeyup, Locale.PLACEHOLDER.PASSWD)
            );
            holder.appendChild(
                getButton(
                    Locale.BUTTON.DE_IDENTIFY_ME,
                    FORM.DE_IDENTIFICATION,
                    triggerCheckDeIdentificationLocal
                )
            );
        } else {
            // console.log('sso');
            if (response.user_profile && suggested_list.length) {
                if (response.user_profile.profile_image_url) {
                    suggested_list[0].profile_image_url = response.user_profile.profile_image_url;
                }
                if (response.user_profile.first_name) {
                    suggested_list[0].alias = response.user_profile.first_name;
                }
            }
            let opt = {
                button_theme: false,
                suggested: suggested,
                email_address: email_address,
                deidentify: true,
                pass: triggerCheckDeIdentificationSSOButton
            };
            let buttons = viewButton.getButtonLists(
                suggested_list,
                opt
            );

            holder.appendChild(buttons.container);
            holder.appendChild(
                getButton(
                    Locale.BUTTON.DE_IDENTIFY_ME,
                    FORM.DE_IDENTIFICATION,
                    triggerCheckDeIdentificationSSO
                )
            );
        }
        holder.appendChild(getSwitchDeIdentify(triggerSwitchDeIdentify));
    }

    const triggerSwitchDeIdentify = function(e) {
        const button = e.currentTarget;
        const holder = button.parentElement;
        holder.innerHTML = "";
        const container = holder.parentElement;
        container.querySelector('.' + FORM.SUBTITLE).innerHTML = Locale.DE_IDENTIFICATION.CONTENT;
        deIdentificationEmailRequest(holder, false);
    }

    const deIdentificationEmailRequest = function(holder, email, container) {
        holder.appendChild(getEmail(email, false, triggerDeIdentificationKeyup));
        holder.appendChild(
            getButton(
                Locale.BUTTON.DE_IDENTIFY_ME,
                FORM.DE_IDENTIFICATION,
                triggerCheckDeIdentificationEmail
            )
        );
    }

    const triggerDeIdentificationKeyup = function(e) {
        if (loading) return;
        const input = e.srcElement;
        const holder = input.parentElement;
        cleanError(input);
        if (e.code != 'Enter') {
            return;
        }
        continueDeIdentificationEmail(holder);
    };

    const deIdentifyForm = function(res, options) {
        let is_verified = res && res.user_profile && res.user_profile.state == 'verified' ? true : false;
        // has_email = false;

        formEntry(DEIDENTIFY_FORM);
        let container = view.addView(DEIDENTIFY_ID);
        container.options = options;
        let form = view.addView(DEIDENTIFY_FORM_ID);

        if (is_verified) {

            container.appendChild(getHeaderModule(Locale.DE_IDENTIFICATION.DE_IDENTIFY_ME, Locale.DE_IDENTIFICATION.CONTENT_VERIFIED));
            deIdentificationEmailProvider(form, res);
        } else {
            container.appendChild(getHeaderModule(Locale.DE_IDENTIFICATION.DE_IDENTIFY_ME, Locale.DE_IDENTIFICATION.CONTENT));
            deIdentificationEmailRequest(form, options.email_address);
        }
        container.appendChild(form);
        insertPoweredByModule(container);
        return container;
    }

    const deIdentifyPinForm = function(options) {
        let email_address = options.email_address;
        let pin = options.pin;

        formEntry(DEIDENTIFY_FORM);
        let container = view.addView(DEIDENTIFY_ID);
        container.options = options;
        let form = view.addView(DEIDENTIFY_FORM_ID);
        container.appendChild(getHeaderModule(Locale.DE_IDENTIFICATION.DE_IDENTIFY_PIN, Locale.DE_IDENTIFICATION.CONTENT_PIN));

        form.appendChild(getEmail(email_address, true));
        form.appendChild(getPinTokenSet(4, pin, continueDeIdentifyPin));
        form.appendChild(
            getButton(
                Locale.BUTTON.CONFIRM_PIN,
                FORM.CONFIRM_PIN,
                triggerDeIdentifyPin
            )
        );

        container.appendChild(form);
        let paragraph = getParagraph('');
        paragraph.appendChild(getText(Locale.DE_IDENTIFICATION.CONFIRM_PIN));
        container.appendChild(paragraph);
        container.appendChild(getNewPinDeIdentify());
        insertPoweredByModule(container);
        return container;
    };

    const confirmForm = function(email_address, pin) {
        formEntry(CONFIRM_FORM);
        let container = view.addView(CONFIRM_ID);
        let form = view.addView(CONFIRM_FORM_ID);
        container.appendChild(getHeaderModule(Locale.CONFIRM_EMAIL.TITLE, Locale.CONFIRM_EMAIL.CONTENT));

        form.appendChild(getEmail(email_address, true));
        form.appendChild(getPinTokenSet(4, pin, continueConfirmUser));
        form.appendChild(
            getButton(
                Locale.BUTTON.CONFIRM,
                FORM.CONFIRM_EMAIL,
                triggerConfirmEmail
            )
        );
        container.appendChild(form);
        container.appendChild(getNewCode());
        container.appendChild(
            getButton(Locale.BUTTON.CANCEL, FORM.CANCEL, triggerConfirmCancel)
        );
        insertPoweredByModule(container);
        return container;
    };

    const resetForm = function(email_address, pin) {
        formEntry(RESET_FORM);
        let container = view.addView(RESET_ID);

        container.appendChild(getHeaderModule(Locale.RESET_PASSWORD.TITLE, Locale.RESET_PASSWORD.CONTENT));

        let email = getEmail(email_address, true);
        container.appendChild(email);
        container.appendChild(getToken(pin));


        let pwd = getPasswordModule(triggerResetPasswordKeyup, Locale.PLACEHOLDER.NEW_PASSWORD);
        pwd.classList.add(FORM.PASSWORD);
        container.appendChild(pwd);
        let rpwd = getPasswordModule(triggerResetRePasswordKeyup, Locale.PLACEHOLDER.NEW_CONFIRM_PASSWORD);
        rpwd.classList.add(FORM.RE_PASSWORD);
        container.appendChild(rpwd);

        container.appendChild(passwordValidationList());
        container.appendChild(getResetPassword(triggerReset));
        container.appendChild(
            getButton(Locale.BUTTON.CANCEL, FORM.CANCEL, triggerResetCancel)
        );
        insertPoweredByModule(container);
        return container;
    };

    const passwordValidationList = function(register) {
        let container = view.addView(PASSWORD_VALIDATION_ID);
        // contains at least one character
        // contains at least one lower case (a-z)
        // contains at least one upper case (A-Z)
        // contains at least one number (0-9)
        // contains at least one symbol
        // contains at least 2 characters
        // contains at least 2 lower case (a-z)
        // contains at least 2 upper case (A-Z)
        // contains at least 2 numbers (0-9)
        // contains at least 2 symbols
        if (localStorage) {
            for (let i = 0; i < PASSWORD_LIST.length; i++) {
                let validation = PASSWORD_LIST[i];
                let num = localStorage.getItem(PASSWORD_STORAGE[validation]);
                if (num != null) {
                    let hint_str = validation + '_';
                    hint_str += num == 1 ? 'ONE' : 'MORE';
                    let hint = Locale.PASSWORD_HINT[hint_str];
                    container.appendChild(
                        getHint(
                            lang.replace({count: num}, hint),
                            PASSWORD_VALIDATION[validation]
                        )
                    );
                }
            }
        }

        container.appendChild(
            getHint(Locale.PASSWORD_HINT.MATCH, PASSWORD_VALIDATION.MATCH)
        );

        container.prepend(getParagraph(Locale.PASSWORD_HINT.HAS_VALIDATION));

        if (!register) {
            let no_recent_password = getParagraph(
                Locale.PASSWORD_HINT.NO_OLD_PASSWORD
            );
            no_recent_password.classList.add(FORM.HINT_TITLE);
            container.prepend(no_recent_password);
        }
        return container;
    };

    const updateTitle = function(holder) {
        let str = Locale.GREETING;
        let str2 = Locale.ERROR.INLINE.TITLE_;
        let name = "";
        if (localStorage) {
            name = localStorage.getItem(CACHE_STORAGE.FIRST_NAME);
        }
        str = lang.replace({
            NAME: name
        }, str).trim();
        str2 = lang.replace({
            NAME: name
        }, str2).trim();
        const title = findChild(holder, FORM.TITLE);
        if (title) {
            title.innerText = str;
        }
        const title_error = findChild(holder, FORM.TITLE_ERROR);
        if (title_error) {
            title_error.innerText = str2;
        }
    };

    const updateErrorMessage = function(holder, text) {
        const subtitle = findChild(holder, FORM.SUBTITLE_ERROR);
        if (subtitle) {
            subtitle.innerText = text;
        }
    };

    const highlightEmailFormMagicLink = function(container) {
        // console.log('highlightEmailFormMagicLink');
        // console.log(container);
        let ml_module = findChild(container, MODULE_MAGIC_LINK);
        if (ml_module) {
            ml_module.classList.add('bb-blur');
        }
    };

    const highlightEmailForm = function(container, button_holder, on) {
        // console.log('highlightEmailForm');
        // console.log(container);
        // console.log(button_holder);
        let email_module = findChild(container, MODULE_EMAIL_DISCOVERY);
        let height = email_module.offsetHeight;
        let magic_link_module = findChild(container, MODULE_MAGIC_LINK);
        if (magic_link_module) {
            height += magic_link_module.offsetHeight;
        }

        if (on) {
            let onBlur = triggerOnBlur(container, height);
            if (!onBlur) {
                let mask = findChild(container, BLUR_HOLDER_ID);
                if (!mask) {
                    mask = view.addView(BLUR_HOLDER_ID);
                    container.append(mask);
                }
                mask.style.bottom = height + 36 + 'px';
            }
            if (button_holder && !button_holder.classList.contains(BLUR_CLASS)) {
                button_holder.classList.add(BLUR_CLASS);
            }
        } else {
            let onBlur = triggerOnBlur(container, false);
            if (!onBlur) {
                let mask = findChild(container, BLUR_HOLDER_ID);
                if (mask && mask.remove) {
                    mask.remove();
                }
            }
            if (button_holder && button_holder.classList) {
                button_holder.classList.remove(BLUR_CLASS);
            }

        }
    }

    const emailForm = function(res, email_address, options, holder) {
        formEntry(EMAIL_FORM);
        let container = view.addView(EMAIL_ID);

        let {list, button_holder} = getContinueWith(res, container);

        if (!list || list.length == 0) {
            container.prepend(getHeaderModule(Locale.LOGIN.TITLE, Locale.LOGIN.CONTENT));
        } else {
            if ((options && !options.isContinueWith) || (!options && holder && !isContinueWith(holder))) {
                container.prepend(getHeaderModule(Locale.INCOGNITO.TITLE));
            }
            let buttons = findChild(button_holder, BUTTON_ID);
            // console.log(button_holder);
            // console.log(buttons);
            for (let i = 0; buttons.children && i < buttons.children.length; i++) {
                buttons.children[i].onclick = function() {
                    highlightEmailForm(container, button_holder, true);
                };
            }
            button_holder.appendChild(getModuleDropdown());
        }

        container.appendChild(getDiscoveryNextModule(email_address, continueBasicEmailLookupModule));
        // insertPoweredByModule(container);

        insertMagicLinkButton(container, true);
        return container;
    };

    const expireForm = function(email_address) {
        let container = view.addView(EXPIRE_ID);
        let container1 = view.addView(EXPIRE_FORM_ID);
        let container2 = view.addView(EXPIRE_BUTTON_ID);
        container1.appendChild(getTitle(Locale.EXPIRE_PASSWORD.TITLE));
        container1.appendChild(getSubMessage(Locale.EXPIRE_PASSWORD.CONTENT));
        container1.appendChild(
            getEmail(email_address, false, triggerExpireConfirmKeyup)
        );
        container2.appendChild(getForgotReset(triggerExpireConfirm));
        container2.appendChild(
            getButton(Locale.BUTTON.CANCEL, FORM.CANCEL, triggerExpireBack)
        );
        container.appendChild(container1);
        container.appendChild(container2);

        insertPoweredByModule(container);
        return container;
    };

    const forgotForm = function(email_address) {
        let container = view.addView(FORGOT_ID);
        let container1 = view.addView(FORGOT_FORM_ID);
        let container2 = view.addView(FORGOT_BUTTON_ID);
        container1.appendChild(getTitle(Locale.FORGOT_PASSWORD.TITLE));
        container1.appendChild(getSubMessage(Locale.FORGOT_PASSWORD.CONTENT));
        container1.appendChild(
            getEmail(email_address, false, triggerForgotConfirmKeyup)
        );
        container2.appendChild(getForgotReset(triggerForgotConfirm));
        container2.appendChild(
            getButton(Locale.BUTTON.CANCEL, FORM.CANCEL, triggerForgotBack)
        );
        container.appendChild(container1);
        container.appendChild(container2);

        insertPoweredByModule(container);
        return container;
    };

    const showMoreIDP = function(holder) {
        let idpfield = holder.querySelector('.bb-limit-providers');
        if (idpfield) {
            let dropdown = idpfield.querySelector('.breadbutter-provider-limit');
            if (dropdown) {
                dropdown.remove();
            }
            idpfield.classList.remove('bb-limit-providers');
        }
    };

    const showContinueWithEmail = function(holder) {
        let emailfield = holder.querySelector('.less-content');
        if (emailfield && emailfield.classList.contains('less-content')) {
            emailfield.classList.remove('less-content');
        }
        showMoreIDP(holder);
    };

    const expandingIcons = function(e) {
        let icon = e.target;
        let holder = findParents(icon, UI_ID);
        if (holder && holder.parentElement) {
            console.log('expandingIcons');
            holder.parentElement.classList.remove('scrolling');
            showMoreIDP(holder);
            setTimeout(function() {
                holder.parentElement.style.height = null;
            }, 200);
        }
    };

    const getContinueWith = function(res, top, incognito) {
        let list = [];
        let continue_with_count = 0;
        if (res && res.providers) {
            for (let i = 0; i < res.providers.length; i++) {
                let provider = res.providers[i];
                if (providers_hash[provider.idp]) {
                    list.push(provider);
                    continue_with_count++;
                }
            }
        }

        if (list.length === 0) {
            list = false;
        }
        let theme = OPTS.button_theme;

        // let overflow = false;
        // console.log(top);
        let bounding = top.getBoundingClientRect();
        let gap = bounding.top > bounding.bottom ? bounding.top : bounding.bottom;
        // console.log(gap);
        if ((window.innerHeight - 300 - (continue_with_count * 46) - 70 - gap) <= 0) {
            theme = 'round-icons';
        }

        if (isMobile && list.length == 1) {
            theme = 'tiles';
        }

        let opt = {
            button_theme: theme,
            register: true
        };

        if (!incognito) {
            opt.pass = true;
        }

        let button_holder = view.addView(BUTTON_HOLDER_ID);
        if (list) {
            if (theme !== 'tiles') {
                let contin = getParagraph(Locale.BUTTON.CONTINUE_WITH);
                button_holder.prepend(contin);
            }
            let {container, error, theme_class} = viewButton.getButtonLists(list, opt);
            if (theme_class) {
                button_holder.classList.add(theme_class);
            }
            button_holder.append(container);

            if (theme == 'tiles' && incognito) {
                opt.button_theme = 'round-icons';
                let {container, error, theme_class} = viewButton.getButtonLists(list, opt);
                if (theme_class) {
                    button_holder.classList.add(theme_class);
                }
                button_holder.append(container);
            }

            top.appendChild(button_holder);

            if (list.length > 5) {
                let d = getArrowDown();
                button_holder.append(d);
                button_holder.classList.add('bb-limit-providers');
                d.onclick = function() {
                    console.log('getArrowDown');
                    this.parentElement.classList.remove('bb-limit-providers');
                    this.remove();
                };
            }

            if (incognito) {
                let dropdown = getModuleDropdown(expandingIcons);
                top.appendChild(dropdown);
            } else {

                let more = getMoreModuleOptions();
                more.innerText = Locale.BUTTON.START_WITH_EMAIL_ADDRESS;
                more.classList.add(CONTIUNUE_WITH_EMAIL_ID);
                button_holder.appendChild(more);
            }
        }
        return {list, button_holder};
    };

    const incognitoForm = function(res, email_address) {
        formEntry(INCOGNITO_FORM);
        let top = view.addView(INCOGNITO_ID);
        top.appendChild(getHeaderModule(Locale.REGISTER.TITLE));
        let local = false;


        let {list, button_holder} = getContinueWith(res, top, true);

        if (res && res.settings && res.settings.password_settings && res.settings.password_settings.enabled) {
            local = providers_hash[providers.LOCAL];
        }

        if (local) {
            let form_holder = incognitoEmailForm(email_address);
            top.appendChild(form_holder);
            let more = getMoreModuleOptions(function(e) {
                if (loading) return;
                const button = e.currentTarget;
                triggerIncognitoMoreOptions(button, form_holder)
            });
            button_holder.appendChild(more);
            if (list) {
                let incognito_holder = findChild(top, INCOGNITO_HOLDER_ID);
                incognito_holder.classList.add('more-content');
                insertMoreInformation(incognito_holder);
                // insertPoweredByModule(incognito_holder);
                if (OPTS.expand_email_address) {
                    convertMoreOptions(more);
                } else if (!email_address) {
                    triggerIncognitoMoreOptions(more, form_holder);
                }
            }
        }
        return top;
    };

    const incognitoEmailForm = function(email_address, pin) {
        let container = view.addView(INCOGNITO_HOLDER_ID);
        container.appendChild(
            getDiscoveryNextModule(email_address, continueEmailLookupModule, true)
        );

        return container;
    };

    const applyPasswordExpired = function(top, email) {
        showPopupTitle(top, false);
        removeChild(top, EXPIRE_ID);
        top.appendChild(expireForm(email));
        top.classList.add('expire');
    };

    const pastePin = function(e, trigger) {
        let clipboardData = e.clipboardData || window.clipboardData;
        let pastedData = clipboardData.getData('Text');
        if (!isNaN(pastedData)) {
            let holder = e.target.parentElement;
            for (
                let i = 0;
                holder.children &&
                i < holder.children.length &&
                i < pastedData.length;
                i++
            ) {
                let t = holder.children[i];
                let v = pastedData[i];
                t.value = v;
                t.blur();
            }
            if (holder.children && holder.children.length && pastedData.length) {
                holder.children[holder.children.length - 1].focus();
                trigger(holder.parentElement.parentElement);
            }
        }
    };

    const triggerPin = function(e, trigger) {
        if (loading) return;
        const input = e.srcElement;
        const pin = input.parentElement;
        if (e.code != 'Tab' && e.code != 'Enter') {
            cleanError(pin);
        }
        if (input.value) {
            if (input.nextSibling) {
                input.nextSibling.focus();
            } else {
                trigger(pin.parentElement.parentElement);
            }
        } else {
            if (input.previousSibling) {
                input.previousSibling.focus();
            }
        }
    };

    const triggerNewCode = function(e) {
        const button = e.currentTarget;
        const holder = button.parentElement.parentElement;
        continueResendConfirmationEmail(holder.parentElement);
    };

    const triggerListCollapse = function(e) {
        if (loading) return;
        const button = e.currentTarget.parentElement;
        const suggested_list = button.parentElement;
        const button_holder = suggested_list.parentElement;
        const container = findChild(button_holder, 'collapsible');
        if (suggested_list.classList.contains('bb-collapsed')) {
            suggested_list.classList.remove('bb-collapsed');
            container.classList.remove('hide');
            expandingIcons(e);
        } else {
            suggested_list.classList.add('bb-collapsed');
            container.classList.add('hide');
        }
    };

    const triggerCollapse = function(button_holder) {
        const login_container = button_holder.parentElement;
        if (!login_container.classList.contains('local-login')) {
            const suggested_list = findChild(button_holder, 'suggested-list');
            const container = findChild(button_holder, 'collapsible');
            suggested_list.classList.add('bb-collapsed');
            container.classList.add('hide');
        }
    };

    const triggerLocalInSuggestion = function(e) {
        if (loading) return;
        const button = e.currentTarget;
        const holder = button.parentElement;
        const login_holder = holder.parentElement.parentElement;
        continueEmailAndPassword(login_holder);
    };

    const triggerLocalInListLogin = function(e) {
        const button = e.currentTarget;
        const holder = button.parentElement;
        const button_holder = holder.parentElement;
        if (RESET_REQUIRED) {
            applyPasswordExpired(
                button_holder.parentElement.parentElement,
                RESET_REQUIRED
            );
        } else {
            switchLocalLogin(holder);
            holder.classList.add('suggest-local');
            updateSuggestionToLocal(button_holder);
        }
    }

    const updateSuggestionToLocal = function(button_holder) {
        let local = Object.assign({}, providers_hash[providers.LOCAL]);
        local.text = Locale.BUTTON.SIGN_IN;
        local.cls = 'green';
        let suggest_container = findChild(button_holder, 'suggested-list');
        cleanChild(suggest_container);
        let localButton = viewButton.buttons(local, {});
        localButton.onclick = triggerLocalInSuggestion;
        suggest_container.appendChild(localButton);
        addMoreInSuggest(button_holder);
    };

    const addMoreInSuggest = function(button_holder) {
        let suggest_container = findChild(button_holder, 'suggested-list');
        let more = viewButton.getMoreButton(triggerListCollapse);
        suggest_container.prepend(more);
    };

    const continueForgotEmail = function(holder) {
        const email_input = findChild(holder, FORM.EMAIL);
        const top = holder.parentElement;
        let email = email_input.email ? email_input.email : email_input.value;
        // console.log(email_address);

        let pass = true;
        let alert = false;

        if (!val.isEmail(email)) {
            pass = false;
            alert = Locale.ERROR.VALID_EMAIL;
            insertError(email_input, alert.MESSAGE);
        }
        const callback = function() {
            loading = false;
            const top = holder.parentElement.parentElement;
            top.classList.remove('forgot');
            top.classList.remove('expire');
            removeChild(top, EXPIRE_ID);
            showPopupTitle(top, true);
        };

        if (pass) {
            loading = true;
            document.activeElement.blur();
            api.resetPassword(email, callback);
        }
    };

    const continueEmailAndPassword = function(holder) {
        const email_input = findChild(holder, FORM.EMAIL);

        const password_module = findChild(holder, MODULE_PASSWORD);
        const password_input = findChild(password_module, FORM.PASSWORD);

        let email = email_input.email ? email_input.email : email_input.value;
        let values = {
            email_address: email,
            password: password_input.value,
        };
        // console.log(values);

        let pass = true;
        let top = holder.parentElement;

        let alert;
        if (values.password.length == 0) {
            alert = Locale.ERROR.PASSWORD_EMPTY;
            insertError(password_input, alert.MESSAGE);
            pass = false;
        }

        if (!val.isEmail(values.email_address)) {
            pass = false;
            alert = Locale.ERROR.VALID_EMAIL;
            insertError(email_input, alert.MESSAGE);
        }

        if (pass) {
            let button_holder = findChild(holder, BUTTON_HOLDER_ID);
            loader.start(button_holder, false, true, false);
            loading = true;

            values = view.applyData(top, values);

            document.activeElement.blur();
            // console.log('loading...');
            api.loginWithPassword(values, async function(res) {
                if (res && res.authentication_token) {
                    await loader.success_hold();
                    api.redirectAuthentication(
                        res.authentication_token,
                        true);
                } else if (res && res.error) {
                    //Custom alert
                    await loader.failure();
                    let message = res.error.message;
                    if (Locale.RES_MAPPING[res.error.code]) {
                        message = Locale.RES_MAPPING[res.error.code];
                    }
                    insertError(password_input, message);
                }
                loading = false;
            });
        }
    };


    const continueRegister = function(holder) {
        const email_input = findChild(holder, FORM.EMAIL);
        const fname_input = findChild(findChild(holder, FORM.FIRST_NAME), FORM.FIRST_NAME);
        const lname_input = findChild(findChild(holder, FORM.LAST_NAME), FORM.LAST_NAME);
        const passwd_input = findChild(findChild(holder, FORM.PASSWORD), FORM.PASSWORD);
        const repasswd_input = findChild(findChild(holder, FORM.RE_PASSWORD), FORM.PASSWORD);
        const token_input = findChild(holder, FORM.TOKEN);

        let email = email_input.email ? email_input.email : email_input.value;
        let values = {
            email_address: email,
            first_name: fname_input.value,
            last_name: lname_input.value,
            password: passwd_input.value,
        };
        let repassword = repasswd_input.value;

        if (token_input) {
            values['pin'] = token_input.value;
        }

        let pass = true;
        let top = holder.parentElement;

        let alert;
        let params = {};
        if (localStorage) {
            try {
                let password_length = localStorage.getItem(
                    'breadbutter-sdk-password-length'
                );
                password_length = Number(password_length);
                if (values.password.length < password_length) {
                    alert = Locale.ERROR.PASSWORD_LENGTH;
                    params['count'] = password_length;
                    insertAfter(passwd_input, lang.replace(params, alert.MESSAGE));
                    pass = false;
                }
            } catch (e) {
            }
        }

        if (values.password != repassword) {
            pass = false;
            alert = Locale.ERROR.PASSWORD_NOT_MATCH;
            insertAfter(repassword_input, alert.MESSAGE);
        }

        if (!val.isEmail(values.email_address)) {
            pass = false;
            alert = Locale.ERROR.VALID_EMAIL;
            insertAfter(email_input, alert.MESSAGE);
        }

        if (pass) {
            loading = true;
            values = view.applyData(top, values);
            document.activeElement.blur();
            api.registerWithPassword(values, function(res) {
                if (res && !res.error) {
                    if (res.pending_pin_confirmation) {
                        switchConfirmation(holder.parentElement);
                    } else if (res.authentication_token) {
                        api.redirectAuthentication(
                            res.authentication_token,
                            true);
                    }
                } else if (res && res.error) {
                    insertError(passwd_input, res.error.message);
                }

                loading = false;
            });
        }
    };

    const continueResendConfirmationEmail = function(top) {
        let holder = findChild(top, CONFIRM_FORM_ID);
        const email_input = findChild(holder, FORM.EMAIL);
        let email = email_input.email ? email_input.email : email_input.value;
        loader.start(holder);
        loading = true;
        document.activeElement.blur();
        api.resendConfirmationEmail(email, async function(res) {
            if (res && !res.error) {
                await loader.success();
            } else if (res && res.error) {
                await loader.failure();
            }
            loading = false;
        });
    };

    const continueConfirmUser = function(holder) {
        const form = findChild(holder, CONFIRM_FORM_ID)
        let top = holder.parentElement;
        const button = findChild(form, FORM.CONFIRM_EMAIL);
        const pin = findChild(form, FORM.TOKEN_PIN);
        const email_input = findChild(form, FORM.EMAIL);

        let email = email_input.email ? email_input.email : email_input.value;
        let value = '';
        for (let i = 0; pin.children && i < pin.children.length; i++) {
            value += pin.children[i].value;
        }

        let values = {
            email_address: email,
            pin: value,
        };

        let pass = true;
        let alert = false;

        if (!values.pin) {
            pass = false;
            alert = Locale.ERROR.EMPTY_TOKEN;
        }

        if (pass) {
            loader.start(form);
            loading = true;
            pin.classList.add('hide');
            values = view.applyData(top, values);
            document.activeElement.blur();
            api.confirmUser(values, async function(res) {
                if (res && !res.error) {
                    await loader.success_hold();
                    if (res.authentication_token) {
                        api.redirectAuthentication(res.authentication_token, true);
                    } else {
                        switchLogin(top);
                    }
                } else if (res && res.error) {
                    view.unsetData(top, 'pin');
                    await loader.failure();
                    pin.classList.remove('hide');
                    let message = res.error.message;
                    if (Locale.RES_MAPPING[res.error.code]) {
                        message = Locale.RES_MAPPING[res.error.code];
                    }
                    insertError(pin, message);
                }
                loading = false;
            });
        } else if (alert) {
            insertError(pin, alert.MESSAGE);
        }
    };

    const continueResetPassword = function(holder) {
        const pin = findChild(holder, FORM.TOKEN);
        const password = findChild(findChild(holder, FORM.PASSWORD), FORM.PASSWORD);
        const repassword = findChild(findChild(holder, FORM.RE_PASSWORD), FORM.PASSWORD);
        const email_input = findChild(holder, FORM.EMAIL);
        let email = email_input.email ? email_input.email : email_input.value;

        const values = {
            email_address: email,
            pin: pin.value,
            password: password.value,
            repassword: repassword.value,
        };
        let pass = true;
        let top = holder.parentElement;

        let alert;
        let params = {};
        if (localStorage) {
            try {
                let password_length = localStorage.getItem(
                    'breadbutter-sdk-password-length'
                );
                password_length = Number(password_length);
                if (values.password.length < password_length) {
                    alert = Locale.ERROR.PASSWORD_LENGTH;
                    params['count'] = password_length;
                    insertError(password, lang.replace(params, alert.MESSAGE));
                    pass = false;
                }
            } catch (e) {
            }
        }

        if (values.password != values.repassword) {
            pass = false;
            alert = Locale.ERROR.PASSWORD_NOT_MATCH;
            insertError(repassword, alert.MESSAGE);
        }

        if (!val.isEmail(values.email_address)) {
            pass = false;
            alert = Locale.ERROR.VALID_EMAIL;
            insertError(email_input, alert.MESSAGE);
        }

        if (pass) {
            loader.start(top);
            loading = true;
            document.activeElement.blur();
            api.confirmResetPassword(
                values.email_address,
                values.pin,
                values.password,
                async function(res) {
                    // switchLogin(holder);
                    if (res && !res.error) {
                        await loader.success();
                        switchLogin(holder);
                    } else if (res && res.error) {
                        await loader.failure();
                        let message = res.error.message;
                        insertError(repassword, message);
                    }
                    loading = false;
                }
            );
            // switchLogin(holder);
        }
    };

    const validationPassword = function(holder, password, repassword, clean) {
        let children = holder.children;
        let pass = true;
        for (let i = 0; i < children.length; i++) {
            let c = children[i];
            if (c.validation) {
                c.classList.remove('pass');
                c.classList.remove('fail');

                let count = localStorage.getItem(PASSWORD_STORAGE[c.validation]);
                count = Number(count);
                let match;
                switch (c.validation) {
                    case PASSWORD_VALIDATION.MINIMUM:
                        if (password.length < count) {
                            c.classList.remove('pass');
                            c.classList.add('fail');
                        } else {
                            c.classList.remove('fail');
                            c.classList.add('pass');
                        }
                        break;
                    case PASSWORD_VALIDATION.NO_EMAIL:
                        break;
                    case PASSWORD_VALIDATION.MATCH:
                        if (repassword.length == 0) {
                            c.classList.remove('fail');
                            c.classList.remove('pass');
                        } else if (password != repassword) {
                            c.classList.remove('pass');
                            c.classList.add('fail');
                        } else {
                            c.classList.remove('fail');
                            c.classList.add('pass');
                        }
                        break;
                    case PASSWORD_VALIDATION.LOWER:
                        match = password.match(/[a-z]+/g);
                        if (match) {
                            match = match.join('');
                        }
                        if (match && match.length >= count) {
                            c.classList.remove('fail');
                            c.classList.add('pass');
                        } else {
                            c.classList.remove('pass');
                            c.classList.add('fail');
                        }
                        break;
                    case PASSWORD_VALIDATION.UPPER:
                        match = password.match(/[A-Z]+/g);
                        if (match) {
                            match = match.join('');
                        }
                        if (match && match.length >= count) {
                            c.classList.remove('fail');
                            c.classList.add('pass');
                        } else {
                            c.classList.remove('pass');
                            c.classList.add('fail');
                        }
                        break;
                    case PASSWORD_VALIDATION.SYMBOL:
                        match = password.match(/[^0-9a-zA-Z]+/g);
                        if (match) {
                            match = match.join('');
                        }
                        if (match && match.length >= count) {
                            c.classList.remove('fail');
                            c.classList.add('pass');
                        } else {
                            c.classList.remove('pass');
                            c.classList.add('fail');
                        }
                        break;
                    case PASSWORD_VALIDATION.NUMBER:
                        match = password.match(/[0-9]+/g);
                        if (match) {
                            match = match.join('');
                        }
                        if (match && match.length >= count) {
                            c.classList.remove('fail');
                            c.classList.add('pass');
                        } else {
                            c.classList.remove('pass');
                            c.classList.add('fail');
                        }
                        break;
                }
                if (!c.classList.contains('pass')) {
                    pass = false;
                }
            }
        }
        holder.pass = pass;
    };

    const postValidatePassword = function(holder) {
        let validation_list = findChild(holder, PASSWORD_VALIDATION_ID);
        let children = validation_list.children;
        let pass = true;

        for (let i = 0; i < children.length; i++) {
            let c = children[i];
            if (c.validation) {
                if (!c.classList.contains('pass')) {
                    pass = false;
                }
            }
        }
        return pass;
    };

    const togglePasswordOnSight = function(e) {
        const button = e.currentTarget;
        const password = button.previousElementSibling;
        if (password) {
            const type =
                password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            if (type == 'password') {
                button.classList.remove('sight');
            } else {
                button.classList.add('sight');
            }
            password.focus();
        }
    };

    const triggerConfirmEmail = function(e) {
        if (loading) return;
        const button = e.currentTarget;
        const holder = button.parentElement;
        continueConfirmUser(holder.parentElement);
    };

    const triggerMagicLinkCancel = function(e) {
        if (loading) return;
        const button = e.currentTarget;
        const holder = button.parentElement;
        switchLogin(holder);
    }

    const triggerConfirmCancel = function(e) {
        if (loading) return;
        const button = e.currentTarget;
        const holder = button.parentElement;
        removeLocalEmail();
        switchLogin(holder);
    };

    const triggerReset = function(e) {
        if (loading) return;
        const button = e.currentTarget;
        const holder = button.parentElement;
        if (!button.classList.contains('disabled')) {
            continueResetPassword(holder);
        }
    };
    const triggerResetCancel = function(e) {
        if (loading) return;
        const button = e.currentTarget;
        const holder = button.parentElement;
        switchLogin(holder);
    };

    const triggerResetRePasswordKeyup = function(e) {
        if (loading) return;
        const input = e.srcElement;
        const holder = input.parentElement.parentElement;
        if (e.code != 'Tab' && e.code != 'Enter') {
            cleanError(input);
            validateResetPassword(holder);
        }
        validateResetPasswordForm(holder);
        if (e.code != 'Enter') {
            return;
        }
        continueResetPassword(holder);
    };

    const triggerResetPasswordKeyup = function(e) {
        if (loading) return;
        const input = e.srcElement;
        const holder = input.parentElement.parentElement;
        if (e.code != 'Tab' && e.code != 'Enter') {
            cleanError(input);
            validateResetPassword(holder);
        }
        validateResetPasswordForm(holder);
        if (e.code != 'Enter') {
            return;
        }
        const module = findChild(holder, FORM.RE_PASSWORD);
        const next = findChild(module, FORM.PASSWORD);
        if (next) {
            next.focus();
        }
    };

    const validateResetPassword = function(holder) {
        const password = findChild(findChild(holder, FORM.PASSWORD), FORM.PASSWORD);
        const repassword = findChild(findChild(holder, FORM.RE_PASSWORD), FORM.PASSWORD);

        const validation_holder = findChild(holder, PASSWORD_VALIDATION_ID);

        validationPassword(validation_holder, password.value, repassword.value);
    };

    const validateResetPasswordForm = function(holder) {
        let pass = postValidatePassword(holder);

        let button = findChild(holder, FORM.RESET_PASSWORD);
        if (pass) {
            button.classList.remove('disabled');
        } else {
            if (!button.classList.contains('diabled')) {
                button.classList.add('disabled');
            }
        }
    };

    const triggerForgot = function(e) {
        if (loading) return;
        const button = e.currentTarget;
        const holder = button.parentElement;
        const top = holder.parentElement;
        top.parentElement.classList.add('forgot');
    };

    const triggerExpireBack = function(e) {
        if (loading) return;
        const button = e.currentTarget;
        const holder = button.parentElement;
        const top = holder.parentElement.parentElement;
        top.classList.remove('expire');
        removeChild(top, EXPIRE_ID);
        showPopupTitle(top, true);
    };

    const triggerForgotBack = function(e) {
        if (loading) return;
        const button = e.currentTarget;
        const holder = button.parentElement;
        const top = holder.parentElement.parentElement;
        top.classList.remove('forgot');
    };

    const triggerExpireConfirm = function(e) {
        if (loading) return;
        const button = e.currentTarget;
        const holder = button.parentElement.parentElement;
        const form_holder = findChild(holder, EXPIRE_FORM_ID);
        continueForgotEmail(form_holder, true);
    };

    const triggerForgotConfirm = function(e) {
        if (loading) return;
        const button = e.currentTarget;
        const holder = button.parentElement.parentElement;
        const form_holder = findChild(holder, FORGOT_FORM_ID);
        continueForgotEmail(form_holder);
    };

    const triggerExpireConfirmKeyup = function(e) {
        if (loading) return;
        const input = e.srcElement;
        const holder = input.parentElement;
        cleanError(input);
        if (e.code != 'Enter') {
            return;
        }
        continueForgotEmail(holder, true);
    };

    const triggerForgotConfirmKeyup = function(e) {
        if (loading) return;
        const input = e.srcElement;
        const holder = input.parentElement;
        cleanError(input);
        if (e.code != 'Enter') {
            return;
        }
        continueForgotEmail(holder);
    };

    const triggerRegisterPasswordKeyup = function(e) {
        if (loading) return;
        const input = e.srcElement;
        const holder = input.parentElement.parentElement;
        if (e.code != 'Tab' && e.code != 'Enter') {
            cleanError(input);
            validateRegisterPassword(holder);
        }
        validateRegisterForm(holder);
        if (e.code != 'Enter') {
            return;
        }
        const module = findChild(holder, FORM.RE_PASSWORD);
        const next = findChild(module, FORM.PASSWORD);
        if (next) {
            next.focus();
        }
    };

    const triggerRegisterCompleteKeyup = function(e) {
        if (loading) return;
        const input = e.srcElement;
        const holder = input.parentElement.parentElement;
        if (e.code != 'Tab' && e.code != 'Enter') {
            cleanError(input);
            validateRegisterPassword(holder);
        }
        validateRegisterForm(holder);
        if (e.code != 'Enter') {
            return;
        }
        continueRegister(holder);
    };

    const validateRegisterPassword = function(holder) {
        const password = findChild(findChild(holder, FORM.PASSWORD), FORM.PASSWORD);
        const repassword = findChild(findChild(holder, FORM.RE_PASSWORD), FORM.PASSWORD);

        const validation_holder = findChild(holder, PASSWORD_VALIDATION_ID);

        validationPassword(validation_holder, password.value, repassword.value);
    };

    const validateRegisterForm = function(holder) {
        let pass = postValidatePassword(holder);

        const fname_input = findChild(findChild(holder, FORM.FIRST_NAME), FORM.FIRST_NAME);
        const lname_input = findChild(findChild(holder, FORM.LAST_NAME), FORM.LAST_NAME);

        if (fname_input.value.length == 0) {
            pass = false;
        }

        if (lname_input.value.length == 0) {
            pass = false;
        }

        let button = findChild(holder, FORM.REGISTER);
        if (pass) {
            button.classList.remove('disabled');
        } else {
            if (!button.classList.contains('diabled')) {
                button.classList.add('disabled');
            }
        }
    };

    const triggerRegisterComplete = function(e) {
        if (loading) return;
        const button = e.currentTarget;
        const holder = button.parentElement;
        if (!button.classList.contains('disabled')) {
            continueRegister(holder);
        }
    };

    const triggerFirstNameKeyup = function(e) {
        if (loading) return;
        const input = e.srcElement;
        const holder = input.parentElement.parentElement;
        if (e.code != 'Tab' && e.code != 'Enter') {
            cleanError(input);
        }
        validateRegisterForm(holder);
        if (e.code != 'Enter') {
            return;
        }
        const next = findChild(holder, FORM.LAST_NAME);
        if (next) {
            next.focus();
        }
    };

    const triggerLastNameKeyup = function(e) {
        if (loading) return;
        const input = e.srcElement;
        const holder = input.parentElement.parentElement;
        if (e.code != 'Tab' && e.code != 'Enter') {
            cleanError(input);
        }
        validateRegisterForm(holder);
        if (e.code != 'Enter') {
            return;
        }
        const module = findChild(holder, FORM.PASSWORD);
        const next = findChild(module, FORM.PASSWORD);
        if (next) {
            next.focus();
        }
    };

    const triggerFirstNameBlur = function(e) {
        const input = e.srcElement;
        const holder = input.parentElement;
        if (input.value.length == 0) {
            insertError(input, Locale.ERROR.EMPTY_FIRST_NAME.MESSAGE);
        }
    };
    const triggerLastNameBlur = function(e) {
        const input = e.srcElement;
        const holder = input.parentElement;
        if (input.value.length == 0) {
            insertError(input, Locale.ERROR.EMPTY_LAST_NAME.MESSAGE);
        }
    };

    const triggerAlertConfirm = function(e) {
        if (loading) return;
        const button = e.currentTarget;
        const holder = button.parentElement;
        const top = holder.parentElement;
        top.removeChild(holder);
        top.classList.remove('alert');
    };

    const triggerSwitchLogin = function(e) {
        if (loading) return;
        const button = e.currentTarget;
        const holder = button.parentElement;
        removeLocalEmail();
        switchLogin(holder.parentElement);
    };

    const triggerPasswordKeyup = function(e) {
        if (loading) return;
        const input = e.srcElement;
        const holder = input.parentElement.parentElement;
        cleanError(input);
        if (e.code != 'Enter') {
            return;
        }
        continueEmailAndPassword(holder);
    };

    const continueBasicEmailLookupModule = function(module) {
        const holder = module.parentElement;
        continueEmailLookup(holder, true);
    }

    const continueEmailLookupModule = function(module) {
        const holder = module.parentElement;
        continueEmailLookup(holder);
    }

    const continueEmailLookup = function(holder, basic) {

        const module = findChild(holder, MODULE_EMAIL_DISCOVERY);
        const button_holder = findChild(holder, BUTTON_HOLDER_ID);
        const email_input = findChild(module, FORM.EMAIL);
        let email = email_input.email ? email_input.email : email_input.value;

        let pass = true;
        let top = holder.parentElement;

        cleanError(email_input);
        if (!val.isEmail(email)) {
            pass = false;
            alert = Locale.ERROR.VALID_EMAIL;
            insertError(email_input, alert.MESSAGE);
            if (basic && findChild(holder, BUTTON_HOLDER_ID)) {
                highlightEmailForm(holder, button_holder, true);
            }
        }

        if (pass) {
            if (basic) {
                highlightEmailForm(holder, button_holder);
            }
            loader.start(holder, false, true, false);
            loading = true;
            enterDiscovery(email, top.classList.contains(ID) ? holder : holder.parentElement, email_input);
        }
    };

    const triggerIncognitoMoreOptions = function(button, holder) {
        console.log('triggerIncognitoMoreOptions');
        if (holder.classList.contains('less-content')) {
            holder.classList.remove('less-content');
            showMoreIDP(holder.parentElement);
        } else {
            holder.classList.add('less-content');
        }
    };

    const convertMoreOptions = function(button) {
        button.onclick = function() {
        };
        button.classList.add(CONTIUNUE_WITH_EMAIL_ID);
        button.innerText = Locale.BUTTON.CONTINUE_WITH_EMAIL;
    };

    const checkRegistration = function(holder, res) {
        formEntry(REGISTER_FORM);
        let invite_required = res.settings.invite_required;
        let discovery_required = res.settings.discovery_required;
        let password_settings = res.settings.password_settings;
        let password_enabled = password_settings && password_settings.enabled;
        // console.log(res);
        // goRegistration(holder, res);
        if (!invite_required && !discovery_required && password_enabled) {
            goAdvanceRegistration(holder, res);
        } else {
            goRegistration(holder, res);
        }
    }

    const goAdvanceRegistration = function(holder, response) {
        showPopupTitle(holder, false);
        // console.log('goRegistration');
        let email_address = getLocalEmail();
        let top = holder.parentElement;
        let register_container = view.addView(REGISTER_ID);
        let header = getHeaderModule(Locale.REGISTER.TITLE, Locale.REGISTER.CONTENT);
        register_container.appendChild(header);
        register_container.appendChild(getEmail(email_address, true));

        let {
            list,
            suggested_list,
            suggested,
            local
        } = processProviders(response, true);

        let opt = {
            button_theme: OPTS.button_theme,
            suggested: suggested,
            email_address: email_address,
            register: true
        };

        if (list || local) {
            cleanChild(top);
            top.appendChild(register_container);
        }

        if (list && local) {
            let button_holder = view.addView(BUTTON_HOLDER_ID);
            if (list.length == 1 && !suggested) {
                suggested = list[0].type;
                suggested_list = [list[0]];
            }
            if (suggested && suggested != 'local') {
                let button_holder2 = view.addView(BUTTON_HOLDER_ID);
                button_holder2.classList.add('register-suggested');
                let opt2 = Object.assign({}, opt);
                opt2.button_theme = false;
                let {container, error} = viewButton.getButtonLists(
                    suggested_list,
                    opt2
                );
                button_holder2.append(container);
                register_container.append(button_holder2);
            } else {
                let buttons = viewButton.getButtonLists(list, opt);
                const container_main = buttons.container;
                if (list.length > 1) {
                    button_holder.append(container_main);
                } else if (!suggested) {
                    button_holder.append(container_main);
                }
                if (button_holder.children.length != 0) {
                    register_container.appendChild(button_holder);
                }
            }


            let or_local = getParagraph(Locale.REGISTER.OR_LOCAL);
            register_container.appendChild(or_local);

            getLocalRegistrationContainer(register_container);

            insertSwitchLogin(register_container, false, true);
        } else if (local) {
            goLocalRegistration(top);
        }
    };

    const goRegistration = function(holder, response) {
        showPopupTitle(holder, false);
        // console.log('goRegistration');
        let email_address = getLocalEmail();
        let top = holder.parentElement;
        let register_container = view.addView(REGISTER_ID);
        let header = getHeaderModule(Locale.REGISTER.TITLE, Locale.REGISTER.CONTENT);
        register_container.appendChild(header);
        register_container.appendChild(getEmail(email_address, true));

        let {
            list,
            suggested_list,
            suggested,
            local
        } = processProviders(response, true);
        let theme = OPTS.button_theme;

        // let overflow = false;
        // console.log(top);
        let continue_with_count = list.length;
        // console.log(gap);
        if ((window.innerHeight - (continue_with_count * 46) - 500) <= 0) {
            theme = 'round-icons';
        }

        let opt = {
            button_theme: theme,
            suggested: suggested,
            email_address: email_address,
            register: true
        };

        if (list || local) {
            cleanChild(top);
            top.appendChild(register_container);
        }

        if (list) {
            let button_holder = view.addView(BUTTON_HOLDER_ID);
            if (list.length == 1 && !suggested) {
                suggested = list[0].type;
                suggested_list = [list[0]];
            }
            if (suggested && suggested != 'local') {
                let button_holder2 = view.addView(BUTTON_HOLDER_ID);
                button_holder2.classList.add('register-suggested');
                let opt2 = Object.assign({}, opt);
                opt2.button_theme = false;
                let {container, error} = viewButton.getButtonLists(
                    suggested_list,
                    opt2
                );
                button_holder2.append(container);
                register_container.append(button_holder2);
                if (list.length > 1) {
                    button_holder.append(getParagraph(Locale.BUTTON.USE_DIFFERENT_IDP));
                }
            } else {
                button_holder.append(getParagraph(Locale.BUTTON.SELECT_IDP_SIGN_UP));
            }
            let buttons = viewButton.getButtonLists(list, opt);
            const container_main = buttons.container;
            if (list.length > 1) {
                button_holder.append(container_main);
            } else if (!suggested) {
                button_holder.append(container_main);
            }

            if (local) {
                let more = getMoreSignupModuleOptions(function(e) {
                    goLocalRegistration(top);
                });
                button_holder.appendChild(more);
            }

            if (button_holder.children.length != 0) {
                register_container.appendChild(button_holder);
            }

            insertSwitchLogin(register_container, false, true);
        } else if (local) {
            goLocalRegistration(top);
        }
    };

    const goLocalRegistration = function(top, pin) {
        let local = view.applyData(top, {});
        if (!pin && local.pin) {
            pin = local.pin;
        }
        let email_address = getLocalEmail();
        // let top = holder.parentElement;

        let register_container = view.addView(REGISTER_HOLDER_ID);

        let header = getHeaderModule(Locale.REGISTER.TITLE, Locale.REGISTER.CONTENT_2);
        register_container.appendChild(header);
        register_container.appendChild(getEmail(email_address, true));
        if (pin) {
            register_container.appendChild(getToken(pin));
        }
        register_container.appendChild(getFirstName());
        register_container.appendChild(getLastName());

        let pwd = getPasswordModule(triggerRegisterPasswordKeyup, Locale.PLACEHOLDER.PASSWORD);
        pwd.classList.add(FORM.PASSWORD);
        register_container.appendChild(pwd);
        let rpwd = getPasswordModule(triggerRegisterCompleteKeyup, Locale.PLACEHOLDER.CONFIRM_PASSWORD);
        rpwd.classList.add(FORM.RE_PASSWORD);
        register_container.appendChild(rpwd);

        register_container.appendChild(passwordValidationList(true));
        register_container.appendChild(getRegisterButton(triggerRegisterComplete));
        insertSwitchLogin(register_container, false, true);

        cleanChild(top);
        top.appendChild(register_container);

    };

    const getLocalRegistrationContainer = function(register_container) {
        register_container.appendChild(getFirstName());
        register_container.appendChild(getLastName());

        let pwd = getPasswordModule(triggerRegisterPasswordKeyup, Locale.PLACEHOLDER.PASSWORD);
        pwd.classList.add(FORM.PASSWORD);
        register_container.appendChild(pwd);
        let rpwd = getPasswordModule(triggerRegisterCompleteKeyup, Locale.PLACEHOLDER.CONFIRM_PASSWORD);
        rpwd.classList.add(FORM.RE_PASSWORD);
        register_container.appendChild(rpwd);

        register_container.appendChild(passwordValidationList(true));
        register_container.appendChild(getRegisterButton(triggerRegisterComplete));
        return register_container;
    };

    const alertLocalRegisterConfirmationComplete = function(e) {
        if (loading) return;
        const button = e.currentTarget;
        const holder = button.parentElement;
        const top = holder.parentElement;
        top.classList.remove('alert');
        if (button.classList.contains('form-alert-confirm')) {
            top.removeChild(holder);
            goLocalRegistration(top.parentElement);
        } else {
            top.removeChild(holder);
        }
    };

    const alertLocalRegisterConfirmation = function(e) {
        if (loading) return;
        const button = e.currentTarget;
        const holder = button.parentElement;
        let provider = '';
        if (providers_hash[button.suggested]) {
            provider = providers_hash[button.suggested].name;
        }
        showAlert(
            holder.parentElement,
            Locale.ERROR.NON_LOCAL_LOGIN,
            {
                provider: provider,
            },
            alertLocalRegisterConfirmationComplete
        );
    };

    const goLogin = function(holder, response) {
        formEntry(LOGIN_FORM);
        showPopupTitle(holder, false);
        triggerOnLogin(holder, response);
        let email_address = getLocalEmail();
        let top = holder.parentElement;

        let login_container = view.addView(LOGIN_ID);
        let header = getHeaderModule(Locale.LOGIN.TITLE);
        updateTitle(header);
        login_container.appendChild(header);
        login_container.appendChild(getEmail(email_address, true));


        let {
            list,
            suggested_list,
            suggested,
            local
        } = processProviders(response);

        if (list || local) {
            cleanChild(top);
            top.appendChild(login_container);
        }

        if (local) {
            login_container.appendChild(
                getPasswordModule(triggerPasswordKeyup, Locale.PLACEHOLDER.PASSWD)
            );
            let forgotform = forgotForm(email_address);
            top.appendChild(forgotform);
        }

        if (suggested == 'local' || (!list && local)) {

            formEntry(LOCAL_LOGIN_FORM);
            login_container.classList.add('local-login');
            const next = findChild(login_container, FORM.PASSWORD);
            if (next) {
                next.focus();
            }
        }

        let opt = {
            button_theme: false,
            suggested: suggested,
            email_address: email_address,
        };

        if (list) {
            let button_holder = view.addView(BUTTON_HOLDER_ID);
            button_holder.classList.add('login-provider');
            // console.log(response);
            // console.log(suggested_list);
            if (response.user_profile && suggested_list.length) {
                if (response.user_profile.profile_image_url) {
                    suggested_list[0].profile_image_url = response.user_profile.profile_image_url;
                }
                if (response.user_profile.first_name) {
                    suggested_list[0].alias = response.user_profile.first_name;
                }
            }
            let buttons = viewButton.getButtonLists(
                suggested_list,
                opt
            );
            buttons.container.classList.add('suggested-list');
            buttons.container.classList.add('bb-collapsed');
            button_holder.append(buttons.container);

            buttons = viewButton.getButtonLists(list, opt);
            let container_main = buttons.container;
            container_main.classList.add('collapsible');
            container_main.classList.add('hide');
            if (suggested) {
                container_main.classList.add(suggested);
            }

            if (list.length > 1 || (list.length == 1 && local)) {

                addMoreInSuggest(button_holder);
                //
                // let continue_with = getParagraph(Locale.BUTTON.CONTINUE_WITH);
                // continue_with.classList.add('no-local');
                // login_container.appendChild(continue_with);
                //

                addPopupEvent(top, 'scrolling', function() {
                    triggerCollapse(button_holder);
                });
            }
            button_holder.append(container_main);
            login_container.appendChild(button_holder);
            if (local) {
                let localButton;
                if (suggested == 'local') {
                    switchLocalLogin(container_main);
                    container_main.classList.add('suggest-local');
                    updateSuggestionToLocal(button_holder);
                } else {
                    insertSwitchLogin(login_container);
                }

                localButton = viewButton.buttons(local, opt);
                container_main.appendChild(localButton);
                if (response.user_profile && !response.user_profile.has_password) {
                    localButton.suggested = suggested;
                    localButton.onclick = alertLocalRegisterConfirmation;
                } else {
                    localButton.onclick = triggerLocalInListLogin;
                }
            } else {
                insertSwitchLogin(login_container);
            }
        } else {
            if (local) {
                let button_holder = view.addView(BUTTON_HOLDER_ID);
                let {
                    container,
                    error,
                } = viewButton.getButtonLists([], opt);
                container.classList.add('suggested-list');
                container.classList.add('bb-collapsed');
                container.classList.add('bb-local-only');
                button_holder.append(container);

                login_container.appendChild(button_holder);
                updateSuggestionToLocal(button_holder);
                insertSwitchLogin(login_container, true);
            } else {
                let alert = Locale.ERROR.NO_PROVIDER;
                showAlert(top, alert, false, triggerAlertConfirm);
            }
        }
        login_container.appendChild(getModuleDropdown(expandingIcons));
    };

    const switchLocalLogin = function(holder) {
        showPopupTitle(holder, false);
        if (loading) return;
        const top = holder.parentElement.parentElement;
        for (let i = 0; i < providers_list.length; i++) {
            holder.classList.remove(providers_list[i]);
        }
        holder.classList.add('local');
        let button_holder = holder.parentElement;
        let message = findChild(button_holder, FORM.MESSAGE);
        if (message) {
            message.classList.add('hide');
        }
        let collapsible = findChild(button_holder, 'collapsible');
        if (collapsible) {
            collapsible.classList.add('hide');
        }
        let suggested = findChild(button_holder, 'suggested-list');
        if (suggested) {
            suggested.classList.add('bb-collapsed');
        }

        insertSwitchLogin(top, true);
        top.classList.add('local-login');

        const module_password = findChild(top, MODULE_PASSWORD);
        if (module_password) {
            const next = findChild(module_password, FORM.PASSWORD);
            if (next) {
                next.focus();
            }
        }
    };

    const processProviders = function(res, register) {
        let list = [];
        let suggested_list = [];
        let suggested = false;
        let local = false;

        if (res && res.suggested_provider) {
            if (providers_hash[res.suggested_provider.idp]) {
                suggested_list.push(
                    res.suggested_provider
                );
            }
            suggested = res.suggested_provider.idp;
        }

        if (res && res.providers) {
            for (let i = 0; i < res.providers.length; i++) {
                let provider = res.providers[i];
                if (providers_hash[provider.idp]) {
                    list.push(provider);
                }
            }
        }

        if (res && res.settings &&
            res.settings.password_settings &&
            res.settings.password_settings.enabled) {
            local = providers_hash[providers.LOCAL];
        }

        if (!register && !suggested) {
            if (res && res.user_profile && res.user_profile.has_password) {
                suggested = providers.LOCAL;
                if (local) {
                    suggested_list.push(local);
                } else {
                    suggested = false;
                }
            }

            if (!suggested && list.length) {
                suggested = list[0].idp;
                if (providers_hash[suggested]) {
                    suggested_list.push(providers_hash[suggested]);
                }
            }
        }


        if (list.length === 0) {
            list = false;
        }

        // console.log({
        //     list,
        //     suggested_list,
        //     suggested,
        //     local
        // });
        return {
            list,
            suggested_list,
            suggested,
            local
        }
    };

    const isAdvanceDiscovery = function(res) {
        let invite_required = res.settings.invite_required;
        let discovery_required = res.settings.discovery_required;
        return !invite_required && !discovery_required && hasProviders(res);
    }

    const showPopupTitle = function(container, show) {
        let adjustHeader = view.getData(container, 'adjustHeader');
        if (typeof adjustHeader == 'function') {
            adjustHeader(show);
        }
    };

    const triggerOnLogin = function(container, res) {
        let onLogin = view.getData(container, 'onLogin');
        if (typeof onLogin == 'function') {
            onLogin(isAdvanceDiscovery(res));
        }
    }

    const addPopupEvent = function(container, event, func) {
        // console.log(container);
        let addEvent = view.getData(container, 'addEvent');
        // console.log(addEvent);
        if (typeof addEvent == 'function') {
            addEvent(event, func);
        }
    }

    const triggerOnBlur = function(container, height) {
        let onBlur = view.getData(container, 'onBlur');
        if (typeof onBlur == 'function') {
            onBlur(height);
        }
        return onBlur;
    }


    const isContinueWith = function(container) {
        let isContinueWith = view.getData(container, 'isContinueWith');
        //console.log(isContinueWith);
        return isContinueWith;
    }

    this.addForm = addForm;
    this.addRegister = addRegister;
    this.addReset = addReset;
    this.addMagicLink = addMagicLink;
    this.addConfirm = addConfirm;
    this.deIdentification = deIdentification;

    this.showAlert = showAlert;
    this.checkProviders = checkProviders;
    this.init = init;

}
export default VIEWFORM;
