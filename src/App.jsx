import Header from "./components/Header";

import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import MainContainer from './components/MainContainer';
import WatchVideo from "./components/WatchVideo";
import Results from "./components/Results";

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
    }
  ]
}])
const App = () => {
  return (
    
    <Provider store={appStore}>
    <div>
      <RouterProvider router={appRouter}>
      <Header />
        <Body />
      </RouterProvider>
    </div>
    </Provider>
  )
}

export default App