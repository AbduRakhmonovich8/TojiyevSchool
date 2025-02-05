const jsonQuestion = [
  {
    question:
      "Agar \\( f(x) = x^2 - 1 \\) va \\( g(x) = 3 - 2x \\) bo'lsa, \\( f(g(x)) \\) ni toping.",
    aj: "4x^2 - 12x + 8",
    bj: "4x^2 + 12x - 8",
    cj: "5 - 2x^2",
    trj: "a",
  },
  {
    question:
      "\\( f(t) = t^4 - 2t^2 + 1 \\) bo'lsa, \\( f'(1) \\) ni hisoblang.",
    aj: "0",
    bj: "4",
    cj: "2",
    trj: "b",
  },
  {
    question:
      "\\( f(x) = \\frac{1}{1 - \\cos(-x + 8\\pi)} \\) funksiyaning boshlang'ich funksiyasini toping.",
    aj: "\\( \\frac{1}{2} \\tg \\frac{x}{2} + C \\)",
    bj: "\\( \\frac{1}{2} \\ctg \\frac{x}{2} + C \\)",
    cj: "\\( - \\ctg \\frac{x}{2} + C \\)",
    trj: "a",
  },

  {
    question:
      "Simplify: \\( \\frac{3 \\sqrt{25}}{2} + \\frac{\\sqrt{81}}{4} \\)",
    aj: "18.25",
    bj: "16.5",
    cj: "17",
    trj: "a",
  },
  {
    question:
      "Solve: \\( \\sqrt{\\frac{121}{49}} + \\frac{5}{7} \\times \\sqrt{16} \\)",
    aj: "5.71",
    bj: "6.14",
    cj: "5.5",
    trj: "b",
  },
  {
    question:
      "Find: \\( \\frac{\\sqrt{64} + \\frac{7}{3}}{\\frac{5}{6}} - \\sqrt{\\frac{36}{9}} \\)",
    aj: "18.6",
    bj: "19.2",
    cj: "17.4",
    trj: "b",
  },
  {
    question:
      "Simplify: \\( \\sqrt{\\frac{49}{25}} \\times \\left( \\frac{9}{4} + \\frac{1}{2} \\right) \\)",
    aj: "7.35",
    bj: "6.8",
    cj: "8.1",
    trj: "a",
  },
  {
    question:
      "Evaluate: \\( \\left( \\frac{3}{2} \\times \\sqrt{16} \\right) + \\frac{\\sqrt{81}}{3} - \\frac{7}{5} \\)",
    aj: "9.1",
    bj: "8.6",
    cj: "8.8",
    trj: "c",
  },
];

let user = "";
let tell = "";
let date = "";
let oquv_markaz = "";
const logined = document.querySelector(".logined");
const kirish = document.querySelector(".kirish");

document.querySelector(".logoutbtn").addEventListener("click", () => {
  user = "";
  tell = "";
  date = "";
  oquv_markaz = "";
  kirish.classList.remove("hidden");
  logined.classList.add("hidden");
});
function chizishUser(data) {
  let mal = data.data;
  document.querySelectorAll("#nameUser").forEach((element) => {
    element.textContent = mal.name;
  logined.querySelector("#tellUser").textContent = "+998"+mal.tell
  logined.querySelector("#indexUser").textContent = "Obuna "+mal
  });
}

const modal = document.querySelector(".modal");
let showMsg = modal.querySelector(".content");
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
let DateUrl = `https://script.google.com/macros/s/AKfycbxbjz7TNqwW3FHzT8-6Edf4GJuisClbpAhjpBnl6YhP58MDGRHSo_FjazmAzZb9-8iU/exec`;

async function testData(data = "", option = "get", url) {
  let currentUrl = "";
  if (option === "get") {
    currentUrl = url + "?action=" + option;
  }
  currentUrl = `${url}?action=${option}&data=${JSON.stringify(data)}`;
  try {
    // fetch chaqiruvi va javobni kutish
    const response = await fetch(currentUrl);
    const responseData = await response.json(); // javobni JSON formatda olish
    return await responseData; // data ni qaytarish
  } catch (error) {
    return await "network"; // xatolikni qaytarish
  }
}

// arrayli funktion
// async function sendRequests() {
//   for (let index = 0; index < jsonQuestion.length; index++) {
//     await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 soniya interval
//     testData(jsonQuestion[index], "post", DateUrl);
//     console.log(
//       "loading: " + parseInt(index / (jsonQuestion.length / 100)) + " %"
//     );
//   }
// }
// sendRequests();

///////////////////////////////////////////////////////////////////////////////////////////////////1
//https://script.google.com/macros/s/AKfycbwIQ-lfYoT0Evqtsmnv1lKsm5yDLligMGql8-Fi1lX8XRSREI9Suos_960W6C_Ls8Pk/exec?action=check&data={"phone":"944646412","hashPassword":"f215ad9f632cb9b55c3dc2b61c47942b10feb5f1cdb2aafd73b8c569aa17cb88"}

