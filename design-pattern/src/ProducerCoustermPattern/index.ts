/*
    生產者/消費者模式
    解說：
    生產者跟消費者在同時間內共同存取某一個資料空間，生產者往空間丟資料，消費者取走資料
    消費者與生產者互不相干，也不需要知道對方存在

    +-------+      +-------+      +-------+
    |       |  生  |       |  消   |       |
    | 生產者 | ---> | 緩衝區 | <--- | 消費者 |
    |       |  產  |       |  費   |       |
    +-------+      +-------+      +-------+

    優點
        消費者與生產者之間完全解耦
        在多線程的程式架構中依然容易實作

    實際案例
        Message Queue (已經寫好的服務) RedditMQ:support NodeJS,Golang,Java,C/C++,...
        NodeJs BullJob(Job Schedular)
        Python Celer(MQ的實現)
    ***Redis:storage service 儲存服務 -> in memory storage service.(cache 快取，暫存)
        特色：輕，快，小，重開資料都不見

*/

//作為緩衝區的array
const buffer = <any>[];

const Max_Buffer = 10;

class Producer {
    private buffer :any[];

    constructor( buffer:any[] ){
        this.buffer = buffer;
    }

    random = () => String(~~( Math.random()*1000 )).padStart(3, "0");
    
    start = () => {
        setInterval(()=>{
            //產生消息並往緩衝區塞
            if(this.buffer.length >= Max_Buffer)
                return console.warn("緩衝區已滿，請稍等");

            const msg = "內容"+this.random();
            console.log("產生"+msg);
            this.buffer.push(msg);

        },1200);
    };
}

class Costumer{
    private buffer:any[];

    constructor( buffer:any[]){
        this.buffer = buffer
    }

    start = () => {
        setInterval(() => {
            if( this.buffer.length <= 0)
                return console.warn("緩衝區已空，請稍等");

            //將資料取出
            const msg = this.buffer.shift();
            console.log("取出"+msg+"來處理");
        },1000);
    };
}

const buffer_monitor = setInterval( () => {
    console.log("緩衝區目前有"+buffer.length+"筆資料");
},500);

const producer = new Producer(buffer);
const costumer = new Costumer(buffer);

producer.start();
costumer.start();