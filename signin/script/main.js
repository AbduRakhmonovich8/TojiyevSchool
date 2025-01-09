var tojmod = document.getElementById('tojmod');
tojmod.style.display = "block";
document.addEventListener("DOMContentLoaded", function () {
    // Wait for all resources to be loaded
    window.addEventListener("load", function () {
        setTimeout(() => {
            // Hide the loader
            var loader = document.getElementById('modal');
            loader.style.display = 'none';
            tojmod.style.display = "none";
        }, 1500);
    });
});
let serch = document.querySelector(".search")
serch.addEventListener("input", () => {
    var change = document.querySelectorAll("#change")
    change.forEach(element => {
        element.classList.remove("hide")
    });
    change.forEach(element => {
        if (!element.dataset.name.toLowerCase().includes(serch.value.toLowerCase())) {
            element.classList.add("hide")
        }
    });
});
let indicator
let dateKuni
let nav = document.querySelector('.nav')
let button = document.querySelector(".button")
let titleCont = document.querySelector("#titleContent")
let extraContent = document.querySelector("#extraContent")
let tableContent = document.querySelector("#tableContent")
let tolov = document.querySelector("#tolov")
let span = document.querySelector("span")
let settingURL = "https://script.google.com/macros/s/AKfycby6qXDAicRFqlvS0Q93UhO-WH1zMbd2joqYwgp8EjL4J1Egd8Uz8TpcMpGYKMhCRbH7/exec"
fetch(settingURL)
    .then(response => response.json())  // Javobni JSON formatida olish
    .then(users => {
        let element = users[0];
        indicator = element['elon turi']
        dateKuni = element['testkuni']
        let bildirishnma_BoshMenu = element['bildirishnma_BoshMenu']
        let Tell_number_BoshMenu = element['Tell_number_BoshMenu']
        let Instagram_link_BoshMenu = element['Instagram_link_BoshMenu']
        let telegram_link_BoshMenu = element['telegram_link_BoshMenu']
        let Maxsus_Elon = element['Maxsus Elon']
        let Asosiy_tablitsa_kontenti = element['Asosiy tablitsa kontenti']
        switch (indicator) {
            case "royhatga_olish":
                nav.style.display = "block"
                titleCont.innerHTML = `Ro'yhatdan o'tish`
                tableContent.textContent = Asosiy_tablitsa_kontenti
                extraContent.textContent = Maxsus_Elon
                button.style.display = "block"
                serch.placeholder = "To'lovni tekshirish"
                break;
            case "test_javobi":
                span.textContent = "Test javobi yaqin soatlarda chiqadi."
                nav.style.display = "block"
                titleCont.textContent = "Test javobini bilish"
                tableContent.textContent = Asosiy_tablitsa_kontenti
                extraContent.textContent = Maxsus_Elon
                tolov.textContent = "Ball"
                serch.placeholder = "Ballni tekshirish"
                break;
            default:
                break;
        }
        span.style.fontSize = "2rem"
        span.style.color = "red"
        exsamDate = new Date(dateKuni);
        function updateCountdown() {
            const now = new Date();
            const timeDifference = exsamDate - now;
            if (timeDifference <= 0) {
                span.innerText = "Royhatga olish yakunlandi !";
                span.style.color = "green"
                clearInterval(intervalId);
                button.style.display = "none";
                return
            }
            const hours = Math.floor(timeDifference / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            span.innerText = `${hours} soat ${minutes} daqiqa ${seconds} soniya qoldi`
        }
        // Har 1 soniyada yangilash
        intervalId = setInterval(updateCountdown, 1000);
    })
    .catch(error => console.error("Xato:", error));
let tablebody = document.querySelector(".tablebody")
let numberUser = document.querySelector(".numberUser")
// URL
const url = "https://script.googleusercontent.com/macros/echo?user_content_key=ddrBy2x665rvuXje5LbC7adRnbh_GDVy2qO3NTrlTfPKeeUcw9SKkBXm67mmAAdz74cDkg7guPPi5vBOLGGD4S39yZxDx6DMm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMaqO4vzAk1eNU8HFRwYQRJZzAk85ZX9uBfvulnJ5lJtVEeJl33faT6FVTjtLRwc-uH7wEN4nNVLCjL5JDZ6tC-fZohciHsDvQ&lib=M0wjA6ll4jMljXkzIvefnq9_2Uq8BBHw2";
// GET so'rovini yuborishc
setTimeout(() => {
    fetch(url)
        .then(response => response.json())  // Javobni JSON formatida olish
        .then(users => {
            let i = 0
            for (let element of users) {
                i++
                numberUser.textContent = i
                let Tolov = element.Tolov
                switch (indicator) {
                    case "royhatga_olish":
                        Tolov == "" ? Tolov = "❌" : Tolov = "✅"
                        break;
                    case "test_javobi":
                        Tolov = element.Ball
                        break;
                    default:
                        break;
                }
                let ism_fam = element["Familyangiz nima ?"] + " " + element["Ismingiz nima ?"]
                let markaz_nomi = element["O'quv markazi nomi yoki maktabingiz soni va shahringiz nomi ?"]
                let rasm_url = element["O'z rasmingiz ni yuklang ?"]
                const newRow = `
            <tr id="change" data-name="${ism_fam}">
            <td>&nbsp;&nbsp; ${i} &nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp; ${ism_fam} &nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp; ${markaz_nomi} &nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp; <a href="${rasm_url}"> 👁️ </a>&nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp; ${Tolov} &nbsp;&nbsp;</td>
            </tr>
            `;
                tablebody.innerHTML += newRow;
            }
        })
        .catch(error => console.error("Xato:", error));  // Agar xatolik bo'lsa
}, 6000);