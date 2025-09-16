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

const cidMoneyValue = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
const cidName = cid.map(name => name[0].toString());
let moneyValue = cid.map(arrValue => arrValue[1]);

const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const priceSpan = document.getElementById("price");
const change = document.getElementById("change-due");
const cashSpan = document.querySelectorAll(".cash-num");

priceSpan.textContent = price;


const changeShow = () => change.style.display = "block";

const setAdd = (num1, num2) => {
  const num1Copy = Math.round(num1*100);
  const num2Copy = Math.round(num2*100);
  const sum = num1Copy + num2Copy;
  return sum/100;
};

const setLess = (num1, num2) => {
  const num1Copy = Math.round(num1*100);
  const num2Copy = Math.round(num2*100);
  const sum = num1Copy - num2Copy;
  return sum/100;
};


const cidSum = (arr, index) => {
  let sum = 0;
  for(let i = index; i>=0; i--){
    sum = setAdd(sum, arr[i]);
  }
  return sum;
};
console.log(cidSum(moneyValue, moneyValue.length - 1));

//计算要给顾客多少钱
const calculateChange = (num) => {
  let returnMoney = {};
  let remainder = num;
  let i = cid.length - 1;

  //freeCodeCamp 在测试时会修改cid数组，这里进行数组数据更新
  moneyValue = cid.map(arrValue => arrValue[1]);

  while(i>=0){
    if(remainder<cidMoneyValue[i] || moneyValue[i] === 0){
      i--;
      continue;
    }
    else if(cidSum(moneyValue, i) < setAdd(remainder, 0)){
      return false;
    }
    //remainder = (Math.round(remainder*100) - Math.round(cidMoneyValue[i]*100))/100;
    //moneyValue[i] = (Math.round(moneyValue[i]*100) - Math.round(cidMoneyValue[i]*100))/100;
    remainder = setLess(remainder, cidMoneyValue[i]);
    moneyValue[i] = setLess(moneyValue[i], cidMoneyValue[i]);
    returnMoney[cidName[i]] = returnMoney[cidName[i]] ? setAdd(returnMoney[cidName[i]], cidMoneyValue[i]) : cidMoneyValue[i];
  }
  return returnMoney;
};

  //旧方案(已舍去)
  /*while(i >= 0){
    //当给客户的钱不够减/减去的余额是否溢出/余额是否为零时 跳出循坏
    if(remainder - cidMoneyValue[i] < 0 || returnMoney[cid[i][0]] > cid[i][1] || cid[i][1] <= 0){
      i--;

      //判断是否有足够的零钱
      if(i < 0 && remainder > 0){
        return false;
      }
      continue;
    }
    remainder = parseFloat(remainder - cidMoneyValue[i]).toFixed(2);
    returnMoney[cid[i][0]] = returnMoney[cid[i][0]] ? parseFloat(returnMoney[cid[i][0]] + cidMoneyValue[i]) : parseFloat(cidMoneyValue[i]);
  }
  cidChange(returnMoney);
  return returnMoney;*/


//更新余额文本
const cidTextChange = () => {
  for(let i = 0; i<cid.length; i++){
    cashSpan[i].textContent = moneyValue[i];
  }
}; 

//判断商店状态
const state = (changeMoney) => {
  let cidMoneySum = cidSum(moneyValue, moneyValue.length - 1);
  if(!changeMoney){
    change.innerHTML += `<p>Status: INSUFFICIENT_FUNDS</p>`;
    return;
  }
  if(cidMoneySum === 0){
    change.innerHTML += `<p>Status: CLOSED</p>`;
  }else{
    change.innerHTML += `<p>Status: OPEN</p>`;
  }
};

//更新返回现金文本
const updateReturnCashText = obj => {
  Object.entries(obj).forEach(([key, value])=>{
    change.innerHTML += `<p>${key}: $${value}</p>`;
  })
};

cidTextChange();

purchaseBtn.addEventListener("click", ()=>{
  const cashNum = cashInput.value;
  const changeNum = cashNum - price;
  changeShow();
  console.log(changeNum);
  change.textContent = "";
  change.innerHTML= "";
  if(changeNum < 0){
    change.innerHTML = `<p>请支付足够金额</p>`;
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  if(changeNum === 0){
    change.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    return;
  }
  const changeMoney = calculateChange(changeNum);
  state(changeMoney);
  updateReturnCashText(changeMoney);
  cidTextChange();
  cashInput.value = ""
  console.log(changeMoney);
});