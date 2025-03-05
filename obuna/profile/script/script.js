let user = "";
let tell = "";
let date = "";
let oquv_markaz = "";
const logined = document.querySelector(".logined");
const kirish = document.querySelector(".kirish");

document.querySelector(".logoutbtn").addEventListener("click", () => {
  if (confirm("Siz accauntingizdan chiqmoqchimisiz !")) {
    user = "";
    tell = "";
    date = "";
    oquv_markaz = "";
    kirish.classList.remove("hidden");
    logined.classList.add("hidden");
    localStorage.clear();
  }
});
function chizishUser(data) {
  let mal = data.data;
  document.querySelectorAll("#nameUser").forEach((element) => {
    element.textContent = mal.name;
    logined.querySelector("#tellUser").textContent = "+998" + mal.tell;
    logined.querySelector("#indexUser").textContent =
      "Obuna " + new Date(mal.finishDate).toLocaleDateString("en-US") + " gacha to'lov amalga oshirilgan 👌";

    logined.querySelector("#markazUser").textContent = mal.markaz;
    let isActiveIndex = compareWithToday(new Date(mal.finishDate).toLocaleDateString("en-US"));
    isActive(isActiveIndex);
  });
}

const compareWithToday = (dateStr) => {
  // Hozirgi sanani olish
  const today = new Date();
  today.setDate(today.getDate() - 1);
  const todayFormatted = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day); // Oylar 0 dan boshlanadi
  };
  const todayDate = parseDate(todayFormatted);
  const otherDate = parseDate(dateStr);

  // Taqqoslash
  if (todayDate < otherDate) {
    return true;
  } else {
    return false;
  }
};
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
///////////////////////////////////////Local storge
async function localStorageGet() {
  try {
    let localicData = JSON.parse(localStorage["user"]);
    data = {
      phone: localicData.tell,
      hashPassword: localicData.pass,
    };
    const responseAccess = await testData(data, "check", userUrl);
    if (responseAccess.message == "network") {
      showMsgFunk("Internetga ulanishda muammo !!!");
    } else if (responseAccess.message == "Kirish Muvaffaqiyatli") {
      showMsgFunk("Muovfaqiyatli ✅");
      chizishUser(responseAccess);
      kirish.querySelector("#login1").value = "";
      kirish.querySelector("#password1").value = "";
      kirish.classList.add("hidden");
      logined.classList.remove("hidden");
    }
  } catch (error) {
    console.log(error);
  }
}
localStorageGet();
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
      let user = { tell: login1, pass: await hashPassword(pass1) };
      localStorage.setItem("user", JSON.stringify(user));
      kirish.querySelector("#login1").value = "";
      kirish.querySelector("#password1").value = "";

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
      kirish.querySelector("#fam").value = "";
      kirish.querySelector("#date").value = "";
      kirish.querySelector("#tell").value = "";
      kirish.querySelector("#maktab").value = "";
      kirish.querySelector("#password2").value = "";
      kirish.querySelector("#password22").value = "";
      onTogleRoyhat();
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
  "https://script.google.com/macros/s/AKfycbwvm-mkisnpuZRhlKB289cnsLVXje62_qmQ6sl960d6sDdvSr2xd4u1x4-wXJuLo8st/exec"; 

async function testDataChose(sheetname = "", url) {
  let currentUrl = url + "?method=" + sheetname;

  try {
    // fetch chaqiruvi va javobni kutish
    const response = await fetch(currentUrl);
    const responseData = await response.json(); // javobni JSON formatda olish
    return await responseData; // data ni qaytarish
  } catch (error) {
    showMsgFunk("Tarmoq muammosi"); // xatolikni qaytarish
    return error.message;
  }
}

async function checkactive() {
  let numbers = await testDataChose("adminlar_tell", Admin_db);
  let inner = "";
  numbers.forEach((elem) => {
    inner += `<a href="tel:+998${elem.tell}" target="_blank">Telifon orqali: ${elem.name} +998${elem.tell} </a>`;
  });
  document.querySelector("#numberic").innerHTML = inner;
}
async function testDetalistChiz(Admin_db) {
  const testlar_part = document.querySelector(".testlar>.container");
  let tests = await testDataChose("obunachi_testlari", Admin_db);
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
                <button data-timic="1" data-name="${
                  data.testnomi
                }" data-index="false" class="button passexsam" href="">Test ishlash</button>
      </div>
    `;
    testlar_part.innerHTML = innertext;
  });
  buttonOnClick()
}

// soatlik testlar
////////////////////////////////////////////////////////////////////////////////////////////////////////
async function soatlik_testlar(Admin_db) {
  const [testjson] = await testDataChose("soatlik_testlar", Admin_db);
  const notest = document.querySelector(".notesTest");
  const h3t = notest.querySelector("h3");
  const examt = notest.querySelector("#passexsamt");
  h3t.textContent = await testjson.messege;
  if (testjson.test_index == "test_bor") {
    notest.classList.remove("hidden");
  } else if (testjson.test_index == "test_jarayonda") {
    logined.querySelector("#passexsamt").dataset.timic = testjson.chatId;
    notest.classList.remove("hidden");
    examt.classList.remove("hidden");
  }
}

async function isActive(index) {
  if (index) {
    document.querySelector(".tolav").style.display = "none";
    await testDetalistChiz(Admin_db);
    await soatlik_testlar(Admin_db);
  } else {
    document.querySelector(".active").style.display = "none";
    checkactive();
  }
}
