/**
 * Logon Labs Javascript API client
 */

const clientdefault = require('./client.js');
const client = clientdefault.default;

const bb = new (function () {
    let me = this;
    me.configure = client.configure;
    me.getProfile = client.api.getProfile;
    me.ping = client.api.ping;
    me.api = client.api;
    // me.ui = client.ui;
    me.events = client.events;
    me.providers = client.providers;
    me.providersButtons = client.providers_buttons;
    me.widgets = client.widgets;
    me.mode = client.mode;
    client.initialize();
})();

(function (w) {
    w['BreadButter'] = bb;
    w['LogonClient'] = bb;
    if (w['logonAsync']) {
        w['logonAsync']();
    }
    if (w['spreadButter']) {
        w['spreadButter']();
    }
    if (w['initBreadButter']) {
        w['initBreadButter']();
    }
    if (w['launchBreadButter']) {
        w['launchBreadButter']();
    }
})(window);

module.exports = bb;
module.exports.breadbutter = bb;
