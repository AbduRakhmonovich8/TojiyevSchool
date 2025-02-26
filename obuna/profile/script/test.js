let testDataUrl = `https://script.google.com/macros/s/AKfycbxo6R-oSlL3z7VtjrvGrmdqJAfCIRkHAqZEZm4N88Ob1_oMyOiHXlGrPrLNuW1hIPz2/exec`;
let passexsam;
let currentUserName = document.querySelector("#nameUser");
let currentUserPhone = document.querySelector("#tellUser");
let areTimic = false;
function showMsgFunk(msg = "yuklanmoqda...", visiblity = true) {
  modal.classList.remove("hidden");
  showMsg.textContent = msg;
  if (visiblity) {
    setTimeout(() => {
      modal.classList.add("hidden");
      showMsg.textContent = "yuklanmoqda...";
    }, 2000);
  }
}
// data crate functions
///////////////////////////////////////////////////////////////////////////////////////////////////

async function testDatafortest(sheetname = "", data = "", option = "get", url) {
  let currentUrl = "";
  if (option === "get") {
    currentUrl = url + "?action=" + option + "&sheetname=" + sheetname;
  } else {
    currentUrl = `${url}?action=${option}&sheetname=${sheetname}&data=${JSON.stringify(
      data
    )}`;
  }
  try {
    // fetch chaqiruvi va javobni kutish
    showMsgFunk(undefined, false);
    const response = await fetch(currentUrl);
    const responseData = await response.json(); // javobni JSON formatda olish
    showMsgFunk();
    return await responseData; // data ni qaytarish
  } catch (error) {
    showMsgFunk("Tarmoq muammosi", false); // xatolikni qaytarish
  }
}



// test bilan bogliq
////////////////////////////////////////////////////////////////////////////////////////////////////
let answare1; // To'g'ri javoblarni shu arrayda saqlaymiz
const form = document.forms["quizForm"];

function submitAnswers(e) {
  e.preventDefault();
  try {
    let total = answare1.length;
    let score = 0;
    let formg = [];

    // Foydalanuvchi javoblarini olish
    answare1.forEach((_, index) => {
      let answer = document.forms["quizForm"][`q${index + 1}`]?.value;
      formg[index] = answer ? answer : ""; // Bo'sh bo'lsa, "" qilish
    });

    // Javoblarni tekshirish
    formg.forEach((elem, index) => {
      if (elem === answare1[index]) {
        score++;
      }
    });

    // Natijani chiqarish
    form.innerHTML = `<h3>You got ${score} out of ${total}</h3>`;
    if (areTimic) {
      areTimic = false;
      let content = `Name: ${currentUserName.textContent} Phone: ${
        currentUserPhone.textContent
      } ${score} of ${total} tests. Test name: ${passexsam}. Time: Date: ${new Date()} `;
      telegram(content);
      data = {
        date: `${new Date()}`,
        name: currentUserName.textContent,
        tell: currentUserPhone.textContent,
        result: `${score} of ${total} tests`,
        testname: passexsam,
      };
      sentCompitation(data);
    }
  } catch (error) {
    console.log(error);
  }
}

// telegram link
//////////////////////////////////////////////////////////////////////////////////////////////////////////

async function sentCompitation(data) {
  let timeUrl =
    "https://script.google.com/macros/s/AKfycbxe4rKKKkCG_OXuNqe4L-uLHQ1cyWH2zGM7D5RCFaJSAkkB2O1P5ZaA6TQXmiu6hVkF1w/exec";
  let currentUrl = "";
  currentUrl = `${timeUrl}?data=${JSON.stringify(data)}`;
  try {
    // fetch chaqiruvi va javobni kutish
    showMsgFunk(undefined, false);
    const response = await fetch(currentUrl);
    const responseData = await response.json(); // javobni JSON formatda olish
    showMsgFunk("Muavfaqiyatli...");
    return await responseData; // data ni qaytarish
  } catch (error) {
    showMsgFunk("Tarmoq muammosi", false); // xatolikni qaytarish
    console.error(error);
  }
}
function telegram(telegramMessage) {
  var telegramChatId = document.querySelector("#passexsamt").dataset.timic; //"5672285896";
  // Telegram botiga xabar yuborish
  var telegramToken = "6799581106:AAEld8Tgt4c1DUmg9UNaICjNZDkr6NiQ-GU";
  var telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
  fetch(telegramUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: telegramChatId,
      text: telegramMessage,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return 0;
    })
    .catch((error) => {
      console.log("no internet connaction ," + error);
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function replice(text) {
  while (text.includes("qoshuv")) text = text.replace("qoshuv", "+");
  return text;
}
// test yasash uchun ishlatiladi
async function makeForm(url, sheetname) {
  let hedermal = {
    question: "question",
    aj: "aj",
    bj: "bj",
    cj: "cj",
    trj: "trj",
  };
  await testDatafortest(sheetname, hedermal, "post", testDataUrl);
  let jsonFile = await testDatafortest(sheetname, "", "get", url).then(
    (rej) => rej.data
  );
  let javoblar = [];
  let innertext = "";
  await jsonFile.sort(() => Math.random() - 0.5);
  await jsonFile.forEach((elem, index) => {
    innertext += `
                      <h3>${index + 1}. ${replice(elem.question)}</h3>
                    <input type="radio" name="q${index + 1}" value="a" id="q${
      index + 1
    }a" /> a. ${elem.aj}<br />
                    <input type="radio" name="q${index + 1}" value="b" id="q${
      index + 1
    }b" /> b. ${elem.bj}<br />
                    <input type="radio" name="q${index + 1}" value="c" id="q${
      index + 1
    }c" /> c. ${elem.cj}<br />
  
        `;
    javoblar[index] = elem.trj;
  });

  innertext += `<input class="input button" type="submit" name="quizForm" id="submit" value="tekshirish">`;
  form.innerHTML = innertext;
  MathJax.typeset();
  answare1 = await javoblar;
}
////////////////////////////////////////////////////////////////////////////////////////////////////

// working siyt
////////////////////////////////////////////////////////////////////////////////////////////////////
function buttonOnClick() {
  document.querySelectorAll(".passexsam").forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      passexsam = e.target.dataset.name;
      showMsgFunk(undefined, false);
      makeForm(testDataUrl, passexsam);
      document.querySelector(".profile").classList.add("hidden");
      document.querySelector(".exam").classList.remove("hidden");
    });
  });
}
document.querySelectorAll("#passexsamt").forEach((elem) => {
  elem.addEventListener("click", (e) => {
    e.preventDefault();
    areTimic = true;
    passexsam = e.target.dataset.name;
    showMsgFunk(undefined, false);
    makeForm(testDataUrl, passexsam);
    document.querySelector(".profile").classList.add("hidden");
    document.querySelector(".exam").classList.remove("hidden");
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////
