const btnOrderFav = document.getElementById("orderFav");
const selDrink = document.getElementById("drink");
const selSize = document.getElementById("size");
const selMilk = document.getElementById("milk");
const btnSugar = document.getElementById("sugar");
const btnCream = document.getElementById("cream");
const inSyrup = document.getElementById("syrup");
const btnAddFav = document.getElementById("addFav");
const btnAdd = document.getElementById("add");
const btnPlace = document.getElementById("place");
const currDrinksP = document.querySelector("#currDrinksP");
const currCostPS = document.querySelector("#currCostP span");
const overallOrderP = document.querySelector("#overallOrderP");
const overallCostPS = document.querySelector("#overallCostP span");
const confirmation1PS = document.querySelector("#confirmation1 strong");
const confirmation2PS = document.querySelector("#confirmation2 strong");
let numOfsyrups = 0;

fetch("../coffee.json")
  .then(response => response.text())
  .then(json => createElements(json))
  .catch(err => `Error - ${error}`);

if (localStorage.getItem("numOfPurchases") === null) {
  localStorage.setItem("numOfPurchases", "0");
}

if (localStorage.getItem("favourite") !== null) {
  btnOrderFav.disabled = false;
}
btnAdd.addEventListener("click", updateLocalStorage);
selDrink.addEventListener("change", updateCurrTransaction);
selSize.addEventListener("change", updateCurrTransaction);
selMilk.addEventListener("change", updateCurrTransaction);
btnSugar.addEventListener("click", updateCurrTransaction);
btnCream.addEventListener("click", updateCurrTransaction);
inSyrup.addEventListener("change", updateCurrTransaction);
btnAdd.addEventListener("click", updateOverallTransaction);
btnPlace.addEventListener("click", updateOverallTransaction);
btnAddFav.addEventListener("click", updateLocalStorage);
btnOrderFav.addEventListener("click", updateCurrTransaction);
inSyrup.addEventListener("keydown", function (e) {
  if (e.keyCode == 13) {
    e.preventDefault();
  }
});

function createElements(json) {
  let jsonPased = JSON.parse(json)
  for (let i = 0; i < jsonPased.drinks.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", jsonPased.drinks[i].Name);
    option.innerText = jsonPased.drinks[i].Name;
    selDrink.appendChild(option);
  }

  for (let i = 0; i < jsonPased.milk.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", jsonPased.milk[i].Name);
    if (jsonPased.milk[i].Name == "Semi-skimmed") {
      option.selected = true;
    }
    option.innerText = jsonPased.milk[i].Name;
    selMilk.appendChild(option);
  }
};

