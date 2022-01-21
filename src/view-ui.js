const ID = 'breadbutter-ui-widget';
import './scss/view-ui.scss';
import view from './view.js';
import lang from './locale.js';

let Locale = {};
let APP_ID = false;

const init = function (options) {
    loadAppId(options);
    loadLanguage(options);
};

const loadAppId = function(options) {
    if (options['app_id']) {
        APP_ID = options['app_id'];
    }
};

const loadLanguage = function (options) {
    let locale = lang.getLocale(options.language, options.locale);
    if (locale) {
        Locale = locale;
    }
};

const getDefaultAvatar = function() {
  return `<svg data-v-84d03bbe="" class="default-avatar-svg" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g data-name="Group 6439"><g data-name="Group 6438" transform="translate(-329 -2158)"><g data-name="Group 3232"><g data-name="Group 438"><g data-name="Ellipse 64" transform="translate(329 2158)" fill="#fff" stroke="#d0d8e2"><circle cx="20" cy="20" r="20" stroke="none"></circle><circle cx="20" cy="20" r="19.5" fill="none"></circle></g></g></g><circle data-name="Ellipse 571" cx="7" cy="7" r="7" transform="translate(342 2167)" fill="#d0d8e2"></circle><path data-name="Path 2398" d="M348.935 2182c-7.815 0-14.447 2.356-16.935 5.643a19.476 19.476 0 0 0 33.87 0c-2.488-3.287-9.12-5.643-16.935-5.643z" fill="#d0d8e2"></path></g></g></svg>`;
};

const getLoginWidget = function() {
    return `
    
    <div class="breadbutter-ui-profile-widget-container bb-signout">
        <div class="breadbutter-ui-profile-widget">
            <div class="breadbutter-ui-profile-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17 9.761v-4.761c0-2.761-2.238-5-5-5-2.763 0-5 2.239-5 5v4.761c-1.827 1.466-3 3.714-3 6.239 0 4.418 3.582 8 8 8s8-3.582 8-8c0-2.525-1.173-4.773-3-6.239zm-8-4.761c0-1.654 1.346-3 3-3s3 1.346 3 3v3.587c-.927-.376-1.938-.587-3-.587s-2.073.211-3 .587v-3.587zm3 17c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zm2-6c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2z"/></svg>
            </div>
            <div class="breadbutter-ui-profile-name">${Locale.UI.SIGNUP_IN}</div>
        </div>
    </div>
    `;
}

const getProfileWidget = function(profile, suggested) {
    let first_name = profile.first_name ? profile.first_name : false;
    if (!first_name) {
        first_name = profile.email_address.split('@')[0];
    }
    let welcome = lang.replace({
        first_name: first_name
    }, Locale.UI.HELLO);
    let avatar = profile.profile_image_url ? profile.profile_image_url : false;
    let full_name = profile.first_name ? ((profile.first_name + " " + (profile.last_name ? profile.last_name : "")).trim()) : false;

    if (!full_name) {
        full_name = profile.email_address.split('@')[0];
    }
    let avatar_style = "";
    let default_avatar = "";
    if (avatar) {
        avatar_style = 'style="background-image:url(' + avatar + '); border:none;"';
    } else {
        default_avatar = getDefaultAvatar();
    }

    let provider = view.svgIcons((suggested && suggested.idp) ? suggested.idp : 'local');
    return `
    <div class="breadbutter-ui-profile-widget-container">
        <div class="breadbutter-ui-profile-widget">
            <div class="breadbutter-ui-profile-avatar" ${avatar_style}>${default_avatar}</div>
            <div class="breadbutter-ui-profile-name">${welcome}</div>
            <div class="breadbutter-ui-profile-dropdown"></div>
        </div>
        <div class="breadbutter-ui-profile-dashboard">
            <div class="breadbutter-ui-profile-dashboard-content">
                <div class="breadbutter-ui-profile-dashboard-header">
                    <div class="breadbutter-ui-profile-dashboard-title">
                    ${Locale.UI.SIGN_IN_TITLE}
                    </div>
                    <div class="breadbutter-ui-profile-dashboard-detail">
                        <div class="breadbutter-ui-profile-dashboard-provider">
                        ${provider}                        
                        </div>
                        <div class="breadbutter-ui-profile-dashboard-avatar"  ${avatar_style}>
                        ${default_avatar}
                        </div>
                        <div class="breadbutter-ui-profile-dashboard-profile">
                            <div class="breadbutter-ui-profile-dashboard-name">
                            ${full_name}
                            </div>
                            <div class="breadbutter-ui-profile-dashboard-email">
                            ${profile.email_address}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="breadbutter-ui-profile-dashboard-footer">
                    <button class="breadbutter-ui-profile-dashboard-logout-button">
                    ${Locale.UI.SIGN_OUT}
                    </button>
                </div>
            </div>
            <div class="breadbutter-ui-profile-arrow">
            </div>
        </div>
    </div>
    `;
}


export default {
    init,
    getLoginWidget,
    getProfileWidget
};
