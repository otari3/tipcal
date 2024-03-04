let bill = document.getElementById("BillInput");
let prcBtn = document.querySelectorAll(".precentig");
let NumberOfPeople = document.querySelector(".NumberOfPeople");
let TipAmountPrePerson = document.querySelector(".TipAmountPrePerson");
let TotalPrePerson = document.querySelector(".TotalPrePerson");
let reset = document.querySelector(".reset");
let error = document.querySelector(".erroOnPeople");
let custom = document.getElementById("customInput");

let tip = 0;
let billPrePerson = 0;
let tipPrePerson = 0;
let disabled = document.createAttribute("disabled");

NumberOfPeople.value = 1;
function addingClass(a, b) {
  a.classList.add(b);
}
function removeingClass(a, b) {
  a.classList.remove(b);
}
// ამ ფუნქციით ვიყვანთ მთლიან ჩეკს რომელის შემდეგ იყოფა ხალხის რაოდენობაყე და ვაბრუნებთ საბოლოო შედეგს
function totalperson() {
  billPrePerson = (Number(tip) + Number(bill.value)) / NumberOfPeople.value;
  return billPrePerson;
}
// ამ ფუნქციით მთლიან ტიპს ვყობთ ხალხის რაოდენობაზე და საბოლოო შედეგს ვაბრუნებთ
function totaltip() {
  tipPrePerson = tip / NumberOfPeople.value;
  return tipPrePerson;
}

// აქ ვამოწმებთ ცარიელია თუ არა ხალხის ინფუთი თუ ვაკლებთ ჰიდენ კლას
// მეორე იფზე კი ვამოწმებთ ცვლილებას და ლაივში ვაჩენჯებთ ქასთომ ინფუტს დარდება
NumberOfPeople.addEventListener("keyup", () => {
  if (NumberOfPeople.value > 0) {
    addingClass(error, "hidden");
    NumberOfPeople.style.outlineColor = "#26C2AE";
    removeingClass(NumberOfPeople, "if1");
  } else if (NumberOfPeople.value <= 0) {
    removeingClass(error, "hidden");
    NumberOfPeople.style.outlineColor = "#e17052";

    addingClass(NumberOfPeople, "if1");
  }
  if (error.classList.contains("hidden")) {
    tip = (custom.value / 100) * bill.value;
    totalperson();
    totaltip();
    TipAmountPrePerson.innerText = `$${totaltip().toFixed(2)}`;
    TotalPrePerson.innerText = `$${totalperson().toFixed(2)}`;
  }
});
// კლიკ ივენთია რომელიც იყვანს პროცენტებს იმის მიხედვით თუ რამდენი პროცენტია ჩაწერლი სპანში
prcBtn.forEach((items) => {
  items.addEventListener("click", () => {
    if (
      items.querySelector("span").innerText > 0 &&
      error.classList.contains("hidden")
    ) {
      tip = (items.querySelector("span").innerText / 100) * bill.value;
      totalperson();
      totaltip();
      TipAmountPrePerson.innerText = `$${totaltip().toFixed(2)}`;
      TotalPrePerson.innerText = `$${totalperson().toFixed(2)}`;
    }
  });
});
// კი უფ ივენთია რომელიც იყვანს ისევ პროცენტებს იმის მიხედვით თუ რას ვწერთ ქასთუმ ინფუში

custom.addEventListener("keyup", () => {
  if (error.classList.contains("hidden")) {
    tip = (custom.value / 100) * bill.value;
    totalperson();
    totaltip();
    TipAmountPrePerson.innerText = `$${totaltip().toFixed(2)}`;
    TotalPrePerson.innerText = `$${totalperson().toFixed(2)}`;
  }
});
// ამ კლიკ ივენთით ვარესატებტ თავის საწყის ვალიუზე გრაფებს
reset.addEventListener("click", () => {
  TipAmountPrePerson.innerText = "$0.00";
  TotalPrePerson.innerText = "$0.00";
  bill.value = "";
  custom.value = "";
  NumberOfPeople.value = 1;
  if (bill.value == 0) {
    reset.setAttributeNode(disabled);
    reset.style.background = "#0d686d";
  }
});
// აქ ვთიშავთ რისეთ ბატონს ლოგიკის მიხედვით ამ შემთვევაში თუ ჩეკი 0 რესეთი საჭიროება აღარაა და ითიშება
bill.addEventListener("keyup", () => {
  if (bill.value == 0) {
    reset.setAttributeNode(disabled);
    reset.style.background = "#0d686d";
  } else {
    reset.removeAttribute("disabled");
    reset.style.removeProperty("background");
  }
});
reset.setAttributeNode(disabled);
reset.style.background = "#0d686d";
