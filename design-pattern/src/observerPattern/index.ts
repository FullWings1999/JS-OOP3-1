/*
    觀察者模式
    定義：
        - 一群觀察者(observer)監聽/觀察某個被觀察的對象(Subject/obersved)，
        - 當被觀察者的狀況發生改變時，被觀察者會去通知所有觀察者被查者的資料更新了

    優點：
        - 比起obserer每隔一段時間就去尋問subject是否有更新，讓subject更新的時候直接通知更有效率
        - 將程式關注點從 observer 分離出來，使subject與observer object程式碼的耦和度降低
        ＊＊＊程式碼的耦合度為物件和物件參雜再一起的程度，能越低越好
        - 能解決pooling輪詢這種低效問題

    +---------+    訂閱         +-----------+
    |         | <========>     | observer_1|
    | subject |    發布         +-----------+ 
    +---------+                     ...
                                +------------+
                                | observer_n |
                                +------------+
        
*/

class Observer{
    id:string;
    constructor(){
        this.id = String(~~(Math.random() * 1000)).padStart(3, "0");
    }

    update = ( date:any ) =>{
        console.log(`觀察者${this.id}收到更新消息:${date}`);
    };
} 

class Subject{
    private queue = <Observer[]>[];

    //註冊觀察者
    register = ( observer:Observer ) => {
        this.queue.push(observer);
    };

    //移出觀察者
    remove = ( observer:Observer ) => {
        const queue = this.queue;
        var len = queue.length;
        for(let i = 0; i < len; i++){
            if(queue[i] === observer){
                queue.splice(i, 1);
            }
        }
    };

    //通知觀察者
    notify = ( data:any ) => {
        this.queue.forEach( (observer)=>observer.update(data));
    };
}

const subject1 = new Subject();

const observer_1 = new Observer();
const observer_2 = new Observer();
const observer_3 = new Observer();

//訂閱
subject1.register(observer_1);
subject1.register(observer_2);
subject1.register(observer_3);

//Json更新
subject1.notify(JSON.stringify({ foo:"bar" }));

/*
//文字檔更新
subject1.notify("更新內容"+"0730");
*/