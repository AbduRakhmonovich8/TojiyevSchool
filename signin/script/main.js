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


let tablebody = document.querySelector(".tablebody")
let numberUser = document.querySelector(".numberUser")


// URL
const url = "https://script.googleusercontent.com/macros/echo?user_content_key=ddrBy2x665rvuXje5LbC7adRnbh_GDVy2qO3NTrlTfPKeeUcw9SKkBXm67mmAAdz74cDkg7guPPi5vBOLGGD4S39yZxDx6DMm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMaqO4vzAk1eNU8HFRwYQRJZzAk85ZX9uBfvulnJ5lJtVEeJl33faT6FVTjtLRwc-uH7wEN4nNVLCjL5JDZ6tC-fZohciHsDvQ&lib=M0wjA6ll4jMljXkzIvefnq9_2Uq8BBHw2";
// GET so'rovini yuborishc
// let lugat = []
fetch(url)
    .then(response => response.json())  // Javobni JSON formatida olish
    .then(users => {
        console.log(users);
        
        let i = 0
        for (let element of users) {
            i++
            numberUser.textContent = i
            let Ball = element.Ball
            if(Ball==""){
                Ball = "---"
            }
            const newRow = `
            <tr id="change" data-name="${element["Familyangiz nima ?"] + " " + element["Ismingiz nima ?"]}">
            <td>&nbsp;&nbsp; ${i} &nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp; ${element["Familyangiz nima ?"] + " " + element["Ismingiz nima ?"]} &nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp; ${element["O'quv markazi nomi yoki maktabingiz soni ?"]} &nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp; <a href="${element["O'z rasmingiz ni yuklang ?"]}"> 👁️ </a>&nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp; ${Ball} &nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp; ${(new Date(element.Timestamp)).toLocaleString()} &nbsp;&nbsp;</td>
            </tr>
            `;
            tablebody.innerHTML += newRow;
        }
    })
    .catch(error => console.error("Xato:", error));  // Agar xatolik bo'lsa

