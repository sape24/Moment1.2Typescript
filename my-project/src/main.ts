import './style.css'

//skapar variablar av knapp elementen i html
const openButton = document.getElementById("open-menu") as HTMLButtonElement
const closeButton = document.getElementById("close-menu") as HTMLButtonElement

openButton.type = "button"
closeButton.type = "button"
//skapar en eventlistener som lyssnar efter när användare klickar på dessa element
openButton.addEventListener('click', toggleMenu)
closeButton.addEventListener('click', toggleMenu)
//function som kollar ifall mobilmenyn visas eller inte när man trycker på respektive knapp, om den inte visas så visas den och vice versa. Den ändrar knappens css ifall display är none till block annars ändras den till none
function toggleMenu(){
    const mobileMenuEl = document.getElementById("mobilemenu") as HTMLElement
    const style = window.getComputedStyle(mobileMenuEl)

    if(style.display === "none") {
        mobileMenuEl.style.display = "block";
    } else{
        mobileMenuEl.style.display = "none"
    }
} 