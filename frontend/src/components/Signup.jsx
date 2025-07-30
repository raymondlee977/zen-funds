import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useSignup } from '@/hooks/useSignup'

const Signup = () => {
  const [visible, setVisible] = useState(false);
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    await signup(email, password);
  }

  return (
    <div className='flex h-full w-full justify-center'>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <p className='text-sm p-2 text-gray-500'>Signup to ZenFunds:</p>
        <div className='flex flex-col space-y-4 lg:w-72 md:w-1/2'>
          <Input
            name='email'
            type='email'
            label='Email'
            placeholder='Email'
            readOnly
            onFocus={(e) => e.target.removeAttribute('readOnly')}
          />
          <div className="relative">
            <Input
              name="password"
              type={visible ? "text" : "password"}
              label="Password"
              placeholder="Password"
              autoComplete='off'
              readOnly
              onFocus={(e) => e.target.removeAttribute('readOnly')}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                setVisible(!visible);
              }}
              className="absolute right-2 top-0 hover:bg-transparent"
            >
              {visible ? <EyeOff /> : <Eye />}
            </Button>
          </div>
          <Button disabled={isLoading} className='w-full' type='submit'>Sign Up</Button>
          {error && <div className='bg-red-100 px-3 py-2 rounded-md text-sm border border-red-400 text-red-400'>{error}</div>}
        </div>
        <div className='flex flex-row space-x-1 items-center justify-center mt-1'>
            <p>Already have an account?</p>
            <Link className='text-primary' to="/">Log In</Link>
          </div>
      </form>
    </div>
  )
}

export default Signup