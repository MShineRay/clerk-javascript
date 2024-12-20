import { ClerkProvider } from '@clerk/clerk-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider, useNavigate } from 'react-router-dom';

import App from './App.tsx';
import Protected from './protected';
import SignIn from './sign-in';
import SignUp from './sign-up';
import UserProfile from './user';
import UserProfileCustom from './custom-user-profile';
import UserButtonCustom from './custom-user-button';
import UserButtonCustomTrigger from './custom-user-button-trigger';

const Root = () => {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      // @ts-ignore
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string}
      clerkJSUrl={import.meta.env.VITE_CLERK_JS_URL as string}
      routerPush={(to: string) => navigate(to)}
      routerReplace={(to: string) => navigate(to, { replace: true })}
      experimental={{
        persistClient: import.meta.env.VITE_EXPERIMENTAL_PERSIST_CLIENT
          ? import.meta.env.VITE_EXPERIMENTAL_PERSIST_CLIENT === 'true'
          : undefined,
      }}
    >
      <Outlet />
    </ClerkProvider>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/sign-in/*',
        element: <SignIn />,
      },
      {
        path: '/sign-up/*',
        element: <SignUp />,
      },
      {
        path: '/user/*',
        element: <UserProfile />,
      },
      {
        path: '/protected',
        element: <Protected />,
      },
      {
        path: '/custom-user-profile/*',
        element: <UserProfileCustom />,
      },
      {
        path: '/custom-user-button',
        element: <UserButtonCustom />,
      },
      {
        path: '/custom-user-button-trigger',
        element: <UserButtonCustomTrigger />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
