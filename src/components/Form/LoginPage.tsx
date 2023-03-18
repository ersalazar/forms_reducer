//@ts-nocheck
import { FormEvent, useReducer, useState } from "react";
import useForm from "../Hook/useForm.tsx";
import './stylesheet.css'


interface Credentials {
    userName : string,
    password : string,
    signedIn: Boolean,
}

// interface AuthState {
//     signedIn : Boolean,
//     credentials : Credentials,

// }

const initialStateCredentials : Credentials =  {
    userName : '',
    password : '',
    signedIn : false,
}

// const initialStateAuth : AuthState = {
//     signedIn : false,
//     credentials : initialStateCredentials
// }

type AuthAction = 
| { type: 'logout'}
| { type: 'login', payload : Credentials };


const authReducer = (state : Credentials, action : AuthAction) : Credentials => {
    switch(action.type) {
        case 'login':
            const {userName, password} = action.payload;
            console.log("entra login")
            return {
                signedIn : true,
                userName,
                password
            };

        case 'logout':
            console.log('entralogout')
            return {
                ...initialStateCredentials
            };

        default:
            return state

        
    }
}

function LoginPage() {

    const [state, dispatch] = useReducer(authReducer, initialStateCredentials)
    const { signedIn } = state;

    // const {signedIn} = state;
    const[{ userName, password}, changeHandler] = useForm(state)
    
    const [wrongCredentials, setWrongCredentials] = useState(false)


    const login = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        if (userName !== 'admin' || password !== '1234') {
            console.log('mal')
            setWrongCredentials(true)
        }
        else {
            setWrongCredentials(false)
            dispatch({type : 'login', payload : {userName : userName, password : password}})
            console.log('Correct credentials')
            console.log('signedIn', signedIn)
        }
    }

    const logout = () => {
        setWrongCredentials(false)
        dispatch({type : 'logout'})
        
    }

    return (
        <div className="main">
            <div className="form">
                <form onSubmit={login}>
                    <div>
                        <label className="labels">Username: </label>
                        <input className="textInputs" type="text" name="userName" value={userName} onChange={changeHandler}  />
                    </div>
                    <div>
                        <label className="labels">Password: </label>
                        <input className="textInputs" type="text" name="password" value={password} onChange={changeHandler}  />
                    </div>

                    <input className="btn" type="submit" value='Log in' />

                </form>
                <button className="btn" onClick={logout} value='Log out'>Log out</button>

            </div>
            
            <div className="result">
                {wrongCredentials && <h3>Error: verify username and password</h3>}
                {signedIn && <h3>Welcome: {userName} !</h3>}
                
            </div>


        </div>
    )


}

export default  LoginPage