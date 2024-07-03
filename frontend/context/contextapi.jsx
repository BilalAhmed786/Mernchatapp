import React, { useState } from 'react'

export const Contextapi = React.createContext()

const Data = ({children})=>{


    const [data,dataUsers] = useState('')
    const [chatdata,chatdataUsers] = useState([])
    const [Loginuserid,LoginID] = useState('')
return(

    <Contextapi.Provider value={{data,dataUsers,chatdata,chatdataUsers,Loginuserid,LoginID}}>
        {children}
    </Contextapi.Provider>
)

}


export default Data