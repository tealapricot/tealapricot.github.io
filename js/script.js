const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0");
const tanggal = String(date.getDate()).padStart(2, "0");
const time = date.getTime();
window.addEventListener("load", function () {
  let data = localStorage.getItem("datajadwal");
  data = JSON.parse(data);
  if (data) {
    ubahTampilanJamSholat(data);
  }
});
window.addEventListener("load", getCoord());

function getCoord() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(coordFound);
  } else {
    //default akan menjadi jakarta apabila geoloc gagal
    cariKota(-6.175392, 106.827153);
  }
}
function coordFound(pos) {
  cariKota(pos.coords.latitude, pos.coords.longitude);
}

function cariKotaFromSearch(keyword) {}

function cariKota(lat, lon) {
  fetch(
    "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +
      lat +
      "&longitude=" +
      lon +
      "&localityInfo=administrative&administrative=2"
  )
    .then((Response) => Response.json())
    .then((data) => {
      getIdKota(data.localityInfo.administrative[2].name);
    });
}

function getIdKota(kota) {
  let isSearch = false;
  if (!kota) {
    kota = document.getElementById("searchkota").value;
    isSearch = true;
  }
  localStorage.setItem("kota", kota);
  fetch("https://api.myquran.com/v1/sholat/kota/cari/" + kota)
    .then((Response) => Response.json())
    .then((data) => {
      if (data.status == true) {
        if (isSearch) {
          alert("Kota ditemukan");
        }
        getJamSholat(data.data[0].id);
      } else {
        alert(
          "Kota tidak ditemukan, silahkan menggunakan keyword kota/kabupaten lain e.g:purworejo"
        );
      }
    });
}

function getJamSholat(idkota) {
  fetch(
    "https://api.myquran.com/v1/sholat/jadwal/" +
      idkota +
      "/" +
      year +
      "/" +
      month
  )
    .then((Response) => Response.json())
    .then((data) => {
      localStorage.setItem("datajadwal", JSON.stringify(data));
      ubahTampilanJamSholat(data);
    });
}

function ubahTampilanJamSholat(data) {
  document.getElementById("namakota").innerHTML = data.data.lokasi;
  let datajadwal = data.data.jadwal;
  document.getElementById("jamsubuh").innerHTML = datajadwal[tanggal - 1].subuh;
  document.getElementById("jamdzuhur").innerHTML =
    datajadwal[tanggal - 1].dzuhur;
  document.getElementById("jamashar").innerHTML = datajadwal[tanggal - 1].ashar;
  document.getElementById("jammaghrib").innerHTML =
    datajadwal[tanggal - 1].maghrib;
  document.getElementById("jamisya").innerHTML = datajadwal[tanggal - 1].isya;
  document.getElementById("todaydate").innerHTML =
    datajadwal[tanggal - 1].tanggal;

  let jamsubuh = new Date(
    year +
      "-" +
      month +
      "-" +
      tanggal +
      "T" +
      datajadwal[tanggal - 1].subuh +
      ":00.000+07:00"
  );
  let jamdzuhur = new Date(
    year +
      "-" +
      month +
      "-" +
      tanggal +
      "T" +
      datajadwal[tanggal - 1].dzuhur +
      ":00.000+07:00"
  );
  let jamashar = new Date(
    year +
      "-" +
      month +
      "-" +
      tanggal +
      "T" +
      datajadwal[tanggal - 1].ashar +
      ":00.000+07:00"
  );
  let jammaghrib = new Date(
    year +
      "-" +
      month +
      "-" +
      tanggal +
      "T" +
      datajadwal[tanggal - 1].maghrib +
      ":00.000+07:00"
  );
  let jamisya = new Date(
    year +
      "-" +
      month +
      "-" +
      tanggal +
      "T" +
      datajadwal[tanggal - 1].isya +
      ":00.000+07:00"
  );

  if (date < jamsubuh) {
    document.getElementById("logoshalat").src = "images/shubuh.jpg";
    document.getElementById("namashalat").innerHTML = "Subuh";
    document.getElementById("jamshalat").innerHTML =
      datajadwal[tanggal - 1].subuh + ":00";
  } else if (date < jamdzuhur) {
    document.getElementById("logoshalat").src = "images/dzuhur.jpg";
    document.getElementById("namashalat").innerHTML = "Dzuhur";
    document.getElementById("jamshalat").innerHTML =
      datajadwal[tanggal - 1].dzuhur + ":00";
  } else if (date < jamashar) {
    document.getElementById("logoshalat").src = "images/ashar.jpg";
    document.getElementById("namashalat").innerHTML = "Ashar";
    document.getElementById("jamshalat").innerHTML =
      datajadwal[tanggal - 1].ashar + ":00";
  } else if (date < jammaghrib) {
    document.getElementById("logoshalat").src = "images/maghrib.jpg";
    document.getElementById("namashalat").innerHTML = "Maghrib";
    document.getElementById("jamshalat").innerHTML =
      datajadwal[tanggal - 1].maghrib + ":00";
  } else if (date < jamisya) {
    document.getElementById("logoshalat").src = "images/isya.jpg";
    document.getElementById("namashalat").innerHTML = "Isya";
    document.getElementById("jamshalat").innerHTML =
      datajadwal[tanggal - 1].isya + ":00";
  }
}

// //funtion untuk menampilkan tanggal hari ini
// function showDate() {
//   let today = new Date().toLocaleDateString();
//   document.getElementById("todaydate").innerHTML = today;
// }

// // function shalattime() {
// //   let date = new Date();
// //   let h = date.getHours(); // 0 - 23
// //   let m = date.getMinutes(); // 0 - 59
// //   let s = date.getSeconds(); // 0 - 59
// // }
// showDate();
