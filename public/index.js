window.addEventListener("load", () => {
  // แสดง Loader
  const loader = document.querySelector(".loader");
  loader.classList.remove("hidden");

  // ซ่อน Loader หลังจากโหลดเสร็จ
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 2000); // ซ่อน loader หลังจาก 1 วินาที
});


function redirectToIndex() {
  window.location.href = "index.html";
}

function redirectTofontinfo() {
  window.location.href = "fontinfo.html";
}

function redirectToinsert() {
  window.location.href = "insert.html";
}


