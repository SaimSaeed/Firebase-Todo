import React from 'react'
import {Link,useNavigate} from "react-router-dom"
import {auth} from "../config/firebase_config"
import {signOut} from "firebase/auth"

function Sidebar({searchInput,setSearchInput}) {
  const navigate  = useNavigate()

  const logOut = async () => {
    try {
        await signOut(auth)
        navigate("/login")
    } catch (error) {
        console.error(error)
        
    }
 
}
    return (
        <div className='header'>
            <nav className='nav d-flex flex-column'>
                <div className='navbar-logo'>
                    <h4>Menu</h4>
                    <span className='burger'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg></span>
                </div>
                <div className='search-box'>
                    <input type="search" className='searchbar mb-2' placeholder='Search' value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} />
                </div>


                <div className='task1box'>
                    <h6 className='head'>Tasks</h6>
                    <ul className='task1-list '>


                        <li className='nav-item'><Link to={"/upcoming"} style={{ textDecoration: "none", color: "black" }} >Upcoming</Link></li>
                        <li className='nav-item'><Link to={"/today"} style={{ textDecoration: "none", color: "black" }} >Today</Link></li>
                        <li className='nav-item'><Link to={"/calendar"} style={{ textDecoration: "none", color: "black" }} >Calendar</Link></li>
                        <li className='nav-item'><Link to={"/"} style={{ textDecoration: "none", color: "black" }} >Sticky Wall</Link></li>
                    </ul>
                </div>
                <div className='task2box'>
                    <h6>Lists</h6>
                    <ul className='task2-list '>


                        <li className='nav-item'>Personal</li>
                        <li className='nav-item'>Work</li>
                        <li className='nav-item'>List 1</li>
                        <li className='nav-item'>Add New List</li>

                    </ul>
                </div>
                <div className='task3box '>
                    <h6>Tags</h6>
                    <div className='task3-list'>
                        <div className='tags' style={{ backgroundColor: "rgb(117, 187, 240)", borderColor: "rgb(117, 187, 240)" }}>Tag 1</div>
                        <div className='tags' style={{ backgroundColor: "rgb(253, 159, 159)" }}>Tag 2</div>
                        <div className='tags' style={{ backgroundColor: "rgb(196, 193, 193)", borderColor: "rgb(196, 193, 193)" }}> + Add Tag</div>


                    </div>
                </div>


                <div className='task4box '>

                    <div>Settings</div>
                    <div className='sign-out' onClick={logOut}>Sign Out</div>




                </div>








            </nav>

        </div>
    )
}

export default Sidebar