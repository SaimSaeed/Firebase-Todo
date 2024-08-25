import React, { useState,useEffect } from 'react'
import { collection,query,where,getDocs } from 'firebase/firestore';
import { db,auth } from '../config/firebase_config';
import TodoItem from './TodoItem';
import { DatePicker} from 'antd';
const { RangePicker } = DatePicker;
function Calendar({todoList,searchInput}) {


    const [fromDate,setFromDate] = useState();
    const [toDate,setToDate] = useState();
    

    const filterByDate = (dates)=>{
      try {
       setFromDate(dates[0].format("YYYY-MM-DD"))
        setToDate(dates[1].format("YYYY-MM-DD"))
    
      } catch (error) {
        console.log(error)
      }
       
      
      
      
         
    }
  return (
    <>
    <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",padding:'10px'}}>
    <RangePicker  format={"YYYY-MM-DD"} onChange={filterByDate}/>
    </div>
   

    {
        todoList?.filter((item)=>{
            return !fromDate  && !toDate
             ? item : item.date >= fromDate && item.date <= toDate && item.completed === false

        }).filter((item)=>{
          return searchInput.toLowerCase() === ''
          ? item
          : item.name.toLowerCase().includes(searchInput) && item.completed === false;
        }).map((item)=> {
  
            return  <TodoItem name={item.name}  desc={item.desc}  date={item.date}  color={item.color} id= {item.id} completed = {item.completed}/>
           
           }) 
    }



    </>
  )
}

export default Calendar