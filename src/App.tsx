import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './store/store';
import Layout from './components/Layout';
import TaskDashboard from './pages/TaskDashboard';
import TaskDetails from './pages/TaskDetails';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/tasks" replace />} />
            <Route path="tasks" element={<TaskDashboard />} />
            <Route path="tasks/:id" element={<TaskDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;