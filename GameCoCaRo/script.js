const form = document.querySelector('form');
const table = document.createElement('table');
const table_game = document.querySelector('.table-game');
const txtwin = document.querySelector('h1');
const body = document.querySelector('body');
const wrap_resetbtn = document.querySelector('.wrap-reset-btn');
const resetbtn = document.getElementById('resetbtn');
let turnPeople = false, buttons, numRange, listButton = [];

function handleSubmition(e) {
    e.preventDefault();
    listButton = [];
    txtwin.innerHTML = "";
    numRange = parseInt(this.numTxt.value) < 3 ? 3 : parseInt(this.numTxt.value) > 20 ? 20 : parseInt(this.numTxt.value) || 3;
    createTable(numRange);
    buttons = table.querySelectorAll('td');
    listButton
    for (let i = 0; i < numRange; i++) {
        listButton[i] = [];
        for (let j = 0; j < numRange; j++) {
            listButton[i].push(buttons[numRange * i + j]);
        }
    }
    buttons.forEach(value => value.addEventListener('click', handleClickPlay));
    this.querySelector('#numTxt').value = '';
}

function handleClickPlay(e) {
    if (turnPeople === true && this.dataset.click === "0") {// true
        this.style.background = '#007F54';
        turnPeople = false;
        this.dataset.click = "1";
        if (checkWin()) {
            txtwin.innerHTML = `Người chơi 2 thắng`;
            buttons.forEach(value => value.removeEventListener('click', handleClickPlay));
            turnPeople = false;
            wrap_resetbtn.style.visibility = 'visible';
        }
        if (checkEmpty() === false) {
            ///het
            txtwin.innerHTML = `Hết đường đi`;
            wrap_resetbtn.style.visibility = 'visible';
        }
    }
    else if (turnPeople === false && this.dataset.click === "0") { //false
        this.style.background = '#322275';
        turnPeople = true;
        this.dataset.click = "2";
        if (checkWin()) {
            txtwin.innerHTML = `Người chời 1 thắng`;
            buttons.forEach(value => value.removeEventListener('click', handleClickPlay));
            turnPeople = false;
            wrap_resetbtn.style.visibility = 'visible';
        }
        if (checkEmpty() === false) {
            ///het
            txtwin.innerHTML = `Hết đường đi`;
            wrap_resetbtn.style.visibility = 'visible';
        }
    }
}

function checkRow() {
    for (let i = 0; i < listButton.length; i++) {
        for (let j = 0; j < listButton.length - 2; j++) {
            if (listButton[i][j].dataset.click === listButton[i][j + 1].dataset.click && listButton[i][j].dataset.click === listButton[i][j + 2].dataset.click && listButton[i][j].dataset.click !== "0") {
                return true;
            }
        }
    }
    return false;
}
function checkCol() {
    for (let i = 0; i < listButton.length; i++) {
        for (let j = 0; j < listButton.length - 2; j++) {
            if (listButton[j][i].dataset.click === listButton[j + 1][i].dataset.click && listButton[j][i].dataset.click === listButton[j + 2][i].dataset.click && listButton[j][i].dataset.click !== "0") {
                return true;
            }
        }
    }
    return false;
}

function checkcheo1() {
    for (let i = 0; i < listButton.length - 2; i++) {
        for (let j = 0; j < listButton.length - 2; j++) {
            if (listButton[i][j].dataset.click === listButton[i + 1][j + 1].dataset.click && listButton[i][j].dataset.click === listButton[i + 2][j + 2].dataset.click && listButton[i][j].dataset.click !== "0") {
                return true;
            }
        }
    }
    return false;
}

function checkcheo2() {
    for (let i = 0; i < listButton.length - 2; i++) {
        for (let j = listButton.length - 1; j > 1; j--) {
            if (listButton[i][j].dataset.click === listButton[i + 1][j - 1].dataset.click && listButton[i][j].dataset.click === listButton[i + 2][j - 2].dataset.click && listButton[i][j].dataset.click !== "0") {
                return true;
            }
        }
    }
    return false;
}

function checkWin(person, index) {
    return checkRow() || checkCol() || checkcheo1() || checkcheo2();
}

function checkEmpty() {
    let check = 0;
    buttons.forEach((value => {
        if (value.dataset.click === "0") check = 1;
    }));
    return check === 1 ? true : false;
}

function createTable(n) {
    let innerTable = "";
    const heightTable = 500;
    const heiEachTd = Math.floor(500 / n);
    for (let i = 0; i < n; i++) {
        innerTable += `<tr>`;
        for (let j = 0; j < n; j++) {
            innerTable += `<td data-click="0" style="Height:${heiEachTd}px;Width:${heiEachTd}px"></td>`;
        }
        innerTable += `</tr>`;
    }
    table.innerHTML = innerTable;
    table_game.append(table);
}


form.addEventListener('submit', handleSubmition);


function handleResetGame(e) {
    location.reload();
}
resetbtn.addEventListener('click', handleResetGame);