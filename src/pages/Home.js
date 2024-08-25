import React,{useState,useEffect} from 'react'
import Today from '../components/Today';
import Upcoming from '../components/Upcoming';
import Calendar from '../components/Calendar';
import Todo from '../components/Todo';
import Sidebar from '../components/Sidebar'
import { Routes,Route } from 'react-router-dom';
import {db,auth} from "../config/firebase_config"
import {collection,query,where,getDocs} from "firebase/firestore"
function Home() {
      // States for search
const [searchInput,setSearchInput] = useState("")
// set User Name
const [userName,setUserName] = useState("")
const [uid,setUid]= useState(null)
const [todoList, setTodoList] = useState([])


  useEffect(() => {
   
    auth.onAuthStateChanged((user)=>{
      if(user){
        setUserName(user.displayName)
        setUid(user.uid)
      }else {
        setUserName("")
      }
    })
   
  }, []);
 // firestore reference
    // const todoCollectionRef = collection(db, "Todo")
    const q = query(collection(db, "Todo"), where("userId","==",uid ));

//    Reading Todo
    const getTodoList = async () => {
        //Read the Data
          // onSnapshot(q, (snapshot) => {
          //   setTodoList(snapshot.map(doc => ({
          //     ...doc.data(),
          //     id: doc.id
            
          //   })))
          // })
          try {
            const data = await getDocs(q)
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setTodoList(filteredData)
          } catch (error) {
            console.error(error)
          }
         
        
    
      }
    
      useEffect(() => {
    
        getTodoList()
    
      });








  return (
    <>
      <div className='notes-container'>


<div className="notes-box">
  <div className='notes-left'>
    <Sidebar searchInput={searchInput} setSearchInput={setSearchInput} />
  </div>
  <div className='notes-right'>
    <div className='notes-align'>
      <Routes>
<Route path='/' element={<Todo searchInput={searchInput} userName={userName} todoList={todoList}/>}/>
<Route path='/today' element={<Today searchInput={searchInput} uid={uid}/>}/>
<Route path='/upcoming' element={<Upcoming uid={uid} searchInput={searchInput}/>}/>
<Route path='/calendar' element={<Calendar todoList={todoList} searchInput={searchInput} uid={uid}/>}/>
</Routes>
    </div>
  </div>
</div>
</div>
    
    
    
    
    
    
    
    
    </>
  )
}

export default Home