import React, { useState } from 'react'
import { Modal, Button, FormLabel, Form } from "react-bootstrap";
import { db, auth } from "../config/firebase_config"
import { collection, addDoc } from "firebase/firestore"
import Alert from './Alert';
import { message } from 'antd';




function Add() {


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // firestore reference
    const todoCollectionRef = collection(db, "Todo")

    // Add Todo
    // Set New Todo States
    const [newTodoName, setNewTodoName] = useState("");
    const [newTodoDesc, setNewTodoDesc] = useState("");
    const [newColor, setNewColor] = useState("");
    const [newDate, setNewDate] = useState("");
    const [error, setError] = useState(false);
    const [errormsg, setErrorMsg] = useState("");

    const [submitButtonDisable, setSubmitButtonDisable] = useState(false);




    const submitTodo = async () => {
        if (newTodoName.length === 0) {
            setError(true)
            setErrorMsg("Please Fill the Title!")
            setTimeout(() => {
                setErrorMsg("")
                setError(false)
            }, 2000)
        }
        else if (newTodoDesc.length === 0) {
            setError(true)
            setErrorMsg("Please Fill The Description!")
            setTimeout(() => {
                setErrorMsg("")
                setError(false)
            }, 2000)
        } else if (newDate.length === 0) {
            setError(true)
            setErrorMsg("Please Fill The Date!")
            setTimeout(() => {
                setErrorMsg("")
                setError(false)
            }, 2000)
        }
        else if (newColor.length === 0) {
            setError(true)
            setErrorMsg("Please Fill The Color!")
            setTimeout(() => {
                setErrorMsg("")
                setError(false)
            }, 2000)
        }
        else {
            try {
                setSubmitButtonDisable(true)
                await addDoc(todoCollectionRef, {
                    name: newTodoName,
                    desc: newTodoDesc,
                    color: newColor,
                    date: newDate,
                    completed: false,
                    userId: auth?.currentUser?.uid


                })
                setSubmitButtonDisable(false)
                setNewTodoName("");
                setNewTodoDesc("");
                setNewColor("");
                setNewDate("");
            } catch (error) {
                console.error(error)
            }
        }




    }











    return (
        <div className='note-contain'>

            <div className='note new-note'>
                <button onClick={handleShow} >+</button>
                <Modal show={show} onHide={handleClose} size='md' centered   >
                    <Modal.Header closeButton>
                        <Modal.Title className='ms-auto'>Add Todo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        {error && <Alert message={errormsg} />}
                        <div className='d-flex justify-content-between align-items-center w-100 mx-auto flex-wrap '>
                            <div style={{ width: "45%" }}>
                                {/* <label><h3>Title</h3>
                                    <input type="text" name="title" placeholder='Title...' onChange={(e) => setNewTodoName(e.target.value)} className='rounded' style={{ width: "15vw" }} />
                                </label> */}
                                <Form.Label htmlFor="title">Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="title"
                                    placeholder='Title...'
                                    value={newTodoName}
                                    onChange={(e) => setNewTodoName(e.target.value)}
                                />
                            </div>

                            <div style={{ width: "45%" }}>
                                {/* <label ><h3>Detail</h3>
                                    <input type="text" name="title" placeholder='Detail...' onChange={(e) => setNewTodoDesc(e.target.value)} className='rounded' style={{ width: "15vw" }} />
                                </label> */}
                                <Form.Label htmlFor="desc">Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="desc"
                                    placeholder='Desc...'
                                    value={newTodoDesc}
                                    onChange={(e) => setNewTodoDesc(e.target.value)}
                                />


                            </div>

                            <div style={{ width: "45%" }}>
                                {/* <label ><h3>Date</h3>
                                    <input type="date" name="title" onChange={(e) => setNewDate(e.target.value)} className='rounded ' style={{ width: "15vw", textIndent: "5px" }} />
                                </label> */}
                                 <Form.Label htmlFor="date">Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    id="date"
                                    placeholder='Date...'
                                    value={newDate}
                                    onChange={(e) => setNewDate(e.target.value)}
                                />
                            </div>
                            <div style={{ width: "45%" }}>
                                {/* <label><h3>Color</h3>
                                    <input type="color" name="title" onChange={(e) => setNewColor(e.target.value)} style={{ borderRadius: "5px", outline: "none", width: "15vw" }} />
                                </label> */}
                                 <Form.Label htmlFor="color">Color</Form.Label>
                                <Form.Control
                                    type="color"
                                    id="color"
                                    placeholder='Color...'
                                    value={newColor}
                                    onChange={(e) => setNewColor(e.target.value)}
                                    style={{width:"100%"}}
                                />
                            </div>





                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={submitTodo} disabled={submitButtonDisable}>
                            Submit
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>


            </div>



        </div>


    )
}

export default Add