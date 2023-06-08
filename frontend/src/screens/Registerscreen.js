import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Loader from '../componenets/Loader';
import Error from '../componenets/Error';
import Success from '../componenets/Success';
const Registerscreen = () => {
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setSuccess] = useState();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    async function register(){
        if(password == cpassword){
            const user = {
                name,
                email, 
                password,
                cpassword
            }
            try{
                setloading(true);
                const result = await axios.post('/api/users/register', user).data;
                setloading(false);
                setSuccess(true);
                setName('');
                setEmail('');
                setCpassword('');
                setPassword('');
            }
            catch(error){
                console.log(error);
                setloading(false);
                seterror(true);
            }
        }
        else{
            alert('Passwords not matched');
        }
    }
    return (
      
        <div>
              {loading && (<Loader/>)}
              {error && (<Error  message = {'Something Went Wrong'}/>)}
                <div className="row justify-content-center mt-5">
                    <div className="col-md-5 ">
                    {success && (<Success message = "Registration Success"/>)}
                        <div className='bs mt-5'>
                            <h2>Register</h2>
                            <input type="text" className='form-control in' placeholder='name' value = {name} onChange = {(e) =>{setName(e.target.value)}} />
                            <input type="text" className='form-control in' placeholder='email' value = {email} onChange = {(e) =>{setEmail(e.target.value)}}/>
                            <input type="password" className='form-control in' placeholder='password' value = {password} onChange = {(e) =>{setPassword(e.target.value)}}/>
                            <input type="password" className='form-control in' placeholder='confirm password' value = {cpassword} onChange = {(e) =>{setCpassword(e.target.value)}}/>
                            
                            <button className='btn btn-primary mt-3' onClick={register} >Register</button>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Registerscreen;