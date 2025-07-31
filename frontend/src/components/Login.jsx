import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useLogin } from '@/hooks/useLogin'


const Login = () => {
  const [visible, setVisible] = useState(false);
  const { login, isLoading, error } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log(email)

    await login(email, password);
  }
  return (
    <div className="flex h-full w-full justify-center">
      <form onSubmit={handleSubmit}>
        <p className="text-sm p-2 text-gray-500">Login to ZenFunds:</p>
        <div className="flex flex-col space-y-4 lg:w-72 md:w-1/2">
          <Input name="email" type="email" placeholder="Email" label="Email" />
          <div className="relative">
            <Input
              name="password"
              type={visible ? "text" : "password"}
              placeholder="Password"
              label="Password"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                setVisible(!visible);
              }}
              className="absolute right-2 top-0 hover:bg-transparent cursor-pointer"
            >
              {visible ? <EyeOff /> : <Eye />}
            </Button>
          </div>
          <Button disabled={isLoading} className="w-full cursor-pointer" type="submit">
            Log In
          </Button>
          {error && <div className='bg-red-100 px-3 py-2 rounded-md text-sm border border-red-400 text-red-400'>{error}</div>}
        </div>
        <div className="flex flex-row space-x-1 items-center justify-center mt-1">
          <p>New here?</p>
          <Link className="text-primary" to="/signup">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login