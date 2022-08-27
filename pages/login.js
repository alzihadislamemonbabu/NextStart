import { useRouter } from 'next/router'
import { useState } from 'react'
import bcrypt from 'bcryptjs'
import Hello from '../components/Hello'


function login() {

    // all states 
    const [userName, setUserName] = useState()
    const [userPassword, setUserPassword] = useState()
    const [userEmail, setUserEmail] = useState()
    // end of all states

    // router query 
    const router = useRouter()
    // end router query 

    // checking login info and redirecting to home page
    const findingData = async () => {

        const res = await fetch('http://localhost:3000/api/main/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: userName, password: userPassword, email: userEmail })
        })
        const result = await res.json()

        if (result.v === 'successful') {
            router.push('/')
            console.log(result.v)

        } else {
            alert("invalid user name")
        }



    }
    // end login page's logic 

    return (
        <>
            <input type="text" name="name" id="" onChange={(e) => {
                setUserName(e.target.value)
            }} />
            <input type="text" name="password" id="" onChange={(e) => {
                setUserPassword(e.target.value)
            }} />
            <input type="text" name="email" id="" onChange={(e) => {
                setUserEmail(e.target.value)
            }} />
            <button type="submit" onClick={findingData}>Login</button>
        </>
    )
}

export default login