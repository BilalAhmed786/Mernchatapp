const Message = require('../schema/message');



module.exports = {


    async messagesave(sender,receiver,content,contenttype) {

        try {

            
            const message = new Message({ sender, receiver, content, contenttype });


            await message.save();



            
        } catch (error) {

            console.log(error)
        }

    },



    async unreadmessage() {


        try {

            const allmessages = await Message.find()

                .populate('sender', 'username email status')

                .populate('receiver', 'username email status')


                return allmessages
          





        } catch (error) {

            console.log(error)

        }


     },
    
     async chatmessage (senderId,receiverId){

try{

   const query = {

                $or: [

                    { sender:senderId, receiver:receiverId },
                    { sender:receiverId, receiver:senderId }

                ]

            }
            

            const allmessages = await Message.find(query)
                .populate('sender', 'username email status')
                .populate('receiver', 'username email status')



                return allmessages

           


}catch(error){


    console.log(error)
}


    },


    async messagereview (senderid,receiverid){


        const filter = { sender:senderid, receiver:receiverid,isreviewed: false };
        const update = { $set: { isreviewed: true } };
       
        try{
    
    
                await Message.updateMany(filter, update);
        
        }catch(error){

        
            console.log(error)
        
        
        }



    }



     
     



}