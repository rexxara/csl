import React, { useContext, useEffect } from "react"
import {UserListContext} from './RHooks/userContextProvider'
export default function(){
    const {users,getList,deleteUser} = useContext(UserListContext)
    useEffect(()=>{
        getList()
    },[])

    return <div>
        {users.map((v, k) => <div key={k}>
            <span>{v}</span>
            <button style={{margin:'20px'}} onClick={() => deleteUser((item) => item === v)} >删除</button>
             </div>)}
    </div>
    }
