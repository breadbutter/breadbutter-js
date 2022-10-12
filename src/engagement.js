
let EVENTS = false;

let ctime = false;
const content = {
    m: 0,
    s: 0,
    c: 0
};

const TIMER_TIMEOUT = 10000;
let timer_count = 0;
let timer_timeout_durations = [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2]

const handleMouseMove = function(event) {
    startTimer();
    let x = event.movementX ? event.movementX : 0;
    let y = event.movementY ? event.movementY : 0;
    content.m += Math.sqrt(x*x + y*y);
};

const handleMouseClick = function(event) {
    startTimer();
    content.c++;
};

let last_scroll = false;
const handleMouseScroll = function(event) {
    startTimer();
    let scroll_now = event.target.scrollTop ? event.target.scrollTop : (event.target.scrollingElement ? event.target.scrollingElement.scrollTop : 0);
    if (event.target == document) {
        scroll_now = window.scrollY;
    }
    if (last_scroll !== false) {
        content.s += Math.abs(scroll_now - last_scroll);
    }
    last_scroll = scroll_now;
};

const handleBrowserFocus = function() {
    switch(document.visibilityState) {
        case 'hidden':
            sendContent();
            break;
        case 'visible':
            resetContent();
            startTimer();
            break;
    }
};

const hasContent = function() {
    return content.c || content.m || content.s;
}

const sendContent = function() {
    clearTimeout(content_timer);
    if (ctime && hasContent()) {
        EVENTS.engagement(getContent());
    }
    ctime = false;
};

const getContent = function() {
    const _default = {
        c: 0,
        s: 0,
        m: 0
    };
    let obj = Object.assign({}, {
        ...content
    });
    obj.t = Math.round((Date.now() - ctime) / 1000);
    obj.s = Math.round(obj.s);
    obj.m = isNaN(obj.m) ? 0 : Math.round(Number(obj.m));
    return obj
};

let content_timer = false;
const resetContent = function() {
    content.m = 0;
    content.s = 0;
    content.c = 0;

};

const startTimer = function() {
    if (!ctime) {
        resetContent();
        ctime = Date.now();
        let time = TIMER_TIMEOUT;
        if (typeof timer_timeout_durations[timer_count] != 'undefined') {
            time = timer_timeout_durations[timer_count++] * 1000;
        }
        content_timer = setTimeout(()=> {
            sendContent();
            resetContent();
            startTimer();
        }, time);
    }
}

const initialize = function(events) {
    if (!EVENTS) {
        EVENTS = events;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('click', handleMouseClick);
        document.addEventListener('scroll', handleMouseScroll);
        document.addEventListener('visibilitychange', handleBrowserFocus);
        handleBrowserFocus();
    }
}

export default {
    initialize
};
