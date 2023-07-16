//deklarasi penanggalan
const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0");
const tanggal = String(date.getDate()).padStart(2, "0");
const time = date.getTime();

//ketika load pertama akan menarik data di localstorage dari json yang telah tersimpan
//jika data tidak tersimpan maka akan otomatis menarik data dengan menjalankan funsi getcoord
window.addEventListener("load", function () {
  let data = localStorage.getItem("datajadwal");
  data = JSON.parse(data);
  if (data) {
    ubahTampilanJamSholat(data);
  }
});
window.addEventListener("load", getCoord());

//mengambil geolokasi koordinat, jika telah ditemukan maka akan menjalankan fungsi coordfound
function getCoord() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(coordFound);
  } else {
    //default akan menjadi jakarta apabila geoloc gagal
    cariKota(-6.175392, 106.827153);
  }
}

//menjalankan fungsi carikota dengan memasukkan koordinat latitud dan longitude
function coordFound(pos) {
  cariKota(pos.coords.latitude, pos.coords.longitude);
}

//carikota otomatis akan secara reverse geocode mencari kota ke API sesuai koordinat
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
      //mengambil nama kota dari object yang sudah ditarik dan menjalankan fungsi getidkota untuk mencari idkota
      getIdKota(data.localityInfo.administrative[2].name);
    });
}

//mencari id kota sesuai dengan kota yang telah ditemukan
function getIdKota(kota) {
  let isSearch = false;
  if (!kota) {
    kota = document.getElementById("searchkota").value;
    isSearch = true;
  }
  //menyimpan nama kota ke local storage
  localStorage.setItem("kota", kota);
  //menarik idkota sesuai kota yang ditemukan
  fetch("https://api.myquran.com/v1/sholat/kota/cari/" + kota)
    .then((Response) => Response.json())
    .then((data) => {
      if (data.status == true) {
        if (isSearch) {
          alert("Kota ditemukan");
        }
        //mengambil jamsholat
        getJamSholat(data.data[0].id);
      } else {
        alert(
          "Kota tidak ditemukan, silahkan menggunakan keyword kota/kabupaten lain e.g:purworejo"
        );
      }
    });
}
//mengambil jamsholat dalam sebulan
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
      //menyimpan hasil fetch kedalam local storage dalam bentuk json
      localStorage.setItem("datajadwal", JSON.stringify(data));
      //running ubahTampilanJamSholat
      ubahTampilanJamSholat(data);
    });
}

//fungsi untuk mengubah tampilan dalam index.html
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

  //convert jam shalat dari string ke date
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

  //mengubah gambar dan jam sesuai jam sholat
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
