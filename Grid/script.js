const inprow = document.querySelector('#row');
const inpcol = document.querySelector('#column');
const button = document.querySelector('#inpsubmit');
const headerTable = document.querySelector('.wrap-header');
const dataTable = document.querySelector('.wrap-data');
const infiMode = document.querySelector('#button-infinity');
let row, col,mode,data = [];
function handleClickButtonSubmit(e) {
    mode=1;
    e.preventDefault();
    row = parseInt(inprow.value)||1;
    col = parseInt(inpcol.value) || 10;
    inpcol.value = '';
    inprow.value = '';
    data=[];
    handleDisplayRandomNumber();
}

function handleDisplayRandomNumber() {
    let header = '<tr>';
    for (let i = 1; i <= col; i++) {
        header += `<th style="width:${1000 / col}px">${i}</th>`;
    }
    header += '</tr>';
    headerTable.innerHTML = header;
    for (let i = 0; i < row; i++) {
        data[i] = [];
        for (let j = 0; j < col; j++) {
            data[i].push(Math.floor(Math.random() * 1000) + 1);
        }
    }
    let stringData = '';
    for (let i = 0; i < row; i++) {
        stringData += '<tr>';
        for (let j = 0; j < col; j++) {
            stringData += `<td style="width:${1000 / col}px">${data[i][j]}</td>`
        }
        stringData += '</tr>'
    }
    dataTable.innerHTML = stringData;
    const headers = document.querySelectorAll('.wrap-header tr th');
    headers.forEach((value) => value.addEventListener('click', sortArray));

}
function sortArray(e) {
    const temp = parseInt(e.target.innerText) - 1;
    data.sort((param1, param2) => {
        return param1[temp] > param2[temp] ? 1 : param1[temp] === param2[temp] ? 0 : -1;
    });
    let stringData = '';
    for (let i = 0; i < data.length; i++) {
        stringData += '<tr>';
        for (let j = 0; j < data[i].length; j++) {
            stringData += `<td style="width:${1000 / data[i].length}px">${data[i][j]}</td>`
        }
        stringData += '</tr>'
    }
    dataTable.innerHTML = stringData;

}

function cleardata(){
    data=[];
    headerTable.innerHTML='';
    handleInfinityMode();
}

function handleInfinityMode() {
    let header = '<tr>';
    for (let i = 1; i <= 10; i++) {
        header += `<th style="width:${1000 / 10}px">${i}</th>`;
    }
    header += '</tr>';
    headerTable.innerHTML = header;

    let inpdata = '';
    for (let i = 0; i < 100; i++) {
        const dataTemp = [];
        for (let j = 0; j < 10; j++) {
            dataTemp.push(Math.floor(Math.random() * 1000) + 1);
        }
        data.push(dataTemp);
    }
    for (let i = 0; i < data.length; i++) {
        inpdata += '<tr>';
        for (let j = 0; j < data[i].length; j++) {
            inpdata += `<td style="width:${1000 / 10}px">${data[i][j]}</td>`
        }
        inpdata += '</tr>';
    }
    dataTable.innerHTML = inpdata;
    function handleScroll(e){
        if (window.scrollY+window.innerHeight > dataTable.offsetHeight ){
            handleInfinityMode();
        }
    }
    const headers = document.querySelectorAll('.wrap-header tr th');
    headers.forEach((value) => value.addEventListener('click', sortArray));
    window.addEventListener('scroll',handleScroll);
}


button.addEventListener('click', handleClickButtonSubmit);
infiMode.addEventListener('click', cleardata);