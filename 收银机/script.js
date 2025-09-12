let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const priceSpan = document.getElementById("price");
const change = document.getElementById("change-due");

priceSpan.textContent = price;

const changeShow = () => change.style.display = "block";

purchaseBtn.addEventListener("click", ()=>{
  const cashNum = Number(cashInput.value);

  if(price > cashNum){
    change.textContent = "请支付足够金额";
    changeShow();
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  if(1){}
});