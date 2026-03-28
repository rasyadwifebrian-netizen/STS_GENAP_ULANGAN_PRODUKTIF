// Clock & Date
function updateClock() {
  const now = new Date();
  const jam = now.toLocaleTimeString("id-ID", { hour12: false });
  const tanggal = now.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  document.getElementById("clock").textContent = jam;
  document.getElementById("date").textContent = tanggal;
}
setInterval(updateClock, 1000);
updateClock();

// Data Pelanggaran
let total = 0;
let telat = 0;
let atribut = 0;

document.getElementById("btnTambah").addEventListener("click", function () {
  const nama = document.getElementById("nama").value.trim();
  const nis = document.getElementById("nis").value.trim();
  const rayon = document.getElementById("rayon").value.trim();
  const pelanggaran = document.getElementById("pelanggaran").value;

  if (!nama || !nis || !rayon || !pelanggaran) {
    alert("Lengkapi semua data terlebih dahulu!");
    return;
  }

  // Waktu
  const waktu = new Date().toLocaleTimeString("id-ID", { hour12: false });

  // Tambah ke tabel
  const tabel = document.getElementById("tabel");
  const row = tabel.insertRow();

  row.insertCell(0).textContent = nama;
  row.insertCell(1).textContent = nis;
  row.insertCell(2).textContent = rayon;
  row.insertCell(3).textContent = waktu;
  row.insertCell(4).textContent = pelanggaran;

  const aksiCell = row.insertCell(5);
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Hapus";
  btnDelete.className = "btn-delete";
  btnDelete.onclick = function () {
    tabel.deleteRow(row.rowIndex - 1);
    total--;
    updateCounter();
  };
  aksiCell.appendChild(btnDelete);

  // Update counter
  total++;
  if (pelanggaran.includes("Tidak pakai") || pelanggaran.includes("Sepatu")) {
    atribut++;
  } else if (pelanggaran.includes("Terlambat")) {
    telat++;
  }
  updateCounter();

  // Reset form
  document.getElementById("nama").value = "";
  document.getElementById("nis").value = "";
  document.getElementById("rayon").value = "";
  document.getElementById("pelanggaran").value = "";
});

function updateCounter() {
  document.getElementById("total").textContent = total;
  document.getElementById("telat").textContent = telat;
  document.getElementById("atribut").textContent = atribut;
}