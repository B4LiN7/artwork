import { Statue } from "./Statue.ts";

let statues: Statue[] = [];

const stats = document.getElementById("stats") as HTMLElement;

const inTitle = document.getElementById("inTitle") as HTMLInputElement;
const inYear = document.getElementById("inYear") as HTMLInputElement;
const inPrice = document.getElementById("inPrice") as HTMLInputElement;
const inHeight = document.getElementById("inHeight") as HTMLInputElement;

const errorMsg = document.getElementById("errorMsg") as HTMLElement;
errorMsg.style.color = "red";
errorMsg.style.visibility = "hidden";

function tryAddStatueToList2(title: string, year: number, price: number, height: number): void {
  let tempStatue: Statue = new Statue("title", new Date().getFullYear(), 1, 10);
  try {
    tempStatue.setTitle(title);
    tempStatue.setYear(year);
    tempStatue.setPrice(price);
    tempStatue.setHeight(height);
    statues.push(tempStatue);
    errorMsg.style.visibility = "hidden";
    updateStats();
    clearForm();
  }
  catch (error: any) {
    errorMsg.innerText = error.message;
    errorMsg.style.visibility = "visible";
    return;
  }
}

function tryAddStatueToList(title: string, year: number, price: number, height: number): void {
  if (title.length == 0) {
    errorMsg.innerText = "A név nem lehet üres!";
    errorMsg.style.visibility = "visible";
  }
  else if (!/^[a-zA-z\,\-]+$/.test(title)) {
    errorMsg.innerText = "A név nem felel meg a formai szabályoknak!";
    errorMsg.style.visibility = "visible";
  }
  else if (isNaN(year)) {
    errorMsg.innerText = "Az év nem lehet üres!";
    errorMsg.style.visibility = "visible";
  }
  else if (year > new Date().getFullYear()) {
    errorMsg.innerText = "A megadott év nem lehet nagyobb, mint a jelenlegi év!";
    errorMsg.style.visibility = "visible";
  }
  else if (isNaN(price)) {
    errorMsg.innerText = "Az ár nem lehet üres!";
    errorMsg.style.visibility = "visible";
  }
  else if (price < 1) {
    errorMsg.innerText = "Az ár nem lehet kevessebb, mint egy!";
    errorMsg.style.visibility = "visible";
  }
  else if (isNaN(height)) {
    errorMsg.innerText = "A magasság nem lehet üres!";
    errorMsg.style.visibility = "visible";
  }
  else if (height < 10) {
    errorMsg.innerText = "A magasság nem lehet kevessebb, mint 10cm!";
    errorMsg.style.visibility = "visible";
  } else {
    statues.push(new Statue(title, year, price, height));
    errorMsg.style.visibility = "hidden";
    clearForm();
    updateStats();
  }
}

function clearForm(): void {
  inTitle.value = "";
  inYear.value = "";
  inPrice.value = "";
  inHeight.value = "";
}

function updateStats(): void {
  const numberOfStatues = statues.length;
  const priceOfAllStatues = statues.reduce((sum, current) => sum + current.price, 0);

  const p = document.createElement("p");
  p.innerText = `A szobrok száma: ${numberOfStatues}, az összértékük: ${priceOfAllStatues} Ft.`;

  stats.innerHTML = "";
  stats.appendChild(p);
}

document.addEventListener("DOMContentLoaded", () => { 

  document.getElementById("inForm")?.addEventListener("submit", (event) => {
    event.preventDefault();

    tryAddStatueToList2(inTitle.value, parseInt(inYear.value), parseInt(inPrice.value), parseInt(inHeight.value))
    // tryAddStatueToList(inTitle.value, parseInt(inYear.value), parseInt(inPrice.value), parseInt(inHeight.value));
  });

});