function updateCurrTransaction() {
  let currDrinksAdded = currDrinksP.innerText.split(", ");
  if (this.id === "drink") {
    if (this.value !== "") {
      if (confirmation1PS !== "" && confirmation2PS !== "") {
        confirmation1PS.innerText = "";
        confirmation2PS.innerText = "";
      }
      numOfsyrups = 0;
      inSyrup.value = 0;
      btnAdd.disabled = false;
      btnAddFav.disabled = false;
      if (this.value === "Espresso" || this.value === "Americano") {
        if (!selMilk.disabled) {
          selMilk.disabled = true;
          selMilk.value = selMilk.options[2].value;
        }
        if (currDrinksAdded.length === 1) {

          currDrinksP.innerText = `${this.value}, ${selSize.options[1].value}`;
        } else if (currDrinksAdded.length === 2) {
          currDrinksAdded[0] = this.value;
          currDrinksP.innerText = currDrinksAdded.join(", ");
        } else {
          currDrinksAdded.splice(2, currDrinksAdded.length - 2);
          currDrinksAdded[0] = this.value;
        }
      } else {
        if (selMilk.disabled) {
          selMilk.disabled = false;
        }
        if (currDrinksAdded.length === 1) {
          currDrinksP.innerText = `${this.value}, ${selSize.options[1].value}, ${selMilk.options[2].value}`;
        } else if (currDrinksAdded.length === 3) {
          currDrinksAdded[0] = this.value;
        } else {
          currDrinksAdded.splice(3, currDrinksAdded.length - 3);

          currDrinksAdded[0] = this.value;
        }
      }
    }
    if (currDrinksAdded.length === 1) {
      if (selSize.value !== "Medium") {
        selSize.value = selSize.options[1].value;
      } else if (currDrinksAdded[2] !== "Semi-skimmed") {
        selMilk.value = selMilk.options[2].value;
      }
      let price = sizePrice(selSize.value);
      currCostPS.innerText = price.toFixed(2);
    } else {
      if (currDrinksAdded[1] !== "Medium") {
        selSize.value = selSize.options[1].value;
        currDrinksAdded[1] = selSize.value;
        let price = sizePrice(selSize.value);
        currCostPS.innerText = price.toFixed(2);
      } else {
        let price = sizePrice(selSize.value);
        currCostPS.innerText = price.toFixed(2);
      }
      if ((selDrink.value !== "Espresso" && selDrink.value !== "Americano") && currDrinksAdded[2] !== "Semi-skimmed") {

        selMilk.value = selMilk.options[2].value;
        currDrinksAdded[2] = selMilk.value;
      }
      currDrinksP.innerText = currDrinksAdded.join(", ");
    }

  } else if (this.id === "size") {
    if (selDrink.value !== "") {
      btnAddFav.disabled = false;
      currDrinksAdded[1] = this.value;
      currDrinksP.innerText = currDrinksAdded.join(", ");
      let price = sizePrice(this.value);
      let creamIndex = currDrinksAdded.indexOf("Cream");
      if (creamIndex !== -1) {
        price += 0.50;
      }
      if (numOfsyrups !== 0) {
        price += 0.25 * numOfsyrups;
      }
      currCostPS.innerText = price.toFixed(2);
    }
  } else if (this.id === "milk") {
    btnAddFav.disabled = false;
    currDrinksAdded[2] = this.value;
    currDrinksP.innerText = currDrinksAdded.join(", ");
  } else if (this.id === "sugar") {
    let sugarIndex = currDrinksAdded.indexOf("Sugar");
    if (currDrinksAdded.length > 1) {
      btnAddFav.disabled = false;
      if (sugarIndex !== -1) {
        currDrinksAdded.splice(sugarIndex, 1);
      } else {
        if (selDrink.value === "Espresso" || selDrink.value === "Americano") {
          currDrinksAdded.splice(2, 0, this.value);
        } else {
          currDrinksAdded.splice(3, 0, this.value);
        }
      }
      currDrinksP.innerText = currDrinksAdded.join(", ");
    }
  } else if (this.id === "cream") {
    let sugarIndex = currDrinksAdded.indexOf("Sugar");
    let creamIndex = currDrinksAdded.indexOf("Cream");
    if (currDrinksAdded.length > 1) {
      btnAddFav.disabled = false;
      if (creamIndex !== -1) {
        currDrinksAdded.splice(creamIndex, 1);
      } else {
        if (selDrink.value === "Espresso" || selDrink.value === "Americano") {
          if (sugarIndex === -1) {
            currDrinksAdded.splice(2, 0, this.value);
          } else {
            currDrinksAdded.splice(3, 0, this.value);
          }
        } else {
          if (sugarIndex === -1) {
            currDrinksAdded.splice(3, 0, this.value);
          } else {
            currDrinksAdded.splice(4, 0, this.value);
          }
        }
      }
      currDrinksP.innerText = currDrinksAdded.join(", ");
      let price = Number(currCostPS.innerText);
      if (currDrinksAdded.indexOf("Cream") !== -1) {
        price += 0.50;
      } else {
        price -= 0.50;
      }
      currCostPS.innerText = price.toFixed(2);
    }
  } else if (this.id === "syrup") {
    let syrupIndex = currDrinksAdded.indexOf(`Syrup (${numOfsyrups})`);
    if (!(this.value === "" || this.value < 0)) {
      if (currDrinksAdded.length > 1) {
        btnAddFav.disabled = false;
        btnAdd.disabled = false;
        if (this.value === "0" && syrupIndex !== -1) {
          currDrinksAdded.splice(syrupIndex, 1);
        } else if (syrupIndex === -1 && this.value !== "0") {
          currDrinksAdded.push(`Syrup (${this.value})`);
        } else if (syrupIndex !== -1) {
          currDrinksAdded[syrupIndex] = `Syrup (${this.value})`;
        }
        currDrinksP.innerText = currDrinksAdded.join(", ");
        let price = Number(currCostPS.innerText);
        let addOrSub = Number(this.value) - numOfsyrups;
        price += 0.25 * addOrSub;
        currCostPS.innerText = price.toFixed(2);
        numOfsyrups = Number(this.value)
      }
    } else if (syrupIndex !== -1) {
      currDrinksAdded.splice(syrupIndex, 1);
      currDrinksP.innerText = currDrinksAdded.join(", ");
      let price = Number(currCostPS.innerText);
      let addOrSub = 0 - numOfsyrups;
      price += 0.25 * addOrSub;
      currCostPS.innerText = price.toFixed(2);
      numOfsyrups = 0
      btnAddFav.disabled = true;
      btnAdd.disabled = true;
    } else {
      btnAddFav.disabled = true;
      btnAdd.disabled = true;
    }
  } else if (this.id === "orderFav") {
    let fav = localStorage.getItem("favourite");
    currDrinksP.innerText = fav;
    let favDetails = fav.split(", ");
    let indexOfCream = favDetails.indexOf(`Cream`);
    let indexOfSyrup = favDetails.findIndex(element => element.includes("Syrup ("));
    if (confirmation1PS !== "" && confirmation2PS !== "") {
      confirmation1PS.innerText = "";
      confirmation2PS.innerText = "";
    }
    btnAdd.disabled = false;
    btnAddFav.disabled = true;
    selDrink.value = favDetails[0];
    selSize.value = favDetails[1];
    if (favDetails[0] !== "Espresso" && favDetails[0] !== "Americano") {
      selMilk.disabled = false;
      selMilk.value = favDetails[2];
    }
    let price = sizePrice(selSize.value);
    if (indexOfCream !== -1) {
      price += 0.50;
    }
    if (indexOfSyrup !== -1) {
      let favSyrup = favDetails[indexOfSyrup].substring(7, 8);
      inSyrup.value = favSyrup;
      price += 0.25 * Number(favSyrup);
      numOfsyrups = Number(favSyrup);
    }
    currCostPS.innerText = price.toFixed(2);
  }
}

