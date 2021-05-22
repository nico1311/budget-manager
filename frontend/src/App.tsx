import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, useToast } from '@chakra-ui/react';
import { Route, Router, useLocation } from 'wouter';
import { UserContext } from './context/UserContext';

import theme from './theme';
//import './App.css'

import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';

import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Transactions from './views/Transactions';

import ApiClient from './services/ApiClient';

function App() {
  const [location, setLocation] = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const toast = useToast();

  useEffect(() => {
    setLoading(true);
    ApiClient.getUserInfo().then(({data}) => {
      console.log(data);
      setUser(data);
      // if requested location is / or /login, redirect to dashboard. else redirect to requested location
      setLocation(['/', '/login'].includes(location.toLowerCase()) ? '/dashboard': location);
    }).catch((err) => {
      if (err.response && err.response.status == 401) {
        setLocation('/login');
      } else {
        setError(err.message);
      }
    }).finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    ApiClient.logout().then(() => {
      setLocation('/login');
      setUser(null);
    }).catch(console.error);
  }

  return (
    <UserContext.Provider value={{user, setUser}}>
      <ChakraProvider theme={theme}>
        <div className="App">
          <Navbar handleLogout={handleLogout} />
          <Box padding="4">
            {loading ? <LoadingSpinner /> :
              error ? <ErrorDisplay message={error} /> :
                <Router>
                  <Route path="/login" component={Login} />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/transactions" component={Transactions} />
                </Router>
            }
          </Box>
        </div>
      </ChakraProvider>
    </UserContext.Provider>
  )
}

export default App
