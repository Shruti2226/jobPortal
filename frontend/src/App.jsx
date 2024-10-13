import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx';
import Home from './components/Home.jsx';
import Jobs from './components/Jobs.jsx';
import Browse from './components/Browse.jsx';
import Profile from './components/Profile.jsx';
import JobDescription from './components/JobDescription.jsx';
import Companies from './components/adminSection/Companies.jsx';
import CreateCompanies from './components/adminSection/CreateCompanies.jsx';
import CompanySetup from './components/adminSection/CompanySetup.jsx';
import AdminJobs from './components/adminSection/AdminJobs.jsx';
import PostJobs from './components/adminSection/PostJobs.jsx';
import Applicants from './components/adminSection/Applicants.jsx';
import ProtectedRoute from './components/adminSection/ProtectedRoute.jsx';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/jobs',
    element: <Jobs />,
  },
  {
    path: '/description/:id',
    element: <JobDescription />,
  },
  {
    path: '/browse',
    element: <Browse />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },

  //Admin Section
  {
    path: '/admin/companies',
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/companies/create',
    element: <CreateCompanies />,
  },
  {
    path: '/admin/companies/:id',
    element: <CompanySetup />,
  },

  {
    path: '/admin/jobs',
    element: <AdminJobs />,
  },

  {
    path: '/admin/jobs/create',
    element: <PostJobs />,
  },

  {
    path: '/admin/jobs/:id/applicants',
    element: <Applicants />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
}

export default App;
