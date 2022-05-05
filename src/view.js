const ID = 'breadbutter-ui';
import './scss/view.scss';

import lang from './locale.js';
let Locale = {};
let DOM_DATA = {};
let APP_ID = false
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

const cleanChild = function (holder) {
    while (holder.firstChild) {
        holder.removeChild(holder.lastChild);
    }
};

const applyData = function(container, data){
    let holder = container.closest('.' + ID);
    if (holder) {
        let uuid = holder.uuid;
        if (uuid && DOM_DATA[uuid]) {
            let content = DOM_DATA[uuid];
            for (let key in content) {
                if (typeof content[key] != 'undefined') {
                    data[key] = content[key];
                }
            }
        }
    }
    return data;
}

const getData = function(container, key){
    let holder = container.closest('.' + ID);
    let data = false;
    if (holder) {
        let uuid = holder.uuid;
        if (uuid && DOM_DATA[uuid]) {
            let content = DOM_DATA[uuid];
            data = content[key];
        }
    }
    return data;
}

const unsetData = function(container, key){
    let holder = container.closest('.' + ID);
    if (holder) {
        let uuid = holder.uuid;
        if (uuid && DOM_DATA[uuid]) {
            let content = DOM_DATA[uuid];
            delete content[key];
        }
    }
}

const setData = function(holder, options) {
    holder.uuid = uuidv4();
    DOM_DATA[holder.uuid] = {
        client_data: options.client_data,
        destination_url: options.destination_url,
        callback_url: options.callback_url,
        force_reauthentication: options.force_reauthentication,
        success_event_code: options.success_event_code,
        pin: options.pin,
        adjustHeader: options.adjustHeader,
        onLogin: options.onLogin,
        onBlur: options.onBlur,
        onProvider: options.onProvider,
        addEvent: options.addEvent,
        isContinueWith: options.isContinueWith,
        forceQuit: options.forceQuit
    };
};

const initView = function (id, options, container, error) {
    init(options);
    // loadLanguage(options);

    let holder = addView();
    setData(holder, options);
    let element = findElement(id);
    holder.appendChild(container);
    holder.options = options;
    // container.appendChild(footer());
    if (element) {
        cleanChild(element);
        element.appendChild(holder);
    } else {
        error = `target element "${id}" does not exist`;
    }

    if (!error) {
        if (typeof options.onCreated == 'function') {
            options.onCreated(holder, options);
        }
    } else {
        if (typeof options.onError == 'function') {
            options.onError(holder, error);
        } else {
            throw new Error(error);
        }
    }
    return element;
};

const findElement = function (id) {
    let element;
    if (typeof id == 'string') {
        if (id.indexOf('.') == -1) {
            element = document.getElementById(id);
        } else {
            element = document.querySelector(id);
        }
    } else {
        element = id;
    }
    return element;
};

const addView = function (id) {
    if (!id) id = ID;
    const container = document.createElement('div');
    container.classList.add(id);
    return container;
};

const addBlock = function (type, cls) {
    const container = document.createElement(type);
    if (cls) {
        container.classList.add(cls);
    }
    return container;
};

const addButton = function (cls) {
    const container = document.createElement('div');
    container.classList.add('bb-button');
    if (cls) {
        container.classList.add(cls);
    }
    return container;
};

const messages = function (msg) {
    var div = document.createElement('div');
    div.className = 'message';
    div.innerHTML = msg;
    return div;
};

const footer = function () {
    var ul = document.createElement('ul');
    ul.className = 'footer';
    var lists = [
        {
            class: 'key',
            text: 'We keep it private',
        },
        {
            class: 'shield',
            text: 'Share only with permission',
        },
        {
            class: 'clock',
            text: 'Quick sign in - no passwords',
        },
    ];
    for (var i = 0; i < lists.length; i++) {
        var li = document.createElement('li');
        var span = document.createElement('span');
        span.innerHTML = lists[i].text;
        var icon = document.createElement('span');
        icon.innerHTML = svgFooters(lists[i].class);

        li.appendChild(icon);
        li.appendChild(span);
        ul.appendChild(li);
    }
    return ul;
};

const svgFooters = function (type) {
    var html = '';
    switch (type) {
        case 'key':
            html =
                '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
                ' <g>' +
                '  <path stroke="null" transform="rotate(45 12.821775436401367,12.844497680664062) " id="svg_1" d="m13.656138,15.612955l1.246405,0c0.279642,0.00799 0.543305,-0.095877 0.743049,-0.295622l0.743049,-0.743049l0.591243,0.591243c0.455417,0.463407 1.198466,0.479386 1.669863,0.023969c0.00799,-0.00799 0.01598,-0.01598 0.023969,-0.023969l0,0l0.591243,-0.591243l0.743049,0.743049c0.199744,0.199744 0.463407,0.295622 0.743049,0.295622l0.950783,0c0.247683,-0.00799 0.487376,-0.119847 0.663151,-0.295622l1.917546,-1.917546c0.303611,-0.335571 0.303611,-0.838926 0,-1.174497l0,0l-1.917546,-1.917546c-0.167785,-0.175775 -0.407479,-0.287632 -0.663151,-0.295622l-8.109621,0c-1.565996,-3.259828 -5.472996,-4.634069 -8.740814,-3.076063c-3.259828,1.565996 -4.634069,5.472996 -3.076063,8.740814c1.565996,3.259828 5.472996,4.634069 8.740814,3.076063c1.342282,-0.639182 2.428892,-1.725791 3.076063,-3.076063l0.063918,-0.063918zm-11.185685,-2.796421c-0.143816,-2.924258 2.101311,-5.409078 5.025568,-5.552893c2.356984,-0.119847 4.514223,1.334292 5.281241,3.56344c0.095877,0.239693 0.327581,0.383509 0.591243,0.36753l8.397253,0l1.621924,1.621924l-1.621924,1.621924l-0.894855,0l-0.950783,-0.950783c-0.263663,-0.303611 -0.735059,-0.327581 -1.046661,-0.063918c-0.023969,0.01598 -0.047939,0.047939 -0.063918,0.063918l0,0l-0.878875,0.878875l-0.878875,-0.878875c-0.263663,-0.303611 -0.735059,-0.327581 -1.046661,-0.063918c-0.023969,0.01598 -0.047939,0.047939 -0.063918,0.063918l0,0l-0.950783,0.950783l-1.542027,0c-0.255673,-0.01598 -0.487376,0.135826 -0.591243,0.36753c-0.950783,2.764462 -3.970918,4.24257 -6.72739,3.291787c-2.229147,-0.767018 -3.691276,-2.916268 -3.56344,-5.281241l-0.095877,0l0,0zm5.081497,1.542027c0.870885,-0.854906 0.878875,-2.253116 0.031959,-3.124002c-0.854906,-0.870885 -2.253116,-0.878875 -3.124002,-0.031959c-0.870885,0.854906 -0.878875,2.253116 -0.031959,3.124002c0.00799,0.00799 0.01598,0.01598 0.031959,0.031959c0.862896,0.846916 2.237137,0.846916 3.092043,0zm-2.213168,-2.197188c0.383509,-0.35954 0.990732,-0.335571 1.358262,0.047939c0.35954,0.383509 0.335571,0.990732 -0.047939,1.358262c-0.36753,0.35155 -0.934804,0.35155 -1.310323,0c-0.383509,-0.35954 -0.407479,-0.966763 -0.047939,-1.358262c0.023969,-0.023969 0.039949,-0.039949 0.047939,-0.047939l0,0z"/>' +
                ' </g>' +
                '</svg>';
            break;
        case 'shield':
            html =
                '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
                ' <g>' +
                '  <g stroke="null" id="svg_3">' +
                '   <path stroke="null" id="svg_1" d="m11.91309,22.452944l-0.31729,0c-2.37615,-0.958921 -4.491416,-2.467811 -6.169528,-4.406806c-1.233906,-1.452483 -1.882587,-3.299816 -1.840282,-5.203556c0,-2.481913 0,-5.041386 0,-7.445739l0,-1.198651c-0.007051,-0.387799 0.260883,-0.726242 0.641631,-0.803801l4.167076,-1.043532l3.285714,-0.803801l0.641631,0l3.363274,0.803801l4.082465,1.043532c0.380748,0.07756 0.648682,0.416002 0.641631,0.803801c0,1.121091 0,2.242183 0,3.285714l0,1.283262c0,0.401901 0,0.803801 0,1.198651c0,0.401901 0,1.762722 0,2.644083c0.091662,2.249234 -0.782649,4.435009 -2.404353,6.007358l0,0c-1.600552,1.614654 -3.504292,2.897915 -5.605457,3.765175l-0.486511,0.070509zm-6.726548,-17.613121l0,0.401901c0,2.481913 0,4.963826 0,7.445739c-0.021153,1.530043 0.521766,3.01073 1.522992,4.167076c1.445432,1.671061 3.25046,2.989577 5.288167,3.842735c1.797977,-0.775598 3.433783,-1.889638 4.801656,-3.285714l0,0c1.318516,-1.248007 2.044758,-2.989577 2.002453,-4.801656c0,-0.881361 0,-1.840282 0,-2.644083s0,-0.803801 0,-1.198651l0,-1.283262c0,-0.881361 0,-1.762722 0,-2.644083l-3.440834,-0.881361l-3.285714,-0.803801l-3.201104,0.803801l-3.687615,0.881361zm12.092275,13.128756l0,0zm-5.443286,-14.891478l0,0z"/>' +
                '   <path stroke="null" id="svg_2" d="m16.721796,8.597946l-4.886266,6.169528c-0.112814,0.197425 -0.331392,0.324341 -0.564071,0.31729l-0.47946,0l-3.123544,-2.164623c-0.352544,-0.267934 -0.423053,-0.768547 -0.16217,-1.121091c0.267934,-0.352544 0.768547,-0.423053 1.121091,-0.16217l2.481913,1.762722l4.322195,-5.605457c0.282036,-0.31729 0.761496,-0.387799 1.121091,-0.16217c0.274985,0.253832 0.338443,0.648682 0.169221,0.965972z"/>' +
                '  </g>' +
                ' </g>' +
                '</svg>';
            break;
        case 'clock':
            html =
                '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
                ' <g>' +
                '  <g stroke="null" id="svg_3">' +
                '   <path stroke="null" id="svg_1" d="m11.999977,1.390425c-5.828767,0 -10.656471,4.808076 -10.656471,10.609596s4.827704,10.609596 10.656471,10.609596s10.656471,-4.806469 10.656471,-10.609596a10.625793,10.579053 0 0 0 -10.656471,-10.609596zm0,19.068338c-4.663013,0 -8.493692,-3.813828 -8.493692,-8.45633s3.830678,-8.458742 8.493692,-8.458742s8.493692,3.813828 8.493692,8.45633s-3.664373,8.45633 -8.493692,8.45633l0,0.002411z"/>' +
                '   <path stroke="null" id="svg_2" d="m11.000529,12.000022l0,-5.969505c0,-0.6631 0.499724,-0.995052 0.999448,-0.995052s0.999448,0.497526 0.999448,0.995052l0,5.969505c0,0.6631 -0.499724,0.995052 -0.999448,0.995052s-0.999448,-0.331952 -0.999448,-0.995052z"/>' +
                '  </g>' +
                ' </g>' +
                '</svg>';
            break;
    }
    return html;
};

