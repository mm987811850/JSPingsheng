let box=document.querySelector(".box");
let menu=document.querySelector(".menu");
let canvas = document.querySelector("canvas");
let con = document.querySelector(".con");
let start = document.querySelector("#start");
let cobj = canvas.getContext("2d");
let w = 40;
let pos = {};
let isAi = false;
let blank = {};
let mask = document.querySelector(".mask");
let restart = document.querySelector(".restart");
let ai = document.querySelector("#ai");
let qipu = document.querySelector(".qipu");
let music = document.querySelector(".music");
start.onclick = function () {
    con.classList.add("show")
};

ai.onfocus = function () {
    isAi = true
};

function drawBoard() {
    cobj.clearRect(0, 0, 600, 600);
    cobj.beginPath();
    for (let i = 0; i < 15; i++) {
        cobj.moveTo(20, i * w + 20);
        cobj.lineTo(580, 20 + i * w);

        cobj.moveTo(i * w + 20, 20);
        cobj.lineTo(i * w + 20, 580)
    }
    cobj.stroke();
    fn(11, 11);
    fn(11, 3);
    fn(3, 11);
    fn(3, 3);
    fn(7, 7);
    function fn(x, y) {
        cobj.save();
        cobj.beginPath();
        cobj.translate(x * w + 20, y * w + 20);

        cobj.arc(0, 0, 6, 0, Math.PI * 2);
        cobj.fill();
        cobj.restore()
    }

    for (let i = 0; i < 15; i++) {
        for (let k = 0; k < 15; k++) {
            blank[j(i, k)] = true;
        }
    }


}
drawBoard();

function drawChess(x, y, color) {
    cobj.save();
    cobj.translate(x * w + 20, y * w + 20);
    cobj.beginPath();
    cobj.fillStyle = color;
    cobj.arc(0, 0, 15, 0, Math.PI * 2);
    cobj.fill();
    cobj.restore();
    pos[j(x, y)] = color;
    delete blank[j(x, y)]
}

let flag = true;
canvas.onclick = function (e) {
    let x = Math.round((e.offsetX - 20) / w);
    let y = Math.round((e.offsetY - 20) / w);
    if (pos[j(x, y)]) {
        return;
    }

    if (flag) {
        drawChess(x, y, "black");
        if (check(x, y, "black") == 5) {
            over("黑");

            alert("黑棋胜利")
        }
        if (isAi) {
            let p = getPos();
            drawChess(p.x, p.y, "#fff");
            if (check(p.x, p.y, "#fff") == 5) {
                over("白");
                alert("白棋胜利")
            }
            return;
        }

    } else {
        drawChess(x, y, "#fff");
        if (check(x, y, "#fff") == 5) {
            over("白");
            alert("白棋胜利")
        }
    }
    flag = !flag
};

function j(x, y) {
    return x + "_" + y
}
function getPos() {
    let max1 = 0;
    let pos1 = {};
    for (let i in blank) {
        console.log(blank);

        let x = parseInt(i.split("_")[0]);
        let y = parseInt(i.split("_")[1]);
        let length = check(x, y, "black");
        if (length > max1) {
            max1 = length;
            pos1 = {x, y}
        }
    }
    let max2 = 0;
    let pos2 = {};
    for (let i in blank) {
        let x = parseInt(i.split("_")[0]);
        let y = parseInt(i.split("_")[1]);
        let length = check(x, y, "#fff");
        if (length > max2) {
            max2 = length;
            pos2 = {x, y}
        }
    }
    if (max1 > max2) {
        return pos1
    } else {
        return pos2
    }

}

function check(x, y, color) {
    let row = 1;
    let i = 1;
    while (pos[j(x + i, y)] == color) {
        row++;
        i++
    }

    i = 1;
    while (pos[j(x - i, y)] == color) {
        row++;
        i++;
    }
    let col = 1;
    i = 1;
    while (pos[j(x, y + i)] == color) {
        col++;
        i++;
    }


    i = 1
    while (pos[j(x, y - i)] == color) {
        col++;
        i++;
    }

    let x1 = 1;
    i = 1;
    while (pos[j(x + i, y + i)] == color) {
        x1++;
        i++;
    }
    i = 1;
    while (pos[j(x - i, y - i)] == color) {
        x1++;
        i++;
    }
//
    let x2 = 1;
    i = 1;
    while (pos[j(x + i, y - i)] == color) {
        x2++;
        i++
    }
    i = 1;
    while (pos[j(x - i, y + i)] == color) {
        x2++;
        i++
    }
    return Math.max(row, col, x1, x2)
}


let h = document.querySelector(".mask h1");
restart.onclick = function () {
    mask.style.display = "none";
    con.classList.remove("show");
    cobj.clearRect(0, 0, 600, 600);
    drawBoard();
    pos = {};
    imgbox.removeChild(imgbox.firstElementChild)
};

function over(name) {
    mask.style.display = "block";
    h.innerHTML = name + "棋获胜"

}

let imgbox = document.querySelector(".imgbox");
qipu.onclick = function () {
    setNumber();
    let url = canvas.toDataURL();
    let newimg = new Image();
    newimg.src = url;
    imgbox.appendChild(newimg);
    download.href = url;
    download.setAttribute("download", "棋谱.png")

};

function setNumber() {
    let n = 1;
    for (let i in pos) {
        let x = parseInt(i.split("_")[0]);
        let y = parseInt(i.split("_")[1]);
        cobj.save();
        cobj.translate(x * w + 20, y * w + 20);
        cobj.font = "14px 微软雅黑";
        cobj.textAlign = "center";
        if (pos[i] == "black") {
            cobj.fillStyle = "#fff"
        } else {
            cobj.fillStyle = "#000"
        }
        cobj.textBaseline = "middle";

        cobj.fillText(n++, 0, 0);
        cobj.restore()
    }

}


//    音乐
let musicPic = document.querySelector(".music");
//    console.log(musicPic)
let audio = document.querySelector("audio");
let flag2 = true;
music.onclick = function () {
    if (flag) {
        musicPic.style.animationPlayState = "paused";
        audio.pause();
    } else {
        musicPic.style.animationPlayState = "running";
        audio.play();
    }
    flag = !flag

};


let flag3=true;


menu.onclick=function() {
    if (flag3) {
        box.style.height = 600 + "px"

    } else {
        box.style.height = 92 + "px"
    }
    flag3 = !flag3

}