'use server'
import React from 'react'
import { Button } from './ui/button'
import supabase from '@/utils/supabase/supabaseClient';
export default async function GoogleAuthBtn() {
    const handleGoogleAuth = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    }
    return (
        <Button type="submit" variant="outline" className="w-full cursor-pointer" >
            Sign up with Google
        </Button>
    )
}
