function getValues(){
    let n1 = parseFloat(document.getElementById("num1").value);
    let n2 = parseFloat(document.getElementById("num2").value);
    return {n1,n2};
};

function printResult(value){
    document.getElementById("result").innerText = "Result: "+value;
};

let add = () =>{
    let {n1,n2} = getValues();
    printResult(n1+n2);
};

let sub = () =>{
    let {n1,n2} = getValues();
    printResult(n1-n2);
};

let mul = () =>{
    let {n1,n2} = getValues();
    printResult(n1*n2);
};

let div = () =>{
    let {n1,n2} = getValues();
    printResult(n1/n2);
};


document.getElementById("addbtn").addEventListener("click",add);
document.getElementById("subbtn").addEventListener("click",sub);
document.getElementById("mulbtn").addEventListener("click",mul);
document.getElementById("divbtn").addEventListener("click",div);
