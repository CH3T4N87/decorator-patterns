//publish-subscriber pattern

//reading data into chunks...

class streamReader {
    constructor(){
        this.subscribers = {
            on : [],
            end : []
        }
    }

    on(callback) {
        this.subscribers.on.push(callback);
    }
    end(callback){
        this.subscribers.end.push(callback);
    }

    stream(chunk){
        for (const handler of this.subscribers.on) {
            handler(chunk);
        }
    }

    streamEnd(){
        for (const handler of this.subscribers.end) {
            handler();
        }
    }
}

const newStream = new streamReader();

let allChunks = "";

//setting up subscribers

newStream.on((chunk)=>{
    console.log("Receiving chunk... ");
    console.log("received successfully :"+chunk);
    allChunks += chunk;
});

newStream.end(()=>{
    console.log("stream ends.....");
    console.log(allChunks);
});

setTimeout(()=>{
    newStream.stream("(1) chunk ");
},3000);
setTimeout(()=>{
    newStream.stream("(2) chunk ");
},5000);
setTimeout(()=>{
    newStream.stream("(3) chunk ");
},7000);
setTimeout(()=>{
    newStream.stream("(4) chunk ");
},9000);
setTimeout(()=>{
    newStream.stream("(5) chunk ");
},11000);

setTimeout(()=>{
    newStream.streamEnd();
},15000);