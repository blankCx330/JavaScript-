const userInput = document.getElementById("user-input");
const results = document.getElementById("results-div");
const resultsCn = document.getElementById("results-div-cn");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn"); 

const numberRegex = /^(\+?1)?[-\s]?(\((\d{3})\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/;

const numberDetect = num => {
    return numberRegex.test(num);
};

clearBtn.addEventListener("click", () => {
    userInput.value = "";
    results.innerText = "";
    resultsCn.innerText = "";
});
checkBtn.addEventListener("click", () => {
    const number = userInput.value;
    if(!number){
        alert("Please provide a phone number");
        return;
    }
    if(numberRegex.test(number)){
        results.innerText = `Valid US number: ${number}`
        resultsCn.innerText = `有效的美国号码: ${number}`
    }else{
        results.innerText = `Invalid US number: ${number}`
        resultsCn.innerText = `无效的美国号码: ${number}`
    }
})