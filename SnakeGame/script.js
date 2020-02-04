const container = document.querySelector('.container');
const btn_play1 = document.querySelector('#btn-play1');
const btn_play2 = document.querySelector('#btn-play2');
const table = document.querySelector('.play-frame');
const div_frame = document.querySelector('.play-frame-container');
const tagFinish = document.querySelector('h1');
let cell_table, lastDic, direction, bait, trace = [], countdown = 0, mode;


function setMode() {
    mode = parseInt(this.dataset.mode);
    create_frame();
}


function create_frame() {
    tagFinish.innerHTML = '';
    clearInterval(countdown);
    cell_table = '';
    direction = 1;
    trace = [];
    for (let i = 0; i < 20; i++) {
        cell_table += '<tr>';
        for (let j = 0; j < 20; j++) {
            cell_table += `<td style="Height:${Math.floor(500 / 20)}px;Width:${Math.floor(500 / 20)}px" ></td>`;
        }
        cell_table += '</tr>';
    }
    table.innerHTML = cell_table;
    const listTd = document.querySelectorAll('td');
    let count = 0;
    const listTd2d = [];
    for (let i = 0; i < 20; i++) {
        listTd2d[i] = [];
        for (let j = 0; j < 20; j++) {
            listTd2d[i].push(listTd[count]);
            count++;
        }
    }
    listTd2d[10][10].style.background = 'black';
    trace.push([10, 10]);
    bait = randomBait();
    listTd2d[bait[0]][bait[1]].style.background = 'red';
    function movingSnake() {
        if (direction === 1) {
            let [x, y] = trace[0];
            trace.forEach(value => {
                if (value[0] === x) {
                    if (y + 1 >= 19) {
                        if (mode === 1) {
                            //không đi xuyên tường
                            clearInterval(countdown);
                            tagFinish.innerHTML = 'Lose';
                        }
                        else {
                            if (value[1] === 0) {
                                //đi xuyên tường
                                clearInterval(countdown);
                                tagFinish.innerHTML = 'Lose';
                            }
                        }
                    }
                    else {
                        //rắn cắn vào thân
                        if (y + 1 === value[1]) {
                            clearInterval(countdown);
                            tagFinish.innerHTML = 'Lose';
                        }
                    }
                }
            });
            //Thêm đầu cho rắn
            if (y + 1 === 20) {
                trace.unshift([x, 0]);
                listTd2d[x][0].style.background = 'black';

            }
            else {
                trace.unshift([x, y + 1]);
                listTd2d[x][y + 1].style.background = 'black';
            }
            const [tempx, tempy] = trace[0];
            //lấy đầu rắn để kiểm tra xem đầu rắn có trùng với mồi không, nếu trùng thì tạo mồi mới
            if (bait[0] === tempx && bait[1] === tempy) {
                bait = randomBait();
                listTd2d[bait[0]][bait[1]].style.background = 'red';
            }
            else {
                let [popX, popY] = trace.pop();
                listTd2d[popX][popY].style.background = 'white';
            }

        }
        else if (direction === 2) {
            let [x, y] = trace[0];
            trace.forEach(value => {
                if (value[1] === y) {
                    if (x + 1 >= 19) {
                        if (mode === 1) {
                            clearInterval(countdown);
                            tagFinish.innerHTML = 'Lose';
                        }
                        else {
                            if (value[0] === 0) {
                                clearInterval(countdown);
                                tagFinish.innerHTML = 'Lose';
                            }
                        }
                    }
                    else {
                        if (value[0] === x + 1) {
                            clearInterval(countdown);
                            tagFinish.innerHTML = 'Lose';
                        }
                    }
                }
            });
            if (x + 1 === 20) {
                trace.unshift([0, y]);
                listTd2d[0][y].style.background = 'black';
            }
            else {
                trace.unshift([x + 1, y]);
                listTd2d[x + 1][y].style.background = 'black';
            }
            const [tempx, tempy] = trace[0];
            if (bait[0] === tempx && bait[1] === tempy) {
                bait = randomBait();
                listTd2d[bait[0]][bait[1]].style.background = 'red';
            }
            else {
                let [popX, popY] = trace.pop();
                listTd2d[popX][popY].style.background = 'white';
            }
        }
        else if (direction === 3) {
            let [x, y] = trace[0];
            trace.forEach(value => {
                if (value[0] === x) {
                    if (y - 1 <= 0) {
                        if (mode === 1) {
                            clearInterval(countdown);
                            tagFinish.innerHTML = 'Lose';
                        }
                        else {
                            if (value[1] === 19) {
                                clearInterval(countdown);
                                tagFinish.innerHTML = 'Lose';
                            }
                        }
                    }
                    else {
                        if (value[1] === y - 1) {
                            clearInterval(countdown);
                            tagFinish.innerHTML = 'Lose';
                        }
                    }
                }
            });
            if (y - 1 < 0) {
                trace.unshift([x, 19]);
                listTd2d[x][19].style.background = 'black';
            }
            else {
                trace.unshift([x, y - 1]);
                listTd2d[x][y - 1].style.background = 'black';

            }
            const [tempx, tempy] = trace[0];
            if (bait[0] === tempx && bait[1] === tempy) {
                bait = randomBait();
                listTd2d[bait[0]][bait[1]].style.background = 'red';
            }
            else {
                let [popX, popY] = trace.pop();
                listTd2d[popX][popY].style.background = 'white';
            }
        }
        else {
            let [x, y] = trace[0];
            trace.forEach(value => {
                if (value[1] === y) {
                    if (x - 1 <= 0) {
                        if (mode === 1) {
                            clearInterval(countdown);
                            tagFinish.innerHTML = 'Lose';
                        }
                        else {
                            if (value[0] === 19) {
                                clearInterval(countdown);
                                tagFinish.innerHTML = 'Lose';
                            }
                        }
                    }
                    else {
                        if (value[0] === x - 1) {
                            clearInterval(countdown);
                            tagFinish.innerHTML = 'Lose';
                        }
                    }
                }
            });
            if (x - 1 < 0) {
                trace.unshift([19, y]);
                listTd2d[19][y].style.background = 'black';
            }
            else {
                trace.unshift([x - 1, y]);
                listTd2d[x - 1][y].style.background = 'black';

            }
            const [tempx, tempy] = trace[0];
            if (bait[0] === tempx && bait[1] === tempy) {
                bait = randomBait();
                listTd2d[bait[0]][bait[1]].style.background = 'red';
            }
            else {
                let [popX, popY] = trace.pop();
                listTd2d[popX][popY].style.background = 'white';
            }

        }
    }

    function randomBait() { //random mồi
        const x = Math.random() * 19;
        const y = Math.random() * 19;
        for (let i = 0; i < trace.length; i++) {
            if (trace[i][0] === Math.floor(x) && trace[i][1] === Math.floor(y)) {
                return randomBait();
            }
        }
        return [Math.floor(x), Math.floor(y)];
    }



    countdown = setInterval(movingSnake, 100);
}


btn_play1.addEventListener('click', setMode);
btn_play2.addEventListener('click', setMode);
window.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 37: { //left
            if (direction === 1) {
                direction = 1;
            }
            else {
                direction = 3;
            }
            break;
        }
        case 38: { //up
            if (direction === 2) {
                direction = 2;
            }
            else {
                direction = 4;
            }
            break;
        }
        case 39: {// right
            if (direction === 3) {
                direction = 3;
            }
            else {
                direction = 1;
            }
            break;
        }
        case 40: { //down
            if (direction === 4) {
                direction = 4;
            }
            else {
                direction = 2;
            }
            break;
        }
    }
})