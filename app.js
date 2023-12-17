const prompt = require("prompt-sync")(); //saat kode ini dijalankan, kita butuh ambil npm prompt
const dayjs = require("dayjs"); //import dayjs from 'dayjs' // ES 2015
const fs = require("fs"); //tdk perlu install karena sudah bawaan dr node js

let books = [];

const showBooks = () => {
  console.clear();
  for (const book of books) {
    console.log(`${book.title} ${book.interest}`);
    console.log(`Rp ${book.price}`);
    console.log(book.added + "\n");
  }
  prompt("Press enter to continue...");
};

const addBook = () => {
  console.clear();
  const title = prompt("Insert book title: ");
  const interest = prompt("Insert your intereset: ");
  const price = prompt("Insert the price: ");
  const added = dayjs().format("DD/MM/YYYY HH:mm:ss");

  books.push({
    title, //karna isinya sama jd bisa pake koma saja
    interest,
    price,
    added,
  });
};

const getBooks = () => {
  //Tahap 2
  const data = fs.readFileSync("favorites.json"); //yg dari string
  const books = JSON.parse(data); //dikembalikan datanya menjadi array dgn json.parse
  return books;
};

const save = () => {
  //Tahap 1
  fs.writeFileSync("favorites.json", JSON.stringify(books)); //data diformat dengan json, menyimpan data di file berupa object, data harus berupa string, kalau array bisa gunakan json stringify
};

books = getBooks();

let running = true;
while (running) {
  console.log("Favorite Book Library");
  console.log("1. Show Books");
  console.log("2. Add Book");
  console.log("3. Save & Exit");

  const choice = prompt("What do you want to do? ");
  if (choice == 1) {
    showBooks();
  } else if (choice == 2) {
    addBook();
  } else if (choice == 3) {
    save();
    running = false;
  } else {
    console.log("Menu tidak tersedia");
  }
}
