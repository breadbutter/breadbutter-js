
let EVENTS = false;

let ctime = false;
const content = {
    m: 0,
    s: 0,
    c: 0
};

const TIMER_TIMEOUT = 10000;
let timer_count = 0;
let timer_timeout_durations = [1, 1, 1, 2, 2, 5, 5, 5]
let ga_data = false;
let segment_anonymous_id = false;

const FOCUS_TIMER = 10000;
const FOCUS_DURATION = 60000;
let focus_time = 0;
let focus_counter = 0;

const udpateFocusTimer = function() {
    let now = Date.now();
    focus_counter = now;
    // console.log('reset focus counter:', new Date());
    if (!focus_time) {
        // console.log('update focus timer:', new Date());
        focus_time = now;
    }
}

let last_total_engagement = 0;
let engagement_timer = false;
const initEngagementTimer = function() {
    if (engagement_timer === false) {
        last_total_engagement += 1;
        engagement_timer = setTimeout(()=> {
            engagement_timer = false;
        }, 1000);
    }
}

const handleMouseMove = function(event) {
    udpateFocusTimer();
    initEngagementTimer();
    startTimer();
    let x = event.movementX ? event.movementX : 0;
    let y = event.movementY ? event.movementY : 0;
    content.m += Math.sqrt(x*x + y*y);
};

const handleMouseClick = function(event) {
    udpateFocusTimer();
    initEngagementTimer();
    startTimer();
    content.c++;

};

const checkScrolling = function(target) {
    udpateFocusTimer();
    initEngagementTimer();
    if (target == document) {
        // console.log('document');
        return (target.documentElement.scrollTop + target.documentElement.offsetHeight) == target.documentElement.scrollHeight ? false : target.documentElement.scrollTop;
    } else if (target == document.body) {
        // console.log('body');
        return (target.scrollTop + target.offsetHeight) == target.scrollHeight ? false : target.scrollTop;
    } else if (typeof target.scrollTop != 'undefined') {
        if ((target.scrollTop + target.offsetHeight) == target.scrollHeight) {
            // console.log('loop into.');
            return checkScrolling(target.parentElement);
        } else {
            // console.log('has scrolling');
            return target.scrollTop;
        }
    } else {
        // console.log('empty');
        return false;
    }
};

let last_scroll = false;
const handleMouseScroll = function(event) {
    // console.log('scrolling');
    startTimer();
    let scroll_now = checkScrolling(event.target);
    if (event.target == document) {
        scroll_now = window.scrollY;
    }
    // console.log(event.target, scroll_now);
    if (last_scroll !== false) {
        content.s += Math.abs(scroll_now - last_scroll);
        if (content.s) {
            if (((document.body.scrollTop + document.body.offsetHeight) / document.body.scrollHeight) >= 0.9) {
                content.st = true;
            } else {
                delete content.st;
            }
        }
    }
    last_scroll = scroll_now;
};

const handleBrowserFocus = function() {
    // console.log('browser focus', document.visibilityState);
    switch(document.visibilityState) {
        case 'hidden':
            sendContent();
            break;
        case 'visible':
            resetFocus();
            resetContent();
            startTimer();
            break;
    }
};

const hasContent = function() {
    let c =  content.c || content.m || content.s;
    const now = Date.now();
    let focusing = (now - focus_counter) < FOCUS_DURATION;
    if (focusing && focus_time) {
        c = true;
    }
    if (!focusing) {
        // console.log('clean focus timer');
        focus_time = false;
    }
    return c || ga_data || segment_anonymous_id;
}

const sendContent = function() {
    clearTimeout(content_timer);
    if (ctime && hasContent()) {
        EVENTS.engagement(getContent());
    }
    ctime = false;
};

const getContent = function() {
    const now = Date.now();
    const _default = {
        c: 0,
        s: 0,
        m: 0
    };
    let obj = Object.assign({}, {
        ...content
    });
    // obj.t = Math.round((now - ctime) / 1000);
    obj.t = last_total_engagement;
    obj.s = Math.round(obj.s);
    obj.m = isNaN(obj.m) ? 0 : Math.round(Number(obj.m));

    last_total_engagement = 0;

    if (ga_data !== false) {
        obj.ga_data = ga_data;
    }

    if (segment_anonymous_id !== false) {
        obj.segment_anonymous_id = segment_anonymous_id;
    }

    let focusing = (now - focus_counter) < FOCUS_DURATION;
    if (focusing && focus_time) {
        obj.f = Math.round((now - focus_time) / 1000);
        focus_time = now;
        // console.log('send data and set focus timer:', new Date());
    } else {
        focus_time = false;
    }

    let c =  content.c || content.m || content.s;
    if (c) {
        //reset focus when movement
        // console.log('reset focus counter:', new Date());
        focus_counter = now;
    }

    return obj
};

const resetFocus = function() {
    // console.log('reset focus:', new Date());

    // console.log('reset focus timer:', new Date());
    // console.log('reset focus counter:', new Date());
    focus_time = Date.now();
    focus_counter = Date.now();
}

let content_timer = false;
const resetContent = function() {
    content.m = 0;
    content.s = 0;
    content.c = 0;
    if (ga_data !== false && (Date.now() - 1000) > ga_data_timer) {
        ga_data_timer = false;
        ga_data = false;
    }
    if (segment_anonymous_id !== false && (Date.now() - 1000) > segment_timer) {
        segment_timer = false;
        segment_anonymous_id = false;
    }
    delete content.st;
};

const parseCookie = (str) => {
    if (!str) {
        return {};
    }
    return str
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});
};

const getGAdata = function() {
    if (typeof ga == 'function' && typeof ga.getAll == 'function') {
        WAIT_FOR_GA = false;
        NO_GA = false;
        ga.getAll().forEach((tracker) => {
            let cid = tracker.get('clientId');
            let uid = tracker.get('userId');
            ga_data =  {
                "cid": cid,
                "uid": uid
            };
            ga_data_timer = Date.now();
        })
    } else if (NO_GA) {
        let cookie = parseCookie(document.cookie);
        if (cookie['_ga']) {
            let client_id = cookie['_ga'].split('.').slice(2).join('.');
            NO_GA = false;
            ga_data =  {
                "cid": client_id
            };
            ga_data_timer = Date.now();
        }
    }
};

const getSegment = async () => {
    try {
        const results = analytics && await analytics.identify();
        const anonymousId = results && results.event && results.event.anonymousId || false;
        if (anonymousId) {
            segment_anonymous_id = anonymousId;
            segment_timer = Date.now();
        }
    } catch (e) {

    }
};

let ga_data_timer = false;
let segment_timer = false;

const startTimer = function() {
    if (!ctime) {
        resetContent();
        if (WAIT_FOR_GA || (NO_GA && timer_count < 4)) {
            getGAdata();
        }
        if (WAIT_SEGMENT && timer_count < 4) {
            getSegment();
        }
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
let WAIT_FOR_GA = false;
let NO_GA = false;
let WAIT_SEGMENT = false;

const initialize = function(events, wait_for_ga, no_ga, wait_segment) {
    WAIT_FOR_GA = wait_for_ga;
    NO_GA = no_ga;
    WAIT_SEGMENT = wait_segment;
    if (!EVENTS) {
        EVENTS = events;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('click', handleMouseClick);
        document.addEventListener('scroll', handleMouseScroll);
        document.addEventListener('onscroll', handleMouseScroll);
        let mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";
        document.addEventListener(mousewheelevt, handleMouseScroll)
        document.addEventListener('visibilitychange', handleBrowserFocus);
        handleBrowserFocus();
    }
}

export default {
    initialize
};
