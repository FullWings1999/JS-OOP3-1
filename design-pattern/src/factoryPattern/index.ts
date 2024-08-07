/*
    工廠模式
    定義：提供一個工廠介面，將產生 instance 的程式碼交由交由子類別各自實現
    講解：確保使用者不需要了解工廠內部的實際過程，僅需要給予關鍵字，就可以得到對應的instance

    使用場合跟情境
    - 一系列物件性值相近，僅有少部分差異的時候，適合使用
    - EX：同值性高的產品跟服務

    Hint:工廠模式巧妙的運用多型的概念
*/

interface Car{
    weelnember:number;
    cartype:string;

    gettype():string;
    getname():string;
}

class BMW implements Car{
    weelnember: number = 4;
    cartype: string = "car";

    gettype = () => this.cartype;
    getname = () => this.constructor.name;
}

class Mitsubishi_fuso implements Car{
    weelnember: number = 4;
    cartype: string = "truck";

    gettype = () => this.cartype;
    getname = () => this.constructor.name;    
}

class Rav4 implements Car{
    weelnember: number = 4;
    cartype: string = "rv";

    gettype = () => this.cartype;
    getname = () => this.constructor.name;
}

//抽象工廠，建造專屬工廠，減少使用switch-case的機會，才不會變得很大一串程式碼
class Factory{
    static getCar(){}
}
class BMWFacory implements Factory{
    static getCar(){
        return new BMW();
    }
}  

class MitsubishiFactory implements Factory{
    static getCar(){
        return new Mitsubishi_fuso();
    }
}

class Rav4Factory implements Factory{
    static getCar(){
        return new Rav4();
    }
}

var car1 = BMWFacory.getCar(); 
var car2 = MitsubishiFactory.getCar();
var car3 = Rav4Factory.getCar();

console.log(car1.cartype);
console.log(car2.cartype);
console.log(car3.cartype);

/*
//簡單工廠模式
class Simplefactory{
    static getCar = (type : string) => {
        switch (type) {
            case "BMW":
                return new BMW();
            case "mitsubishi":
                return new Mitsubishi_fuso();
            case "Rav4":
                return new Rav4();
        }
    }
}

var car1 = Simplefactory.getCar('BMW');
var car2 = Simplefactory.getCar('mitsubishi');
var car3 = Simplefactory.getCar('Rav4');

console.log(car1?.cartype, car1?.getname(), car1?.gettype(), car1?.weelnember);
console.log(car2?.cartype, car2?.getname(), car2?.gettype(), car2?.weelnember);
console.log(car3?.cartype, car3?.getname(), car3?.gettype(), car3?.weelnember);
*/