// src/App.js
import React from "react";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Dashboard from "./components/dashboard";
import MessageTracing from "./components/messageTracing";
import Header from './components/Header';
import axios from 'axios';
import { UserProvider } from './UserContext'; // Import UserProvider
import { useUser } from './UserContext';
import { getToken } from "./utils/authToken"; // Import the getToken function


// Component to protect routes
function ProtectedRoute({ children }) {
  const { accounts } = useMsal();

  React.useEffect(() => {
    const checkToken = async () => {
      const token = await getToken(); // Redirects to login if token is invalid
      if (!token) return; // Prevent navigation if token is missing
    };
    checkToken();
  }, []);

  return accounts.length > 0 ? children : <Navigate to="/" />;
}


// Main App Component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <UserProvider> {/* Wrap with UserProvider */}
        <AuthenticatedTemplate>
          <MainApp /> {/* Only render MainApp here */}
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Login />
        </UnauthenticatedTemplate>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

// Login component
function Login() {
  const { instance ,accounts } = useMsal();
  const navigate = useNavigate();
  

  const handleLogin = () => {
    instance.loginRedirect({
      scopes: ["User.Read"],
    })
    .then(() => {
      // Set active account after login
      if (accounts.length > 0) {
        instance.setActiveAccount(accounts[0]);
      }
      navigate("/dashboard"); // Redirect after login
    })
    .catch((error) => {
      console.error("Login failed:", error);
    });
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center'
    },
    brandlogo: {
      objectFit: "contain"
    },
    logowidth: {
      width: "300px"
    }
  };

  return (
    <div style={styles.container}>
      <div className="login-logo-wrapper mb-10">
        <div className="logo-container">
          <a style={styles.brandlogo}>
            <img alt="Logo" src="assets/media/logos/Astronics.png" style={styles.logowidth} />
          </a>
        </div>
      </div>
      <button className="btn py-3 px-20 uppercase" onClick={handleLogin} style={{ backgroundColor: "#065590", color: "#fff" }}>
        Login with Microsoft
      </button>
    </div>
  );
}

// Component to manage authenticated routes and logout
function MainApp() {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();

  
  const { user, setUser } = useUser();

  const fetchUserDetails = async () => {
    // Check if an active account is set
    const activeAccount = instance.getActiveAccount();
   // console.log(activeAccount);
    if (activeAccount) {
      const request = {
        scopes: ["User.Read"],
        account: activeAccount, // Specify the active account
      };

      try {
        const accessToken = await getToken(); // Automatically handles token expiration and redirection
       
        // Exit if no token is available
        if (!accessToken){
          navigate("/");
          return;
        }  
        // Fetch user details using the token
    const response = await axios.get("https://graph.microsoft.com/v1.0/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

   // console.log("User details fetched:", response.data);
    setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    } else {
      console.log("No active account set.");
    }
  };

  React.useEffect(() => {
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]); // Set the first account as active if available
      fetchUserDetails();
    }
  }, [accounts]);
  

  return (
    <>
    
      <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/messageTracing" element={<ProtectedRoute><MessageTracing /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

// Export the App component as the default export
export default App;
