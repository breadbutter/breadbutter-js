import * as en from './locale/en.json';
import * as fr from './locale/fr.json';
import * as zhtw from './locale/zh-TW.json';
import * as es from './locale/es.json';
import * as pt from './locale/pt.json';
import * as bg from './locale/bg.json';

const Locale = {
    en,
    fr,
    'zh-TW': zhtw,
    es,
    pt,
    bg
};

const assignString = function (locale, local) {
    for (let key in local) {
        if (typeof local[key] == 'object') {
            locale[key] = assignString(locale[key], local[key]);
        } else {
            locale[key] = local[key];
        }
    }
    return locale;
};

const getLocale = function (lang, local) {
    if (!Locale[lang]) {
        lang = 'en';
    }
    let locale = Object.assign({}, Locale['en']);
    if (lang != 'en') {
        locale = Object.assign(locale, Locale[lang]);
    }
    delete locale['default'];
    if (locale && local) {
        locale = assignString(locale, local);
    }
    return locale;
};

const replace = function (data, strings) {
    data = data ? data : {};
    var key,
        new_string = strings;
    for (var index in data) {
        key = '%' + index.toUpperCase() + '%';
        new_string = new_string.replace(new RegExp(key, 'g'), data[index]);
    }
    return new_string;
};

export default {
    getLocale,
    replace,
};
