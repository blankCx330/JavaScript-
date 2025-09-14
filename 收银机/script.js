let price = 19.5;
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

console.log(cid[2][1]);


const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const priceSpan = document.getElementById("price");
const change = document.getElementById("change-due");
const cashSpan = document.querySelectorAll(".cash-num");

console.log(cashSpan);

priceSpan.textContent = price;
const changeShow = () => change.style.display = "block";

const cidSum = arr => {
  const copy = arr.map(item => item[1]);
  copy.reduce((a,b)=> {
    const cents = Math.round(b*100);
    return a + cents;
  },0);
   return copy/100;
};

//计算要给顾客多少钱
const calculateChange = (num) => {
  const returnMoney = {};
  let remainder = parseFloat(num);
  let i = cid.length - 1;
  while(i >= 0){
    //当给客户的钱不够减/减去的余额是否溢出/余额是否为零时 跳出循坏
    if(remainder - cidMoneyValue[i] < 0 || cid[i][1] - cidMoneyValue[i] < 0 || cid[i][1] <= 0){
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
  return returnMoney;
};

//计算更新余额
const cidChange = returnMoney => {
    for(let j = 0; j<cid.length; j++){
      if(returnMoney[cid[j][0]] && cid[j][1] > 0){
        cid[j][1] = parseFloat(cid[j][1]  - returnMoney[cid[j][0]]).toFixed(2);
      }
  }
}

//更新余额文本
const cidTextChange = () => {
  for(let i = 0; i<cid.length; i++){
    cashSpan[i].textContent = cid[i][1].toString().replace(/(\.\d*?)0+$/, '');
  }
};

//判断商店状态
const state = () => {

};

purchaseBtn.addEventListener("click", ()=>{
  const cashNum = Number(cashInput.value);
  const changeNum = cashNum - price;
  changeShow();
  if(changeNum < 0){
    change.textContent = "请支付足够金额";
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  if(cashNum === 0){
    change.textContent = "No change due - customer paid with exact cash";
    return;
  }
  const changeMoney = calculateChange(changeNum);
  //cidChange(changeMoney);
  cidTextChange();
  console.log(changeMoney, cid, cidSum(cid));
});