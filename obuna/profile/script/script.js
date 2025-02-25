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
    logined.querySelector("#tellUser").textContent = "+998" + mal.tell;
    logined.querySelector("#indexUser").textContent =
      "Obuna " +
      new Date(mal.finishDate).toLocaleDateString("en-GB") +
      " gacha to'lov amalga oshirilgan 👌";
    logined.querySelector("#markazUser").textContent = mal.markaz;
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

// display functions
//////////////////////////////////////////////////////////////////////////////////////////////////
document.querySelector(".quit").addEventListener("click", (e) => {
  document.querySelector(".profile").classList.remove("hidden");
  document.querySelector(".exam").classList.add("hidden");
  document.forms["quizForm"].innerHTML = "";
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
  "https://script.google.com/macros/s/AKfycbw0lS3z-zZXNB-Y96Lnoz1T6iN8audFk5OXLefNHAqsUK7r3KayZWllC2w6L_mj7r6z/exec"; // userlar.db
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
    if (responseAccess.message == "network") {
      showMsgFunk("Internetga ulanishda muammo !!!");
    } else if (responseAccess.message == "Kirish Muvaffaqiyatli") {
      showMsgFunk("Muovfaqiyatli ✅");
      chizishUser(responseAccess);
      testDetalistChiz();
      login1 = "";
      pass1 = "";
      kirish.classList.add("hidden");
      logined.classList.remove("hidden");
    } else {
      showMsgFunk("Kalitso'z yoki telifon raqam xato !!!");
    }
  } else {
    showMsgFunk("Malumotlarni toldiring !!!");
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
      timeStamp: new Date().toLocaleDateString("en-GB"),
      name: fam,
      phone: tell,
      hashPassword: await hashPassword(password2),
      brithday: new Date(date).toLocaleDateString("en-GB"),
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

// TestDetalies
////////////////////////////////////////////////////////////////////////////////
const Admin_db =
  "https://script.google.com/macros/s/AKfycbwvm-mkisnpuZRhlKB289cnsLVXje62_qmQ6sl960d6sDdvSr2xd4u1x4-wXJuLo8st/exec"; // test.db

async function testDataChose(sheetname = "", url) {
  let currentUrl = url + "?method=" + sheetname;
  try {
    // fetch chaqiruvi va javobni kutish
    const response = await fetch(currentUrl);
    const responseData = await response.json(); // javobni JSON formatda olish
    return await responseData; // data ni qaytarish
  } catch (error) {
    showMsgFunk("Tarmoq muammosi"); // xatolikni qaytarish
  }
}

async function testDetalistChiz() {
  const testlar_part = document.querySelector(".testlar>.container");
  let tests = await testDataChose("obunachi_testlari", Admin_db);
  console.log(tests);

  let innertext = "<h3>Testlar</h3>";
  tests.forEach((data) => {
    innertext += `<div class="test">
                <h3 class="test-title">${data.Test_mavzusi}</h3>
                <p class="test-content">
                  Foydalanilgan kitoblar: ${
                    data.test_qaysi_kitoblardan_tuzilgan
                  }
                  <br />
                  Test tuzuvchilar: ${data.tuzuvchilar} <br />
                  Test tuzilgan sana: ${new Date(
                    data.test_tuzilgan_sana
                  ).toLocaleDateString("en-GB")}
                </p>
                <button data-name="${
                  data.testnomi
                }" data-index="false" class="button passexsam" href="">Test ishlash</button>
      </div>
    `;
    testlar_part.innerHTML = innertext;
  });
  buttonOnClick();
}

// soatlik testlar
////////////////////////////////////////////////////////////////////////////////////////////////////////
let icvfile = "";
function convertToICalFormat(isoDate) {
  return (
    new Date(isoDate).toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z"
  );
}
let eventData;
async function soatlik_testlar(Admin_db) {
  const [testjson] = await testDataChose("soatlik_testlar", Admin_db);
  console.log(testjson);
  const notest = document.querySelector(".notesTest");
  const h3t = notest.querySelector("h3");
  const icst = notest.querySelector("#downloadICS");
  const examt = notest.querySelector("#passexsamt");
  console.log(await testjson.messege);

  h3t.textContent = await testjson.messege;
  if (testjson.test_index == "test_bor") {
    notest.classList.remove("hidden");
    icst.classList.remove("hidden");
    eventData = await `
    BEGIN:VCALENDAR
    VERSION:2.0
    PRODID:-//MyApp//NONSGML v1.0//EN
    BEGIN:VEVENT
    DTSTAMP:${await testjson.test_vaqti_kuni}
    DTSTART:${await testjson.test_vaqti_kuni}
    DTEND:${await testjson.tugash_vaqti}
    SUMMARY:${await testjson.message}
    DESCRIPTION:${await testjson.message} 
    BEGIN:VALARM
    TRIGGER:-PT10M
    ACTION:AUDIO
    ATTACH;VALUE=URI:BELL
    DESCRIPTION:${await testjson.message}
    END:VALARM
    END:VEVENT
    END:VCALENDAR
`;
  } else if (testjson.test_index == "test_jarayonda") {
    notest.classList.remove("hidden");
    examt.classList.remove("hidden");
  }
}
soatlik_testlar(Admin_db);

// set alarm
document.getElementById("downloadICS").addEventListener("click", function () {
  // ICS fayl formati
  const blob = new Blob([eventData], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "event.ics"; // ICS fayl nomi
  a.click();
});
