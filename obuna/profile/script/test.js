// const jsonQuestion = [
//   {
//     question:
//       "Agar \\( f(x) = x^2 - 1 \\) va \\( g(x) = 3 - 2x \\) bo'lsa, \\( f(g(x)) \\) ni toping.",
//     aj: "4x^2 - 12x + 8",
//     bj: "4x^2 + 12x - 8",
//     cj: "5 - 2x^2",
//     trj: "a",
//   },
//   {
//     question:
//       "\\( f(t) = t^4 - 2t^2 + 1 \\) bo'lsa, \\( f'(1) \\) ni hisoblang.",
//     aj: "0",
//     bj: "4",
//     cj: "2",
//     trj: "b",
//   },
//   {
//     question:
//       "\\( f(x) = \\frac{1}{1 - \\cos(-x + 8\\pi)} \\) funksiyaning boshlang'ich funksiyasini toping.",
//     aj: "\\( \\frac{1}{2} \\tg \\frac{x}{2} + C \\)",
//     bj: "\\( \\frac{1}{2} \\ctg \\frac{x}{2} + C \\)",
//     cj: "\\( - \\ctg \\frac{x}{2} + C \\)",
//     trj: "a",
//   },

//   {
//     question:
//       "Simplify: \\( \\frac{3 \\sqrt{25}}{2} + \\frac{\\sqrt{81}}{4} \\)",
//     aj: "18.25",
//     bj: "16.5",
//     cj: "17",
//     trj: "a",
//   },
//   {
//     question:
//       "Solve: \\( \\sqrt{\\frac{121}{49}} + \\frac{5}{7} \\times \\sqrt{16} \\)",
//     aj: "5.71",
//     bj: "6.14",
//     cj: "5.5",
//     trj: "b",
//   },
//   {
//     question:
//       "Find: \\( \\frac{\\sqrt{64} + \\frac{7}{3}}{\\frac{5}{6}} - \\sqrt{\\frac{36}{9}} \\)",
//     aj: "18.6",
//     bj: "19.2",
//     cj: "17.4",
//     trj: "b",
//   },
//   {
//     question:
//       "Simplify: \\( \\sqrt{\\frac{49}{25}} \\times \\left( \\frac{9}{4} + \\frac{1}{2} \\right) \\)",
//     aj: "7.35",
//     bj: "6.8",
//     cj: "8.1",
//     trj: "a",
//   },
//   {
//     question:
//       "Evaluate: \\( \\left( \\frac{3}{2} \\times \\sqrt{16} \\right) + \\frac{\\sqrt{81}}{3} - \\frac{7}{5} \\)",
//     aj: "9.1",
//     bj: "8.6",
//     cj: "8.8",
//     trj: "c",
//   },
// ];
// // arrayli funktion
// async function sendRequests(jsonQuestion) {
//   for (let index = 0; index < jsonQuestion.length; index++) {
//     await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 soniya interval
//     testDatafortest("ommaviy",jsonQuestion[index], "post", testDataUrl);
//     console.log(
//       "loading: " + parseInt(index / (jsonQuestion.length / 100)) + " %"
//     );
//   }
// }
// sendRequests(jsonQuestion);
let testDataUrl = `https://script.google.com/macros/s/AKfycbyQ39u4l7Iscnouu1tPyCGh1dAWWwhI4b35OT4210vpNKeUfbBCjBOH8p4ajepdVlz_/exec`;
function showMsgFunk(msg = "yuklanmoqda...") {
  modal.classList.remove("hidden");
  showMsg.textContent = msg;
  setTimeout(() => {
    modal.classList.add("hidden");
    showMsg.textContent = "yuklanmoqda...";
  }, 2000);
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
    const response = await fetch(currentUrl);
    const responseData = await response.json(); // javobni JSON formatda olish
    return await responseData; // data ni qaytarish
  } catch (error) {
    showMsgFunk("Tarmoq muammosi"); // xatolikni qaytarish
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////1
//https://script.google.com/macros/s/AKfycbwIQ-lfYoT0Evqtsmnv1lKsm5yDLligMGql8-Fi1lX8XRSREI9Suos_960W6C_Ls8Pk/exec?action=check&data={"phone":"944646412","hashPassword":"f215ad9f632cb9b55c3dc2b61c47942b10feb5f1cdb2aafd73b8c569aa17cb88"}

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
    alert(`You got ${score} out of ${total}`);
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
  let jsonFile = await testDatafortest("ommaviy", "", "get", url).then(
    (rej) => rej.data
  );
  console.log(await jsonFile);

  let javoblar = [];
  let innertext = "";
  await jsonFile.sort(() => Math.random() - 0.5);
  console.log(jsonFile);

  await jsonFile.forEach((elem, index) => {
    innertext += `
                      <h3>${index + 1}. ${elem.question}</h3>
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

  innertext += `<input class="input" type="submit" name="quizForm" id="submit" value="tekshirish">`;
  form.innerHTML = innertext;
  MathJax.typeset();
  answare1 = await javoblar;
}
////////////////////////////////////////////////////////////////////////////////////////////////////

// working siyt
////////////////////////////////////////////////////////////////////////////////////////////////////
function buttonOnClick(){
  document.querySelectorAll(".passexsam").forEach((elem, index) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(elem.dataset.name); // `elem` dan `data-name` ni olamiz
      makeForm(testDataUrl);
      document.querySelector(".profile").classList.add("hidden");
      document.querySelector(".exam").classList.remove("hidden");
    });
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////
