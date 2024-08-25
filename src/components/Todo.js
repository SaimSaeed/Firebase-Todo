import React, { useState, useEffect } from 'react'
import { db,auth } from "../config/firebase_config"
import { collection,where,query,getDocs } from "firebase/firestore"
import TodoItem from "./TodoItem"
import Add from './Add'
import { Link } from 'react-router-dom'
function Todo({searchInput,userName,todoList}) {
    // const [todoList, setTodoList] = useState([])
    //   const [uid,setUid]= useState(null)
    //   useEffect(() => {
    //    auth.onAuthStateChanged(user=>{
    //     if(user){
    //       setUid(user.uid)
    //     }
    //    })
      
        
    //   }, []);
   
    
   



















  




   


   

    return (
     <>
   <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",paddingTop:"10px"}}>
    
    {userName ? <h5 style={{padding:"5px 10px 5px 10px",borderRadius:"10px",color:"grey",border:"2px solid grey"}}>Welcome {userName.toUpperCase()}!</h5> :<div style={{width:"100%",display:"flex",justifyContent:"space-around",alignItems:"center"}}><h5>Please Login!</h5><Link to={"/login"} style={{border:"2px solid grey",borderRadius:"10px",padding:"5px 10px 5px 10px",background:'none',color:"grey",textDecoration:"none"}}>Sign In</Link></div> }
    
    </div>
  { todoList.filter((item) => {
                return searchInput.toLowerCase() === ''
                  ? item
                  : item.name.toLowerCase().includes(searchInput) && item.completed === false;
              }).map((item)=> {
  
   return  <TodoItem name={item.name}  desc={item.desc}  date={item.date}  color={item.color} id= {item.id} completed = {item.completed}/>
  
  })

}
<Add/>
     </>
    )
}

export default Todo