// test bilan bogliq
////////////////////////////////////////////////////////////////////////////////////////////////////
let answare1; // To'g'ri javoblarni shu arrayda saqlaymiz
const form = document.forms["quizForm"];

function submitAnswers(e) {
  e.preventDefault(); // Formning standart jo'natilishini oldini olamiz

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
function makeForm(jsonFile) {
  console.log(jsonFile);

  let answare1 = [];
  let innertext = "";
  jsonFile.sort(() => Math.random() - 0.5);
  jsonFile.forEach((elem, index) => {
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
    answare1[index] = elem.trj;
  });

  innertext += `<input type="submit" name="quizForm" id="submit" value="tekshirish">`;
  form.innerHTML = innertext;
  return answare1;
}
////////////////////////////////////////////////////////////////////////////////////////////////////

// working siyt
////////////////////////////////////////////////////////////////////////////////////////////////////
document.querySelectorAll(".passexsam").forEach((elem, index) => {
  elem.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(jsonQuestion);
    answare1 = makeForm(jsonQuestion);
    document.querySelector(".profile").classList.add("hidden");
    document.querySelector(".exam").classList.remove("hidden");
    MathJax.typeset();
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////
// display functions
//////////////////////////////////////////////////////////////////////////////////////////////////
document.querySelector(".quit").addEventListener("click", (e) => {
  document.querySelector(".profile").classList.remove("hidden");
  document.querySelector(".exam").classList.add("hidden");
});

// login part
const onTogleKirish = (e) => {
  document.querySelector(".box1").classList.add("hidden");
  document.querySelector(".box2").classList.remove("hidden");
};
const onTogleRoyhat = (e) => {
  document.querySelector(".box2").classList.add("hidden");
  document.querySelector(".box1").classList.remove("hidden");
};
document.querySelector(".changeK").addEventListener("click", onTogleKirish);
document.querySelector(".changeR").addEventListener("click", onTogleRoyhat);
//////////////////////////////////////////////////////////////////////////////////////////////////
// login Part
//////////////////////////////////////////////////////////////////////////////////////////////////
const userUrl =
  "https://script.google.com/macros/s/AKfycbwyXofgQ2MpfI-LxzqgqzfYxooxgk-Z92T2gM7xrqIkPFm8soNQQES6_GUVlvOw97ei/exec ";
const input1 = kirish.querySelector("#submit1");
const input2 = kirish.querySelector("#submit2");

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
// Test qilish
input1.addEventListener("click", async (e) => {
  e.preventDefault();
  let login1 = kirish.querySelector("#login1").value.toString();
  let pass1 = kirish.querySelector("#password1").value.toString();
  data = {
    phone: login1,
    hashPassword: await hashPassword(pass1),
  };
  if (login1 && pass1) {
    modal.classList.remove("hidden");
    const responseAccess = await testData(data, "check", userUrl);
    if (responseAccess == "network") {
      showMsgFunk("Internetga ulanishda muammo !!!");
    } else if (responseAccess.message == "Kirish Muvaffaqiyatli") {
      showMsgFunk("Muovfaqiyatli ✅");
      console.log(responseAccess);
      chizishUser(responseAccess);
      login1 = "";
      pass1 = "";
      kirish.classList.add("hidden");
      logined.classList.remove("hidden");
    } else {
      showMsgFunk("Kalitso'z yoki telifon raqam xato !!!");
    }
  } else {
    console.log("clicked");
  }
});

input2.addEventListener("click", async (e) => {
  e.preventDefault();
  let fam = kirish.querySelector("#fam").value;
  let date = kirish.querySelector("#date").value;
  let tell = kirish.querySelector("#tell").value;
  let maktab = kirish.querySelector("#maktab").value;
  let password2 = kirish.querySelector("#password2").value;
  let password22 = kirish.querySelector("#password22").value;
  if (tell && (isNaN(+tell) || tell.length != 9)) {
    showMsgFunk("Telifon raqam 9 ta raqamdan tashkil topsin !!!");
  } else if (
    password2 == password22 &&
    fam &&
    tell &&
    date &&
    maktab &&
    password2.length > 5
  ) {
    modal.classList.remove("hidden");
    data = {
      timeStamp: new Date(),
      name: fam,
      phone: tell,
      hashPassword: await hashPassword(password2),
      brithday: date,
      stadyCenter: maktab,
      parol: password2,
    };
    const responseAccess = await testData(data, "post", userUrl);
    if (responseAccess == "network") {
      showMsgFunk("Internetga ulanishda muammo !!!");
    } else if (responseAccess.status == "200") {
      showMsgFunk(responseAccess.message);
      fam = "";
      tell = "";
      maktab = "";
      password2 = "";
      password22 = "";
    } else {
      showMsgFunk(responseAccess.message);
    }
  } else if (password2.length < 6 && tell && date && fam && maktab) {
    showMsgFunk("Parol kamida 6ta belgidan tashkil topsin !!!");
  } else if (password2 != password22 && tell && date && fam && maktab) {
    showMsgFunk("Parollar mos emas !!!");
  } else {
    showMsgFunk("Malumotlarni to'ldiring !!!");
  }
});
