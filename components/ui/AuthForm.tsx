'use client';
import React, { useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
} from "@/components/ui/form";
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Correct import for app directory

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter(); // Initialize the router

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted:", values); // Log form submission
    setIsLoading(true); // Set loading state

    const endpoint = type === 'sign-in'
      ? 'http://grad-ecommerce-production.up.railway.app/api/login' 
      : 'http://grad-ecommerce-production.up.railway.app/api/signup/client';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      // Check if response is not okay
      if (!response.ok) {
        const errorData = await response.json(); // Get error message
        throw new Error(errorData.message || 'Failed to submit form');
      }

      const data = await response.json();
      console.log('Success:', data);

      setUser(data);

      // Redirect based on form type
      if (type === 'sign-up') {
        console.log('Redirecting to: /sign-in'); // Log the redirect
        router.push('/sign-in'); // Redirect to sign-in page after sign-up
      } else if (type === 'sign-in') {
        console.log('Redirecting to: /dashboard'); // Log the redirect
        router.push('/dashboard'); // Redirect to dashboard or another page after sign-in
      }
    } catch (error) {
      console.error('Error:', error.message); // Log error message
      alert(`Error: ${error.message}`); // Alert user with error
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="flex justify-center text-24 lg:text-36 font-semibold text-gray-900">
            {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </h1>
          <p className="flex justify-center text-16 font-normal text-gray-600">
            {user ? 'Link your account to get started' : 'Please enter your details'}
          </p>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">
          {/* Link account code goes here */}
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' />
                    <CustomInput control={form.control} name='lastName' label="Last Name" placeholder='Enter your last name' />
                  </div>
                  <CustomInput control={form.control} name="address1" label="Address" placeholder="Enter your address" style={{ width: '450px' }} />
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='city' label="City" placeholder='Enter your city' />
                    <CustomInput control={form.control} name='phone' label="Phone" placeholder='Enter your phone number' />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='dateOfBirth' label="Date of Birth" placeholder='dd-mm-yyyy' />
                    <CustomInput control={form.control} name='gender' label="Gender" placeholder='' />
                  </div>
                </>
              )}

              <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' style={{ width: '450px' }} />
              <CustomInput control={form.control} name='password' label="Password" placeholder='Enter your password' style={{ width: '450px' }} />

              <div className="flex flex-col gap-4" style={{ width: '450px' }}>
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                    </>
                  ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in' ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
              {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
}

export default AuthForm;
