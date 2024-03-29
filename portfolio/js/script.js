// typing animation
var typed = new Typed(".typing", {
    strings:["","Web Developer", "Frontend Developer", "Web Designer", "Graphic Designer"],
    typeSpeed:50,
    BackSpeed:60,
    loop:true
})

//Show Nav menu on Tab and mobile
let navToggler = document.querySelector(".nav-toggler");
let aside = document.querySelector(".aside");
let btnClose = document.querySelector(".btn-close");
let overlayoutBg = document.querySelector(".overlayout-bg");

navToggler.addEventListener("click", function() {    
    aside.style.left = "0";    
    navToggler.style.display = "none";
    overlayoutBg.style.display = "block";

});

btnClose.addEventListener("click", function() {
    aside.style.left = "-270px";    
    navToggler.style.display = "flex";
    overlayoutBg.style.display = "none";
});


//Active Nav Menu Link on Scroll & Click
let section = document.querySelectorAll('.section');
let navLinks = document.querySelectorAll(".nav li a");
let btnScrollTop = document.querySelector(".btn-top");

window.onscroll = () =>{
    section.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 60;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {                
                links.classList.remove('active');
                document.querySelector('.nav li a[href*=' + id + ']').classList.add("active");
            });
        }
    });

    //Show scroll button on scroll the page
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnScrollTop.style.display = "flex";
      } else {
        btnScrollTop.style.display = "none";
      }
}

//Go top page on click scroll button
btnScrollTop.addEventListener("click", () =>{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})


//Active Nav menu 
// const nav = document.querySelector('.nav');
// const navLinks = document.querySelectorAll('.nav li a');

// navLinks.forEach(link =>{
//     link.addEventListener("click", function(){
//         nav.querySelector('.active').classList.remove('active');
//         link.classList.add('active');
//     });
// })









