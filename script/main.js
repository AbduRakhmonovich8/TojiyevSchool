

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
        }, 2000);
    }else{
        errors.style.display = "block";
        setTimeout(() => {
            errors.style.display = "none";
            loader.style.display = "none";
        }, 2000);
    }
}




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
    var telegramChatId =document.getElementById("ii").textContent;
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
                // alert('Forma muvaffaqiyatli yuborildi!');
            } else {
                ShowModal("no")
                // document.getElementById('error').textContent = 'Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            ShowModal("no")
            // document.getElementById('error').textContent = 'Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.';
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

// function hashString(str) {
//     // Kodni o'zgartirish, ushbu o'zgaruvchini sha256 hash funktsiyasiga o'rnating
//     return crypto.subtle.digest("SHA-256", new TextEncoder().encode(str)).then(hash => {
//         var hexString = '';
//         const view = new DataView(hash);
//         for (let i = 0; i < hash.byteLength; i += 4) {
//             const num = view.getUint32(i);
//             hexString += num.toString(16).padStart(8, '0');
//         }
//         return hexString;
//     });
// }
// console.log(hashString(""));
// hashString(customerData).then(hashedData => {
//     console.log('Hashed Customer Data:', hashedData);
// });