/*
    轉接頭模式
    解說：
    又稱 Wrapper Patten 
    當程式碼的內容符合需求，但是input/output不符合時，所以在程式碼外面包一層，以符合需要的input/output

*/
//輸入數字，可以輸出相對應的ASCII

const returnValuWhatInput = ( value:number ) =>value;

const retureValuWhatInputAdapter = ( value:number ) =>
    String.fromCharCode(returnValuWhatInput(value));

console.log(retureValuWhatInputAdapter(63));