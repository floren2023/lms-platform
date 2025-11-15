import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth-client'
import { Sign } from 'crypto'
import { GithubIcon } from 'lucide-react'

import React from 'react'
import { toast } from 'sonner'

const LoginPage = () => {
   async function signInWithGithub(){
    await authClient.signIn.social({
      provider:'github',
      callbackURL:'/',
      fetchOptions:{
        onSuccess:()=>{
          toast.success('Sign in with Github, you will be redirected..')
        },
        onError:(error)=>{
          toast.error(error.error.message)
        }

      }
    })

  }
  return (
   <Card>
    <CardHeader>
      <CardTitle className='text-xl'>Welcome Back!</CardTitle>
      <CardDescription>Login with your Github Email Account</CardDescription>
    </CardHeader>
    <CardContent className='flex flex-col gap-4'>
      <Button onClick={signInWithGithub} className='w-full text-black font-semibold' variant="outline">
        <GithubIcon className="size-4"/>Sign in with Github</Button>
        <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border
        '>
          <span className='relative z-10 bg-card px-2 text-muted-foreground'>Or continue with</span>
        </div>
        <div className='grid gap-3'>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" placeholder="m@example.com"/>

          </div>
          <Button type="submit">Continue with Email</Button>

        </div>
    </CardContent>
   </Card>
  )
}

export default LoginPage