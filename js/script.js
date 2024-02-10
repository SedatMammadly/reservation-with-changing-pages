const stuff = [
    {
        id: 1,
        name: "Alex Rosetta",
        email: "alexyrosetta@egmail.com",
        image: "https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=",
    },
    {
        id: 2,
        name: "Diego Sanchez",
        email: "diegosanchez@egmail.com",
        image: "https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg",
    }
]

const service = [
    {
        "id": 1,
        "name": "Oral hygiene",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDcRUkzFl8bz3mNS68CP0bKcAodU3c3AdKSg&usqp=CAU",
        "duration": "1 hour",
        "price": 50,
    },
    {
        "id": 2,
        "name": "Implants",
        "image": "https://www.jivadental.co.uk/wp-content/uploads/2018/07/dental-implants.jpeg",
        "duration": "1 hour 30 minutes",
        "price": 120,
    }
]

const date = ["2024-02-01", "2024-02-05", "2024-02-09",]

const time = [
    {
        "start_time": "09:00",
        "end_time": "09:30"
    },
    {
        "start_time": "09:30",
        "end_time": "10:00"
    },
    {
        "start_time": "10:30",
        "end_time": "11:00"
    }
]
let reservationActions = document.querySelector(".reservation-actions")
let reservationRightContent = document.querySelector(".reservation-right-content")
let reservationRightHead = document.querySelector(".reservation-right-head h2")
let reservationNextBtn = document.querySelector(".reservation-next-button")
let reservationBackBtn = document.querySelector(".reservation-back-button")
let reservationAlertMessage = document.querySelector(".alert-message")
let reservationAlertMessageSpan = document.querySelector(".alert-message span")
let reservationRightBottomCont = document.querySelector(".reservation-right-bottom-contents")
let reservationImg, reservationName, reservationStuffCard, stuffInputs, selectStuffCard, reservationStuffCards, checkDisplay, currentYear, currentMonth, firstNameInput, lastNameInput, emailInput, phoneInput, reservationObjectMain, reservationAction, reservationActionName, reservationActionNum
let pageNum = 0;
let checkPageNum=1;
const reservation = ["Stuff", "Service", "Date", "Confirmation"]
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const week = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
let reservationObject = {
    staff_id: 0,
    service_id: 0,
    date: "",
    time: {
        start_time: "",
        end_time: ""
    },
    total: "",
    customer: {
        name: "",
        surname: "",
        email: "",
        phone: ""
    }
}
reservationBackBtn.style.display = 'none'

function checkAlert() {
    if (reservation[pageNum] == "Stuff") {
        if (reservationObject.staff_id === 0) {
            reservationAlertMessage.style.display = "block";
            checkDisplay = true;
        } else {
            reservationAlertMessage.style.display = "none";
            checkDisplay = false;
        }
    }
    else if (reservation[pageNum] == "Service") {
        if (reservationObject.service_id === 0) {
            reservationAlertMessageSpan.innerHTML = "Select Service"
            reservationAlertMessage.style.display = "block";
            checkDisplay = true;
        } else {
            reservationAlertMessage.style.display = "none";
            checkDisplay = false;
        }
    }
    else if (reservation[pageNum] == "Date") {
        if (reservationObject.time.end_time === "") {
            reservationAlertMessageSpan.innerHTML = "Select time"
            reservationAlertMessage.style.display = "block";
            checkDisplay = true;
        } else {
            reservationAlertMessage.style.display = "none";
            checkDisplay = false;
        }
    }

}


function btnFunctions() {
    if (pageNum == 4) {
        reservationObject.customer.name = firstNameInput.value
        reservationObject.customer.surname = lastNameInput.value
        reservationObject.customer.email = emailInput.value
        reservationObject.customer.phone = phoneInput.value
        let stringReservationObject = JSON.stringify(reservationObject)
        localStorage.setItem("reservationData", stringReservationObject)
        window.location.reload()
    }
    else if (pageNum == 3) {
        reservationNextBtn.innerHTML = "Confirm Booking"
    }
    else {
        reservationNextBtn.innerHTML = "Next"
    }
    if (pageNum == 0) {
        reservationBackBtn.style.display = 'none'
    }
    else {
        reservationBackBtn.style.display = 'block'
    }
}

