import Header from "./layouts/Header";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import MainContainer from './components/MainContainer';
import WatchVideo from "./pages/watchVideo/WatchVideo";
import Results from "./pages/results/Results";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { app } from "./firebase";
import Subscriptions from "./pages/subscriptions/Subscriptions";


const appRouter = createBrowserRouter([{
  path: '/',
  element: <Body />,
  children: [
    {
      path: '/',
      element: <MainContainer />
    },
    {
      path: 'watch',
      element: <WatchVideo />
    },
    {
      path: 'results',
      element: <Results />
    },
    {
      path: 'subscriptions',
      element: <Subscriptions />
    }
  ]
}])
const App = () => {
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('User is logged in:', user.email);
        // Handle any necessary actions (e.g., redirect to dashboard)
      } else {
        console.log('User is not logged in');
        // Handle any necessary actions (e.g., show login modal)
      }
    });

    // Clean up the subscription when component unmounts
    return () => unsubscribe();
  }, []);


  return (
    
    <Provider store={appStore}>
    <div >
      <RouterProvider router={appRouter}>
      <Header />
        <Body />
      </RouterProvider>
    </div>
    </Provider>
  )
}

export default App