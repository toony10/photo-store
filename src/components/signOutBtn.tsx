import React from 'react'
import { Button } from './ui/button'

export default function signOutBtn() {
    return (
        <form action='/auth/signout' method='post'>
            <Button type='submit' >signOut</Button>
        </form>
    )
}
