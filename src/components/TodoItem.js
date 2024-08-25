import React, { useState } from 'react'
import { db } from "../config/firebase_config"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { Modal, Button,Form } from "react-bootstrap";
import Alert from './Alert';
import {FaCheck} from "react-icons/fa6"





function TodoItem({ name, desc, id, color,completed,date }) {

    // Delete Todo
    const deleteTodo = async (id) => {

        const todoDoc = doc(db, "Todo", id)
        await deleteDoc(todoDoc)



    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);





    const [submitButtonDisable, setSubmitButtonDisable] = useState(false);


    // Edit Todo
    const [updateTodoName, setUpdateTodoName] = useState(name)
    const [updateTodoDesc, setUpdateTodoDesc] = useState(desc)
    const [updateDate, setUpdateDate] = useState(date)
    const [updateColor, setUpdateColor] = useState(color)
    // const [checked, setChecked] = useState(false)

    const [error,setError] = useState(false)

    // Validation
  
    
        const UpdateTodo = async (id) => {
            if (!updateTodoName || !updateTodoDesc || updateDate.length === 0 || updateColor.length === 0) {
                setError(true)
                setTimeout(() => {
                setError(false)
                   
                }, 2000)
            }
            else{
                const todoDoc = doc(db, "Todo", id)
                setSubmitButtonDisable(true)
                await updateDoc(todoDoc, {
                    name: updateTodoName,
                    desc: updateTodoDesc,
                    color: updateColor,
                    date: updateDate
        
                })
                setSubmitButtonDisable(false)
        
            }
          
    }

    // Completed Function 
    const toggleComplete  = async (id)=>{
     const  completedDoc = doc(db,"Todo",id)
      await updateDoc(completedDoc,{
        completed:!completed
      })
    }

 

    const contrastColor = c=>["#000","#F5F5F5"][~~([.299,.587,.114].reduce((r,v,i)=>parseInt(c.substr(i*2+1,2),16)*v+r,0)<128)];
const color2 = contrastColor(color)



    return (
        <div className='note-contain' >
            <div  style={{ backgroundColor: `${color}`,marginTop:"20px", borderRadius: "5px", overflow: "hidden",position:"relative",marginRight:"10px",marginLeft:"10px",color:`${color2}` }} className={"note" }>
                <h2 className={completed ? "line" : "noLine"} > {name.toUpperCase()}</h2>
                <p className={completed ? "line" : "noLine"}>{desc}</p>
                <p className={completed ? "line" : "noLine"}>{date}</p>

             

                <div className='trash' style={{ display: "flex" ,position:"absolute",right:"0",bottom:"0",paddingRight:"2px",paddingBottom:"2px"}} >

<div style={{ cursor: "pointer" }} >
            <FaCheck  onClick={()=>toggleComplete(id)}/>
       </div>

       

    <div style={{ cursor: "pointer" }} onClick={handleShow}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
        </svg>
    </div>


    <div style={{ cursor: "pointer" }} onClick={() => deleteTodo(id)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
        </svg></div>
      

</div>


            </div>


            <Modal show={show} onHide={handleClose} size='md'   centered>
                    <Modal.Header closeButton>
                        <Modal.Title className='ms-auto'>Edit Todo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        {
error && <Alert/>
                        }
                        <div className='d-flex justify-content-between align-items-center w-100 mx-auto flex-wrap '>
                           <div style={{width:"45%"}}>
                           {/* <label><h3>Title</h3>
                        <input type="text" name="title"  placeholder='Title...' onChange={(e) => setUpdateTodoName(e.target.value)} className='rounded'  style={{width:"15vw"}}/>
                        </label> */}
                         <Form.Label htmlFor="title">Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="title"
                                    placeholder='Title...'
                                    value={updateTodoName}
                                    onChange={(e) => setUpdateTodoName(e.target.value)}
                                />
                           </div>
                           
                        <div style={{width:"45%"}}>
                        {/* <label ><h3>Detail</h3>
                        <input type="text" name="title"  placeholder='Detail...'  onChange={(e) => setUpdateTodoDesc(e.target.value)} className='rounded' style={{width:"15vw"}} />
                        </label> */}
                         <Form.Label htmlFor="desc">Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="desc"
                                    placeholder='Desc...'
                                    value={updateTodoDesc}
                                    onChange={(e) => setUpdateTodoDesc(e.target.value)}
                                />
                        </div>
                     
                        <div style={{width:"45%"}}>
                        {/* <label ><h3>Date</h3>
                        <input type="date" name="title"     onChange={(e) => setUpdateDate(e.target.value)} className='rounded ' style={{width:"15vw",textIndent:"5px"}} />
                        </label> */}
                         <Form.Label htmlFor="date">Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    id="date"
                                    placeholder='Date...'
                                    value={updateDate}
                                    onChange={(e) => setUpdateDate(e.target.value)}
                                />
                        </div>
                        <div style={{width:"45%"}}>
                        {/* <label><h3>Color</h3>
                        <input type="color" name="title"   onChange={(e) => setUpdateColor(e.target.value)} style={{borderRadius:"5px",outline:"none",width:"15vw"}}/>
                        </label> */}
                         <Form.Label htmlFor="color">Color</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="color"
                                    placeholder='Color...'
                                    value={updateColor}
                                    onChange={(e) => setUpdateColor(e.target.value)}
                                />
                        </div>

                      
                        
                       
                        
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={()=>UpdateTodo(id)} disabled={submitButtonDisable}>
                            Submit
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
          
        </div>




    )
}

export default TodoItem