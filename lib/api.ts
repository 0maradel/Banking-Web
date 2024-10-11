export async function submitAuthForm(type, values) {
    const endpoint = type === 'sign-in' 
        ? 'http://grad-ecommerce-production.up.railway.app/api/login' 
        : 'http://grad-ecommerce-production.up.railway.app/api/signup/client';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  
    if (!response.ok) {
      throw new Error('Failed to submit form');
    }
  
    return response.json();
  }
  