let poweredByIndex = 0;

const svgPoweredByFooter = function () {
    poweredByIndex++;
    let url = "https://breadbutter.io/";
    if (APP_ID) {
        url += '?app_id=' + APP_ID;
    }
    let html = `
    <a href=${url} target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="375" height="49" viewBox="0 0 375 49">
            <defs>
            <clipPath id="clip-path-${poweredByIndex}">
                <path id="Path_1108" data-name="Path 1108" d="M81.761,6.919l-1.914,5.4a.87.87,0,0,0,.507,1.122l5.435,1.885a.871.871,0,0,0,1.122-.506l1.306-5.2a.871.871,0,0,0-.507-1.122L82.883,6.412a.87.87,0,0,0-1.122.507" transform="translate(-79.79 -6.356)" fill="none"/>
            </clipPath>
            <linearGradient id="linear-gradient-${poweredByIndex}" x1="-7.595" y1="1.557" x2="-7.498" y2="1.557" gradientUnits="objectBoundingBox">
                <stop offset="0" stop-color="#ffde00"/>
                <stop offset="1" stop-color="#ff9b00"/>
            </linearGradient>
            <clipPath id="clip-path-2-${poweredByIndex}">
                <rect id="Rectangle_633" data-name="Rectangle 633" width="110" height="24.802" fill="none"/>
            </clipPath>
            </defs>
            <g id="Group_2258" data-name="Group 2258" transform="translate(-1852 -116.209)">
            <path id="Rectangle_741" data-name="Rectangle 741" d="M0,0H375a0,0,0,0,1,0,0V37a12,12,0,0,1-12,12H12A12,12,0,0,1,0,37V0A0,0,0,0,1,0,0Z" transform="translate(1852 117)" fill="#fff"/>
            <g id="Group_2165" data-name="Group 2165" transform="translate(2082.059 126.522)">
                <g id="Group_2213" data-name="Group 2213" transform="translate(93.457 7.661)">
                <g id="Group_2212" data-name="Group 2212" clip-path="url(#clip-path-${poweredByIndex})">
                    <rect id="Rectangle_632" data-name="Rectangle 632" width="11.629" height="11.38" transform="translate(-3.137 7.996) rotate(-69.287)" fill="url(#linear-gradient-${poweredByIndex})"/>
                </g>
                </g>
                <g id="Group_2215" data-name="Group 2215" transform="translate(0 0)">
                <g id="Group_2214" data-name="Group 2214" clip-path="url(#clip-path-2-${poweredByIndex})">
                    <path id="Path_1109" data-name="Path 1109" d="M95.813,10.482A5.245,5.245,0,0,0,97.105,6.63c0-4.186-4.2-6.54-11.821-6.63C77.7.091,73.522,2.445,73.522,6.63a5.241,5.241,0,0,0,1.292,3.852,3.264,3.264,0,0,0,.3.262c-1.509,3.067-1.587,9.75-1.587,11.085a3.007,3.007,0,0,0,3,2.973H94.107a3.013,3.013,0,0,0,3-2.983c0-1.332-.079-8.01-1.587-11.074a3.114,3.114,0,0,0,.3-.262m-18.663.146a.411.411,0,0,0,.189-.461.416.416,0,0,0-.394-.31c-.075,0-1.844-.072-1.844-3.226,0-4.285,6.38-5.006,10.219-5.052h0c3.809.045,10.2.762,10.2,5.052,0,3.143-1.757,3.225-1.845,3.226a.414.414,0,0,0-.2.771c1.493.865,2.05,7.324,2.05,11.187a1.424,1.424,0,0,1-1.42,1.407H76.52a1.422,1.422,0,0,1-1.419-1.4c0-3.867.555-10.325,2.049-11.191" transform="translate(12.895 0)"/>
                </g>
                </g>
            </g>
            <g id="Group_2166" data-name="Group 2166" transform="translate(1852.179 116.709)">
                <g id="Group_2220" data-name="Group 2220" transform="translate(0 0)">
                <line id="Line_43" data-name="Line 43" x2="375" fill="none" stroke="#eee" stroke-miterlimit="10" stroke-width="1"/>
                </g>
            </g>
            <text id="powered_by" data-name="powered by" transform="translate(2103.254 145.708)" fill="#58595b" font-size="11" font-family="OpenSansLight-Italic, Open Sans" font-style="italic"><tspan x="-10" y="0">powered by</tspan></text>
            </g>
        </svg>
    </a>
    `
    return html;
};

const enterpriseStyle = function (provider) {
    let str = '';

    if (provider.customization && provider.customization.login_text_hex_color) {
        //str += 'border: 1px solid ' + provider.login_text_hex_color + ';';
        str += 'color:' + provider.customization.login_text_hex_color + ';';
    }
    if (provider.customization && provider.customization.login_background_hex_color) {
        str += 'background-color:' + provider.customization.login_background_hex_color + ';';
    }

    return str;
};

const svgButtons_e = function (provider, register, deidentify) {
    var html = '';
    let type = provider.idp;
    let name = provider.name;

    let sign_in = register ? Locale.TILE.CONTINUE : Locale.TILE.SIGN_IN;
    sign_in = deidentify ? Locale.TILE.DEIDENTIFY: sign_in;

    let icon = enterpriseIcon(type, provider);
    if (icon) {
        icon =
            '<div class="icon-holder"><div class="bb-icon">' +
            icon +
            '</div></div>';
    } else {
        icon = '';
    }

    let style = enterpriseStyle(provider);

    sign_in = lang.replace({
        WITH: Locale.TILE.W_,
        BRAND: name
    }, sign_in);
    if (provider.alias) {
        if (deidentify) {
            sign_in = lang.replace({
                NAME: provider.alias
            }, Locale.TILE.DEIDENTIFY);
        } else {
            sign_in = lang.replace({
                NAME: provider.alias
            }, Locale.TILE.CONTINUE_AS);
        }
    }
    html =
        '<div data-name="' +
        type +
        '" class="bb-' +
        type +
        '"><div class="bb-icon-wrapper" style="' +
        style +
        '">' +
        icon +
        '<span>' + sign_in + '</span></div></div>';

    if (provider.customization && provider.customization.login_button_image_url) {
        html =
            '<div class="custom-button" style="background-image: url(' +
            provider.customization.login_button_image_url +
            ');"></div>';
    }

    return html;
};

const svgIcons_e = function (provider) {
    var html = '';
    let type = provider.idp;
    let name = provider.name.slice(0, 2);

    let style = enterpriseStyle(provider);

    html =
        '<div data-name="' +
        type +
        '" class="bb-item" style="bb-' +
        style +
        '"><span>' +
        name +
        '</span></div>';

    if (provider.customization && provider.customization.login_icon_image_url) {
        html =
            '<div class="custom-icon" style="background-image: url(' +
            provider.customization.login_icon_image_url +
            ');"></div>';
    }

    return html;
};

