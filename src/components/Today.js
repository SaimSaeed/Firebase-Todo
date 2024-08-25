import React, { useState,useEffect } from 'react'
import dayjs from "dayjs";
import { query,collection,where,getDocs} from 'firebase/firestore';
import { db,auth } from '../config/firebase_config';
import TodoItem from './TodoItem';
function Today({uid,searchInput}) {
    const today = dayjs().format("YYYY-MM-DD");


    const q = query(collection(db,"Todo"),where("date","==",today),where("userId","==",uid))
    const [todoList,setTodoList] = useState([]);
    const getTodoList = async  ()=>{
        try {
            const querySnapshot = await getDocs(q);
            const filteredData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
              setTodoList(filteredData)

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getTodoList();
    });
  return (
    <>
    { todoList.length !== 0 ? 
        todoList.filter((item) => {
          return searchInput.toLowerCase() === ''
            ? item
            : item.name.toLowerCase().includes(searchInput) && item.completed === false;
        }).map((item)=> {
  
            return  <TodoItem name={item.name}  desc={item.desc}  date={item.date}  color={item.color} id= {item.id} completed= {item.completed}/>
           
           }) : 
           <div className='w-100 h-100 text-center d-flex justify-content-center align-items-center '>
           <h3 >No Todo</h3>

           </div>
    }



    </>
  )
}

export default Today