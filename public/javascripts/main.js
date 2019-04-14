import { ruStatesOfRibbonItem, colorsOfRibbonItem } from './maps.js';
import jsonRequest, { toNext as scrollToNextId, prepeareData as prepeareBeforeSend, removeIsExistsMany, initItems as initRibbon, clickF7KeyPsudoEvent, isNotExistsAction, isNotExistsMultyAction } from './fn.js';

const html = document.querySelector('.app');

html.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        const hello = document.querySelector('#hello');
        hello.classList.add('animation-move');
        setTimeout(() => {
            hello.remove();
            clickF7KeyPsudoEvent(html, keyboardEvents, loadNewListEvent);
        }, 1000, html, keyboardEvents, loadNewListEvent);
    }
}, { once: true });

html.addEventListener('keypress', (e) => {
    e.preventDefault();
});

const createTextArea = (className, placeholder) => {
    const textArea = document.createElement('textarea');
    textArea.classList.add(className);
    textArea.placeholder = placeholder;
    textArea.addEventListener('keypress', (e) => {
        html.removeEventListener('keyup', keyboardEvents, { once: true });
        html.removeEventListener('keyup', cancelLinkEvent, { once: true });

        e.target.value += e.key === 'Enter' ? '' : e.key;

        if (e.key === 'Enter') {
            html.addEventListener('keyup', keyboardEvents);
            html.addEventListener('keyup', cancelLinkEvent);

            document.querySelector('.focus').querySelector('.btns-ribbon').append(createSpan('comment', e.target.value));
            document.querySelector('.focus').querySelector('textarea').remove();

            scrollToNextId(document.querySelector('.focus').id); // get the next id of item and go it
        }
    });
    return textArea;
};

const createSpan = (className, text) => {
    const span = document.createElement('span');
    span.classList.add(className);
    span.innerHTML = text;
    return span;
};

const createCancelLink = () => {
    const div = document.createElement('div');
    div.classList.add('cancel-link');
    const link = document.createElement('a');
    link.innerHTML = 'Отменить решение ';
    link.href = '#';
    const helpText = createSpan('text-gray', 'ctrl + z');
    html.addEventListener('keyup', cancelLinkEvent);
    div.append(link, helpText);
    return div;
};


const loadNewListEvent = (e) => {
    if (e.keyCode === 118) {
        fetch('/objects/').then((res) => {
            return res.text();
        }).then(result => {
            document.querySelector('.app').innerHTML = result;
            initRibbon('.ribbon');
            html.removeEventListener('keyup', loadNewListEvent);
            html.addEventListener('keyup', keyboardEvents);
        });
    }
};

const cancelLinkEvent = (e) => {
    const el = html.querySelector('.focus');
    if (e.ctrlKey && e.keyCode === 90) {
        const btnsRibbon = el.querySelector('.btns-ribbon').querySelectorAll('div');
        [...btnsRibbon].map(btn => btn.style.opacity = 1);
        html.removeEventListener('keyup', cancelLinkEvent);
        removeIsExistsMany(el, '.cancel-link', '.decision', 'textarea', '.comment');
    }
};

const keyboardEvents = (e) => {
    const ribbon = document.querySelector('.focus');

    if (e.keyCode === 46 || e.keyCode === 32 || (e.shiftKey && e.keyCode === 13)) {
        const btnsRibbon = ribbon.querySelector('.btns-ribbon');

        const decision = createSpan('d-block', `Ваше решение: ${ruStatesOfRibbonItem.get(e.keyCode)}`);
        decision.classList.add('decision', colorsOfRibbonItem.get(e.keyCode));

        isNotExistsAction(btnsRibbon, '.decision', () => btnsRibbon.append(decision));

        [...btnsRibbon.querySelectorAll('div:not(.cancel-link)')].map(btn => btn.style.opacity = '.2');

        isNotExistsAction(btnsRibbon, '.cancel-link', () => btnsRibbon.append(createCancelLink()));
    }

    if (e.keyCode === 32) { // space
        scrollToNextId(ribbon.id); // get the next id of item and go it
    }

    if (e.keyCode === 118) { // F7
        const data = JSON.stringify([...document.querySelectorAll('.ribbon')].map(el => prepeareBeforeSend(el)));
        jsonRequest('/', data, () => {
            clickF7KeyPsudoEvent(html, keyboardEvents, loadNewListEvent);
            html.scrollIntoView({ behavior: 'smooth', block : 'start' });
        });
        return;
    }

    if (e.shiftKey && e.keyCode === 13 || e.keyCode === 46) { //shift + enter and delete
        const headerPlaceholder = e.keyCode === 46 ? 'Укажите причину удаления' : 'Укажите комментарий старшему оператору';
        const tailPlaceholder = '\nПосле заполнения нажать Enter чтобы перейти к следующему элементу';
        const area = createTextArea('textarea', `${headerPlaceholder} ${tailPlaceholder}`, ribbon);
        const btnsRibbon = ribbon.querySelector('.btns-ribbon');
        isNotExistsMultyAction(btnsRibbon, () => {
            btnsRibbon.append(area);
            btnsRibbon.querySelector('textarea').focus();
        }, 'textarea ', '.comment');
    }
};