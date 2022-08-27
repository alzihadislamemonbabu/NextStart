import React, { useState } from 'react'
import bcrypt from 'bcryptjs'
import { useRouter } from 'next/router'

function handle() {
    const [userName, setUserName] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const router = useRouter()

    // getting user details from usres 
    const handleName = async (e) => {
        setUserName(e.target.value)
    }
    const handlePassword = async (e) => {
        setUserPassword(e.target.value)
    }
    const handleEmail = async (e) => {
        setUserEmail(e.target.value)
    }// end 

    // posting data to api 
    const handleSubmit = async () => {

        const hashedPassword = await bcrypt.hash(userName, 10)
        const res = await fetch('http://localhost:3000/api/main', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: userName, password: hashedPassword, email: userEmail })
        })
        if (res) {
            router.push('/login')
        }


    }// end of posting data

    return (
        <>
            <div>
                <form method="post" onSubmit={(e) => {
                    e.preventDefault()
                }}>
                    <input type="text" name="name" value={userName} onChange={handleName} />
                    <input type="text" name="name" value={userPassword} onChange={handlePassword} />
                    <input type="text" name="name" value={userEmail} onChange={handleEmail} />
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </form>

            </div>
        </>
    )
}

export default handle
