const User = require('../schema/userschema');
const userstatusonconnect = async (id, socketid,status) => {

    try {

        const updatesocketid = await User.findByIdAndUpdate(id, { socketid, status})

        if (updatesocketid) {

            console.log(`user status ${updatesocketid.status}`)

        }

        

    } catch (error) {

        console.log(error)



    }

}


const userstatusondisconnect =async(socketid,status)=>{


    try{

        const updatesocketid = await User.findOneAndUpdate({ socketid },
            { status }, // Assuming you want to update the status field
            { new: true } )

        if (updatesocketid) {

            console.log(`user status ${updatesocketid.status}`)

        }



    }catch(error){


        console.log(error)
    
    }

}


module.exports = {
    userstatusonconnect,userstatusondisconnect


}