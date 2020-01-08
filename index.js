
function createPhoneNumber(mask = '') {
    const test = /^\+[0-9XI*]{1}\([0-9XI*]{3}\)[0-9XI*]{3}-[0-9XI*]{2}-[0-9XI*]{2}/;
    if (test.test(mask) !== true)
        return;

    let i = 0;
    const number = document.createElement('phone-number');
    const div = document.createElement('div');
    div.classList.add('phone-number');
    div.classList.add('js-number-div');
    number.appendChild(div);
    number.value = mask;
    number.errorFlag = false;

    const brackets = '+()-';
    for (const char of mask) {
        if (brackets.indexOf(char) !== -1) {
            const el = document.createElement('div');
            el.className = 'phone-text';
            el.innerHTML = char;
            el.id = 'id'+i;
            el.name = i;
            div.appendChild(el);
        } else {
            const el = document.createElement('input');
            el.className = 'phone-input';
            el.type = 'text';
            el.maxLength = 1;
            el.id = 'id' + i;
            el.name = i;
            el.placeholder = '_';
            if (char === '*') {
                el.value = '\u2981';
                el.disabled = true;
            } else if (char === 'X') {
                el.disabled = true;
                el.value = 'X';
            } else if (char === 'I') {
                el.addEventListener('change', () => {
                    if (!parseInt(el.value)) {
                        number.errorOn();
                    } else {
                        number.errorOff();
                    }
                    const v = el.value || 'I';
                    number.value = number.value.slice(0, parseInt(el.name)) + v +
                        number.value.slice(parseInt(el.name)+1);
                });
            } else {
                el.value = char;
                el.disabled = true;
            }
            div.appendChild(el);
        }
        i++;
    }

    number.update = function(mask='') {
        const test = /^\+[0-9XI*]{1}\([0-9XI*]{3}\)[0-9XI*]{3}-[0-9XI*]{2}-[0-9XI*]{2}/;
        if (test.test(mask) !== true)
            return;
        const val = this.value;
        const div = this.querySelector('.js-number-div');
        i = 0;
        const brackets = '+()-';
        number.value = mask;
        for (const char of mask) {
            if (char === val[i]) {
                i++;
                continue;
            }
            if (brackets.indexOf(char) !== -1) {
                const el = div.querySelector(`#id${i}`);
                el.innerHTML = char;
            } else {
                const el = div.querySelector(`#id${i}`);
                if (char === '*') {
                    el.value = '\u2981';
                    el.disabled = true;
                } else if (char === 'X') {
                    el.disabled = true;
                    el.value = 'X';
                } else if (char === 'I') {
                    el.disabled = false;
                    el.value = null;
                    el.addEventListener('change', () => {
                        if (!parseInt(el.value)) {
                            number.errorOn();
                        } else {
                            number.errorOff();
                        }
                        const v = el.value || 'I';
                        number.value = number.value.slice(0,parseInt(el.name)) + v +
                            number.value.slice(parseInt(el.name)+1);
                    });
                } else {
                    el.value = char;
                    el.disabled = true;
                }
            }
            i++;
        }
        if (this.errorFlag) {
            this.errorOn(this.errorMsg);
        }
    };

    number.errorOn = function(text='Неверный номер, попробуйте еще раз.') {
        this.errorFlag = true;
        this.errorMsg = text;
        const el = this.querySelector('.js-number-error');
        if (el) {
            this.removeChild(el);
        }
        const error = document.createElement('div');
        error.className = 'phone-number__error js-number-error';
        error.innerText = text;
        this.appendChild(error);
        const div = this.querySelector('.js-number-div');
        const ch = div.children;
        for (let i = 0; i < ch.length; i++ ) {
            if (ch[i].disabled === false) {
                ch[i].classList.add('phone-input_error');
            }
        }
    };
    number.errorOff = function () {
        this.errorFlag = false;
        const el = this.querySelector('.js-number-error');
        if (el) {
            this.removeChild(el);
        }
        const ch = div.querySelectorAll('.phone-input_error');
        for (let i = 0; i < ch.length; i++ ) {
            ch[i].classList.remove('phone-input_error');
        }
    };
    return number;
}

let a = document.querySelector('.main');
a.appendChild(createPhoneNumber('+7(909)***-II-XX'));
a.appendChild(createPhoneNumber('+8(999)III-II-XX'));