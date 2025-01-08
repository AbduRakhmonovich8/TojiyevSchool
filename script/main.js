

function ShowModal(succes) {
    var loader = document.getElementById('modal');
    var oks = document.getElementById('indOk');
    var errors = document.getElementById('indError');
    loader.style.display = "flex";
    if (succes == "succes") {
        oks.style.display = "block";
        setTimeout(() => {
            oks.style.display = "none";
            loader.style.display = "none";
        }, 4000);
    } else {
        errors.style.display = "block";
        setTimeout(() => {
            errors.style.display = "none";
            loader.style.display = "none";
        }, 4000);
    }
}



var telegramChatId = "5672285896"
document.getElementById('form').addEventListener('click', function (event) {
    event.preventDefault();

    // Oldingi xatolarni tozalash
    document.getElementById('error').textContent = '';

    // Forma qiymatlarini olish
    var name = document.getElementById('name').value;
    var email = document.getElementById('emailreg').value;
    var message = document.getElementById('messege').value;
    var phone = document.getElementById('phone').value;

    // Forma maydonlarini tekshirish
    if (!name || !email || !message || !phone) {
        document.getElementById('error').textContent = 'Barcha maydonlarni to\'ldiring.';
        return;
    }

    // Emailni oddiy tekshirish
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('error').textContent = 'Iltimos, haqiqiy email manzilini kiriting.';
        return;
    }

    // Formani jo'natish
    // Telegram botiga xabar yuborish
    var telegramToken = document.getElementById("tt").textContent;
    var telegramMessage = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
    var telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    fetch(telegramUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: telegramChatId,
            text: telegramMessage
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                ShowModal("succes")
            } else {
                ShowModal("no")
            }
        })
        .catch(error => {
            console.error('Error:', error);
            ShowModal("no")
        });


    // Forma maydonlarini tozalash
    document.getElementById('name').value = '';
    document.getElementById('emailreg').value = '';
    document.getElementById('messege').value = '';
    document.getElementById('phone').value = '';
});


var tojmod = document.getElementById('tojmod');
tojmod.style.display = "block";
document.addEventListener("DOMContentLoaded", function () {
    // Wait for all resources to be loaded
    window.addEventListener("load", function () {
        setTimeout(() => {
            // Hide the loader
            var loader = document.getElementById('modal');
            var content = document.getElementById('displayN');
            content.style.display = 'block';
            loader.style.opacity = "0";
        }, 5000);
        setTimeout(() => {
            // Hide the loader
            var loader = document.getElementById('modal');
            loader.style.display = 'none';
            loader.style.opacity = "1";
            tojmod.style.display = "none";
        }, 7000);
    });
});


let docKurs = document.querySelector("#kurslar")
let sheetKursUrl = "https://script.google.com/macros/s/AKfycbziqY80QYfZT8EpFLUpKCUsSutOpKKuDHTaNLjUM4sc0IUxI8SWjH9hAbvBH7UYJHLf7g/exec"
fetch(sheetKursUrl)
    .then(response => response.json())  // Javobni JSON formatida olish
    .then(users => {
        let innerText
        for (let element of users) {
            let kun1 = [element.kun1, element.kun2, element.kun3, element.kun4, element.kun5, element.kun6, element.kun7]
            let kurs_nomi = element.kurs_nomi
            let kurs = ""
            for (let i of kun1) {
                if (i != "") {
                    kurs += `<li>${i}</li>`
                }
            }
            innerText = `<div class="card">
                        <h3>${kurs_nomi}</h3>
                        <p>Dast kunlari</p>
                        <ul>
                            ${kurs}
                        </ul>
                        <div class="link">
                            <a href="#Boglanish">Boglanish</a>
                        </div>
                        <div class="bg"></div>
                    </div>`

            docKurs.innerHTML += innerText
        }
    })
    .catch(error => console.error("Xato:", error));

let testsec = document.querySelector(".testsec")
let content = testsec.querySelector("h2")
let button_content = testsec.querySelector(".testbtn")
let instalink = document.querySelectorAll('#instalink')
let tglink = document.querySelectorAll('#tglink')
let smslink = document.querySelector('#smslink')
let tellLink = document.querySelector('#tellLink')
let settingURL = "https://script.google.com/macros/s/AKfycby6qXDAicRFqlvS0Q93UhO-WH1zMbd2joqYwgp8EjL4J1Egd8Uz8TpcMpGYKMhCRbH7/exec"
fetch(settingURL)
    .then(response => response.json())  // Javobni JSON formatida olish
    .then(users => {
        for (let element of users) {
            let indicator = element['elon turi']
            let bildirishnma_BoshMenu = element['bildirishnma_BoshMenu']
            let Tell_number_BoshMenu = element['Tell_number_BoshMenu']
            let Instagram_link_BoshMenu = element['Instagram_link_BoshMenu']
            let telegram_link_BoshMenu = element['telegram_link_BoshMenu']
            telegramChatId = element['TG_chatID']

            instalink.forEach(el=>{
                el.href = Instagram_link_BoshMenu
            })
            tglink.forEach(el=>{
                el.href = telegram_link_BoshMenu
            })
            smslink.href = `sms:+${Tell_number_BoshMenu}?&body=Salom mening ismim ______. Mening sizga yozishdan maqsadim__________`
            tellLink.href = `tel:+${Tell_number_BoshMenu}`


            switch (indicator) {
                case "royhatga_olish":
                    testsec.style.display = "flex"
                    content.textContent = bildirishnma_BoshMenu
                    button_content.textContent = "Ro'yhatdan o'tish"
                    break;
                case "test_javobi":
                    testsec.style.display = "flex"
                    content.textContent = bildirishnma_BoshMenu
                    button_content.textContent = "Test javobini bilish"
                    break;
                default:
                    break;
            }
        }
    })
    .catch(error => console.error("Xato:", error));