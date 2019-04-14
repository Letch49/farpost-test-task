export const isExists = (parent, child) => parent.querySelector(child) != null ? true : false;
export const isNotExists = (parent, child) => !isExists(parent, child);
export const isExistsInDocument = (el) => isExists(document, el);

export const removeIsExists = (parent, child) => {
    if (isExists(parent, child) === true) {
        parent.querySelector(child).remove();
    }
};

export const removeIsExistsMany = (parent, ...colltect) => {
    colltect.forEach(item => {
        removeIsExists(parent, item);
    });
};

export const isExistsAction = (parent, child, action) => isExists(parent, child) ? action() : null;
export const isNotExistsAction = (parent, child, action) => isNotExists(parent, child) ? action() : null;
export const isNotExistsMultyAction = (parent,action, ...children) => {
    if(children.every(node => isNotExists(parent, node))) {
        action();
    }
};

export const toNext = (id) => {
    id = new Number(id) + 1;
    document.querySelector('.focus').classList.remove('.focus');
    const el = document.getElementById(id);
    if (document.getElementById(id)) {
        el.classList.add('focus');
        el.scrollIntoView({ behavior: 'smooth', block : 'start' });
        el.dispatchEvent(new Event('click'));
    }
};

export const prepeareData = (el) => {
    if (isNotExists(el,'.decision')) {
        alert('Обработайте все заявки в ленте');
    }
    const status = el.querySelector('.decision').innerHTML.split(' ').pop();
    const message = el.querySelector('.comment') ? el.querySelector('.comment').innerHTML : null;
    const getOneOrTwo = () => Math.random() * 100 >= 50 ? 1 : 2;
    if(status === 'Отклонить' && !message) {
        alert(`Укажите причину отклонения для объявления №${el.id}`);
        return;
    }
    return {
        id: el.id,
        workers_id: getOneOrTwo(),
        status: status,
        message: message
    };
};

export const initItems = (selector) => [...document.querySelectorAll(selector)].map((el, index, list) => {
    if (index === 0) {
        el.classList.add('focus');
    }
    el.addEventListener('click', () => {
        list.map(e => e.classList.remove('focus'));
        el.classList.add('focus');
    });
    return el;
});

export const clickF7KeyPsudoEvent = (selector, ev1,ev2) => {
    selector.removeEventListener('keyup', ev1);
    selector.addEventListener('keyup', ev2);
    const clickF7 = new KeyboardEvent('keyup', { keyCode: 118 });
    selector.dispatchEvent(clickF7);
};

export default (url = '/',data,callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback();
        } else {
            console.log(xhr.status, xhr.readyState);
        }
    };
    xhr.send(data);
};