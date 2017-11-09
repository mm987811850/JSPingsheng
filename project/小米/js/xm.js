// 家电部分-------------------导航结合内容切换效果开始
{
//方法1:-----------------------
// var navlist=document.querySelectorAll('.home-titler li');
// var homeboxs=document.querySelectorAll('.home-box');
// navlist.forEach(function(ele,index){
//     ele.onmouseover=function () {
//         for(var i=0;i<navlist.length;i++){
//             navlist[i].classList.remove('home-active');
//             homeboxs[i].style.display='none';
//         }
//         ele.classList.add('home-active');
//         homeboxs[index].style.display='block';
//     }
// })
// 方法2：-----------------
// for(var i=0;i<navlist.length;i++){
//     navlist[i].index=i;
//     navlist[i].onmouseover=function(){
//         for(var j=0;j<navlist.length;j++){
//             navlist[i].classList.remove('home-active');
//             homeboxs[i].style.display='none';
//         }
//         this.classList.add("home-active");
//         homeboxs[this.index].style.display='block';
//     }
// }
// 方法3：--------在网页中多个模块一样，复制之后效果一样可以将其封装--------------
    function ka(parent) {
        var navlist = parent.querySelectorAll('.home-titler li');
        var homeboxs = parent.querySelectorAll('.home-box');
        navlist.forEach(function (ele, index) {
            //先遍历点 然后鼠标经过 其次清除原有样式 最后添加样式
            ele.onmouseover = function () {
                for (var i = 0; i < navlist.length; i++) {
                    navlist[i].classList.remove('home-active');
                    homeboxs[i].style.display = 'none';
                }
                ele.classList.add('home-active');
                homeboxs[index].style.display = 'block';
            }
        })
    }

    let home_boxs = document.querySelectorAll('.home');
    console.log(home_boxs);
    for (var i = 0; i < home_boxs.length; i++) {
        ka(home_boxs[i]);
    }
}
// 家电部分------------导航结合内容切换效果结束
//banner部分开始------------------------------------
{
    //轮播点击控制效果--------
    var imgs = document.querySelectorAll('.banner-box li');
    var dians = document.querySelectorAll('.dianbox li');
    dians.forEach(function (ele, index) {
        ele.onclick = function () {
            for (var i = 0; i < dians.length; i++) {
                dians[i].classList.remove('active');
                imgs[i].classList.remove('active');
            }
            ele.classList.add('active');
            imgs[index].classList.add('active');
            now = index;
        }
    })
//自动轮播效果------//回调函数 间隔时间 1秒是1000----------
// setInterval(function(){},1000)
// var now=0;
// var stop=setInterval(function(){
//        now++;
//        if(now===dians.length){
//            now=0;
//        }
//        for(var i=0;i<dians.length;i++){
//            dians[i].classList.remove('active');
//            imgs[i].classList.remove('active');
//        }
//        dians[now].classList.add('active');
//        imgs[now].classList.add('active');
//    },2000);
// ---------------
    var now = 0;
    var stop = setInterval(fn, 2000);
    function fn(dir = 'next') {
        if (dir === 'next') {
            now++;
            if (now === dians.length) {
                now = 0;
            }
        } else if (dir === 'prev') {
            now--;
            if (now === -1) {
                now = dians.length - 1;
            }
        }
        for (var i = 0; i < dians.length; i++) {
            dians[i].classList.remove('active');
            imgs[i].classList.remove('active');
        }
        dians[now].classList.add('active');
        imgs[now].classList.add('active');
    }
//当手放入轮播的时候,图片停止轮播--------------
//    clearInterval() 清除某个时间函数----
    var banner = document.querySelector('.banner');
    banner.onmouseover = function () {
        clearInterval(stop);
    }
    banner.onmouseout = function () {
        stop = setInterval(fn, 2000);
    }
//左右箭头点击效果
    let prev = document.querySelector('.banner .left');
    let next = document.querySelector('.banner .next');
    prev.onclick = function () {
        fn('prev');
    }
    next.onclick = function () {
        fn('next');
    }
}
//banner部分结束
//小米明星单品开始
{
    let sstar_bigboxs = document.querySelectorAll('.sstar-bigbox');
    function starBox(parent) {
        let sprev = parent.querySelector('.sjiantou .sprev');
        let snext = parent.querySelector('.sjiantou .snext');
        let sbottom_box = parent.querySelector('.sstar-bottom-inner');
        let sjiantou = parent.querySelector('.sjiantou');
        sprev.onclick = function () {
            snext.classList.add('active');
            sbottom_box.style.marginLeft = 0 + "px";
            sprev.classList.remove('active');
            num = 1;
        }
        snext.onclick = function () {
            sbottom_box.style.marginLeft = -1240 + "px";
            snext.classList.remove('active');
            sprev.classList.add('active');
            num = 2;
        }
    }
    for (let i = 0; i < sstar_bigboxs.length; i++) {
        starBox(sstar_bigboxs[i]);
    }
    //自动轮播
    let sprev = document.querySelector('.sjiantou .sprev');
    let snext = document.querySelector('.sjiantou .snext');
    let sbottom_box = document.querySelector('.sstar-bottom-inner');
    let sjiantou = document.querySelector('.sjiantou');
    let num = 0;
    var t = setInterval(zidong, 4000);
    function zidong() {
        num++;
        if (num % 2 == 0) {
            sbottom_box.style.marginLeft = -1240 + "px";
            snext.classList.remove('active');
            sprev.classList.add('active');
        } else {
            sbottom_box.style.marginLeft = 0 + "px";
            snext.classList.add('active');
            sprev.classList.remove('active');
        }
    }
    sjiantou.onmouseover = function () {
        clearInterval(t);
    }
    sjiantou.onmouseout = function () {
        t = setInterval(zidong, 4000);
    }
}
//小米明星单品结束
//内容部分效果开始
{
    let inner_mall_box = document.querySelectorAll('.iinner-mall-box');

    function innerFn(can) {
        let long_inner = can.querySelector('.iinner-item');
        let pagers = can.querySelectorAll('.pager-box li');
        let pager_prev = can.querySelector('.pager-prev');
        let pager_next = can.querySelector('.pager-next');
        pagers.forEach(function (ele, index) {
            ele.onclick = function () {
                for (let i = 0; i < pagers.length; i++) {
                    pagers[i].classList.remove('active');
                }
                ele.classList.add('active');
                long_inner.style.marginLeft = '-296' * index + 'px';
                now = index;
            }
        })
        let num = 0;

        function you(ddir = 'r') {
            if (ddir == 'r') {
                num++;
                if (num == pagers.length) {
                    num = pagers.length - 1;
                }
            } else if (ddir == 'l') {
                num--;
                if (num == -1) {
                    num = 0;
                }
            }
            for (let i = 0; i < pagers.length; i++) {
                pagers[i].classList.remove('active');
            }
            pagers[num].classList.add('active');
            long_inner.style.marginLeft = '-296' * num + 'px';
        }

        let now = 0;
        pager_next.onclick = function () {
            you('r');
        }
        pager_prev.onclick = function () {
            you('l');
        }
    }

    for (let i = 0; i < inner_mall_box.length; i++) {
        innerFn(inner_mall_box[i]);
    }
}
//内容部分效果结束
//顶部购物车开始
{
    let che=document.querySelector('.header-last');
    let che_txt=document.querySelector('.header-last-txt');
    che.onmouseover=function(){
        che_txt.style.opacity='1';
    }
    che.onmouseout=function(){
        che_txt.style.opacity='0';
    }
}
//顶部购物车结束
//banner左侧导航效果开始
{
    let banner_bigbox=document.querySelector('.banner');
    let lists=document.querySelectorAll('.banner-list li');
    let listh=document.querySelector('.banner-listh');
    
    lists.forEach(function(ele,index){
        console.log(ele)
        ele.onmouseover=function(){
            listh.style.opacity='1';
        }
        ele.onmouseout=function(e){
           e.stopPropagation();
        }
    })
    banner_bigbox.onmouseleave=function(){
        listh.style.opacity='0';
    }
    listh.onmouseleave=function(){
        listh.style.opacity='0';
    }
}
//banner左侧导航效果结束

