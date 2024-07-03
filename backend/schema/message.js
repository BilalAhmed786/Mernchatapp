const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    content: { type: Array,required:true},
    contenttype:{type:String,required:true},
    isreviewed:{type:Boolean,default:false},
    timestamp: { 
        type:'string',
        default:function() {
       
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            let hours = currentDate.getHours();
            const amOrPm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12; // Convert 0 to 12
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
           
            return `${hours}:${minutes} ${amOrPm} (${day}-${month}-${year})`;
        }
        
        },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;