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
function toggleMenu(): void{                                                          
    const mobileMenuEl = document.getElementById("mobilemenu") as HTMLElement
    const style = window.getComputedStyle(mobileMenuEl)

    if(style.display === "none") {
        mobileMenuEl.style.display = "block";
    } else{
        mobileMenuEl.style.display = "none"
    }
} 



window.onload = init;            // init funktionen anropas när sidan har laddats in

interface CourseInfo{                                                       //interface för kursobjektet
  
  code: string
  coursename: string
  syllabus: string
  progression: "A" | "B" | "C"
}

let data: CourseInfo [] = [];                  //globala variabler av datan från json och en global variabel av den filtrerade versionen av datan
let filteredData: CourseInfo [] = []

function init(): void {                 //funktion som anropar en annan funktion
    getCourseData()
}

function getCourseData(): void {                                          //funktion för att hämta kursdatan från localstorage
  const storageCourse: string | null = localStorage.getItem("course")     
  if(storageCourse){
    try{
        data = JSON.parse(storageCourse) as CourseInfo[]
    } catch{
      data = []
    }
    }else{
      data = []
    }
    displayCourse(data)
  }

function displayCourse(list:CourseInfo[]):void {                                   //funktion som tar emot datan och loopar igenom den för att skapa element i detta fall tabellrader med datans innehåll, för varje ny rad/kurs så appendas de nya cellerna med kursnamn, kurskod och progression in i raden
    const coursesEl = document.getElementById(`appendEl`) as HTMLElement
    if (!coursesEl) {
      return
    }
    coursesEl.innerHTML = ``
    list.forEach((course: CourseInfo) => {                                             
        const newRow: HTMLTableRowElement = document.createElement(`tr`)
        
        const newCourseCode:HTMLTableCellElement = document.createElement(`td`)             
        newCourseCode.textContent = course.code
        newRow.appendChild(newCourseCode)

        const newCourseName:HTMLTableCellElement = document.createElement(`td`)
        newCourseName.textContent = course.coursename
        newRow.appendChild(newCourseName)

        const newCourseProgression:HTMLTableCellElement = document.createElement(`td`)
        newCourseProgression.textContent = course.progression
        newRow.appendChild(newCourseProgression)

        const newSyllabus:HTMLTableCellElement = document.createElement(`td`)
        newSyllabus.textContent = course.syllabus
        newRow.appendChild(newSyllabus)

        coursesEl.appendChild(newRow)                           //slutligen så appendas raden in i tbody
    });
}

const sortButton1 = document.getElementById(`coursecode`) as HTMLElement                     //Skapar en variabel av tabellrubrikerena (th)
const sortButton2 = document.getElementById(`coursename`) as HTMLElement
const sortButton3 = document.getElementById(`progression`) as HTMLElement
const sortButton4 = document.getElementById(`syllabus`) as HTMLElement

if (sortButton1) {
  sortButton1.addEventListener('click', () => sortTable(`code`)) 
}                                                                 //Skapar en eventlistener som lyssnar efter ett click på elementet, arrowfunction som anropar funktionen sortable med code, coursaname respektive progression som argument, if sats som kollar ifall elementet finns på sidan då samma javascript används på flera sidor
if (sortButton2) {
  sortButton2.addEventListener('click', () => sortTable(`coursename`))
}
if (sortButton3) {
  sortButton3.addEventListener('click', () => sortTable(`progression`))
}
if (sortButton4) {
  sortButton4.addEventListener('click', () => sortTable(`syllabus`))
}

function sortTable(column: keyof CourseInfo):void {                                                //function för att sortera tabellen alfabetiskt, den tar emot argument på vad den ska sortera men självaste sorteringen är med hjälp av en comparefunction som tar två värden och jämför alfabetiskt med .localecompare
    data.sort((a: CourseInfo, b: CourseInfo) => a[column].localeCompare(b[column]));
    displayCourse(data);
}

const filterText = document.getElementById(`filtertable`) as HTMLInputElement                      //skapar en variabel av sökrutan

if (filterText) {
  filterText.addEventListener('keyup', filterTable)
}                                                                              //eventlistener som lyssnar efter när användaren släpper en tangent anropar en function när den triggas
 
function filterTable(): void {                                                   //function för att filtrera tabellen
    const inputText: string = filterText.value.toLocaleLowerCase()                   //variabel av vad användaren har skrivit in, tolocalelowercase så stor eller liten bokstav inte spelar roll

    filteredData = data.filter(course =>                                     //filtrerar data och sparar den filtrerade versionen i den globala variabeln filtereddata
        course.code.toLocaleLowerCase().includes(inputText) ||                      //lowercase av samma anledning som tidigare, .includes för att se om texten i sökrutan finns någonstans i datan, or operator så att om kurskod,kursnamn eller progression matchar så följer den med till den filtrerade versionen av datan
        course.coursename.toLocaleLowerCase().includes(inputText) ||
        course.progression.toLocaleLowerCase().includes(inputText) ||
        course.syllabus.toLocaleLowerCase().includes(inputText)
    )
    displayCourse(filteredData)                                             //uppdaterar tabellen med den filtrerade versionen
}


function addCourse(newCourse: CourseInfo): void{                        //funktion för att lägga till kurser
  const courseExists = data.some(c => c.code === newCourse.code)           //kontrollerar om det redan finns en kurs i listan med samma kurskod som den nya kursen
    if(courseExists){
      alert("Kurskod måste vara unik")
      return
    }

    if (!["A", "B", "C"].includes(newCourse.progression)){                        //kontrollerar att den nya kurserns progression är A,B eller C
      alert("Progression måste vara A,B eller C")
      return
    }

    data.push(newCourse)                                                             //Lägger till den nya kursen i listan
    localStorage.setItem("course", JSON.stringify(data))                           //spara listan i localestorage som en JSON string

    displayCourse(data)
    window.location.href = "index.html"                                          //användaren blir redirectad till startsidan
}
const codeInput = document.getElementById("code") as HTMLInputElement            //skapar en variabel av av inputfältet
const nameInput = document.getElementById("name") as HTMLInputElement
const syllInput = document.getElementById("syll") as HTMLInputElement
const progInput = document.getElementById("prog") as HTMLInputElement

const formButton = document.getElementById("button") as HTMLButtonElement


if(formButton && codeInput && nameInput && syllInput && progInput) {                    //kontrollerar ifall alla inputelementet finns innan koden körs
  formButton.type = "button"

  formButton.addEventListener('click', (event: Event) =>{
  event.preventDefault()

  const newCourse: CourseInfo = {                                                    //skapar ett nytt kursobjekt utifrån input som följer courseinfo typen
    code: codeInput.value,
    coursename: nameInput.value,
    syllabus: syllInput.value,
    progression: progInput.value as "A" | "B"| "C"
  }

  addCourse(newCourse)                                                             //anropar funktionen för att lägga till den nya kursen
})
}

