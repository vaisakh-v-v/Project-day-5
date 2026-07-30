// ​Demonstrate localStorage persistence: set items, close browser, reopen - still there​
// ​Demonstrate sessionStorage isolation: set items in two tabs - show they have separate storage​
// ​Build storageManager with get(key), set(key, value, ttl), delete(key), clear() - ttl causes entries​
// ​to expire​
// ​479.​ ​Open IndexedDB in DevTools Application panel - create a simple database and add/read a​
// ​record
const mode = document.getElementById("toggle-btn");

const savedTheam = localStorage.getItem("theme");

if (savedTheam === "dark") {
  document.body.classList.add("dark-mode");
}

mode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    sessionStorage.setItem("theme", "dark");
  } else {
    sessionStorage.setItem("theme", "light");
    localStorage.setItem("theme", "light");
  }
});

class storageManager {
  get(key) {
    const value = sessionStorage.getItem(key);
    if (!value) {
      return null;
    }
    const item = JSON.parse(value);
    if (Date.now() >= item.expiresAt) {
      sessionStorage.removeItem(key);
      return null;
    }
    return item.value;
  }

  set(key, value, ttl) {
    const item = {
      value: value,
      expiresAt: Date.now() + ttl,
    };
    sessionStorage.setItem(key, JSON.stringify(item));
  }

  delete(key) {
    sessionStorage.removeItem(key);
  }
  clear() {
    sessionStorage.clear();
  }
}

const session1 = new storageManager();
session1.set("name", "vaisakh", 60000);
session1.set("age", 22, 60000);
session1.set("height", 5.11, 60000);

const result = session1.get("name");
console.log(result);
const result2 = session1.get("age");
console.log(result2);
const result3 = session1.get("height");
console.log(result3);

session1.delete("height");

const result4 = setTimeout(session1.get(name), 6000);
setTimeout(console.log(result4), 6000);

const request = indexedDB.open("UserDatabase", 1);
let db;

request.onupgradeneeded = (event) => {
  db = event.target.result;

  if (!db.objectStoreNames.contains("users")) {
    db.createObjectStore("users", { keyPath: "id" });
  }
};

request.onsuccess = (event) => {
  db = event.target.result;
  console.log("Database initialized successfully.");

  addRecord({ id: "user_01", name: "Vaisakh", email: "alice@example.com" });
};

request.onerror = (event) => {
  console.error("Database failed to open:", event.target.error);
};

function addRecord(userData) {
  const transaction = db.transaction(["users"], "readwrite");
  const store = transaction.objectStore("users");

  const addRequest = store.add(userData);

  addRequest.onsuccess = () => {
    console.log("Record added successfully!");
    readRecord("user_01");
  };

  addRequest.onerror = (event) => {
    console.error("Failed to add record:", event.target.error);
  };
}

function readRecord(id) {
  const transaction = db.transaction(["users"], "readonly");
  const store = transaction.objectStore("users");

  const getRequest = store.get(id);

  getRequest.onsuccess = () => {
    if (getRequest.result) {
      console.log("Record found:", getRequest.result);
    } else {
      console.log("No record found with ID:", id);
    }
  };

  getRequest.onerror = (event) => {
    console.error("Failed to read record:", event.target.error);
  };
}
