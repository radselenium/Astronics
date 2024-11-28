// src/utils/authToken.js
import { msalInstance } from '../index';  // Import the MSAL instance created in index.js
import { jwtDecode } from 'jwt-decode';


export const getToken = async (scopes = ['User.Read']) => {
  
  const activeAccount = msalInstance.getActiveAccount(); // Use the MSAL instance here
  if (!activeAccount) {
    console.error('No active account. Redirecting to login...');
    msalInstance.loginRedirect({ scopes });
    return null;
  }

  try {
    const response = await msalInstance.acquireTokenSilent({
      scopes,
      account: activeAccount,
    });

    // Decode the token and check expiration
    const { exp } = jwtDecode(response.accessToken);
    const currentTime = Math.floor(Date.now() / 1000);
    console.log("Token expiration (exp):", exp);
    console.log("Current time (currentTime):", currentTime);
    if (exp < currentTime) {
      msalInstance.loginRedirect({ scopes });
      throw new Error('Token expired');
     
    }

    return response.accessToken;
  } catch (error) {
    console.error('Failed to get token. Redirecting to login...', error);
    msalInstance.loginRedirect({ scopes });
    return null;
  }
};
