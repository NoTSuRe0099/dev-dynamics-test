import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoading,
  selectError,
  fetchUserData,
} from './reducers/userSlice';
import Dashboard from './pages/Dashboard';
import UserDetails from './pages/UserDetails';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchUserData());
  }, []);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-blue-50">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/userDetails/:name" element={<UserDetails />} />
          <Route element={<>Page Not Foud</>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
