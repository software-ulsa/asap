import React from 'react'
import '../Account.css'

function Account() {
  return (
    <div className='Card'>
        <div className='upper-container'>
            <div className='image-container'>
                <img src="https://cdn-icons-png.flaticon.com/512/711/711769.png" alt='' height="100px" width="100px"/>
            </div>
        </div>
        <div className="lower-container">
            <div className="input-data">
                <button className="button-34" role="button">Cambiar foto de perfil</button>
                <h3>Administrador principal</h3>        
                    <input type="text" placeholder="usuario"></input>
                    <input type="email" placeholder="email"></input>                         
                    <input type="password" placeholder="password"></input>
            </div>          
        </div>
    </div>
  )
}

export default Account

