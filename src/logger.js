
import {
    DEV
} from './dev.json';

const debug = function() {
    let newlist = [];
    for(let i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] != 'object') {
            newlist.push('%c' + arguments[i]);
            newlist.push("color:green");
        } else {
            newlist.push(arguments[i]);
        }
    }
    if (DEV) {
        console.log.apply(null, newlist);
    }
}

export default {
    debug
};