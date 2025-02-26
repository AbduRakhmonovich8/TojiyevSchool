let testDataUrl = `https://script.google.com/macros/s/AKfycbxo6R-oSlL3z7VtjrvGrmdqJAfCIRkHAqZEZm4N88Ob1_oMyOiHXlGrPrLNuW1hIPz2/exec`;
const modal = document.querySelector(".modal");
const showMsg = modal.querySelector("p");
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
///////////////////////////////////////////////////////////////////////////////////////////////////1
//https://script.google.com/macros/s/AKfycbwIQ-lfYoT0Evqtsmnv1lKsm5yDLligMGql8-Fi1lX8XRSREI9Suos_960W6C_Ls8Pk/exec?action=check&data={"phone":"944646412","hashPassword":"f215ad9f632cb9b55c3dc2b61c47942b10feb5f1cdb2aafd73b8c569aa17cb88"}

// test bilan bogliq
////////////////////////////////////////////////////////////////////////////////////////////////////
let answare1; // To'g'ri javoblarni shu arrayda saqlaymiz
const form = document.forms["quizForm"];

function replice(text) {
  while (text.includes("qoshuv")) text = text.replace("qoshuv", "+");
  return text;
}

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
  } catch (error) {
    console.log(error);
  }
}
// test yasash uchun ishlatiladi
async function makeForm(url) {
  let hedermal = {
    question: "question",
    aj: "aj",
    bj: "bj",
    cj: "cj",
    trj: "trj",
  };
  await testDatafortest("ommaviy", hedermal, "post", testDataUrl);
  let jsonFile = await testDatafortest("ommaviy", "", "get", url)
    .then((rej) => rej.data)
    .catch((err) => {
      showMsgFunk("Tarmoq Xarosi error <br>" + err);
      return;
    });
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
  return;
}
////////////////////////////////////////////////////////////////////////////////////////////////////

// working siyt
////////////////////////////////////////////////////////////////////////////////////////////////////
makeForm(testDataUrl);
document.querySelector(".tryBtn").addEventListener("click", () => {
  makeForm(testDataUrl);
});

//////////////////////////////////////////////////////////////////////////////////////////////////