const svgButtons = function (type, opt, register, deidentify) {
    let html = '';
    let TYPE = type;
    let svg = loadSVG(type);
    let sign_in = register ?  Locale.TILE.CONTINUE : Locale.TILE.SIGN_IN;
    sign_in = deidentify ? Locale.TILE.DEIDENTIFY : sign_in;
    let brand = Locale.TILE.BRAND[TYPE.toUpperCase()];
    if (brand) {
        let prep = Locale.TILE.WITH;
        if (TYPE == 'planningcenter') {
            prep = Locale.TILE.W_;
        }
        sign_in = lang.replace({
            WITH: prep,
            BRAND: brand
        }, sign_in);
    }
    switch (TYPE) {
        case 'google':
            html =
                '<div data-name="google" class="bb-google"><div class="bb-icon-wrapper">' +
                '<div class="bb-icon bb-icon-small">' +
                svg;
            break;
        case 'facebook':
            html =
                '<div data-name="facebook" class="bb-facebook"><div class="bb-icon-wrapper">' +
                '<div class="bb-icon">' +
                svg ;
            break;
        case 'microsoft':
            html =
                '<div data-name="microsoft" class="bb-microsoft"><div class="bb-icon-wrapper">' +
                '<div class="bb-icon bb-icon-small">' +
                svg ;
            break;
        case 'linkedin':
            html =
                '<div data-name="linkedin" class="bb-linkedin"><div class="bb-icon-wrapper">' +
                '<div class="bb-icon bb-icon-small">' +
                svg;
            break;
        case 'twitter':
            html =
                '<div data-name="twitter" class="bb-twitter"><div class="bb-icon-wrapper">' +
                '<div class="bb-icon">' +
                svg;
            break;
        case 'quickbooks':
            html =
                '<div data-name="quickbooks" class="bb-quickbooks"><div class="bb-icon-wrapper">' +
                '<div class="bb-icon bb-icon-medium">' +
                svg;
            break;
        case 'github':
            html =
                '<div data-name="github" class="bb-github"><div class="bb-icon-wrapper">' +
                '<div class="bb-icon">' +
                svg;
            break;
        case 'slack':
            html =
                '<div data-name="slack" class="bb-slack"><div class="bb-icon-wrapper">' +
                '<div class="bb-icon">' +
                svg;
            break;

        case 'basecamp':
            html =
                '<div data-name="basecamp" class="bb-basecamp"><div class="bb-icon-wrapper">' +
                '<div class="bb-icon">' +
                svg;
            break;
        case 'dropbox':
            html =
                '<div data-name="dropbox" class="bb-dropbox"><div class="bb-icon-wrapper">' +
                '<div class="bb-icon">' +
                svg;
            break;
        case 'shopify':
            html =
                '<div data-name="shopify" class="bb-shopify"><div class="bb-icon-wrapper">' +
                '<div class="bb-icon">' +
                svg;
            break;
        case 'evernote':
            html =
                '<div data-name="evernote" class="bb-evernote"><div class="bb-icon-wrapper">' +
                '<div class="bb-icon">' +
                svg;
            break;
        case 'planningcenter':
            html =
                '<div data-name="planningcenter" class="bb-planningcenter"><div class="bb-icon-wrapper">' +
                '<div class="bb-icon bb-icon-small">' +
                svg;
            break;
        case 'fitbit':
            html =
                '<div data-name="fitbit" class="bb-fitbit"><div class="bb-icon-wrapper">' +
                '<div class="bb-icon">' +
                svg ;
            break;
        case 'apple':
            html =
                '<div data-name="apple" class="bb-apple"><div class="bb-icon-wrapper">' +
                '<div class="bb-icon bb-icon-small">' +
                svg;
            break;
        case 'twitch':
            html =
                '<div data-name="twitch" class="bb-twitch"><div class="bb-icon-wrapper">' +
                '<div class="bb-icon bb-icon-small">' +
                svg;
            break;
        case 'salesforce':
            html =
                '<div data-name="salesforce" class="bb-salesforce"><div class="bb-icon-wrapper">' +
                '<div class="bb-icon">' +
                svg;
            break;
        case 'local':
            let text = opt.text ? opt.text : Locale.TILE.WITH_EMAIL;
            let cls = opt.cls ? opt.cls : '';
            html =
                '<div data-name="local" class="bb-local ' +
                cls +
                '"><div class="bb-icon-wrapper">' +
                '<div class="bb-icon">' +
                svg +
                '</div><span>' +
                text +
                '</span></div></div>';
            break;
    }
    if (TYPE != 'local') {
        if (opt.alias) {
            if (deidentify) {
                sign_in = lang.replace({
                    NAME: opt.alias
                }, Locale.TILE.DEIDENTIFY);
            } else {
                sign_in = lang.replace({
                    NAME: opt.alias
                }, Locale.TILE.CONTINUE_AS);
            }
        }
        html += '</div><span>'+ sign_in + '</span></div></div>';
    }
    return html;
};

const svgIcons = function (type) {
    let svg = loadSVG(type);
    let html = '<div data-name="' + type + '" class="bb-item">' + svg + '</div>';
    return html;
};

const enterpriseIcon = function (type, provider) {
    var svg = false;
    svg = loadSVG(type);

    if (provider.customization && provider.customization.login_icon_image_url) {
        svg =
            '<div class="custom-icon" style="background-image: url(' +
            provider.customization.login_icon_image_url +
            ');"></div>';
    }
    return svg;
};

