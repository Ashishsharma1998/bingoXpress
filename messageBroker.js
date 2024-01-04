const amqplib = require("amqplib");

const createChannel = async()=>{
    try {
     const connection = await amqplib.connect("amqp://localhost");
     const channel = await connection.createChannel();
     channel.assertExchange("NOTIFICATION_EXCHANGE","direct",false);
     return channel
    } catch (error) {
        console.log("some error while creating and connecting with rmq server  ", error); 
    }
    ; 

}


const publisher = async(channel,binding_key,message)=>{
  try {
    await channel.assertQueue("NOTIFICATION_QUEUE");
    await channel.publish("NOTIFICATION_EXCHANGE",binding_key,Buffer.from(message));
  } catch (error) {
    console.log("something went wrong while publishing ", error);
  }
}

module.exports = {
    createChannel,
    publisher
};
