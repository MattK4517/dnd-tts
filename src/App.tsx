import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import './App.css';
import ClassPage from './components/classes/ClassPage';
import SpeechComponent from './components/SpeechComponent';

export var API_ROUTE = 'https://www.dnd5eapi.co';

const appRoutes = [
  {
    path: '/class/:name',
    element: <ClassPage />,
    // @ts-ignore
    loader: async ({ params }) => {
      let data = (
        await fetch(`${API_ROUTE}/api/classes/${params.name.toLowerCase()}`)
      ).json();
      return data;
    },
  },
  {
    path: '/subclass/:name',
    element: <ClassPage />,
    // @ts-ignore
    loader: async ({ params }) => {
      console.log(name);
      let data = (
        await fetch(`${API_ROUTE}/api/subclasses/${params.name.toLowerCase()}`)
      ).json();
      return data;
    },
  },
  {
    path: '/dnd-tts/',
    element: (
      <div className='App' style={{ width: '1024px' }}>
        <div className='card'>
          <SpeechComponent />
        </div>
      </div>
    ),
  },
];

function App() {
  const appRouter = createBrowserRouter(appRoutes);
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
            refetchOnMount: false,
            refetchOnReconnect: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRouter} />
    </QueryClientProvider>
  );
}

export default App;
