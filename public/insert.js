import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4DcsbKOUymIlf-nnEWeNS4ZJ7dBFGDiw",
    authDomain: "hotel-management-b2b44.firebaseapp.com",
    databaseURL: "https://hotel-management-b2b44-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hotel-management-b2b44",
    storageBucket: "hotel-management-b2b44.firebasestorage.app",
    messagingSenderId: "19712897497",
    appId: "1:19712897497:web:01bef42130c3a5ef5b69c8",
    measurementId: "G-DJ7P2NQ0J9"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Element references
const inputs = {
    roomID: document.getElementById("RoomID"),
    name: document.getElementById("enterName"),
    checkIn: document.getElementById("enIn"),
    checkOut: document.getElementById("enOut"),
    phone: document.getElementById("enPhone"),
    findRoomID: document.getElementById("FindRoomID")
};

// Button references
const insertBtn = document.getElementById("insert");
const updateBtn = document.getElementById("update");
const removeBtn = document.getElementById("remove");
const findBtn = document.getElementById("find");

// Find NULL value in Inputs
function validateInputs() {
    for (const [key, input] of Object.entries(inputs)) {
        if (key === "findRoomID") continue; // ข้าม findRoomID 
        if (!input.value.trim()) {
            alert(`Please fill the ${key} field.`);
            return false;
        }
    }
    return true;
}

// Firebase operations
function insertData() {

    if (!validateInputs()) {
        // หากมี input ที่ว่าง จะหยุดการทำงานต่อ
        return;
    }
    // if (!inputs.roomID.value) return alert("Please fill all data.");
    // Find value if data exist it will not insert the data again.
    get(child(ref(db), `Hotel/${inputs.roomID.value}`))
        .then((snapshot) => {
            const data = snapshot.val()
            if (snapshot.exists() && data.Name!="") { //if data alerady exist
                alert("Can't insert data because data already exist.");

            } else { // data is NULL
                set(ref(db, `Hotel/${inputs.roomID.value}`), {
                    Name: inputs.name.value,
                    CheckIn: inputs.checkIn.value,
                    CheckOut: inputs.checkOut.value,
                    PhoneNumber: inputs.phone.value
                })
                    .then(() => alert("Data added successfully"))
                    .catch((error) => alert(error));
            
            }
        })
        .catch((error) => alert(error));

}

const findResults = {
    name: document.getElementById("findName"),
    checkIn: document.getElementById("findIn"),
    checkOut: document.getElementById("findOut"),
    phone: document.getElementById("findPhone")
};

function findData() {
    if (!inputs.findRoomID.value) return alert("Please enter a Room Number"); // เช็คว่ามี Input ไหม ถ้าไม่มี alert
    get(child(ref(db), `Hotel/${inputs.findRoomID.value}`)) // รับค่าข้อมูลจาก Key Hotel ตาม input ห้อง ที่ใส่เข้ามา
        .then((snapshot) => {
            if (snapshot.exists()) { // ถ้ามีข้อมูลทำในนี้
                const data = snapshot.val(); // เก็บข้อมูลทั้งหมดใน database ไว้ในตัวแปล data
                findResults.name.textContent = `Name: ${data.Name}`;    // นำข้อมูลจาก data.Name มาเก็บไว้ใน findResults เพื่อไปแสดงในหน้าเว็ป
                findResults.checkIn.textContent = `Check In: ${data.CheckIn}`;
                findResults.checkOut.textContent = `Check Out: ${data.CheckOut}`;
                findResults.phone.textContent = `Phone: ${data.PhoneNumber}`;
            } else {
                alert("Room not found");    // ถ้าห้องไม่มีข้อมูลอยู่จะ alert
            }
        })
        .catch((error) => alert(error));
}

function updateData() {
    if (!inputs.roomID.value) return alert("Please fill Room Number");
    
    update(ref(db, `Hotel/${inputs.roomID.value}`), {
        Name: inputs.name.value,
        CheckIn: inputs.checkIn.value,
        CheckOut: inputs.checkOut.value,
        PhoneNumber: inputs.phone.value
    })
        .then(() => alert("Data updated successfully"))
        .catch((error) => alert(error));
}

function removeData() {
    if (!inputs.roomID.value) return alert("Please fill Room Number");

    remove(ref(db, `Hotel/${inputs.roomID.value}`))
        .then(() => alert("Data deleted successfully"))
        .catch((error) => alert(error));
}

// Event listeners
insertBtn.addEventListener("click", insertData);
updateBtn.addEventListener("click", updateData);
removeBtn.addEventListener("click", removeData);
findBtn.addEventListener("click", findData);