const loadSVG = function (type) {
    let svg = '';
    switch (type) {
        case 'okta':
            svg =
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xml:space="preserve" viewBox="0 0 13 13"><g class="currentLayer" style=""><path d="M6.310026569366443,0.000026690959941788606 c-3.48,-0.010000000000000005 -6.3,2.8 -6.3100000000000005,6.28 c-0.010000000000000005,3.47 2.81,6.29 6.29,6.3 s6.3,-2.8 6.3100000000000005,-6.28 C12.600026569366463,2.820026690959935 9.79002656936646,0.010026690959932694 6.310026569366443,0.000026690959941788606 M6.300026569366452,9.43002669095992 c-1.7400000000000002,0 -3.15,-1.4100000000000001 -3.14,-3.15 c0,-1.7400000000000002 1.4100000000000001,-3.14 3.15,-3.14 c1.7400000000000002,0 3.15,1.4100000000000001 3.14,3.15 C9.450026569366457,8.030026690959943 8.030026569366441,9.43002669095992 6.300026569366452,9.43002669095992 "/></g></svg>';
            break;
        case 'onelogin':
            svg =
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 446.7 445.6" xml:space="preserve" viewBox="0 0 223 222">\n' +
                '<g class="currentLayer" style=""><g id="svg_1" class="">\n' +
                '\t<path fill="#FFFFFF" d="M111.30000000000001,-0.000003051757815342171 C49.900000000000006,-0.000003051757815342171 0,49.79999694824218 0,111.19999694824219 c0,61.5 49.8,111.3 111.3,111.3 S222.60000000000002,172.6999969482422 222.60000000000002,111.19999694824219 C222.60000000000002,49.79999694824218 172.8,-0.000003051757815342171 111.30000000000001,-0.000003051757815342171 z" id="svg_2"/>\n' +
                '\t<path fill="#1C1F2A" d="M127.9,150.59999694824216 c0,2.1 -1.1,3.2 -3.2,3.2 h-20 c-2.1,0 -3.2,-1.1 -3.2,-3.2 v-48.2 h-15.3 c-2.1,0 -3.2,-1.1 -3.2,-3.2 v-20 c0,-2.1 1.1,-3.2 3.2,-3.2 h39 c2.1,0 2.6,1.1 2.6,2.6 V150.59999694824216 z" id="svg_3"/>\n' +
                '</g></g></svg>';
            break;
        case 'google':
            svg =
                '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="abcRioButtonSvg"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>';
            break;
        case 'facebook':
            svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" version="1.1" viewBox="0 0 14222 14125"><g id="Layer_x0020_1"><path class="fil0" d="M14222 7100c0,-3927 -3184,-7111 -7111,-7111 -3927,0 -7111,3184 -7111,7111 0,3549 2600,6491 6000,7025l0 -4969 -1806 0 0 -2056 1806 0 0 -1567c0,-1782 1062,-2767 2686,-2767 778,0 1592,139 1592,139l0 1750 -897 0c-883,0 -1159,548 -1159,1111l0 1334 1972 0 -315 2056 -1657 0 0 4969c3400,-533 6000,-3475 6000,-7025z" style="fill:#FEFEFE;fill-rule:nonzero"/></g></svg>`;
            break;
        case 'microsoft':
            svg =
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 150 150" xml:space="preserve"><g><title>Layer 1</title> <path fill="#F0511C" d="m17.17982,74.67l55.94,0c0,-18.67 0,-37.31 0,-55.94l-55.94,0l0,55.94z" id="svg_1"></path> <path fill="#81CC2C" d="m79.18018,74.471802l55.93,0c0,-18.67 0,-37.31 0,-55.94l-55.93,0c0,18.65 0,37.29 0,55.94z" id="svg_2"></path> <path fill="#1EAEEF" d="m16.99964,134.32l55.94,0c0,-18.67 0,-37.31 0,-55.94l-55.94,0l0,55.94z" id="svg_3"></path> <path fill="#FBBC13" d="m79,134.401081l55.94,0l0,-55.93l-55.94,0c0,18.64 0,37.28 0,55.93z" id="svg_4"></path></g></svg>';
            break;
        case 'linkedin':
            svg =
                '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"' +
                ' viewBox="0 0 430.117 430.117" style="enable-background:new 0 0 430.117 430.117;"' +
                ' xml:space="preserve">' +
                '<g>' +
                '<path d="M430.117,261.543V420.56h-92.188V272.193c0-37.271-13.334-62.707-46.703-62.707' +
                'c-25.473,0-40.632,17.142-47.301,33.724c-2.432,5.928-3.058,14.179-3.058,22.477V420.56h-92.219c0,0,1.242-251.285,0-277.32h92.21' +
                'v39.309c-0.187,0.294-0.43,0.611-0.606,0.896h0.606v-0.896c12.251-18.869,34.13-45.824,83.102-45.824' +
                'C384.633,136.724,430.117,176.361,430.117,261.543z M52.183,9.558C20.635,9.558,0,30.251,0,57.463' +
                'c0,26.619,20.038,47.94,50.959,47.94h0.616c32.159,0,52.159-21.317,52.159-47.94C103.128,30.251,83.734,9.558,52.183,9.558z' +
                ' M5.477,420.56h92.184v-277.32H5.477V420.56z"/>' +
                '</g>' +
                '</svg>';
            break;
        case 'twitter':
            svg =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="50 40 300 300"><path d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"/></svg>';
            break;
        case 'quickbooks':
            svg =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 107.96 107.89"><path xmlns="http://www.w3.org/2000/svg" d="M54.98 0.08L55.75 0.1L56.52 0.13L57.29 0.17L58.06 0.21L58.83 0.27L60.63 0.46L62.4 0.7L64.16 0.99L65.9 1.35L67.61 1.76L69.31 2.22L70.98 2.74L72.64 3.31L74.26 3.93L75.86 4.6L77.44 5.32L78.98 6.09L80.5 6.91L81.99 7.78L83.45 8.69L84.88 9.65L86.27 10.65L87.63 11.7L88.96 12.79L90.25 13.92L91.5 15.09L92.72 16.3L93.89 17.55L95.03 18.83L96.13 20.16L97.18 21.52L98.19 22.92L99.16 24.35L100.08 25.81L100.96 27.31L101.79 28.83L102.57 30.39L103.31 31.98L103.99 33.6L104.62 35.25L105.2 36.92L105.73 38.62L106.2 40.34L106.62 42.09L106.98 43.86L107.36 46.08L107.64 48.29L107.84 50.49L107.94 52.67L107.96 54.83L107.89 56.98L107.74 59.11L107.5 61.22L107.18 63.3L106.79 65.36L106.31 67.39L105.76 69.4L105.13 71.37L104.43 73.31L103.66 75.22L102.81 77.09L101.9 78.93L100.92 80.72L99.87 82.48L98.76 84.19L97.58 85.86L96.35 87.48L95.05 89.06L93.69 90.58L92.28 92.05L90.82 93.47L89.29 94.84L87.72 96.15L86.1 97.4L84.42 98.59L82.7 99.71L80.93 100.78L79.12 101.78L77.27 102.71L75.37 103.57L73.43 104.36L71.46 105.08L69.45 105.72L67.4 106.29L65.32 106.78L63.13 107.19L60.95 107.52L58.77 107.75L56.61 107.9L54.45 107.96L52.31 107.94L50.18 107.83L48.07 107.64L45.97 107.37L43.9 107.01L41.85 106.58L39.83 106.08L37.83 105.49L35.86 104.83L33.92 104.1L32.02 103.3L30.15 102.42L28.31 101.48L26.52 100.46L24.76 99.38L23.05 98.23L21.38 97.02L19.76 95.75L18.19 94.41L16.67 93.01L15.2 91.55L13.79 90.04L12.43 88.46L11.13 86.83L9.9 85.15L8.72 83.41L7.62 81.62L6.57 79.78L5.6 77.89L4.7 75.96L3.87 73.97L3.11 71.94L2.43 69.87L1.83 67.75L1.32 65.59L1.28 65.42L1.25 65.25L1.21 65.08L1.18 64.91L1.15 64.73L1.12 64.56L1.09 64.39L1.06 64.21L1.03 64.04L1 63.86L0.97 63.69L0.94 63.51L0.92 63.34L0.89 63.16L0.86 62.98L0.84 62.81L0.82 62.63L0.79 62.45L0.77 62.27L0.75 62.1L0.72 61.92L0.7 61.74L0.68 61.56L0.66 61.38L0.64 61.2L0.62 61.03L0.6 60.85L0.58 60.67L0.56 60.49L0.54 60.31L0.52 60.13L0.5 59.95L0.48 59.77L0.46 59.59L0.45 59.41L0.43 59.23L0.41 59.05L0.39 58.87L0.37 58.69L0.36 58.51L0 56.71L0 51.43L0.02 51.21L0.04 51L0.07 50.79L0.09 50.58L0.12 50.38L0.14 50.18L0.16 49.98L0.19 49.78L0.21 49.59L0.24 49.4L0.26 49.21L0.28 49.03L0.31 48.84L0.33 48.66L0.36 48.49L0.38 48.31L0.4 48.14L0.43 47.97L0.45 47.81L0.48 47.64L0.5 47.48L0.52 47.32L0.55 47.17L0.57 47.02L0.6 46.87L0.62 46.72L0.64 46.57L0.67 46.43L0.69 46.29L0.72 46.16L0.74 46.02L0.76 45.89L0.79 45.76L0.81 45.64L0.84 45.52L0.86 45.39L0.88 45.28L0.91 45.16L0.93 45.05L0.96 44.94L1.21 43.63L1.49 42.35L1.79 41.07L2.12 39.82L2.47 38.58L2.84 37.36L3.24 36.16L3.66 34.97L4.11 33.8L4.58 32.65L5.07 31.51L5.58 30.4L6.12 29.29L6.68 28.21L7.27 27.14L7.88 26.09L8.51 25.06L9.17 24.05L9.85 23.05L10.55 22.07L11.27 21.1L12.02 20.16L12.79 19.23L13.59 18.31L14.4 17.42L15.25 16.54L16.11 15.68L17 14.83L17.91 14.01L18.84 13.2L19.79 12.4L20.77 11.63L21.77 10.87L22.8 10.13L23.84 9.4L24.91 8.7L26 8L27.12 7.33L28.25 6.68L29.41 6.04L30.11 5.67L30.81 5.32L31.5 4.98L32.21 4.66L32.91 4.34L33.61 4.04L34.32 3.75L35.03 3.47L35.74 3.2L36.46 2.94L37.18 2.7L37.89 2.46L38.61 2.24L39.34 2.03L40.06 1.83L40.79 1.64L41.52 1.46L42.25 1.29L42.98 1.14L43.72 0.99L44.46 0.86L45.19 0.74L45.94 0.62L46.68 0.52L47.42 0.43L48.17 0.35L48.92 0.28L49.67 0.22L50.42 0.17L51.18 0.13L51.94 0.1L52.7 0.08L53.46 0.07L54.22 0.07L54.98 0.08ZM38.67 32.81L38.29 32.81L37.92 32.82L37.54 32.82L37.16 32.83L36.78 32.84L36.4 32.86L36.02 32.87L35.65 32.89L35.27 32.91L34.89 32.93L34.51 32.96L34.13 32.99L33.75 33.02L33.38 33.05L32.35 33.19L31.35 33.37L30.36 33.6L29.4 33.87L28.46 34.19L27.55 34.56L26.66 34.96L25.79 35.41L24.96 35.89L24.15 36.41L23.36 36.97L22.61 37.56L21.88 38.19L21.19 38.84L20.53 39.53L19.9 40.25L19.3 40.99L18.73 41.76L18.2 42.55L17.71 43.37L17.25 44.2L16.83 45.06L16.44 45.93L16.09 46.83L15.79 47.73L15.52 48.66L15.29 49.59L15.11 50.54L14.97 51.49L14.87 52.46L14.82 53.43L14.81 54.4L14.84 55.38L14.93 56.36L15.06 57.35L15.23 58.33L15.46 59.31L15.74 60.29L16.07 61.26L16.45 62.23L16.73 62.87L17.04 63.5L17.36 64.12L17.7 64.72L18.06 65.3L18.43 65.87L18.82 66.43L19.22 66.97L19.64 67.5L20.08 68.01L20.53 68.5L20.99 68.98L21.47 69.45L21.95 69.89L22.46 70.32L22.97 70.74L23.5 71.14L24.04 71.52L24.59 71.88L25.15 72.23L25.72 72.56L26.31 72.87L26.9 73.16L27.5 73.44L28.12 73.69L28.74 73.93L29.37 74.15L30.01 74.35L30.65 74.53L31.31 74.69L31.97 74.84L32.63 74.96L33.31 75.06L33.99 75.14L34.67 75.2L35.37 75.25L36.06 75.27L36.76 75.27L37.47 75.24L38.18 75.2L38.23 75.19L38.28 75.18L38.33 75.17L38.38 75.16L38.43 75.15L38.47 75.14L38.51 75.12L38.56 75.11L38.6 75.1L38.63 75.08L38.67 75.07L38.7 75.05L38.74 75.03L38.77 75.01L38.8 75L38.83 74.98L38.86 74.95L38.88 74.93L38.91 74.91L38.93 74.88L38.95 74.86L38.97 74.83L38.99 74.81L39.01 74.78L39.03 74.75L39.04 74.71L39.06 74.68L39.07 74.65L39.08 74.61L39.09 74.58L39.1 74.54L39.11 74.5L39.12 74.46L39.12 74.41L39.13 74.37L39.13 74.32L39.14 74.27L39.14 74.22L39.14 74.17L39.14 74.12L39.14 68.36L39.14 68.28L39.14 68.2L39.13 68.13L39.13 68.06L39.12 67.99L39.11 67.92L39.1 67.86L39.08 67.8L39.07 67.75L39.05 67.69L39.03 67.64L39.01 67.59L38.99 67.55L38.96 67.5L38.94 67.46L38.91 67.42L38.88 67.39L38.85 67.35L38.82 67.32L38.78 67.29L38.74 67.26L38.7 67.24L38.66 67.21L38.62 67.19L38.58 67.17L38.53 67.15L38.48 67.13L38.43 67.12L38.38 67.1L38.33 67.09L38.27 67.08L38.22 67.07L38.16 67.06L38.1 67.05L38.04 67.05L37.97 67.04L37.91 67.04L37.84 67.04L37.77 67.04L37.7 67.03L37.6 67.03L37.5 67.03L37.4 67.03L37.3 67.03L37.2 67.03L37.1 67.03L37 67.03L36.9 67.03L36.79 67.03L36.69 67.03L36.59 67.03L36.49 67.03L36.39 67.03L36.28 67.02L36.18 67.02L36.08 67.02L35.98 67.02L35.88 67.01L35.77 67.01L35.67 67L35.57 67L35.47 66.99L35.37 66.99L35.27 66.98L35.17 66.98L35.07 66.97L34.97 66.96L34.87 66.95L34.77 66.94L34.68 66.93L34.58 66.92L34.48 66.91L34.39 66.9L34.29 66.89L34.2 66.87L34.1 66.86L34.01 66.84L33.92 66.83L33.83 66.81L33.74 66.79L33.28 66.71L32.83 66.62L32.39 66.51L31.95 66.38L31.52 66.24L31.1 66.08L30.69 65.91L30.28 65.73L29.89 65.53L29.5 65.31L29.12 65.09L28.75 64.85L28.39 64.6L28.03 64.34L27.69 64.06L27.36 63.77L27.03 63.48L26.72 63.17L26.42 62.85L26.13 62.52L25.85 62.18L25.58 61.83L25.32 61.47L25.07 61.1L24.84 60.72L24.62 60.33L24.41 59.94L24.21 59.54L24.03 59.12L23.86 58.71L23.7 58.28L23.56 57.85L23.43 57.41L23.31 56.97L23.21 56.52L23.13 56.06L23.05 55.6L23 55.13L22.96 54.66L22.93 54.19L22.93 53.75L22.94 53.32L22.97 52.89L23.02 52.46L23.08 52.03L23.15 51.61L23.24 51.19L23.34 50.77L23.46 50.35L23.59 49.94L23.73 49.53L23.89 49.12L24.06 48.72L24.25 48.33L24.44 47.94L24.65 47.56L24.87 47.19L25.1 46.82L25.35 46.46L25.6 46.11L25.87 45.77L26.15 45.44L26.43 45.11L26.73 44.8L27.04 44.49L27.36 44.2L27.69 43.92L28.03 43.65L28.38 43.39L28.74 43.14L29.11 42.91L29.48 42.69L29.87 42.48L30.26 42.29L30.66 42.11L31.07 41.95L31.48 41.8L31.91 41.67L32.34 41.56L32.78 41.46L32.98 41.42L33.19 41.37L33.4 41.34L33.61 41.3L33.82 41.27L34.03 41.24L34.25 41.21L34.46 41.19L34.67 41.17L34.89 41.15L35.1 41.13L35.32 41.11L35.54 41.1L35.75 41.09L35.97 41.07L36.19 41.06L36.41 41.06L36.63 41.05L36.85 41.04L37.07 41.04L37.29 41.03L37.51 41.03L37.73 41.03L37.95 41.03L38.18 41.02L38.4 41.02L38.62 41.02L39.07 41.02L39.29 41.02L39.52 41.02L39.74 41.02L39.97 41.01L40.19 41.01L40.42 41.01L40.64 41L40.87 41L41.09 40.99L41.32 40.99L41.54 40.98L41.64 40.97L41.73 40.97L41.82 40.96L41.91 40.96L41.99 40.96L42.07 40.97L42.15 40.97L42.22 40.98L42.29 40.99L42.36 41L42.43 41.02L42.49 41.04L42.55 41.06L42.6 41.08L42.65 41.11L42.7 41.14L42.75 41.17L42.8 41.2L42.84 41.24L42.88 41.28L42.91 41.32L42.95 41.37L42.98 41.41L43.01 41.46L43.04 41.52L43.06 41.57L43.09 41.63L43.11 41.69L43.13 41.76L43.15 41.82L43.16 41.89L43.17 41.97L43.19 42.04L43.2 42.12L43.2 42.2L43.21 42.29L43.22 42.38L43.22 42.47L43.22 42.56L43.22 42.66L43.22 81.68L43.22 81.83L43.23 81.97L43.23 82.11L43.24 82.25L43.25 82.39L43.26 82.53L43.27 82.66L43.28 82.8L43.3 82.93L43.32 83.06L43.34 83.19L43.36 83.32L43.38 83.45L43.41 83.58L43.44 83.71L43.47 83.83L43.5 83.96L43.54 84.08L43.57 84.2L43.61 84.33L43.65 84.45L43.7 84.57L43.74 84.69L43.79 84.8L43.84 84.92L43.9 85.04L43.95 85.16L44.01 85.27L44.07 85.39L44.13 85.5L44.2 85.61L44.27 85.73L44.34 85.84L44.41 85.95L44.49 86.06L44.56 86.17L44.65 86.28L44.73 86.39L44.82 86.5L44.9 86.61L45.02 86.75L45.14 86.89L45.26 87.02L45.39 87.16L45.51 87.29L45.64 87.41L45.77 87.54L45.9 87.66L46.03 87.77L46.17 87.88L46.31 87.99L46.44 88.1L46.59 88.2L46.73 88.3L46.88 88.39L47.02 88.49L47.17 88.57L47.32 88.66L47.48 88.74L47.64 88.81L47.79 88.89L47.96 88.95L48.12 89.02L48.28 89.08L48.45 89.14L48.62 89.19L48.8 89.24L48.97 89.28L49.15 89.32L49.33 89.36L49.51 89.39L49.7 89.42L49.88 89.44L50.07 89.46L50.27 89.48L50.46 89.49L50.66 89.5L50.86 89.5L51.06 89.5L51.27 89.49L51.26 88.08L51.25 86.66L51.24 85.25L51.24 83.84L51.23 82.42L51.22 81.01L51.22 79.6L51.21 78.19L51.2 76.78L51.2 75.37L51.19 73.96L51.19 72.54L51.18 71.13L51.18 69.72L51.18 68.31L51.17 66.9L51.17 65.49L51.17 64.08L51.16 62.67L51.16 61.26L51.16 59.84L51.16 58.43L51.16 57.02L51.16 55.61L51.15 54.19L51.15 52.78L51.15 51.37L51.15 49.95L51.15 48.54L51.15 47.12L51.15 45.71L51.15 44.29L51.15 42.87L51.15 41.46L51.15 40.04L51.15 38.62L51.15 37.2L51.15 35.78L51.15 34.36L51.15 32.93L48.51 32.93L48.13 32.93L47.75 32.93L47.37 32.93L46.99 32.92L46.61 32.92L46.24 32.91L45.86 32.91L45.48 32.9L45.1 32.89L44.72 32.88L44.35 32.88L43.59 32.86L43.21 32.85L42.83 32.84L42.45 32.84L42.08 32.83L41.7 32.82L41.32 32.82L40.94 32.81L40.56 32.81L40.18 32.81L39.81 32.8L39.43 32.8L39.05 32.8L38.67 32.81ZM62.43 75.2L62.74 75.2L63.05 75.2L63.35 75.21L63.66 75.21L63.97 75.21L64.27 75.22L64.58 75.23L64.88 75.23L65.19 75.24L65.49 75.25L65.8 75.26L66.11 75.26L66.41 75.27L66.72 75.28L67.02 75.29L67.33 75.3L67.63 75.3L67.94 75.31L68.24 75.32L68.54 75.32L68.85 75.32L69.15 75.33L69.45 75.33L69.76 75.33L70.06 75.33L70.36 75.33L70.66 75.32L70.97 75.32L71.27 75.31L71.57 75.3L71.87 75.29L72.17 75.28L72.47 75.26L72.77 75.24L73.07 75.22L73.37 75.2L73.67 75.17L73.97 75.15L74.26 75.11L74.56 75.08L75.48 74.95L76.38 74.79L77.27 74.6L78.14 74.36L78.99 74.1L79.82 73.8L80.63 73.48L81.42 73.12L82.19 72.73L82.94 72.31L83.66 71.86L84.37 71.39L85.05 70.89L85.71 70.36L86.34 69.81L86.95 69.24L87.54 68.64L88.1 68.01L88.63 67.37L89.14 66.7L89.62 66.02L90.07 65.31L90.49 64.59L90.88 63.85L91.25 63.09L91.58 62.32L91.89 61.53L92.16 60.72L92.4 59.9L92.61 59.07L92.79 58.23L92.93 57.37L93.04 56.51L93.12 55.63L93.16 54.75L93.16 53.86L93.13 52.96L93.06 52.05L92.96 51.14L92.81 50.22L92.67 49.52L92.51 48.82L92.32 48.12L92.11 47.44L91.87 46.76L91.61 46.1L91.32 45.44L91.02 44.8L90.69 44.16L90.34 43.54L89.98 42.93L89.59 42.33L89.18 41.75L88.76 41.18L88.31 40.62L87.85 40.08L87.38 39.56L86.88 39.05L86.37 38.56L85.85 38.08L85.31 37.62L84.76 37.19L84.19 36.77L83.61 36.37L83.02 35.99L82.42 35.63L81.81 35.29L81.19 34.97L80.55 34.67L79.91 34.4L79.26 34.15L78.6 33.93L77.94 33.73L77.27 33.55L76.59 33.4L75.9 33.28L75.21 33.18L74.52 33.11L73.82 33.07L73.12 33.05L73.01 33.05L72.9 33.05L72.79 33.05L72.68 33.04L72.56 33.03L72.45 33.03L72.33 33.02L72.21 33.01L72.1 33L71.98 32.99L71.86 32.98L71.74 32.97L71.63 32.96L71.51 32.95L71.39 32.94L71.28 32.93L71.16 32.92L71.05 32.91L70.94 32.91L70.82 32.9L70.72 32.9L70.61 32.9L70.5 32.9L70.4 32.9L70.3 32.9L70.2 32.91L70.1 32.91L70.01 32.92L69.92 32.94L69.83 32.95L69.74 32.97L69.66 32.99L69.59 33.02L69.51 33.04L69.44 33.08L69.38 33.11L69.32 33.15L69.26 33.19L69.21 33.24L69.16 33.29L69.11 33.36L69.06 33.43L69.01 33.5L68.97 33.57L68.94 33.65L68.9 33.73L68.87 33.82L68.84 33.9L68.82 33.99L68.8 34.08L68.78 34.18L68.76 34.27L68.75 34.37L68.74 34.47L68.73 34.57L68.72 34.68L68.72 34.78L68.71 34.89L68.71 35L68.71 35.11L68.71 35.22L68.71 35.33L68.71 35.45L68.72 35.56L68.72 35.67L68.73 35.79L68.73 35.9L68.74 36.02L68.75 36.13L68.76 36.36L68.77 36.48L68.77 36.59L68.78 36.71L68.78 36.82L68.79 36.93L68.79 37.05L68.8 37.16L68.8 37.27L68.8 37.38L68.8 37.64L68.8 37.89L68.8 38.13L68.8 38.35L68.81 38.57L68.81 38.77L68.82 38.96L68.83 39.14L68.84 39.3L68.85 39.46L68.87 39.61L68.9 39.75L68.92 39.87L68.95 39.99L68.99 40.11L69.03 40.21L69.08 40.3L69.13 40.39L69.18 40.47L69.25 40.54L69.32 40.61L69.4 40.67L69.48 40.72L69.58 40.77L69.68 40.82L69.79 40.86L69.91 40.89L70.03 40.92L70.17 40.95L70.32 40.97L70.48 40.99L70.64 41.01L70.82 41.03L71.01 41.04L71.21 41.05L71.42 41.06L71.65 41.07L71.89 41.08L72.14 41.09L72.4 41.1L72.89 41.13L73.37 41.17L73.84 41.23L74.31 41.31L74.78 41.4L75.24 41.51L75.69 41.64L76.14 41.78L76.59 41.93L77.02 42.1L77.45 42.28L77.87 42.48L78.28 42.69L78.68 42.92L79.07 43.15L79.46 43.4L79.83 43.67L80.2 43.94L80.55 44.22L80.9 44.52L81.23 44.83L81.55 45.15L81.86 45.47L82.15 45.81L82.44 46.16L82.71 46.51L82.96 46.88L83.21 47.25L83.43 47.63L83.65 48.02L83.85 48.42L84.03 48.82L84.2 49.23L84.35 49.65L84.48 50.07L84.6 50.5L84.7 50.93L84.78 51.37L84.84 51.82L84.89 52.27L84.93 52.8L84.96 53.34L84.97 53.86L84.96 54.39L84.94 54.9L84.9 55.41L84.84 55.92L84.76 56.42L84.67 56.91L84.56 57.39L84.44 57.86L84.3 58.33L84.14 58.79L83.97 59.24L83.78 59.68L83.58 60.11L83.36 60.53L83.13 60.94L82.88 61.35L82.62 61.74L82.35 62.12L82.06 62.48L81.76 62.84L81.44 63.18L81.11 63.52L80.77 63.84L80.41 64.14L80.04 64.44L79.66 64.71L79.27 64.98L78.86 65.23L78.44 65.47L78.01 65.69L77.57 65.9L77.12 66.09L76.65 66.26L76.17 66.42L75.69 66.56L75.19 66.69L74.68 66.79L74.47 66.84L74.25 66.88L74.03 66.92L73.81 66.95L73.6 66.98L73.38 67.01L73.16 67.04L72.94 67.06L72.72 67.08L72.5 67.1L72.28 67.12L72.06 67.14L71.84 67.15L71.62 67.16L71.4 67.17L71.18 67.18L70.96 67.19L70.74 67.19L70.52 67.2L70.3 67.2L70.08 67.2L69.86 67.2L69.64 67.2L69.42 67.2L69.2 67.2L68.98 67.2L68.76 67.19L68.54 67.19L68.32 67.19L68.1 67.18L67.88 67.18L67.66 67.18L67.44 67.17L67.22 67.17L67 67.16L66.78 67.16L66.57 67.16L66.35 67.16L66.13 67.16L65.92 67.15L65.89 67.15L65.86 67.15L65.83 67.14L65.81 67.13L65.78 67.12L65.75 67.11L65.72 67.09L65.69 67.08L65.66 67.06L65.63 67.04L65.6 67.01L65.58 66.99L65.55 66.96L65.52 66.94L65.49 66.91L65.47 66.88L65.44 66.85L65.41 66.82L65.39 66.78L65.36 66.75L65.34 66.72L65.31 66.68L65.29 66.65L65.27 66.61L65.25 66.57L65.23 66.54L65.21 66.5L65.19 66.47L65.17 66.43L65.16 66.4L65.14 66.36L65.13 66.32L65.12 66.29L65.11 66.26L65.1 66.22L65.09 66.19L65.08 66.16L65.08 66.13L65.08 66.1L65.08 66.07L65.07 65.95L65.06 65.82L65.05 65.7L65.05 65.57L65.04 65.45L65.04 65.33L65.03 65.2L65.03 65.08L65.03 64.96L65.03 64.83L65.02 64.71L65.02 64.59L65.02 64.46L65.02 64.34L65.02 64.22L65.02 64.1L65.03 63.98L65.03 63.86L65.03 63.73L65.03 63.61L65.03 63.49L65.04 63.37L65.04 63.25L65.04 63.13L65.04 63L65.05 62.88L65.05 62.76L65.05 62.64L65.06 62.52L65.06 62.39L65.06 62.27L65.06 62.15L65.07 62.02L65.07 61.9L65.07 61.78L65.07 61.65L65.07 61.53L65.08 61.4L65.08 61.28L65.08 61.15L65.08 27.53L65.07 27.27L65.07 27.01L65.06 26.76L65.04 26.5L65.02 26.25L65 26L64.97 25.75L64.94 25.51L64.9 25.26L64.85 25.02L64.81 24.79L64.75 24.55L64.69 24.32L64.63 24.09L64.56 23.87L64.48 23.64L64.4 23.42L64.31 23.21L64.22 23L64.12 22.79L64.01 22.58L63.9 22.38L63.78 22.18L63.65 21.99L63.52 21.8L63.38 21.61L63.23 21.43L63.08 21.25L62.91 21.08L62.75 20.91L62.57 20.75L62.39 20.59L62.2 20.43L62 20.28L61.79 20.14L61.57 20L61.35 19.86L61.12 19.73L60.88 19.6L60.63 19.49L60.55 19.45L60.47 19.41L60.39 19.38L60.3 19.35L60.22 19.32L60.13 19.28L60.05 19.25L59.96 19.22L59.87 19.19L59.78 19.16L59.69 19.14L59.6 19.11L59.51 19.08L59.42 19.05L59.33 19.03L59.24 19L59.14 18.98L59.05 18.95L58.96 18.92L58.86 18.9L58.77 18.88L58.67 18.85L58.58 18.83L58.48 18.8L58.38 18.78L58.29 18.75L58.19 18.73L58.09 18.71L58 18.68L57.9 18.66L57.8 18.63L57.7 18.61L57.6 18.58L57.5 18.56L57.41 18.53L57.31 18.51L57.21 18.48L57.11 18.46L57.01 18.43L56.91 18.4L56.91 75.2L62.43 75.2Z"/></svg>';
            break;
        case 'github':
            svg =
                '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="97.05966635694722 153.580285751011 47.3795178841722 46.3088002396093"><path xmlns="http://www.w3.org/2000/svg" d="M119.75 154.58C107.77 154.58 98.06 164.29 98.06 176.27C98.06 185.85 104.27 193.98 112.89 196.85C113.98 197.05 114.37 196.38 114.37 195.81C114.37 195.29 114.35 193.93 114.34 192.12C108.31 193.43 107.04 189.21 107.04 189.21C106.05 186.7 104.63 186.04 104.63 186.04C102.66 184.69 104.78 184.72 104.78 184.72C106.96 184.87 108.1 186.95 108.1 186.95C110.04 190.27 113.18 189.31 114.41 188.76C114.61 187.35 115.17 186.4 115.79 185.86C110.97 185.31 105.91 183.45 105.91 175.14C105.91 172.77 106.76 170.83 108.14 169.32C107.92 168.77 107.18 166.56 108.35 163.58C108.35 163.58 110.18 162.99 114.32 165.8C116.05 165.32 117.91 165.08 119.75 165.07C121.59 165.08 123.45 165.32 125.18 165.8C129.32 162.99 131.14 163.58 131.14 163.58C132.32 166.56 131.58 168.77 131.35 169.32C132.74 170.83 133.58 172.77 133.58 175.14C133.58 183.47 128.51 185.3 123.68 185.84C124.46 186.51 125.15 187.83 125.15 189.86C125.15 192.75 125.13 195.09 125.13 195.81C125.13 196.39 125.52 197.06 126.62 196.85C135.23 193.97 141.44 185.85 141.44 176.27C141.44 164.29 131.73 154.58 119.75 154.58" id="aMLv1KqxA"/></svg>';
            break;
        case 'slack':
            svg =
                '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"' +
                ' viewBox="55 55 160 160" xml:space="preserve">' +
                '<style type="text/css">' +
                '.st0_slack{fill:#E01E5A;}' +
                '.st1_slack{fill:#36C5F0;}' +
                '.st2_slack{fill:#2EB67D;}' +
                '.st3_slack{fill:#ECB22E;}' +
                '</style>' +
                '<g>' +
                '<g>' +
                '<path class="st0_slack" d="M99.4,151.2c0,7.1-5.8,12.9-12.9,12.9c-7.1,0-12.9-5.8-12.9-12.9c0-7.1,5.8-12.9,12.9-12.9h12.9V151.2z"/>' +
                '<path class="st0_slack" d="M105.9,151.2c0-7.1,5.8-12.9,12.9-12.9s12.9,5.8,12.9,12.9v32.3c0,7.1-5.8,12.9-12.9,12.9' +
                's-12.9-5.8-12.9-12.9V151.2z"/>' +
                '</g>' +
                '<g>' +
                '<path class="st1_slack" d="M118.8,99.4c-7.1,0-12.9-5.8-12.9-12.9c0-7.1,5.8-12.9,12.9-12.9s12.9,5.8,12.9,12.9v12.9H118.8z"/>' +
                '<path class="st1_slack" d="M118.8,105.9c7.1,0,12.9,5.8,12.9,12.9s-5.8,12.9-12.9,12.9H86.5c-7.1,0-12.9-5.8-12.9-12.9' +
                's5.8-12.9,12.9-12.9H118.8z"/>' +
                '</g>' +
                '<g>' +
                '<path class="st2_slack" d="M170.6,118.8c0-7.1,5.8-12.9,12.9-12.9c7.1,0,12.9,5.8,12.9,12.9s-5.8,12.9-12.9,12.9h-12.9V118.8z"/>' +
                '<path class="st2_slack" d="M164.1,118.8c0,7.1-5.8,12.9-12.9,12.9c-7.1,0-12.9-5.8-12.9-12.9V86.5c0-7.1,5.8-12.9,12.9-12.9' +
                'c7.1,0,12.9,5.8,12.9,12.9V118.8z"/>' +
                '</g>' +
                '<g>' +
                '<path class="st3_slack" d="M151.2,170.6c7.1,0,12.9,5.8,12.9,12.9c0,7.1-5.8,12.9-12.9,12.9c-7.1,0-12.9-5.8-12.9-12.9v-12.9H151.2z"/>' +
                '<path class="st3_slack" d="M151.2,164.1c-7.1,0-12.9-5.8-12.9-12.9c0-7.1,5.8-12.9,12.9-12.9h32.3c7.1,0,12.9,5.8,12.9,12.9' +
                'c0,7.1-5.8,12.9-12.9,12.9H151.2z"/>' +
                '</g>' +
                '</g>' +
                '</svg>';
            break;

        case 'basecamp':
            svg =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 36 36"><defs><style>.cls-1{fill:#fff;}.cls-2{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:3.41px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-2" d="M1.71,17.73c2.61-7.4,7.61-16,17.7-16S34.49,15,35.12,24c-2.65,4.6-9,6.33-15.71,6.33A18.87,18.87,0,0,1,5,24s3.16-8.53,6.11-8.55c2.17,0,4,4,5.73,4s5.33-7.68,5.33-7.68"></path></g></g></svg>';
            break;
        case 'dropbox':
            svg =
                '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 -5 73 73" xml:space="preserve"><style type="text/css">.st0_dropbox{fill:#FFF;}.st1_dropbox{display:none;}.st2_dropbox{display:inline;}.st3_dropbox{fill:none;}</style><path class="st0_dropbox" d="M37.6,12L18.8,24l18.8,12L18.8,48L0,35.9l18.8-12L0,12L18.8,0L37.6,12z M18.7,51.8l18.8-12l18.8,12l-18.8,12L18.7,51.8z M37.6,35.9l18.8-12L37.6,12L56.3,0l18.8,12L56.3,24l18.8,12L56.3,48L37.6,35.9z"></path></svg>';
            break;
        case 'shopify':
            svg =
                '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-10 0 127.5 127.5" xml:space="preserve"> <style type="text/css"> </style> <g>  <g> <path style="fill:#FFFFFF;" class="st0" d="M74.8,14.8c0,0-1.4,0.4-3.7,1.1c-0.4-1.3-1-2.8-1.8-4.4c-2.6-5-6.5-7.7-11.1-7.7c0,0,0,0,0,0 c-0.3,0-0.6,0-1,0.1c-0.1-0.2-0.3-0.3-0.4-0.5c-2-2.2-4.6-3.2-7.7-3.1c-6,0.2-12,4.5-16.8,12.2c-3.4,5.4-6,12.2-6.7,17.5 c-6.9,2.1-11.7,3.6-11.8,3.7c-3.5,1.1-3.6,1.2-4,4.5c-0.3,2.5-9.5,72.9-9.5,72.9l75.6,13.1V14.7C75.3,14.7,75,14.8,74.8,14.8z  M57.3,20.2c-4,1.2-8.4,2.6-12.7,3.9c1.2-4.7,3.6-9.4,6.4-12.5c1.1-1.1,2.6-2.4,4.3-3.2C57,12,57.4,16.9,57.3,20.2z M49.1,4.4 c1.4,0,2.6,0.3,3.6,0.9c-1.6,0.8-3.2,2.1-4.7,3.6c-3.8,4.1-6.7,10.5-7.9,16.6c-3.6,1.1-7.2,2.2-10.5,3.2 C31.8,19.1,39.9,4.6,49.1,4.4z M37.5,59.4c0.4,6.4,17.3,7.8,18.3,22.9c0.7,11.9-6.3,20-16.4,20.6c-12.2,0.8-18.9-6.4-18.9-6.4 l2.6-11c0,0,6.7,5.1,12.1,4.7c3.5-0.2,4.8-3.1,4.7-5.1c-0.5-8.4-14.3-7.9-15.2-21.7C23.9,51.8,31.5,40.1,48.3,39 c6.5-0.4,9.8,1.2,9.8,1.2l-3.8,14.4c0,0-4.3-2-9.4-1.6C37.5,53.5,37.4,58.2,37.5,59.4z M61.3,19c0-3-0.4-7.3-1.8-10.9 c4.6,0.9,6.8,6,7.8,9.1C65.5,17.7,63.5,18.3,61.3,19z"></path> <path class="st0" d="M78.2,124l31.4-7.8c0,0-13.5-91.3-13.6-91.9c-0.1-0.6-0.6-1-1.1-1c-0.5,0-9.3-0.2-9.3-0.2s-5.4-5.2-7.4-7.2 V124z"></path> </g> </g> </svg>';
            break;
        case 'evernote':
            svg =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="45 50 125 125"><path d="M84.13,79.19a6.71,6.71,0,0,1-1.32,4.5C81.51,84.9,79.48,85,78.31,85H65.51a67,67,0,0,0-7.4.2,10.49,10.49,0,0,0-2.3.7c-.15.06-.2,0-.1-.1L84.93,56.1c.1-.1.16-.06.1.1a10.49,10.49,0,0,0-.7,2.3,67,67,0,0,0-.2,7.4ZM111.28,169a15.24,15.24,0,0,1-5.89-6.9,15.08,15.08,0,0,1,14.14-20.63A4.48,4.48,0,0,1,124,146a4.56,4.56,0,0,1-2.33,3.93,5.62,5.62,0,0,1-1.7.58,7.25,7.25,0,0,0-3.29,1.08,4.45,4.45,0,0,0-1.78,3.51,5.52,5.52,0,0,0,1.6,3.9,9.52,9.52,0,0,0,6.8,2.8,12.29,12.29,0,0,0,12.3-12.3c0-6.1-4.1-11.5-9.5-13.9a18.65,18.65,0,0,0-3.3-1c-1.5-.3-2.9-.5-3-.5-4.2-.5-14.7-3.8-15.4-13.1,0,0-3.1,14-9.3,17.8a10.22,10.22,0,0,1-2.3.8,13.44,13.44,0,0,1-2.2.3c-10.1.6-20.8-2.6-28.2-10.2,0,0-5-4.1-7.6-15.6-.6-2.8-1.8-7.8-2.5-12.5-.3-1.7-.4-3-.5-4.2,0-4.85,3-8.2,6.75-8.67l.59,0H78.93c3.5,0,5.5-.9,6.8-2.1,1.7-1.6,2.1-3.9,2.1-6.6V59.55c0-.14,0-.47,0-.59.47-3.74,3.82-6.75,8.67-6.75h2.4a23.83,23.83,0,0,1,3.31.25,23.42,23.42,0,0,1,2.69.55c6.1,1.52,7.4,7.7,7.4,7.7l17.3,3c5.5,1,19.1,1.9,21.7,15.6,6.1,32.6,2.4,64.2,2.1,64.2-4.3,30.8-29.9,29.3-29.9,29.3A22.22,22.22,0,0,1,111.28,169Zm23.05-65.57c-3.31-.34-6.12,1-7.15,3.52a2.6,2.6,0,0,0-.28,1.4.81.81,0,0,0,.51.49,22.59,22.59,0,0,0,6.12,1.23c2.89.35,4.92.54,6.23.26a.81.81,0,0,0,.61-.36,2.5,2.5,0,0,0,.06-1.43C140,105.86,137.62,103.92,134.33,103.47Z" style="fill:#fff"></path></svg>';
            break;
        case 'planningcenter':
            svg =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 112">  <g class="currentLayer" style=""><g id="svg_1" class="">                            <path d="M70.82498907470702,45.863772888183604 l-11.7,3.466 a11.6,11.6 0 0 1 -7.13,0.07900000000000001 l-11.778,-3.5060000000000002 a0.7520000000000001,0.7520000000000001 0 0 0 -0.985,0.7090000000000001 v14.93 a0.934,0.934 0 0 0 0.6700000000000002,0.906 l14.417,4.333 a4.231,4.231 0 0 0 2.324,-0.04000000000000001 l14.536,-4.372 a0.97,0.97 0 0 0 0.6700000000000002,-0.906 V46.611772888183594 A0.776,0.776 0 0 0 70.82498907470702,45.863772888183604 z" fill="#fff" id="svg_8"></path>    <path d="M98.32898907470704,11.352772888183594 l-33.739,-10.035 a31.766000000000002,31.766000000000002 0 0 0 -18.109,0 l-33.741,10.035 a18.2,18.2 0 0 0 -12.74,17.36 v54.763 a18.2,18.2 0 0 0 12.74,17.36 l33.741,10.034 a31.766000000000002,31.766000000000002 0 0 0 18.109,0 l33.74,-10.034 a18.2,18.2 0 0 0 12.74,-17.36 V28.712772888183594 A18.2,18.2 0 0 0 98.32898907470704,11.352772888183594 zM81.89398907470704,66.19377288818359 a4.4190000000000005,4.4190000000000005 0 0 1 -3.19,4.215 l-20.485,6.264 a8.76,8.76 0 0 1 -5.318,0 L39.50798907470704,72.69377288818359 a0.2,0.2 0 0 0 -0.276,0.2 v9.887 a1.572,1.572 0 0 1 -2.048,1.5 l-6.855,-2.01 a1.608,1.608 0 0 1 -1.142,-1.536 v-40.85 a5.687,5.687 0 0 1 7.248,-5.4 l18.16,5.4 a3.374,3.374 0 0 0 1.772,-0.04000000000000001 l18,-5.4 a5.786,5.786 0 0 1 7.524,5.554 z" fill="#fff" id="svg_9"></path></g></g></svg>';
            break;
        case 'fitbit':
            svg =
                '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144"><defs><style>.fitbit-cls-1{fill:#00B0B9;}.fitbit-cls-2{fill:#00B0B9;}</style></defs><path class="fitbit-cls-1" d="M141.09,72A10.81,10.81,0,1,1,130.28,61.2,10.81,10.81,0,0,1,141.09,72ZM130.28,91.36a11.24,11.24,0,1,0,11.24,11.24A11.24,11.24,0,0,0,130.28,91.36Zm0,30.17A11.68,11.68,0,1,0,142,133.2,11.68,11.68,0,0,0,130.28,121.53Zm0,31a11.24,11.24,0,1,0,11.24,11.24A11.24,11.24,0,0,0,130.28,152.55Zm0,31a10.81,10.81,0,1,0,10.81,10.81A10.81,10.81,0,0,0,130.28,183.58ZM160,89.92a12.68,12.68,0,1,0,12.68,12.68A12.68,12.68,0,0,0,160,89.92Zm0,30.17a13.12,13.12,0,1,0,13.12,13.12A13.12,13.12,0,0,0,160,120.08Zm0,31a12.68,12.68,0,1,0,12.68,12.68A12.68,12.68,0,0,0,160,151.11Zm30.56-32.47a14.56,14.56,0,1,0,14.56,14.56A14.56,14.56,0,0,0,190.61,118.64ZM100.12,92.8a9.8,9.8,0,1,0,9.8,9.8A9.8,9.8,0,0,0,100.12,92.8Zm0,30.17a10.23,10.23,0,1,0,10.23,10.23A10.23,10.23,0,0,0,100.12,123Zm0,31a9.8,9.8,0,1,0,9.8,9.8A9.8,9.8,0,0,0,100.12,154ZM70,124.41a8.79,8.79,0,1,0,8.79,8.79A8.79,8.79,0,0,0,70,124.41Z" transform="translate(-61.17 -61.2)"></path></svg>';
            break;
        case 'apple':
            svg =
                //-93.59 0 1187.198 1187.198
                '<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" viewBox="-170 0 1287.198 1287.198"><g class="currentLayer" style="fill: #fff;"><path d="m 979.04184,925.18785 c -17.95397,41.47737 -39.20563,79.65705 -63.82824,114.75895 -33.56298,47.8528 -61.04356,80.9761 -82.22194,99.3698 -32.83013,30.192 -68.00529,45.6544 -105.67203,46.5338 -27.04089,0 -59.6512,-7.6946 -97.61105,-23.3035 -38.08442,-15.5358 -73.08371,-23.2303 -105.08578,-23.2303 -33.56296,0 -69.55888,7.6945 -108.06101,23.2303 -38.5608,15.6089 -69.62484,23.7432 -93.37541,24.5493 -36.12049,1.5389 -72.1237,-14.3632 -108.06101,-47.7796 -22.93711,-20.0059 -51.62684,-54.3017 -85.99592,-102.8874 C 92.254176,984.54592 61.937588,924.38175 38.187028,855.7902 12.750995,781.70252 0,709.95986 0,640.50361 0,560.94181 17.191859,492.32094 51.626869,434.81688 78.689754,388.62753 114.69299,352.19192 159.75381,325.44413 c 45.06086,-26.74775 93.74914,-40.37812 146.18212,-41.25019 28.68971,0 66.3125,8.8744 113.06613,26.31542 46.62174,17.49964 76.55727,26.37404 89.68198,26.37404 9.8124,0 43.06758,-10.37669 99.4431,-31.06405 53.31237,-19.18512 98.30724,-27.12887 135.16787,-23.99975 99.8828,8.06098 174.92313,47.43518 224.82789,118.37174 -89.33023,54.12578 -133.51903,129.93556 -132.63966,227.18753 0.8061,75.75115 28.28668,138.78795 82.2952,188.8393 24.47603,23.23022 51.81008,41.18421 82.22186,53.93522 -6.59525,19.12648 -13.557,37.44688 -20.95846,55.03446 z M 749.96366,23.751237 c 0,59.37343 -21.69138,114.810233 -64.92748,166.121963 -52.17652,60.99961 -115.28658,96.24803 -183.72426,90.68597 -0.87204,-7.12298 -1.37769,-14.61967 -1.37769,-22.49743 0,-56.99843 24.81315,-117.99801 68.87738,-167.873453 21.99909,-25.25281 49.978,-46.25018 83.90738,-63.00018 C 686.57507,10.688027 718.59913,1.5631274 748.71783,5.2734376e-4 749.59727,7.9378274 749.96366,15.875627 749.96366,23.750467 Z" id="path4"></path></g></svg>';
            break;
        case 'twitch':
            svg =
                '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 2400 2800" style="enable-background:new 0 0 2400 2800;" xml:space="preserve"><style type="text/css"></style><g><polygon style="fill:#FFFFFF;" class="st0" points="2200,1300 1800,1700 1400,1700 1050,2050 1050,1700 600,1700 600,200 2200,200 "/><g><g id="Layer_1-2"><path d="M500,0L0,500v1800h600v500l500-500h400l900-900V0H500z M2200,1300l-400,400h-400l-350,350v-350H600V200h1600V1300z"/><rect x="1700" y="550" width="200" height="600"/><rect x="1150" y="550" width="200" height="600"/></g></g></g></svg>';
            break;
        case 'salesforce':
            svg =
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" version="1.1"><g id="surface1"><path d="M36.5 12c-1.324 0-2.59.258-3.758.703A7.994 7.994 0 0 0 26 9c-2.105 0-4.02.82-5.445 2.152A9.468 9.468 0 0 0 13.5 8C8.254 8 4 12.254 4 17.5c0 .793.11 1.559.29 2.293A8.472 8.472 0 0 0 1 26.5C1 31.195 4.805 35 9.5 35c.414 0 .816-.04 1.215-.098 1.312 3 4.3 5.098 7.785 5.098 3.16 0 5.914-1.73 7.379-4.293A7.923 7.923 0 0 0 28 36c2.621 0 4.938-1.266 6.398-3.21.68.136 1.383.21 2.102.21C42.3 33 47 28.3 47 22.5S42.3 12 36.5 12z" fill="#039BE5"/></g></svg>';
            break;
        case 'local':
            svg =
                //'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17 9.761v-4.761c0-2.761-2.238-5-5-5-2.763 0-5 2.239-5 5v4.761c-1.827 1.466-3 3.714-3 6.239 0 4.418 3.582 8 8 8s8-3.582 8-8c0-2.525-1.173-4.773-3-6.239zm-8-4.761c0-1.654 1.346-3 3-3s3 1.346 3 3v3.587c-.927-.376-1.938-.587-3-.587s-2.073.211-3 .587v-3.587zm3 17c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zm2-6c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2z"/></svg>';
            `<svg xmlns="http://www.w3.org/2000/svg" width="23.617" height="32.644" viewBox="0 0 23.617 32.644">
  <g id="Group_15579" data-name="Group 15579" transform="translate(-3057.555 565.704)">
    <g id="Group_15578" data-name="Group 15578" transform="translate(3057.555 -565.704)">
      <g id="Group_352" data-name="Group 352" transform="translate(0 0)">
        <path id="Path_284" data-name="Path 284" d="M1273.394,702.939v-.018l-.014-.049a11.938,11.938,0,0,0-3.113-4.8l-.072-4.173a8.131,8.131,0,0,0-16.26.277l.072,4.177a11.9,11.9,0,0,0-2.945,4.905l-.013.054v.013a11.787,11.787,0,1,0,23.06,3.212A13,13,0,0,0,1273.394,702.939Zm-15.867-8.823a4.524,4.524,0,1,1,9.046-.156l.031,1.809a11.869,11.869,0,0,0-9.046.157l-.031-1.809Zm4.878,20.723a8.134,8.134,0,1,1,7.991-8.273A8.1,8.1,0,0,1,1262.4,714.84Z" transform="translate(-1250.494 -685.905)" fill="#fff"/>
        <circle id="Ellipse_5" data-name="Ellipse 5" cx="3.314" cy="3.314" r="3.314" transform="translate(8.461 17.29)" fill="#fff"/>
      </g>
    </g>
  </g>
</svg>`;
            break;
    }
    return svg;
};

const uuidv4 = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


export default {
    findElement,
    addView,
    initView,
    addBlock,
    addButton,
    svgIcons_e,
    svgButtons_e,
    svgIcons,
    svgButtons,
    init,
    uuidv4,
    applyData,
    getData,
    unsetData,
    svgPoweredByFooter,
    loadSVG
};
