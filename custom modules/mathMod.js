//add
//sub
//mult
//div


const add = (a,b)=>{
    result= a+b;
    console.log("adding", result)
    return result;

}
const mult= (a,b)=>{

    result= a * b;
    console.log(result);
    return result;
    
}

const sub= (a,b)=>{
    const result=Math.abs(a-b);
    console.log(result);
    return result;
}

const divide= (a,b)=>{
    result=a/b;
    console.log(result)
    return result;
}

ans ={
    add, sub, mult, divide
};

module.exports.mathOp=ans;