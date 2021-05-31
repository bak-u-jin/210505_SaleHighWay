function PutZero(num){
  let n = String(num);
  return n.length >= 2 ? n:new Array(2-n.length+1).join('0')+n;
}

export default PutZero;