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

    if (!full_name && profile.email_address) {
        full_name = profile.email_address.split('@')[0];
    }
    let avatar_style = "";
    let default_avatar = "";
    if (avatar) {
        avatar_style = 'style="background-image:url(' + avatar + '); border:none;"';
    } else {
        default_avatar = getDefaultAvatar();
    }
    let email_address = profile.email_address ? profile.email_address : "";

    let provider = view.svgIcons((suggested && suggested.idp) ? suggested.idp : 'local');
    let font = 'font16';
    let container_width = '';
    if (welcome.length > 17) {
        if (welcome.length > 22) {
            container_width = 'bb-wider-2';
        } else if (welcome.length > 21) {
            container_width = 'bb-wider-1';
        } else if (welcome.length > 19) {
            container_width = 'bb-wider';
        }
        font = 'font10';
    } else if (welcome.length > 16) {
        font = 'font11';
    } else if (welcome.length > 15) {
        font = 'font12';
    } else if (welcome.length > 14) {
        font = 'font13';
    } else if (welcome.length > 13) {
        font = 'font14';
    } else if (welcome.length > 12) {
        font = 'font15';
    } else {
        font = 'font16';
    }
    return `
    <div class="breadbutter-ui-profile-widget-container ${container_width}">
        <div class="breadbutter-ui-profile-widget">
            <div class="breadbutter-ui-profile-avatar" ${avatar_style}>${default_avatar}</div>
            <div class="breadbutter-ui-profile-name ${font}"><span>${welcome}</span></div>
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
                            ${email_address}
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
let newsletter_index = 0;

const getNewsletterWidget = function({ image_source, header_text, main_text, success_text, profile, verified, custom_event_code }) {
    let holder = 'breadbutter-ui-newsletter-holder-' + newsletter_index++;
    let title = header_text ? header_text : Locale.UI.NEWSLETTER_TITLE;
    let subtitle = main_text ? main_text : Locale.UI.NEWSLETTER_SUBTITLE;
    let loggedin_text = success_text ? success_text : Locale.UI.NEWSLETTER_THANK;
    let image_url = image_source ? image_source : getDefaultBackground();

    let cache = false;
    let viewed = false;
    if (localStorage) {
        let cached = checkEventStorage(custom_event_code);
        if (cached == getViewedCode(custom_event_code)) {
            viewed = true;
        } else if (cached != custom_event_code) {
            cache = false;
        } else {
            cache = true;
        }
    }

    if (viewed) {
        return false;
    }

    let html = `
    <div class="breadbutter-ui-newsletter-widget-container">
        <div class="breadbutter-ui-newsletter-background" style="background-image:url(${image_url})">
        </div>
        <div class="breadbutter-ui-newsletter-dashboard">`;
    if (verified) {
        if (cache) {
            let name = profile.first_name;
            loggedin_text = lang.replace({NAME: name}, loggedin_text);
            html += `        <div class="breadbutter-ui-newsletter-text">${loggedin_text}</div>`;
            viewedEventStorage(custom_event_code);
        } else {
            html += `<div class="breadbutter-ui-newsletter-title">
            ${title}
            </div>
            <div class="breadbutter-ui-newsletter-subtitle">
            ${subtitle}
            </div>
            <div class="breadbutter-ui-newsletter-subscribe">${Locale.UI.NEWSLETTER_SUBSCRIBE}</div>`;
        }
    } else {
        html += `<div class="breadbutter-ui-newsletter-title">
            ${title}
            </div>
            <div class="breadbutter-ui-newsletter-subtitle">
            ${subtitle}
            </div>`;
            html += `<div class="breadbutter-ui-newsletter-content" id="${holder}"></div>`;
    }
    html += `
        </div>
    </div>
    `;
    return {
        index: holder,
        html
    };
}

const CACHE_STORAGE = {
    DEVICE_ID: 'breadbutter-sdk-device-id',
    SUCCESS_EVENT_CODE: 'breadbutter-sdk-success-event-code',
    LAST_SUCCESS_EVENT_CODE: 'breadbutter-sdk-last-success-event-code'
};


const checkEventStorage = function(custom_event_code) {
    let event = false;
    if (localStorage) {
        let EVENT = CACHE_STORAGE.LAST_SUCCESS_EVENT_CODE + '-' + btoa(custom_event_code);
        event = localStorage.getItem(EVENT);
    }
    return event;
};
const timeoutViewedEvent = {};

const updateViewedEvent = function(data) {
    if (localStorage) {
        let EVENT = CACHE_STORAGE.LAST_SUCCESS_EVENT_CODE + '-' + btoa(data);
        localStorage.setItem(EVENT, getViewedCode(data));
    }
}


const viewedEventStorage = function(data) {
    if (timeoutViewedEvent[data]) {
        clearTimeout(timeoutViewedEvent[data]);
    }
    timeoutViewedEvent[data] = setTimeout(()=> {
        updateViewedEvent(data);
    }, 1000);
}
const getViewedCode = function(data) {
    return data + '_VIEWED';
}


const getDefaultBackground = () => {
    return `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQ1LjAyNCIgaGVpZ2h0PSIyMTAuMDc5IiB2aWV3Qm94PSIwIDAgMjQ1LjAyNCAyMTAuMDc5Ij4KICA8ZGVmcz4KICAgIDxjbGlwUGF0aCBpZD0iY2xpcC1wYXRoIj4KICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZV8zNzg1IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAzNzg1IiB3aWR0aD0iMjI1Ljc2NCIgaGVpZ2h0PSIxMzAuNjY0IiBmaWxsPSJub25lIi8+CiAgICA8L2NsaXBQYXRoPgogICAgPGNsaXBQYXRoIGlkPSJjbGlwLXBhdGgtMiI+CiAgICAgIDxwYXRoIGlkPSJQYXRoXzE0MzUzIiBkYXRhLW5hbWU9IlBhdGggMTQzNTMiIGQ9Ik02MC4zNSw4NS4wNjZsMTgxLjQwNywyMy4yNjdMODEuOTM3LDYyLjM0NFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02MC4zNSAtNjIuMzQ0KSIgZmlsbD0ibm9uZSIvPgogICAgPC9jbGlwUGF0aD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibGluZWFyLWdyYWRpZW50IiB4MT0iLTAuMjQ1IiB5MT0iMS44NDUiIHgyPSItMC4yNCIgeTI9IjEuODQ1IiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2Q5ZmNmZiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNlMmRmZGUiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8Y2xpcFBhdGggaWQ9ImNsaXAtcGF0aC00Ij4KICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZV8zNzgxIiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAzNzgxIiB3aWR0aD0iOTMuNzM1IiBoZWlnaHQ9IjYxLjQ4NiIgZmlsbD0ibm9uZSIvPgogICAgPC9jbGlwUGF0aD4KICAgIDxjbGlwUGF0aCBpZD0iY2xpcC1wYXRoLTUiPgogICAgICA8cGF0aCBpZD0iUGF0aF8xNDM1NyIgZGF0YS1uYW1lPSJQYXRoIDE0MzU3IiBkPSJNMCwxNDMuMzg5bDIyNS43NjUtMjMuNDE0TDM1LjI2MiwxMDYuMjhaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIC0xMDYuMjgpIiBmaWxsPSJub25lIi8+CiAgICA8L2NsaXBQYXRoPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXItZ3JhZGllbnQtMiIgeDE9IjAiIHkxPSIxLjQxNiIgeDI9IjAuMDAzIiB5Mj0iMS40MTYiIHhsaW5rOmhyZWY9IiNsaW5lYXItZ3JhZGllbnQiLz4KICA8L2RlZnM+CiAgPGcgaWQ9Ikdyb3VwXzE1ODk1IiBkYXRhLW5hbWU9Ikdyb3VwIDE1ODk1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzI5OC4xOTYgMjEyLjQwNykiPgogICAgPGcgaWQ9Ikdyb3VwXzE1ODkzIiBkYXRhLW5hbWU9Ikdyb3VwIDE1ODkzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMzIyLjg3OCAtNTkuNzQ5KSByb3RhdGUoLTE2KSIgb3BhY2l0eT0iMC4wMzQiPgogICAgICA8cGF0aCBpZD0iUGF0aF8xNDM2MCIgZGF0YS1uYW1lPSJQYXRoIDE0MzYwIiBkPSJNNDMuNDI0LDY4LjkxNmwxNDAuOTI3LTMyLjE4TDM0LjEsMTcuNDY1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMi42NDUgMS4zNTUpIi8+CiAgICAgIDxwYXRoIGlkPSJQYXRoXzE0MzYxIiBkYXRhLW5hbWU9IlBhdGggMTQzNjEiIGQ9Ik01MS45NzYsMCwzNC4xLDE4LjgxOSwxODQuMzUxLDM4LjA5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMi42NDUgMCkiLz4KICAgICAgPHBhdGggaWQ9IlBhdGhfMTQzNjIiIGRhdGEtbmFtZT0iUGF0aCAxNDM2MiIgZD0iTTAsNTUuNTU5LDE4NywzNi4xNjYsMjkuMjA2LDI0LjgyMloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMS45MjUpIi8+CiAgICA8L2c+CiAgICA8ZyBpZD0iR3JvdXBfMTU4OTQiIGRhdGEtbmFtZT0iR3JvdXAgMTU4OTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMyOTguMTk2IC0xNzMuMjAzKSByb3RhdGUoLTEwKSI+CiAgICAgIDxnIGlkPSJHcm91cF8xNTg4MCIgZGF0YS1uYW1lPSJHcm91cCAxNTg4MCIgY2xpcC1wYXRoPSJ1cmwoI2NsaXAtcGF0aCkiPgogICAgICAgIDxwYXRoIGlkPSJQYXRoXzE0MzUyIiBkYXRhLW5hbWU9IlBhdGggMTQzNTIiIGQ9Ik03MS42MTIsMTU1LjM3NmwxNzAuMTQ1LTM4Ljg1Mkw2MC4zNSw5My4yNTdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTUuOTkyIC0yNC43MTEpIiBmaWxsPSIjYWJhYmFiIi8+CiAgICAgICAgPGcgaWQ9Ikdyb3VwXzE1ODcwIiBkYXRhLW5hbWU9Ikdyb3VwIDE1ODcwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NC4zNTggNDUuODI0KSI+CiAgICAgICAgICA8ZyBpZD0iR3JvdXBfMTU4NjkiIGRhdGEtbmFtZT0iR3JvdXAgMTU4NjkiIGNsaXAtcGF0aD0idXJsKCNjbGlwLXBhdGgtMikiPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlXzM3NzkiIGRhdGEtbmFtZT0iUmVjdGFuZ2xlIDM3NzkiIHdpZHRoPSIxODEuNDA3IiBoZWlnaHQ9IjQ1Ljk4OSIgZmlsbD0idXJsKCNsaW5lYXItZ3JhZGllbnQpIi8+CiAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMzc4MCIgZGF0YS1uYW1lPSJSZWN0YW5nbGUgMzc4MCIgd2lkdGg9Ijk1LjY3NyIgaGVpZ2h0PSI2Ny43NjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDY5LjgzOCA0MS42NDYpIHJvdGF0ZSgtMjApIiBmaWxsPSIjZjRlYWM3Ii8+CiAgICAgICAgPGcgaWQ9Ikdyb3VwXzE1ODc1IiBkYXRhLW5hbWU9Ikdyb3VwIDE1ODc1Ij4KICAgICAgICAgIDxnIGlkPSJHcm91cF8xNTg3NCIgZGF0YS1uYW1lPSJHcm91cCAxNTg3NCIgY2xpcC1wYXRoPSJ1cmwoI2NsaXAtcGF0aCkiPgogICAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8xNDM1NCIgZGF0YS1uYW1lPSJQYXRoIDE0MzU0IiBkPSJNMTIzLjA1OSwxMTYuOTY3bDIuMzUzLDYuNDY0LDQ0Ljk1NC0xNi4zNjIsNDQuOTU0LTE2LjM2MS0yLjM1My02LjQ2NGExMy4xNTYsMTMuMTU2LDAsMCwwLTEwLjA3Ni04LjQ1N2wtNDEuMzEyLTcuMjkyQTkuODY4LDkuODY4LDAsMCwwLDE1Mi4zLDcxLjg3bC0yNi45NTksMzIuMTRhMTMuMTU3LDEzLjE1NywwLDAsMC0yLjI4NCwxMi45NTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMi4zOTggLTE4LjExKSIgZmlsbD0iI2Y5ZjJkNyIvPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXBfMTU4NzMiIGRhdGEtbmFtZT0iR3JvdXAgMTU4NzMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDY5LjgzNyA4LjkyMikiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogc29mdC1saWdodDtpc29sYXRpb246IGlzb2xhdGUiPgogICAgICAgICAgICAgIDxnIGlkPSJHcm91cF8xNTg3MiIgZGF0YS1uYW1lPSJHcm91cCAxNTg3MiI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXBfMTU4NzEiIGRhdGEtbmFtZT0iR3JvdXAgMTU4NzEiIGNsaXAtcGF0aD0idXJsKCNjbGlwLXBhdGgtNCkiPgogICAgICAgICAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8xNDM1NSIgZGF0YS1uYW1lPSJQYXRoIDE0MzU1IiBkPSJNMTg3LjY3NSwxOS43bC0yLjc1My03LjU2MkwxMzkuOTY5LDI4LjUsOTUuMDE1LDQ0Ljg2M2wyLjc1Myw3LjU2MkExNi4wMzMsMTYuMDMzLDAsMCwwLDEwOC41MDcsNjIuN2w0Mi41MzEsMTAuNjQzYTguNjQzLDguNjQzLDAsMCwwLDkuMjc2LTMuMzc3bDI1Ljc0LTM1LjQ5MkExNi4wMzIsMTYuMDMyLDAsMCwwLDE4Ny42NzUsMTkuNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTk1LjAxNSAtMTIuMTM4KSIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8xNDM1NiIgZGF0YS1uYW1lPSJQYXRoIDE0MzU2IiBkPSJNMTg3LjI3NSwxOC42bC0yLjM1My02LjQ2NEwxMzkuOTY5LDI4LjUsOTUuMDE1LDQ0Ljg2MmwyLjM1Myw2LjQ2NGExMy4xNTgsMTMuMTU4LDAsMCwwLDEwLjA3Nyw4LjQ1N2w0MS4zMTIsNy4yOTJhOS44NjgsOS44NjgsMCwwLDAsOS4yNzYtMy4zNzdsMjYuOTYtMzIuMTRBMTMuMTU4LDEzLjE1OCwwLDAsMCwxODcuMjc1LDE4LjYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNS4xNzcgLTMuMjE2KSIgZmlsbD0iI2Y5ZjJkNyIvPgogICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgICAgICA8ZyBpZD0iR3JvdXBfMTU4NzciIGRhdGEtbmFtZT0iR3JvdXAgMTU4NzciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgNzguMTE4KSI+CiAgICAgICAgICA8ZyBpZD0iR3JvdXBfMTU4NzYiIGRhdGEtbmFtZT0iR3JvdXAgMTU4NzYiIGNsaXAtcGF0aD0idXJsKCNjbGlwLXBhdGgtNSkiPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlXzM3ODMiIGRhdGEtbmFtZT0iUmVjdGFuZ2xlIDM3ODMiIHdpZHRoPSIyMjUuNzY1IiBoZWlnaHQ9IjM3LjEwOSIgZmlsbD0idXJsKCNsaW5lYXItZ3JhZGllbnQtMikiLz4KICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICAgICAgPGcgaWQ9Ikdyb3VwXzE1ODc5IiBkYXRhLW5hbWU9Ikdyb3VwIDE1ODc5Ij4KICAgICAgICAgIDxnIGlkPSJHcm91cF8xNTg3OCIgZGF0YS1uYW1lPSJHcm91cCAxNTg3OCIgY2xpcC1wYXRoPSJ1cmwoI2NsaXAtcGF0aCkiPgogICAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8xNDM1OCIgZGF0YS1uYW1lPSJQYXRoIDE0MzU4IiBkPSJNMjI2LjA1OSwxNC4wMzZBMTQuMDM2LDE0LjAzNiwwLDEsMSwyMTIuMDIzLDBhMTQuMDM2LDE0LjAzNiwwLDAsMSwxNC4wMzYsMTQuMDM2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTIuNDYzKSIgZmlsbD0iI2ZmNDUyNyIvPgogICAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8xNDM1OSIgZGF0YS1uYW1lPSJQYXRoIDE0MzU5IiBkPSJNMjE0LjcxOCwyMy4zNTJhLjQ1Ny40NTcsMCwwLDEtLjExOC0uMzIzVjExLjk4M2wtMy4yOTEsMi41MjZhLjQ0Mi40NDIsMCwwLDEtLjI5My4xMTguNDM0LjQzNCwwLDAsMS0uMzMzLS4ybC0uNDctLjYwOGEuNDY1LjQ2NSwwLDAsMS0uMS0uMjczLjQxNi40MTYsMCwwLDEsLjItLjM1M2w0LjI1LTMuMjkxYS45MzQuOTM0LDAsMCwxLC41MDktLjEzN2guOTIxYS40MzUuNDM1LDAsMCwxLC40NS40NTFWMjMuMDI5YS40MzUuNDM1LDAsMCwxLS40NS40NTFoLS45NjFhLjQuNCwwLDAsMS0uMzEyLS4xMjciIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01NS42NzcgLTIuNTg5KSIgZmlsbD0iI2ZmZiIvPgogICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgICAgPC9nPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==`;
}

const getNewsletterPopupWidget = ({ image_source, header_text, main_text, success_text, profile, verified, custom_event_code }) => {
    let holder = 'breadbutter-ui-newsletter-holder-' + newsletter_index++;
    let title = header_text ? header_text : Locale.UI.NEWSLETTER_TITLE;
    let subtitle = main_text ? main_text : Locale.UI.NEWSLETTER_SUBTITLE;
    let loggedin_text = success_text ? success_text : Locale.UI.NEWSLETTER_THANK;
    let image_url = image_source ? image_source : getDefaultBackground();

    let cache = false;
    let viewed = false;
    if (localStorage) {
        let cached = checkEventStorage(custom_event_code);
        if (cached == getViewedCode(custom_event_code)) {
            viewed = true;
        } else if (cached != custom_event_code) {
            cache = false;
        } else {
            cache = true;
        }
    }

    if (viewed) {
        return false;
    }


    let html = `
    <div class="breadbutter-ui-newsletter-widget-container">
       <div class="breadbutter-ui-newsletter-widget-close">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 40" style="enable-background:new 0 0 40 40;" xml:space="preserve">
