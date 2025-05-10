// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDfNpsguFmhsgAMVBdxdK0fkd0JY_W14eI",
  authDomain: "gcp-helper-a7baa.firebaseapp.com",
  projectId: "gcp-helper-a7baa",
  storageBucket: "gcp-helper-a7baa.appspot.com",
  messagingSenderId: "801063745131",
  appId: "1:801063745131:web:1ed53ec4b5384e7454632e",
  measurementId: "G-L0QQK71VMB"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM elements
const form = document.querySelector(".infrm");
const prinp = document.querySelector(".product");
const qtyinp = document.querySelector(".qty");
const list = document.querySelector(".lists");
const listbx = document.querySelector(".list_bx");
const flist = document.querySelector('.flist');

// Add item to the list
form.addEventListener('submit', function (e) {
    e.preventDefault();
    let pr = prinp.value.trim();
    let qt = qtyinp.value.trim();
    if (pr === "" || qt === "") return;
    listbx.style.display = "block";
    
    const li = document.createElement('li');
    li.innerHTML = `<h1>${pr}</h1><h1>${qt}</h1><button class="anc" onclick="ant('${pr}','${qt}')"><i class='bx bx-fingerprint'></i></button>`;
    li.classList.add('li1');
    list.appendChild(li);
    prinp.value = "";
    qtyinp.value = "";
});

// Store the item in Firestore and update UI
window.ant = function (pr, qt) {
    flist.style.display = "block";
    let a1 = prompt("Price:");
    
    const li2 = document.createElement('li');
    li2.classList.add('li2');
    li2.innerHTML = `<h1>${pr}</h1><h1>${qt}</h1><h1>${a1}</h1>`;
    flist.appendChild(li2);
    
    removeitem();

    // Store in Firestore
    db.collection("items").add({
        product: pr,
        quantity: qt,
        price: a1
    }).then(() => {
        console.log("Item added to Firestore");
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
};

// Remove the item from the list
function removeitem() {
    let lis = document.querySelector(".li1");
    lis.remove();
}

// Reset the list
window.reset=function(){
    // Clear the items from the UI
    let lis = document.querySelectorAll(".li1");
    let lis2 = document.querySelectorAll(".li2");
    lis.forEach((e) => e.remove());
    lis2.forEach((e) => e.remove());
    
    // Hide the lists
    document.querySelector(".list_bx").style.display = "none";
    document.querySelector(".flist").style.display = "none";

    // Delete items from Firestore
    db.collection("items").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Delete each item
            db.collection("items").doc(doc.id).delete()
                .then(() => {
                    console.log("Item deleted from Firestore");
                })
                .catch((error) => {
                    console.error("Error deleting item: ", error);
                });
        });
    }).catch((error) => {
        console.error("Error fetching documents for deletion: ", error);
    });
};

// Function to load items from Firestore (if needed)
function loadItems() {
    db.collection("items").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const li2 = document.createElement('li');
            li2.classList.add('li2');
            li2.innerHTML = `<h1>${data.product}</h1><h1>${data.quantity}</h1><h1>${data.price}</h1>`;
            flist.appendChild(li2);
        });
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

// Call loadItems on page load to get stored data from Firestore
loadItems();
