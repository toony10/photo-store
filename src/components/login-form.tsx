"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState, useState } from "react"
import Loader from "./Loader";
import { signIn, signUp, AuthWithGoogle } from "@/utils/actions";
import { useEffect } from "react";



export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isNewUser, setIsnewUser] = useState(false)
  const [errMsg, setErrMsg] = useState(true);
  const [showMsg, setShowMsg] = useState(false);
  // SignUp
  const [signUpState, signUpAction, signUpPending] = useActionState(
    signUp,
    { success: false, message: '' }
  );

  useEffect(() => {
    if (isNewUser && signUpState?.success) {
      setShowMsg(true);
    }
  }, [signUpState, isNewUser]);

  // Show verification message if signup was successful
  const showVerificationNotice = isNewUser && signUpState?.success;

  // SinIn
  const [signInState, signInAction, signInPending] = useActionState(
    signIn,
    { success: false, message: '' }
  )


  return (
    <div className={ cn("flex flex-col gap-6", className) } { ...props }>
      <Card>
        { isNewUser ?
          <CardHeader>
            <CardTitle>Join Us</CardTitle>
            <CardDescription>
              Enter your email below to Signup
            </CardDescription>
          </CardHeader>
          :
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
        }
        <CardContent>
          <form action={ isNewUser ? signUpAction : signInAction }>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  { isNewUser ?
                    ''
                    :
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  }

                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required />
              </div>
              { isNewUser ?
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full cursor-pointer ">
                    { signUpPending ? <Loader word="Loading" /> : 'Sign up' }
                  </Button>
                  <form action={ AuthWithGoogle }>
                    <Button type="submit" variant="outline" className="w-full">
                      Sign up with Google
                    </Button>
                  </form>
                  { showMsg && <div>please check your email to verification</div> }
                </div>
                :
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    { signInPending ? <Loader word="Loading..." /> : 'Sign in' }

                  </Button>
                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                </div>
              }
            </div>
            { isNewUser ?
              <div className="mt-4 text-center text-sm">
                already have an account?{ " " }
                <a className="underline underline-offset-4 cursor-pointer" onClick={ () => setIsnewUser(prev => !prev) }>
                  { signInPending ? <Loader word="Loading..." /> : 'Sign in' }
                </a>
              </div>
              :
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{ " " }
                <a className="underline underline-offset-4 cursor-pointer" onClick={ () => setIsnewUser(prev => !prev) }>
                  sign up
                </a>
              </div>
            }
          </form>
        </CardContent>
      </Card>

      { signUpState?.message && <div className={ `bg-green-500 mx-5 p-2 rounded-lg text-white font-bold text-lg flex justify-between transition duration-500 ${errMsg ? 'opacity-100' : 'opacity-0'}` }>
        <span>{ signUpState.message }</span>
        <span onClick={ () => setErrMsg((prev) => !prev) } className="cursor-pointer">X</span>
      </div> }

      { signInState?.message && <div className={ `bg-red-500 mx-5 p-2 rounded-lg text-white font-bold text-lg flex justify-between transition duration-500 ${errMsg ? 'opacity-100' : 'opacity-0'}` }>
        <span>{ signInState.message }</span>
        <span onClick={ () => setErrMsg((prev) => !prev) } className="cursor-pointer">X</span>
      </div> }
    </div>
  )
}
