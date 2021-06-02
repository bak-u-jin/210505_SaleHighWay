function PutZero(num){
  let stringNum = String(num);
  return stringNum.length >= 2 ? stringNum:new Array(2-stringNum.length+1).join('0')+stringNum;
}

export default PutZero;