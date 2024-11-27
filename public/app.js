
         // Import the functions you need from the SDKs you need
         import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
         import {getDatabase, ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
     
         // TODO: Add SDKs for Firebase products that you want to use
         // https://firebase.google.com/docs/web/setup#available-libraries
       
         // Your web app's Firebase configuration
         // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
     
         // Initialize Firebase
         const app = initializeApp(firebaseConfig);
     
         const db = getDatabase();
             function FindAdmin() {
                 
                 var EmployeeID = document.getElementById("EmployeeID").value;
                 var password = document.getElementById("password").value;
                 const dbRef = ref(getDatabase());
                     get(child(dbRef, 'Admin/EmployeeID')).then((snapshot) => {
                         if (snapshot.exists()) {
                             var tempPass = snapshot.val();
                             
                             if(password==tempPass)
                                 redirectTofontinfo();
                             else
                             alertLog();
                         } else {
                             alertLog();
                         }
                         }).catch((error) => {
                            hideAlert()
                            setTimeout(showAlert, 200);
                           
                 });
             }
             document.getElementById("EmBtn").addEventListener('click', FindAdmin);

             function showAlert() {
                const alertBox = document.getElementById('alertBox');
                alertBox.style.display = 'block'; // เปลี่ยนเป็น 'block' เพื่อแสดง
              }
              
              function hideAlert() {
                const alertBox = document.getElementById('alertBox');
                alertBox.style.display = 'none'; // เปลี่ยนเป็น 'none' เพื่อซ่อน
              }


            
                