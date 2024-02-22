import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate  } from "react-router-dom"
import Swal from 'sweetalert2'


const ForgotPassPage = () => {

    const { token } = useParams()
    const [validToken, setValidToken] = useState(true)
    const [newPassword, setNewPassword] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async() => {
            const response = await axios.get(`http://localhost:3001/fisiosport/user/reset-password/${token}`)

            setValidToken(response.data.message === 'Token valido' ? true : false)
        }
        verifyToken()
    }, [token])  

    const handlePasswordReset = async () => {
        const response = await axios.post(`http://localhost:3001/fisiosport/user/reset-password/${token}`, {password: newPassword})
        if(response.data.message === 'Tu contraseña se ha cambiado con exito')
        {
            Swal.fire({
                title: "Contraseña Cambiada",
                text: "Tu contraseña se ha cambiado con éxito. Ahora puedes iniciar sesión con tu nueva contraseña.",
                icon: "success"
              });
        }
        else
        {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'La sesión para restablecer la contraseña ha caducado. Vuelve a solicitar un enlace de recuperación.'
              })
        }
    };

    return (
        <div>
            {
                validToken
                    ?
                    <div>
                        <h2>Recuperar Contraseña</h2>
                        <p>Ingresa tu nueva contraseña:</p>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        /> 
                        <button onClick={handlePasswordReset}>Restablecer Contraseña</button>
                        
                    </div>
                    :
                    <div>
                        <p>El enlace de recuperación de contraseña ha caducado.</p>
                        <p>Vuelve a la página de inicio de sesión y solicita otro enlace de recuperación.</p>
                        <button onClick={() => navigate("/login")}>Ir a Iniciar Sesión</button>
                    </div>
            }
        </div>
    )
}

export default ForgotPassPage