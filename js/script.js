//menarik list kota-kota diindonesia
window.addEventListener("load", async function getData() {
  const response = await fetch("https://api.myquran.com/v1/sholat/kota/semua");
  const data = await response.json();
  const dataArray = Object.values(data);
});

//funtion untuk menampilkan tanggal hari ini
function showDate() {
  let today = new Date().toLocaleDateString();
  document.getElementById("todaydate").innerHTML = today;
}

function shalattime() {
  let date = new Date();
  let h = date.getHours(); // 0 - 23
  let m = date.getMinutes(); // 0 - 59
  let s = date.getSeconds(); // 0 - 59
}
showDate();
