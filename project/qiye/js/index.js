    let pagers=document.querySelectorAll(".pagerwrapper li");
    let imgs=document.querySelectorAll(".bannerbox li");
    let bannerbox=document.querySelector(".banner");
    let now=0;
    let z=10;  //层级
    let flag=true;
    let t=setInterval(move,3000);
    bannerbox.onmouseover=function () {
        clearInterval(t)
    }
    window.addEventListener("blur",function () {
        clearInterval(t);
    })
   bannerbox.onmouseout=function () {
        t=setInterval(move,3000)
    }
    window.addEventListener("onfocus",function () {
        t=setInterval(move,3000);
    })
    function move () {
        imgs[now].classList.add("leftOut");
        pagers[now].classList.remove("active");
        now++;
        if(now===imgs.length){
            now=0;
        }
        pagers[now].classList.add("active");
        imgs[now].classList.add("rightIn");
        imgs[now].style.zIndex=z++;
    }
    imgs.forEach(function(ele){
        ele.addEventListener("animationend",function(){
            ele.className="";
            flag=true;
        })
    })
    pagers.forEach(function (ele,index) {
        ele.onclick=function () {
            if(flag) {
                flag = false;

                if (index < now) {
                    imgs[now].classList.add("rightOut");
                    imgs[index].classList.add("leftIn");

                } else if (index > now) {

                    imgs[now].classList.add("leftOut");
                    imgs[index].classList.add("rightIn");
                }
                imgs[index].style.zIndex = z++;
                pagers[now].classList.remove("active");
                pagers[index].classList.add("active");
                now = index;
            }
        }

    })