class Order {
  constructor(name, servicePrice, hours) {
    this.name = name;
    this.servicePrice = servicePrice;
    this.hours = hours;
  }

  calculate() {
    return this.servicePrice * this.hours;
  }
}

const result = document.querySelector("#result");
const historyList = document.getElementById("history");

function validate(name, service, hours) {
  if (!name.trim()) {
    alert("Podaj imię!");
    return false;
  }

  if (service === 0) {
    alert("Wybierz usługę!");
    return false;
  }

  if (isNaN(hours) || hours <= 0) {
    alert("Podaj poprawną liczbę godzin!");
    return false;
  }

  return true;
}

function save(order) {
  let data = JSON.parse(localStorage.getItem("orders")) || [];
  data.push(order);
  localStorage.setItem("orders", JSON.stringify(data));
}

function load() {
  historyList.innerHTML = "";
  let data = JSON.parse(localStorage.getItem("orders")) || [];

  data.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.total} zł`;
    historyList.appendChild(li);
  });
}

const btn = document.getElementById("calculateBtn");

if (btn) {
  btn.addEventListener("click", () => {

    const name = document.getElementById("name").value;
    const service = Number(document.getElementById("service").value);
    const hours = Number(document.getElementById("hours").value);

    if (!validate(name, service, hours)) return;

    const order = new Order(name, service, hours);
    const total = order.calculate();

    result.textContent = total + " zł";

    save({ name, total });
    load();
  });
}
window.addEventListener("load", load);




const subscribeBtn = document.getElementById("subscribeBtn");
if (subscribeBtn) {
  subscribeBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const msg = document.getElementById("newsletterMsg");

    if (!email.includes("@")) {
      msg.textContent = "Niepoprawny email";
      msg.style.color = "red";
      return;
    }

    localStorage.setItem("newsletter", email);
    msg.textContent = "Zapisano!";
    msg.style.color = "green";
  });
}

window.addEventListener("load", load);




