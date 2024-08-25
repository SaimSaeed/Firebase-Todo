import React from 'react'

function Alert({message}) {
    return (
        <div class="alert alert-dark" role="alert">
           {message}
        </div>
    )
}

export default Alert