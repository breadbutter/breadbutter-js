/**
 * Logon Labs Javascript API client
 */

const clientdefault = require('./client.js');
const client = clientdefault.default;

const bb = new (function () {
    let me = this;
    me.init = false;
    me.configure = client.configure;
    me.getProfile = client.api.getProfile;
    me.identifyUser = client.api.identifyUser;
    me.ping = client.api.ping;
    me.api = client.api;
    me.ui = client.ui;
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
    if (w['breadbutterQueue'] && w['breadbutterQueue'].length) {
        for(let i = 0; i < w['breadbutterQueue'].length; i++) {
            if (typeof w['breadbutterQueue'][i] == 'function') {
                w['breadbutterQueue'][i]()
            }
        }
    }
    bb.init = true;
})(window);

module.exports = bb;
module.exports.breadbutter = bb;
