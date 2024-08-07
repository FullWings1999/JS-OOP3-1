/*
    實務上，通常不會只有一個subject即可完成任務，也不會所有的observer都對同一個subject有需求
    另外，觀察者模式中observer沒有取消訂閱的能力，這為observer帶來不便

    >因此，從觀察者模式衍生一個進階的設計模式：發布/訂閱者模式

    發布/訂閱者模式引入了 信息調派中心 的概念，來管理所有subject跟observer
    Subsriber(訂閱者)通過信息調度中心來實現 選擇主題訂閱Publisher發布者，當publisher有更新時，也基於主題去信息調度中心通知有更新

    優點：相比於觀察者模式，此模式可以完全將Publisher與Subscriber之間的關係解耦
        並可以基於不主題來添加訂閱者，從而提高更為詳細的控制

    使用範例：
        Web Dom -> addEventListener,
        VueJs -> watch
        RxJs -> pubsub
        NodeJs -> EventEmitter  

    架構如下：
    +----------+        +----------+   訂閱    +-----------+
    |          |        |          | <======> | observer_1|
    |          | 發佈消息|          |   觸發     +----------+
    | Publisher| ------>| dispatch |   ...
    | (Subject)|        |  center  |   訂閱   +-----------+
    |          |        |          | <======>| observer_n|
    |          |        |          |   觸發   +-----------+
    +----------+        +----------+
*/

interface IPublish{
    //發布者的名字
    name:string;
    //發佈消息中心
    //應該將dispatch center在constuctor時 告訴Publisher應該去哪裡增加主題，發布消息
    dispachCenter:IDispatchCenter;
    
    //constructor( name:string, dispachCenter:IDispatchCenter):void;

    //跟平台增加新主題
    addTopic( topic:string ):void;
    //移除主題
    removeTopic( topic:string ):void;
    //找平台推送消息
    publish( topic:string, message:string):void;
    
}

interface ISubscriber{
    //訂閱者名字
    name:string;

    //發布消息的中心：設置dispatch center，告訴Subscriber去哪裡訂閱
    dispatchCenter:IDispatchCenter;

    //constructor(name:string, dispachCenter:IDispatchCenter):void;

    //訂閱, fu:Function
    subscribe( topic:string):void;
    //取消訂閱
    unsubsribe( topic:string):void
    //接收dispatch送的訊息
    update( topic:string, message:string):void;
}

interface IDispatchCenter{
    //發布者告訴平台要新增主題
    
    addTopic( name:string,topic:string ) : void;
    
    //發布者告訴平台要移除主題
    removeTopic( name:string,topic:string ):void;
    
    //訂閱者來訂閱主題
    subscribeTopic( name:string,topic:string):void;
    //訂閱者來取消訂閱
    unsubscribeTopic( name:string,topic:string):void;

    //平台通知訂閱者消息
    publish( topic:string,message:string):void;
    
}

class DispatchCenter implements IDispatchCenter{
    private Topicqueue = {};
    private TopicList = <string[]>[];

    addTopic = ( name:string,topic:string ) => {
        const len = this.TopicList.length;
        this.TopicList[ len ] = topic;

        this.Topicqueue = {
            name:this.TopicList
        }

        
        console.log( name,this.Topicqueue);
        
    };

    removeTopic = ( name:string,topic: string) => {
        const queue = this.TopicList;
        var len = queue.length;
        for(let i = 0; i < len; i++){
            if(queue[i] === topic){
                queue.splice(i, 1);
            }
        }

        console.log( name,this.Topicqueue);
    };

    publish = ( topic:string,message:string) =>{
        console.log(`${topic}更新消息:${message}`);

    };
    
    //訂閱者來訂閱主題
    subscribeTopic = ( name:string,topic:string ):void => {
        console.log(`${name} 訂閱 ${topic}`);
    }
    //訂閱者來取消訂閱
    unsubscribeTopic = ( name:string,topic:string):void => {
        console.log(`${name} 取消訂閱 ${topic}`);
    }
}

class Publisher implements IPublish{
    name: string;
    dispachCenter: IDispatchCenter;

    constructor( name:string, dispatchCenter: IDispatchCenter ){
        this.name = name;
        this.dispachCenter = dispatchCenter
        //console.log(`${name}`);
    };
    
    addTopic = ( topic: string ):void => {
        const Pname = this.name;

        this.dispachCenter.addTopic(Pname,topic);
        
    };
    
    removeTopic = ( topic:string ):void => {
        const Pname = this.name;
        this.dispachCenter.removeTopic( Pname,topic );
    }

    publish = ( topic:string, message:string ):void => {
        this.dispachCenter.publish( topic,message );
    }
}

class Subsriber implements ISubscriber{
     //訂閱者名字
     name:string;

     //發布消息的中心：設置dispatch center，告訴Subscriber去哪裡訂閱
     dispatchCenter:IDispatchCenter;
 
     constructor(name:string, dispachCenter:IDispatchCenter) {
        this.name = name;
        this.dispatchCenter = dispachCenter;
     }
 
     //訂閱,fu:Function
     subscribe = ( topic:string ):void => {
        this.dispatchCenter.subscribeTopic( this.name,topic );
     }
     //取消訂閱
     unsubsribe = ( topic:string ):void =>{
        this.dispatchCenter.unsubscribeTopic( this.name,topic );
     }
     //接收dispatch送的訊息
     update = ( topic:string, message:string):void => {
        console.log(`${this.name} 收到 ${topic} 更新 ${message}`);
     }
}


const dispatcher = new DispatchCenter();

const pub1 = new Publisher("Publisher1",dispatcher);
const pub2 = new Publisher("Publisher2",dispatcher);

pub1.addTopic("Topic1");
pub2.addTopic("Topic2");

var sub1 = new Subsriber("Subscriber1",dispatcher);

sub1.subscribe("Topic1");
sub1.unsubsribe("Topic3");

