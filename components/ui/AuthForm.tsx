'use client';
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/actions/user.actions';



const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

   // 1. Define form.
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ''
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
  setIsLoading(true); // Set loading state

  try {
    if (type === 'sign-up') {
      const newUser = await signUp(data); // Handle sign-up
      setUser(newUser);
      console.log('Sign-up successful:', newUser);
    }

    if (type === 'sign-in') {
      // Pass both email and password to the signIn function
      const response = await signIn(data.email, data.password); 
      
      if (response) {
        console.log('Sign-in succeeded:', response); // Log successful sign-in
        setUser(response); // Set user state with response data
      } else {
        console.error('Sign-in failed: No response'); // Log if there is no response
      }
    }

    if (router) router.push('/'); // Redirect after sign-up or sign-in

  } catch (error: unknown) { // Specify the error type as unknown
    if (error instanceof Error) {
      console.error('Error during submission:', error.message); // Log specific error message
    } else {
      console.error('Error during submission:', error); // Log if the error is not an instance of Error
    }
  } finally {
    setIsLoading(false); // Reset loading state
  }
};

  

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="flex justify-center text-24 lg:text-36 font-semibold text-gray-900">
            {user
            ? 'Link Account'
            : type === 'sign-in'
              ? 'Sign In'
              : 'Sign Up'}
          </h1>
          <p className="flex justify-center text-16 font-normal text-gray-600">
            {user
            ? 'link your account to get started'
            : 'Please enter your details'}
          </p>
      </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          {/* link */}
        </div>
      ): (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {type === 'sign-up' && (
              <>
                <div className="flex gap-4">
                  <CustomInput control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' style={undefined} className={undefined} />
                  <CustomInput control={form.control} name='lastName' label="Lase Name" placeholder='Enter your last name' style={undefined} className={undefined} />
                </div>
                <CustomInput
                      control={form.control}
                      name="address1"
                      label="Address"
                      placeholder="address"
                      className={undefined} style={undefined} />
                <div className="flex gap-4">
                  <CustomInput control={form.control} name='city' label="City" placeholder='ex: Cairo' style={undefined} className={undefined} />
                  <CustomInput control={form.control} name='phone' label="Phone" placeholder='mobile number' style={undefined} className={undefined} />
                </div>
                <div className="flex gap-4">
                  <CustomInput control={form.control} name='dateOfBirth' label="Date of Birth" placeholder='dd-mm-yyyy' style={undefined} className={undefined} />
                  <CustomInput control={form.control} name='gender' label="Gender" placeholder='' style={undefined} className={undefined} />
                </div>
              </>
            )}

            <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' className={undefined} style={undefined} />
            <CustomInput control={form.control} name='password' label="Password" placeholder='Enter your password' className={undefined} style={undefined} />

            <div className="flex flex-col gap-4">
              <Button type="submit" className="form-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 size={20}
                    className="animate-spin" /> &nbsp;
                    Loading...
                  </>
                ) : type === 'sign-in'
                  ? 'Sign In' : 'Sign Up'}
              </Button>
            </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in'
              ? "Don't have an account?"
              : "Already have an account?"}
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
            {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm