/*
    單例模式
    定義：一個class只有一個實例，並保證無論如何取值
    講解：確保class無論怎麼 new 或 get，都只拿到相同的instance

    使用場合跟情境
    -資料庫的連接池
    -API收發工具，EX:$ajax,axios, ...instance.//實例 打API
    -遊戲的“世界”場景
*/

class Singleton{
    private static instance : Singleton;
    
    //使用getInstance()控管控管取得instance的方法
    //當instance已被建立，就直接return已經建立的instance
    //反之，幫他建一個instance
    public static getInstance(){
        if(!Singleton.instance){
            Singleton.instance = new Singleton();
        }
        
        return Singleton.instance;
    }

    private constructor(){
        //將constructor隱藏起來，不讓使用者直接new,
        //若要取得，只能透過上方的getInstance()獲得
    }

    //剩下的部分可以填充自己需要的程式碼功能
    someMethod1 = () => {console.log("Hello New World")};
    //someMethod2 = () => {};
    //someMethod3 = () => {};

}

const myWorld = Singleton.getInstance();

console.log(myWorld.someMethod1());