const providers = {
    APPLE: 'apple',
    BASECAMP: 'basecamp',
    DROPBOX: 'dropbox',
    FACEBOOK: 'facebook',
    FITBIT: 'fitbit',
    GITHUB: 'github',
    GOOGLE: 'google',
    LINKEDIN: 'linkedin',
    MICROSOFT: 'microsoft',
    OKTA: 'okta',
    ONELOGIN: 'onelogin',
    PLANNINGCENTER: 'planningcenter',
    QUICKBOOKS: 'quickbooks',
    SLACK: 'slack',
    TWITCH: 'twitch',
    TWITTER: 'twitter',
    KEYKCLOAK: 'keycloak',
    SALESFORCE: 'salesforce',
    LOCAL: 'local',
};

const LOCAL = {
    idp: providers.LOCAL,
    name: 'Local',
};

const APPLE = {
    idp: providers.APPLE,
    name: 'Apple',
};
const BASECAMP = {
    idp: providers.BASECAMP,
    name: 'Basecamp',
};
const DROPBOX = {
    idp: providers.DROPBOX,
    name: 'Dropbox',
};
const FACEBOOK = {
    idp: providers.FACEBOOK,
    name: 'Facebook',
};
const FITBIT = {
    idp: providers.FITBIT,
    name: 'Fitbit',
};
const GITHUB = {
    idp: providers.GITHUB,
    name: 'Github',
};
const GOOGLE = {
    idp: providers.GOOGLE,
    name: 'Google',
};
const LINKEDIN = {
    idp: providers.LINKEDIN,
    name: 'LinkedIn',
};
const MICROSOFT = {
    idp: providers.MICROSOFT,
    name: 'Microsoft',
};
const OKTA = {
    idp: providers.OKTA,
    name: 'Okta',
};
const ONELOGIN = {
    idp: providers.ONELOGIN,
    name: 'onelogin',
};
const PLANNINGCENTER = {
    idp: providers.PLANNINGCENTER,
    name: 'planning center',
};
const QUICKBOOKS = {
    idp: providers.QUICKBOOKS,
    name: 'QuickBooks',
};
const SLACK = {
    idp: providers.SLACK,
    name: 'Slack',
};
const TWITCH = {
    idp: providers.TWITCH,
    name: 'Twitch',
};
const TWITTER = {
    idp: providers.TWITTER,
    name: 'Twitter',
};
const KEYCLOAK = {
    idp: providers.KEYCLOAK,
    name: 'Keycloak',
};
const SALESFORCE = {
    idp: providers.SALESFORCE,
    name: 'SalesForce',
};

const providers_hash = {
    apple: APPLE,
    basecamp: BASECAMP,
    dropbox: DROPBOX,
    facebook: FACEBOOK,
    fitbit: FITBIT,
    github: GITHUB,
    google: GOOGLE,
    linkedin: LINKEDIN,
    microsoft: MICROSOFT,
    okta: OKTA,
    onelogin: ONELOGIN,
    planningcenter: PLANNINGCENTER,
    quickbooks: QUICKBOOKS,
    slack: SLACK,
    twitch: TWITCH,
    twitter: TWITTER,
    keycloak: KEYCLOAK,
    salesforce: SALESFORCE,
    local: LOCAL,
};

const providers_buttons = {
    APPLE: APPLE,
    BASECAMP: BASECAMP,
    DROPBOX: DROPBOX,
    FACEBOOK: FACEBOOK,
    FITBIT: FITBIT,
    GITHUB: GITHUB,
    GOOGLE: GOOGLE,
    LINKEDIN: LINKEDIN,
    MICROSOFT: MICROSOFT,
    OKTA: OKTA,
    ONELOGIN: ONELOGIN,
    PLANNINGCENTER: PLANNINGCENTER,
    QUICKBOOKS: QUICKBOOKS,
    SLACK: SLACK,
    TWITCH: TWITCH,
    TWITTER: TWITTER,
    KEYCLOAK: KEYCLOAK,
    SALESFORCE: SALESFORCE,
    LOCAL: LOCAL,
};

const providers_list = [];
for (let key in providers) {
    providers_list.push(providers[key]);
}

const event_type = {
    AUTHENTICATION: 'authentication',
    IDENTITY_CONVERSATION: 'identity_conversion',
    VERIFIED_CONVERSATION: 'verified_conversion',
    CUSTOM: 'custom',
    PAGE_VIEW: 'page_view',
    FAILED_AUTHENTICATION: 'failed_authentication',
};

const mode = {
    RESET_PASSWORD: 'resetpassword',
    CONFIRM_EMAIL: 'confirmemail',
    INVITATION: 'invitation',
    MAGIC_LINK: 'magiclink',
    DEIDENTIFICATION: 'deidentification'
};

const encoded_action = {
    TARGET: "action_code",
    TYPE: "m",
    APP_ID: "a",
    PIN: "p",
    EMAIL: "e"
};

const encoded_hash = {
    'reset_password': 'resetpassword',
    'confirm_email': 'confirmemail',
    'invitation': 'invitation',
    'deidentification': 'deidentification'
}

const gateway_emails = {
    TYPE: "action",
    EMAIL: "email",
    APP_ID: "app_id",
    PIN: "pin"
};

const gateway_hash = {
    'reset_password': 'resetpassword',
    'confirm_email': 'confirmemail',
    'invitation': 'invitation',
    'deidentification': 'deidentification'
}

const magic_link_code = 'magic_link_code';

const html_attributes = {
    control: {
        VERIFIED: 'verified',
        NOT_VERIFIED: '!verified',
        FORM: 'form',
        SUBMIT: 'submit',
        NAME: 'name',
        FIRST_NAME: 'first_name',
        LAST_NAME: 'last_name',
        EMAIL: 'email',
    },
    VISIBLE_CONTROL: 'bb-visible-control',
    CONTINUE_WITH_SHOW: 'bb-continue-widget-show',
    PAGE_CONTROL: 'bb-page-control',
    PAGE_REDIRECT: 'bb-page-redirect',
    FORM_CONTROL: 'bb-form-control',
    FORM_EVENT: 'bb-form-event-submission',
    PROFILE_WIDGET: 'bb-profile-widget',
    HIDDEN_DIV: 'bb-hidden-div'
};

export default {
    html_attributes,
    encoded_hash,
    encoded_action,
    gateway_hash,
    gateway_emails,
    providers,
    providers_buttons,
    providers_hash,
    providers_list,
    event_type,
    mode,
    magic_link_code
};
