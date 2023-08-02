#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Category = require("./models/category");
  const Item = require("./models/item");

  const categories = [];
  const items = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function categoryCreate(index, name, description) {
    const category = new Category({ 
        name: name,
        description: description 
    });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
  }
  
  async function itemCreate(name, description, category, price, number_in_stock) {
    const itemdetail = {
        name: name,
        description: description,
        category: category,
        price: price,
        number_in_stock: number_in_stock
    };
    const item = new Item(itemdetail);
    await item.save();
    console.log(`Added item: ${name}`);
  }
  
  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      categoryCreate(0, "CPU", "The most important processor in a given computer. Its electronic circuitry executes instructions of a computer program, such as arithmetic, logic, controlling, and input/output (I/O) operations."),
      categoryCreate(1, "GPU", "A specialized electronic circuit initially designed to accelerate computer graphics and image processing"),
      categoryCreate(2, "Motherboard", "The main printed circuit board (PCB) in general-purpose computers and other expandable systems"),
      categoryCreate(3, "RAM", "A form of computer memory that can be read and changed in any order, typically used to store working data and machine code"),
      categoryCreate(4, "SSD", "A solid-state storage device that uses integrated circuit assemblies to store data persistently, typically using flash memory"),
    ]);
  }
  
  async function createItems() {
    console.log("Adding items");
    await Promise.all([
      itemCreate(
        "i5 13400",
        "LGA 1700, 6P x 2.5 ГГц, 4E x 1.8 ГГц, L2 - 9.5 МБ, L3 - 20 МБ, 2 х DDR4, DDR5-4800 МГц, Intel UHD Graphics 730, TDP 154 W",
        categories[0],
        230,
        55),
      itemCreate(
        "i5 13600k",
        "LGA 1700, 6P x 3.5 ГГц, 8E x 2.6 ГГц, L2 - 20 МБ, L3 - 24 МБ, 2 х DDR4, DDR5-5600 МГц, Intel UHD Graphics 770, TDP 181 W",
        categories[0],
        300,
        42),
      itemCreate(
        "i7 13700",
        "LGA 1700, 8P x 2.1 ГГц, 8E x 1.5 ГГц, L2 - 24 МБ, L3 - 30 МБ, 2 х DDR4, DDR5-5600 МГц, Intel UHD Graphics 770, TDP 219 Вт",
        categories[0],
        350,
        31),
      itemCreate(
        "GeForce RTX 3060",
        "PCI-E 4.0 12 ГБ GDDR6, 192 бит, DisplayPort x3, HDMI, GPU 1320 Mhz",
        categories[1],
        320,
        77),
      itemCreate(
        "GeForce RTX 4070",
        "PCI-E 4.0 12 ГБ GDDR6X, 192 бит, DisplayPort x3, HDMI, GPU 1920 Mhz",
        categories[1],
        600,
        25),
      itemCreate(
        "Radeon RX 6600",
        "PCI-E 4.0 8 ГБ GDDR6, 128 бит, DisplayPort x3, HDMI, GPU 1626 Mhz",
        categories[1],
        280,
        52),
      itemCreate(
        "GIGABYTE B550 AORUS ELITE V2",
        "AM4, AMD B550, 4xDDR4-3200 Mhz, 3xPCI-Ex16, 2xM.2, Standard-ATX",
        categories[2],
        120,
        66),
      itemCreate(
        "MSI PRO H610M-E DDR4",
        "LGA 1700, Intel H610, 2xDDR4-3200 Mhz, 1xPCI-Ex16, 1xM.2, Micro-ATX",
        categories[2],
        70,
        100),
      itemCreate(
        "ASRock B660M Pro RS",
        "LGA 1700, Intel B660, 4xDDR4-3200 Mhz, 2xPCI-Ex16, 2xM.2, Micro-ATX",
        categories[2],
        115,
        80),
      itemCreate(
        "Kingston FURY Beast Black",
        "DDR4, 8 GBx2, 3200 Mhz, 16-18-18-36",
        categories[3],
        45,
        120),
      itemCreate(
        "ADATA XPG GAMMIX D20",
        "DDR4, 8 GBx2, 3200 Mhz, 16-20-20",
        categories[3],
        38,
        94),
      itemCreate(
        "G.Skill AEGIS",
        "DDR4, 16 GBx2, 3200 МГц, 16-18-18-38",
        categories[3],
        56,
        31),
      itemCreate(
        "Samsung 870 EVO",
        "SATA, read - 560 Mb/s, write - 530 Mb/s, 3D NAND 3 bit MLC (TLC)",
        categories[4],
        43,
        76),
      itemCreate(
        "Kingston A400",
        "SATA, read - 500 Mb/s, write - 350 Mb/s, 3D NAND 3 bit TLC",
        categories[4],
        25,
        120),
      itemCreate(
        "ADATA SU650",
        "SATA, read - 520 Mb/s, write - 450 Mb/s, 3D NAND 3 bit TLC",
        categories[4],
        23,
        110),
    ]);
  }