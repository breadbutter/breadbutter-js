import lang from './locale';
import view from './view';

const ALERT_ID = 'breadbutter-alert';

const FORM = {
    TITLE: 'form-title',
    MESSAGE: 'form-message',
    ALERT_CONFIRM: 'form-alert-confirm',
    ALERT_CONFIRM_2: 'form-alert-confirm-2',
};

const showAlert = function (top, alert, params, callbacks) {
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

const getTitle = function (text) {
    let b = view.addBlock('div', FORM.TITLE);
    b.innerHTML = text;
    return b;
};

const getParagraph = function (text) {
    let b = view.addBlock('div', FORM.MESSAGE);
    b.innerHTML = text;
    return b;
};

const getButton = function (text, id, cb) {
    let b = view.addBlock('button', id);
    b.innerText = text;
    if (cb) {
        b.onclick = cb;
    }
    return b;
};

const triggerAlertConfirm = function (e) {
    const button = e.currentTarget;
    const holder = button.parentElement;
    const top = holder.parentElement;
    top.removeChild(holder);
    top.classList.remove('alert');
};

export default {
    showAlert,
};