function chooseSectionStaff(id) {
    reservationObject.staff_id = id;
    checkAlert()
    showInfo()
}
function chooseSectionService(id) {
    reservationObject.service_id = id
    checkAlert()
    showInfo()
}
function selectTime(endTime, startTime) {
    reservationObject.time.end_time = endTime
    reservationObject.time.start_time = startTime
    checkAlert()
    showInfo()
    console.log(reservationObject);
}

function showReservationLeft() {
    let reservationActionsElement
    for (let i = 1; i <= 4; i++) {
         reservationActionsElement+=
        `
        <div class="reservation-action">
          <span class="reservation-action-number">${i}</span>
          <span class="reservation-action-name">${reservation[i-1]}</span>
      </div>
     `
    }
    reservationActions.innerHTML = reservationActionsElement

    reservationAction = document.querySelectorAll(".reservation-action")
    reservationActionNum = document.querySelectorAll(".reservation-action-number")
    reservationActionName = document.querySelectorAll(".reservation-action-name")
    reservationLeftCheck()
}
function reservationLeftCheck() {
    for (let i = 1 ; i <= 4; i++) {
        if (checkPageNum == i) {
            reservationActionNum[i-1].style.background = "rgb(139, 200, 49)"
            reservationActionName[i-1].style.color = "rgb(139, 200, 49)"
        }
        if(pageNum==i){
            for(let j = 0;j<i;j++){
                reservationActionNum[j].innerHTML="&#10003"
                reservationActionNum[j].style.background = "blue"
                reservationActionNum[j].style.padding = "6px 10px"
                 reservationActionName[j].style.color = "#fff"
            }
            
        }
    }
}
function showInfo() {
    if (reservation[pageNum] == "Stuff") {
        reservationRightHead.innerHTML = "Select Stuff"
        reservationRightBottomCont.style.marginTop = "218px"
        let reservationRightStuff
        reservationRightStuff = `
        <div class="reservation-right-stuff">
        <div class="reservation-stuff-container">
          <div class="reservation-stuff-cards">

          </div>
        </div>
      </div>`
        reservationRightContent.innerHTML = reservationRightStuff;
        reservationStuffCards = document.querySelector(".reservation-stuff-cards")
        reservationRightHead.innerHTML = "Select Stuff"
        for (let i = 0; i < stuff.length; i++) {
            reservationStuffCards.innerHTML += `
                    <div  onclick="chooseSectionStaff(${stuff[i].id})" data-id="${stuff[i].id}" class="reservation-stuff-card">
                        <img src="${stuff[i].image}" alt="">
                        <div class="reservation-stuff-card-about">
                            <h3>${stuff[i].name}</h3>
                            <span>${stuff[i].email}</span>
                        </div>
                    </div>`;
        }
        reservationStuffCard = document.querySelectorAll("reservation-stuff-card");
        selectStuffCard = document.querySelector(`.reservation-stuff-card[data-id="${reservationObject.staff_id}"]`);
        if (reservationObject.staff_id !== 0) {
            selectStuffCard.classList.add("bord")
        }
    }

    else if (reservation[pageNum] == "Service") {
        console.log(service.map(item => item.name));
        reservationRightHead.innerHTML = "Select Service"
        reservationAlertMessageSpan.innerHTML = "Select Service"
        reservationRightBottomCont.style.marginTop = "218px"

        let reservationRightService
        reservationRightService = `
        <div class="reservation-right-service">
        <div class="reservation-service-container">
          <div class="reservation-service-cards">

          </div>
        </div>
      </div>`
        reservationRightContent.innerHTML = reservationRightService;
        reservationServiceCards = document.querySelector(".reservation-service-cards")
        for (let i = 0; i < service.length; i++) {
            reservationServiceCards.innerHTML += `
         <div onclick="chooseSectionService(${service[i].id})" data-id="${service[i].id}" class="reservation-service-card">
                    <div class="reservation-service-card-left">
                      <img src="${service[i].image}" alt="">
                      <div class="reservation-service-card-about">
                        <h3>${service[i].name}</h3>
                        <span>${service[i].duration}</span>
                      </div>
                    </div>
                    <div class="reservation-service-card-right">
                      <span>$${service[i].price}</span>
                    </div>
                  </div>
               `
        }
        selectServiceCard = document.querySelector(`.reservation-service-card[data-id="${reservationObject.service_id}"]`);
        let selectServiceTotal;

        if (reservationObject.service_id !== 0 && selectServiceCard) {
            selectServiceCard.classList.add("border");
            selectServiceTotal = selectServiceCard.querySelector(".reservation-service-card-right span");
            reservationObject.total = selectServiceTotal.textContent;
        }
    }
    else if (reservation[pageNum] == "Date") {
        reservationRightHead.innerHTML = "Select Date"
        reservationRightBottomCont.style.marginTop = "62px"
        let reservationRightDate = `
        <div class="reservation-date-container">
              <div class="reservation-right-date-top">
                <div class="calendar-head">
                  <span id="prev"><i class="fas fa-chevron-left"></i></span>
                  <div class="current-date">February 2024</div>
                  <span id="next"><i class="fas fa-chevron-right"></i></span>
                </div>
                <div class="time-head">
                  <h3>Time</h3>
                </div>
              </div>
              <div class="reservation-right-date-bottom">
                <div class="calendar">
                  <ul class="weeks">
                  </ul>
                  <ul class="days">
                  
                  </ul>
                </div>
                <div class="time">
                  <div class="select-date-cards-head">
                    <h3>Select date</h3>
                  </div>
                  <div class="select-date-cards">
                    
                  </div>
                </div>
              </div>
            </div>
        `
        reservationRightContent.innerHTML = reservationRightDate
        let calendarButtons = document.querySelectorAll(".calendar-head span")
        let weeks = document.querySelector(".weeks"),
            currentDate = document.querySelector(".current-date"),
            days = document.querySelector(".days")
        dateCards = document.querySelector(".select-date-cards")
        let dates = new Date()
        let selectDateCardHead = document.querySelector(".select-date-cards-head h3")
        currentYear = dates.getFullYear()
        currentMonth = dates.getMonth()
        function generateCalendar() {
            let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
            let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            let lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate()
            let liTag = ""
            let weekLiTag = ""
            for (let i = firstDayOfMonth; i > 0; i--) {
                liTag += `<li class="active">${lastDateOfLastMonth - i + 1}</li>`

            }
            for (let i = 1; i <= lastDateOfMonth; i++) {
                liTag += `<li>${i}</li>`
            }
            for (let i = 0; i < week.length; i++) {
                weekLiTag += `<li>${week[i]}</li>`
            }
            currentDate.innerText = month[currentMonth] + + currentYear
            days.innerHTML = liTag
            let daysLi = document.querySelectorAll(".days li")
            for (let i = 0; i < date.length; i++) {
                daysLi.forEach(item => {
                    if (item.textContent === date[i].slice(date[i].length - 1) && currentYear == date[i].slice(0, 4) && currentMonth == (date[i].slice(6, 7)) - 1) {
                        item.style.color = "#000"
                        item.addEventListener("click", function selectDay() {
                            if (item.textContent == date[i].slice(date[i].length - 1)) {
                                daysLi.forEach(li => li.classList.remove("select-active"));
                                reservationObject.date = date[i]
                                selectDateCardHead.innerHTML = date[i]
                                item.classList.add("select-active")
                                item.style.color="#fff"
                                dateCards.style.visibility = "visible"
                                console.log(reservationObject);
                                console.log(reservationObject.date);
                            }
                        })

                    }
                })
                if (reservationObject.date == date[i]) {
                    daysLi.forEach(item => {
                        if (item.textContent == date[i].slice(date[i].length - 1) && currentYear == date[i].slice(0, 4) && currentMonth == (date[i].slice(6, 7)) - 1) {
                            item.classList.add("select-active")
                            item.style.color="#fff"
                        }

                    })
                    dateCards.style.visibility = "visible"
                }
            }
            weeks.innerHTML = weekLiTag
        }

        for (let i = 0; i < time.length; i++) {
            dateCards.innerHTML += `
            <div onclick="selectTime('${time[i].end_time}','${time[i].start_time}')" data-time="${time[i].end_time}" class="select-date-card">
              <span class="start-time">${time[i].start_time}</span>
              <span class="end-time">${time[i].end_time}</span>
           </div>
          `
        }

        let selectDateCard = document.querySelector(`.select-date-card[data-time="${reservationObject.time.end_time}"]`);

        if (reservationObject.time.end_time !== "") {
            selectDateCard.classList.add("active-time")
            selectDateCardHead.innerHTML = reservationObject.date
        }
        calendarButtons.forEach((item) => {
            item.addEventListener("click", () => {
                if (item.id === "prev") {
                    currentMonth--;
                    if (currentMonth < 0) {
                        currentMonth = 11;
                        currentYear--;
                    }
                    if (reservationObject.time.end_time !== "") {
                        selectDateCard.classList.add("active-time")
                    }
                } else {
                    currentMonth++;
                    if (currentMonth > 11) {
                        currentMonth = 0;
                        currentYear++;
                    }
                }
                generateCalendar()
            })
        })
        generateCalendar()
    }
    else if (reservation[pageNum] == "Confirmation") {
        reservationRightHead.innerHTML = "Select Confirmation"
        reservationRightBottomCont.style.marginTop = "88px"
        reservationRightContent.innerHTML = `
        <div class="reservation-confirm-container">
              <div class="confirm-inputs">
                <div class="confirm-input-firstname">
                  <div class="input-head">
                    <span>First name</span>
                    <span>*</span>
                  </div>
                  <input  type="text">
                </div>
                <div class="confirm-input-lastname">
                  <div class="input-head">
                    <span>Last name</span>
                    <span>*</span>
                  </div>
                  <input type="text">
                </div>
                <div class="confirm-input-email">
                  <div class="input-head">
                    <span>E-mail</span>
                    <span>*</span>
                  </div>
                  <input type="email">
                </div>
                <div class="confirm-input-phone">
                  <div class="input-head">
                    <span>Phone</span>
                    <span>*</span>
                  </div>
                  <input type="text">
                </div>
              </div>
              <div class="confirm-about">
                <div class="Staff">
                  <span>Staff: </span>
                  <span>${stuff.filter(item => item.id === reservationObject.staff_id).map(item => item.name)}</span>
                </div>
                <div class="Service">
                  <span>Service: </span>
                  <span>${service.filter(item => item.id === reservationObject.service_id).map(item => item.name)}</span>
                </div>
                <div class="Date">
                  <span>Date: </span>
                  <span>${reservationObject.date}/${reservationObject.time.start_time}-${reservationObject.time.end_time}</span>
                </div>
                <div class="Total">
                  <span>Total: </span>
                  <span>${reservationObject.total}</span>
                </div>
              </div>
            </div>
        `
        firstNameInput = document.querySelector(".confirm-input-firstname input")
        lastNameInput = document.querySelector(".confirm-input-lastname input")
        emailInput = document.querySelector(".confirm-input-email input")
        phoneInput = document.querySelector(".confirm-input-phone input")
    }
}


reservationNextBtn.addEventListener("click", nextPage)
reservationBackBtn.addEventListener("click", backPage)

function nextPage() {
    checkAlert()
    if (pageNum <= 4 && !checkDisplay) {
        pageNum++
        checkPageNum +=1
        console.log(checkPageNum);
    }
    else {
        return pageNum
    }
    showReservationLeft()
    showInfo()
    btnFunctions()
}

function backPage() {
    if (pageNum > 0) {
        pageNum--
        checkPageNum -=1
        console.log(checkPageNum);
    }
    showReservationLeft()
    showInfo()
    btnFunctions()
}
reservationObjectMain = JSON.parse(localStorage.getItem("reservationData"))
console.log(reservationObjectMain);
showReservationLeft()
showInfo()
btnFunctions()


