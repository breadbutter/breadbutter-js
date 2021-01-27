const TEXT_ID = 'breadbutter-ui-hover-text';
const HOLDER_ID = 'breadbutter-ui-hover-holder';
const ARROW_ID = 'breadbutter-ui-hover-arrow';

let currentView = false;

const findChild = function (container, child) {
    let c = false;
    for (let i = 0; i < container.children.length; i++) {
        if (container.children[i].classList.contains(child)) {
            c = container.children[i];
        }
    }
    return c;
};

const getOffset = function (el) {
    let _x = 0;
    let _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
};

const addView = function (id) {
    if (!id) id = HOLDER_ID;
    const container = document.createElement('div');
    container.classList.add(id);
    return container;
};

const createView = function () {
    let holder = addView();
    let text = addView(TEXT_ID);
    let arrow = addView(ARROW_ID);
    holder.appendChild(text);
    holder.appendChild(arrow);
    holder.classList.add('hide');
    document.body.append(holder);
    currentView = holder;
};

const hideView = function () {
    if (currentView) {
        currentView.classList.add('hide');
    }
};

const updateText = function (text) {
    if (currentView) {
        let text_view = findChild(currentView, TEXT_ID);
        text_view.innerHTML = text;
    }
};

const adjustView = function (target) {
    if (currentView) {
        let hover_width = currentView.offsetWidth;
        let hover_height = currentView.offsetHeight;

        let { top, left } = getOffset(target);
        let width = target.offsetWidth;
        let height = target.offsetHeight;
        let height_center = top + height / 2;
        let width_center = left + width / 2;

        let view_width = window.innerWidth;
        let view_height = window.innerHeight;

        let arrow_top = false;
        let arrow_position = 0;

        let target_left = 0;
        let target_top = 0;

        if (width_center < view_width / 4) {
            arrow_position = -1;
        } else if (width_center > (view_width / 4) * 3) {
            arrow_position = 1;
        }

        if (height_center < view_height / 3) {
            arrow_top = true;
        }

        let pos_ver = false;
        let pos_hor = false;
        switch (arrow_position) {
            case -1:
                target_left = left + width / 2;
                pos_hor = 'left';
                break;
            case 0:
                target_left = left - (hover_width - width) / 2;
                break;
            case 1:
                target_left = left - (hover_width - width) - width / 2;
                pos_hor = 'right';
                break;
        }
        switch (arrow_top) {
            case true:
                target_top = top + height + 20;
                pos_ver = 'top';
                break;
            case false:
                target_top = top - hover_height - 20;
                pos_ver = 'bottom';
                break;
        }

        currentView.style.top = target_top + 'px';
        currentView.style.left = target_left + 'px';
        let arrow_view = findChild(currentView, ARROW_ID);
        arrow_view.classList.remove('left');
        arrow_view.classList.remove('right');
        arrow_view.classList.remove('top');
        arrow_view.classList.remove('bottom');
        if (pos_ver) {
            arrow_view.classList.add(pos_ver);
        }
        if (pos_hor) {
            arrow_view.classList.add(pos_hor);
        }
    }
};

const showView = function (text, target) {
    if (!currentView) {
        createView();
    }
    updateText(text);
    currentView.classList.remove('hide');

    adjustView(target);
};

const addHoverEffect = function (target, text) {
    target.addEventListener('mouseenter', function (e) {
        showView(text, target);
    });
    target.addEventListener('mouseleave', function (e) {
        hideView();
    });
};

export default {
    addHoverEffect,
};
