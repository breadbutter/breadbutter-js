const HOLDER_ID = 'breadbutter-ui-loader-holder';
const LOADER_ID = 'util-loader';
const CHECKMARK_ID = 'util-loader-checkmark';
const ERROR_ID = 'util-loader-error';

let loading = false;
import './loader.scss';

const findChild = function (container, child) {
    let c = false;
    for (let i = 0; i < container.children.length; i++) {
        if (container.children[i].classList.contains(child)) {
            c = container.children[i];
        }
    }
    return c;
};

const addView = function (id) {
    const container = document.createElement('div');
    container.classList.add(id);
    return container;
};

const hide = function (div) {
    div.style.display = 'none';
};

const addLoader = function (top) {
    let holder = addView(HOLDER_ID);
    let loader = addView(LOADER_ID);
    let checkmark = addView(CHECKMARK_ID);
    checkmark.innerHTML = `
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 40" style="enable-background:new 0 0 40 40;" xml:space="preserve">
<g>
<path class="st0" d="M40,20c0,11.04-8.96,20-20,20S0,31.04,0,20S8.96,0,20,0S40,8.96,40,20z M36,20c0-8.84-7.16-16-16-16
S4,11.16,4,20s7.16,16,16,16S36,28.84,36,20z"/>
<g>
<path d="M30.23,14.17l-9.46,14.27c-0.28,0.42-0.71,0.72-1.2,0.83c-0.02,0.01-0.05,0.01-0.07,0.02
c-0.52,0.09-1.06-0.03-1.49-0.34l-8.28-6c-0.87-0.63-1.07-1.85-0.44-2.73c0.63-0.87,1.85-1.07,2.72-0.43l6.64,4.81l8.34-12.58
c0.59-0.9,1.81-1.14,2.7-0.55C30.58,12.07,30.83,13.28,30.23,14.17z"/>
</g>
</g>
</svg>
`;
    let error = addView(ERROR_ID);
    error.innerHTML = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 40" style="enable-background:new 0 0 40 40;" xml:space="preserve">
<g>
<path class="st0" d="M27.26,15.54l-4.36,4.46l4.36,4.46c0.8,0.82,0.8,2.15,0,2.97c-0.8,0.82-2.1,0.82-2.9,0L20,22.97l-4.36,4.46
c-0.8,0.82-2.1,0.82-2.9,0c-0.8-0.82-0.8-2.15,0-2.97l0,0L17.1,20l-4.36-4.46c-0.8-0.82-0.8-2.15,0-2.97c0.8-0.82,2.1-0.82,2.9,0
L20,17.03l4.36-4.46c0.8-0.82,2.1-0.82,2.9,0C28.06,13.39,28.06,14.72,27.26,15.54L27.26,15.54z"/>
<path class="st0" d="M40,20c0,11.04-8.96,20-20,20S0,31.04,0,20S8.96,0,20,0S40,8.96,40,20z M36,20c0-8.84-7.16-16-16-16
S4,11.16,4,20s7.16,16,16,16S36,28.84,36,20z"/>
</g>
</svg>

  `;
    holder.appendChild(loader);
    loader.appendChild(checkmark);
    loader.appendChild(error);
    top.appendChild(holder);
    loading = holder;
};

const start = function (top, infinite, small, transparent) {
    //add mask, add animation
    // console.log('start');
    if (!top) {
        return;
    }

    if (top.parentElement.classList.contains('breadbutter-discovery-holder')) {
        top = top.parentElement;
    }

    if (!loading) {
        addLoader(top);
        if (infinite) {
            let loader = findChild(loading, LOADER_ID);
            loader.classList.add('bb-loading');
        }
    } else {
        top.appendChild(loading);
    }

    if (small) {
        loading.classList.add('bb-small');
    }
    if (transparent) {
        loading.classList.add('bb-transparent');
    }

    top.classList.add('bb-loading-parent');
};

const success_hold = function () {
    return loadIcon('bb-success', true);
};

const success = function () {
    return loadIcon('bb-success');
};

const failure = function () {
    return loadIcon('bb-failure');
};

const failure_hold = function () {
    return loadIcon('bb-failure', true);
};

const loadIcon = function (icon, stay) {
    return new Promise((resolve) => {
        if (loading) {
            let loader = findChild(loading, LOADER_ID);
            loader.classList.add('bb-complete');
            // setTimeout(()=> {
            loader.classList.add(icon);
            setTimeout( ()=> {
                if (!stay) {
                    remove();
                }
                resolve();
            }, 1000);
            // }, 10);
        } else {
            resolve();
        }
    });
};

const remove = function () {
    if (loading) {
        let top = loading.parentElement;
        top.classList.remove('bb-loading-parent');
        loading.remove();
        loading = false;
    }

    let top_loader = document.querySelector('.bb-loading-parent');
    if (top_loader)
        top_loader.classList.remove('bb-loading-parent');
};

export default {
    start,
    success,
    success_hold,
    failure,
    failure_hold,
    remove,
};
