
function createPhoneNumber(mask = "") {
    const test = /^\+[0-9XI*]{1}\([0-9XI*]{3}\)[0-9XI*]{3}-[0-9XI*]{2}-[0-9XI*]{2}/;
    if (test.test(mask) !== true)
        return;
    let i = 0;

    let number = document.createElement('phone-number');
    let inner = '<div class="phone-number">';
    let brackets = '+()-';
    for (let char of mask) {
        if (brackets.indexOf(char) !== -1) {
            inner += '<div class="phone-text">' + char + '</div>';
        } else if (char === '*'){
            inner += `<input id="${i}" type="text" class="phone-input" disabled value="&#10625;" maxlength="1"/>`;
            i++;
        } else if (char === 'X') {
            inner += `<input id="${i}" type="text" class="phone-input" disabled value="X" maxlength="1"/>`;
            i++;
        } else if (char === 'I') {
            inner += '<input  id="${i}" type="text" class="phone-input" placeholder="_" maxlength="1"/>';
            i++;
        } else {
            inner += `<input id="${i}" type="text" class="phone-input" placeholder="_" value="${char}" disabled maxlength="1"/>`;
            i++;
        }
    }
    inner += ' </div>';
    number.innerHTML = inner;
    number.value = mask;
    return number;
}

function createPhoneNumber2(mask = "") {
    const test = /^\+[0-9XI*]{1}\([0-9XI*]{3}\)[0-9XI*]{3}-[0-9XI*]{2}-[0-9XI*]{2}/;
    if (test.test(mask) !== true)
        return;
    let i = 0;

    const number = document.createElement('phone-number');
    const div = document.createElement('div');
    div.classList.add('phone-number');
    number.appendChild(div);
    let brackets = '+()-';
    number.value = mask;
    for (let char of mask) {
        if (brackets.indexOf(char) !== -1) {
            const el = document.createElement('div');
            el.className = 'phone-text';
            el.innerHTML = char;
            el.id = i;
            div.appendChild(el);
        } else {
            const el = document.createElement('input');
            el.className = 'phone-input';
            el.type = 'text';
            el.maxLength = 1;
            el.id = i;
            el.placeholder = '_';
            if (char === '*') {
                el.value = '\u2981';
                el.disabled = true;
            } else if (char === 'X') {
                el.disabled = true;
                el.value = 'X';
            } else if (char === 'I') {
                el.addEventListener('change', () => {
                    const n = number.value.slice(0, el.id) + el.value + number.value.slice(parseInt(el.id)+1);
                    number.value = n;
                });

            } else {
                el.value = char;
                el.disabled = true;
            }
            div.appendChild(el);
        }
        i++;
    }

    return number;
}


let a = document.querySelector('.main');
a.appendChild(createPhoneNumber2('+7(909)***-II-XX'));
a.appendChild(createPhoneNumber('+8(999)III-II-XX'));