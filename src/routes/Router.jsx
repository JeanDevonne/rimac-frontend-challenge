import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy } from 'react'
import Layout from '../components/layout/Layout/Layout'
import HomePage from '../pages/home/HomePage'
import ErrorPage from '../pages/error/404'
import PrivateRoute from '../components/PrivateRoute'

// Lazy load only secondary pages
const Plans = lazy(() => import('../pages/plans/Plans'))
const Summary = lazy(() => import('../pages/summary/Summary'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        errorElement: <ErrorPage />
      },
      {
        path: '/planes',
        element: (
          <PrivateRoute>
            <Plans />
          </PrivateRoute>
        ),
        errorElement: <ErrorPage />
      },
      {
        path: '/resumen',
        element: (
          <PrivateRoute>
            <Summary />
          </PrivateRoute>
        ),
        errorElement: <ErrorPage />
      },
      {
        path: '*',
        element: <ErrorPage />,
        errorElement: <ErrorPage />
      }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}