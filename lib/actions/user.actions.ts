'use server';

// user.actions.ts
export const signIn = async (email: string, password: string) => {
  const endpoint = 'https://grad-ecommerce-production.up.railway.app/api/login';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Sending both email and password
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Invalid email or password');
    }

    const data = await response.json();
    return data; // Return the user data on successful sign-in
  } catch (error) {
    console.error('Sign-in error:', error.message);
    throw error; // Rethrow the error to handle it in the calling function
  }
};



export const signUp = async (userDetails: any) => {
  const endpoint = 'https://grad-ecommerce-production.up.railway.app/api/signup/client';
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to sign up');
    }

    const data = await response.json();
    console.log('Sign up succeeded:', data);
    return data;
  } catch (error) {
    console.error('Sign up failed:', error.message);
    throw error;
  }
};