function sizePrice(size) {
  if (size === "Small") {
    return 2.45;
  } else if (size === "Medium") {
    return 2.65;
  } else {
    return 2.85;
  }
}

function updateOverallTransaction() {
  if (this.id === "add") {
    let currOrder = currDrinksP.innerText;
    let currPrice = currCostPS.innerText;
    if (localStorage.getItem("numOfPurchases") === "10") {
      currPrice = "0.00";
      localStorage.setItem("numOfPurchases", 0);
    }
    btnPlace.disabled = false;
    if (overallOrderP === "") {
      overallOrderP.innerText = `${currOrder} - £ ${currPrice}`;
    } else {
      let newP = document.createElement("p");
      newP.setAttribute("class", newP);
      newP.innerHTML = `${currOrder} - £ ${currPrice}`;
      overallOrderP.appendChild(newP);
    }
    let overallPrice = Number(overallCostPS.innerText);
    overallPrice += Number(currPrice);
    overallCostPS.innerText = overallPrice.toFixed(2);
  } else {
    confirmation1PS.innerHTML = "Thank you for ordering our coffee!";
    confirmation2PS.innerHTML = " Hope you enjoy it!";
  }
  currDrinksP.innerText = "";
  currCostPS.innerText = "0.00";
  selDrink.value = selDrink.options[0].value;
  selSize.value = selSize.options[1].value;
  selMilk.value = selMilk.options[2].value;
  inSyrup.value = 0;
  selMilk.disabled = true;
  btnAddFav.disabled = true;
  btnAdd.disabled = true;
  if (this.id === "place") {
    overallCostPS.innerText = "0.00";
    overallOrderP.innerText = "";
    const overallOrderes = document.querySelectorAll(".newP");
    if (overallOrderes.length !== 0) {
      for (i = 0; i < overallOrderes.length; i++) {
        i.remove();
      }
    }
    btnPlace.disabled = true;
  }
}

function updateLocalStorage() {
  if (this.id === "add") {
    let currNumOfPurchases = Number(localStorage.getItem("numOfPurchases"));
    if (currNumOfPurchases === 10) {
      localStorage.setItem("numOfPurchases", "0");
    } else {
      currNumOfPurchases += 1;
      localStorage.setItem("numOfPurchases", currNumOfPurchases);
    }
  } else if (this.id === "addFav") {
    let currFavourite = currDrinksP.innerText;
    localStorage.setItem("favourite", currFavourite);
    btnOrderFav.disabled = false;
  }
}