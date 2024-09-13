var telegramToken = '2b56bfc129feab0f4c0f9de19b4b3b7d'; // Bu yerda tokenni hashlangan xolatini kiritasiz
var telegramChatId = '3f3cfb972e21f7c947dd9146cc75b3b4'; // Bu yerda chat ID ni hashlangan xolatini kiritasiz

var name = 'John Doe'; // Mijozning ismi
var email = 'example@example.com'; // Mijozning email manzili
var phone = '+1234567890'; // Mijozning telefon raqami
var message = 'Hello, world!'; // Xabarning matni

// Mijoz ma'lumotlarini tasvirlash
var customerData = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;

// Ma'lumotlarni hashlash
var hashedData = hashString(customerData);

// Telegram botga jo'natish uchun xabar tayyorlash
var telegramMessage = `Hashed Customer Data: ${hashedData}`;

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
        alert('Forma muvaffaqiyatli yuborildi!');
    } else {
        document.getElementById('error').textContent = 'Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.';
    }
})
.catch(error => {
    console.error('Error:', error);
    document.getElementById('error').textContent = 'Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.';
});

// Funktsiya ma'lumotlarni hashlash
function hashString(str) {
    // Kodni o'zgartirish, ushbu o'zgaruvchini sha256 hash funktsiyasiga o'rnating
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(str)).then(hash => {
        var hexString = '';
        const view = new DataView(hash);
        for (let i = 0; i < hash.byteLength; i += 4) {
            const num = view.getUint32(i);
            hexString += num.toString(16).padStart(8, '0');
        }
        return hexString;
    });
}