<g>
<path class="st0" d="M27.26,15.54l-4.36,4.46l4.36,4.46c0.8,0.82,0.8,2.15,0,2.97c-0.8,0.82-2.1,0.82-2.9,0L20,22.97l-4.36,4.46
c-0.8,0.82-2.1,0.82-2.9,0c-0.8-0.82-0.8-2.15,0-2.97l0,0L17.1,20l-4.36-4.46c-0.8-0.82-0.8-2.15,0-2.97c0.8-0.82,2.1-0.82,2.9,0
L20,17.03l4.36-4.46c0.8-0.82,2.1-0.82,2.9,0C28.06,13.39,28.06,14.72,27.26,15.54L27.26,15.54z"></path>
</g>
</svg></div>
<div class="breadbutter-ui-newsletter-holder">
        <div class="breadbutter-ui-newsletter-background" style="background-image:url(${image_url})">
        </div>
        <div class="breadbutter-ui-newsletter-dashboard">`;
    if (verified) {
        if (cache) {
            let name = profile.first_name;
            loggedin_text = lang.replace({NAME: name}, loggedin_text);
            html += `        <div class="breadbutter-ui-newsletter-text">${loggedin_text}</div>`;
            viewedEventStorage(custom_event_code);
        } else {
            html += `<div class="breadbutter-ui-newsletter-title">
            ${title}
            </div>
            <div class="breadbutter-ui-newsletter-subtitle">
            ${subtitle}
            </div>
            <div class="breadbutter-ui-newsletter-subscribe">${Locale.UI.NEWSLETTER_SUBSCRIBE}</div>`;
        }
    } else {
        html += `<div class="breadbutter-ui-newsletter-title">
            ${title}
            </div>
            <div class="breadbutter-ui-newsletter-subtitle">
            ${subtitle}
            </div>`;
        html += `<div class="breadbutter-ui-newsletter-content" id="${holder}"></div>`;
    }
    html += `
</div>
        </div>
    </div>
    `;
    return {
        index: holder,
        html
    };
};

export default {
    init,
    getLoginWidget,
    getProfileWidget,
    getNewsletterWidget,
    getNewsletterPopupWidget
};
