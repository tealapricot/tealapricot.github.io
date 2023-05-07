window.addEventListener("load", 
async function getData() {
    const response = await fetch('https://api.myquran.com/v1/sholat/kota/semua');
    const data = await response.json();
    const dataArray = Object.values(data);
    console.log(dataArray[20].lokasi);

    
})

function showTime(){
    let date = new Date();
    let h = date.getHours(); // 0 - 23
    let m = date.getMinutes(); // 0 - 59
    let s = date.getSeconds(); // 0 - 59
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

function showDate(){
    let today = new Date().toLocaleDateString()
    document.getElementById('todaydate').innerHTML = today;
}

function shalattime(){
    let date = new Date();
    let h = date.getHours(); // 0 - 23
    let m = date.getMinutes(); // 0 - 59
    let s = date.getSeconds(); // 0 - 59

}
showDate();
showTime();