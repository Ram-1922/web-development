document.addEventListener("DOMContentLoaded", function (){
    const signin=document.querySelector(".loglink")
    const signup=document.querySelector(".reglink")
    const dive=document.querySelector(".dive")
    const login=document.getElementById("log")
    const register=document.getElementById("rgs")
    const log=document.getElementById("loginbn")
    const cls=document.querySelectorAll(".close")
    const ic=document.querySelector(".thi")
    const navi=document.querySelector(".nav")

    function showlogin(){
        login.style.display="block"
        register.style.display="none"
        login.style.opacity="1"
    }
    function showregister(){
        login.style.display="none"
        register.style.display="block"
    }
    function mainbx(){
        dive.style.display="block"
    }
    function close(){
        dive.style.display="none"
    }
    function icon(){
        navi.style.display="block"
    }

    ic.addEventListener("click",function (event){
        event.preventDefault();
        icon();
    })
    signin.addEventListener("click",function(event){
        event.preventDefault();
        showlogin();
    });
    signup.addEventListener("click",function(event){
        event.preventDefault();
        showregister();
    });
    log.addEventListener("click",function(event){
        event.preventDefault();
        mainbx();
    });
    cls.forEach(button => {
        button.addEventListener("click",function(event) {
            event.preventDefault();
            close();
        })
    })
});