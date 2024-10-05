import React from 'react'
import {GoogleOAuthProvider} from '@react-oauth/google'
import { GoogleLogin, googleLogout,useGoogleLogin } from '@react-oauth/google'
import {FcGoogle} from 'react-icons/fc'
import { useNavigate } from 'react-router-dom';
import shareVideo from '../../assets/share.mp4'
import logo from '../../assets/logowhite.png'
import api from '../../services/api'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
    let userData;
    let defaultUser;
    try {
        userData = localStorage.getItem("userData");
        defaultUser = localStorage.getItem("user")
    } catch (error) {
    // Handle the error gracefully
       userData = []
       defaultUser = null
    }

    const navigate = useNavigate();
    const [ user, setUser ] = useState(defaultUser);
    const [ profile, setProfile ] = useState(userData);
    
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {setUser(codeResponse)
            localStorage.setItem('user', codeResponse)
        navigate('/login')},
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                        localStorage.setItem('userData', JSON.stringify(res.data))
                        console.log(res.data)
                        const {id, name, email,picture} = res.data
                        const postData = {
                            "google_id": id,
                            "user_name":name,
                            "email":email,
                            "picture": picture
                        }
                        api.createUser(postData)
                        .then(response => {
                            navigate('/home')
                            console.log('User created successfully:', response.data);
                        }).catch(error => {
                            console.error('Error creating user:', error);
                        })
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );
    
    const userinfo = ()=>{
        console.log(user.data)
    }
    

     const logout = () => {
        console.log('loggin out user')
        googleLogout();
        setProfile(null);
        setUser(null)
        localStorage.removeItem('userData')
        localStorage.removeItem('user')

    };

  return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video src={shareVideo}
                type ="video/mp4"
                loop
                controls={false}
                muted
                autoPlay
                className='w-full h-full object-cover'
                />
            </div>
            {user == null ? <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                <div className='p-5'>
                    <img src={logo} width="130px" alt='logo' />
                </div>
                <div>    
                    <button onClick={login} className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'><FcGoogle className='mr-4' />Sign In with Google </button>
                </div>
            </div> :
            <button type="button" onClick={logout} class="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none">Log Out</button>
            }
           
        </div>
        
  )
}

export default Login
