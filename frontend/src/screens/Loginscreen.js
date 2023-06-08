import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Loader from '../componenets/Loader';
import Error from '../componenets/Error';
const Loginscreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    async function login(){
            const user = {
                email, 
                password,
            }
            try{
                setloading(true);
                const result = (await axios.post('/api/users/login', user)).data;
                setloading(false);
                localStorage.setItem('currentUser', JSON.stringify(result));
                window.location.href = '/home';
            }
            catch(error){
                setloading(false);
                seterror(true);
                console.log(error);
            }
    }
    return (
        <div>
            {loading && (<Loader/>)}
                <div className="row justify-content-center mt-5">
                    <div className="col-md-5 ">
                            {error && (<Error message= {'Invalid Credentials'}/>)}
                        <div className='bs mt-5'>
                            <h2>Login</h2>
                            <input type="text" className='form-control in' placeholder='email' value = {email} onChange = {(e) =>{setEmail(e.target.value)}}/>
                            <input type="password" className='form-control in' placeholder='password' value = {password} onChange = {(e) =>{setPassword(e.target.value)}}/>
                            
                            <button className='btn btn-primary mt-3' onClick={login}>Login</button>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Loginscreen;