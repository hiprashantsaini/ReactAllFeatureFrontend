import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthPage from './pages/auth/AuthPage.jsx'
import ImageCarouselPage from './pages/features/ui/ImageCarouselPage'
import InfiniteScrollPage from './pages/features/ui/InfiniteScrollPage'
import TabsPage from './pages/features/ui/TabsPage.jsx'
import HomePage from './pages/home/HomePage'
import InfiniteScrollPage2 from './pages/InfiniteScrollPage'
import InfiniteScrollPageIntersectionObserver from './pages/InfiniteScrollPageIntersectionObserver.jsx'
import PdfDemoPage1 from './pages/pdfGenerator/PdfDemoPage1'
import appStore from './redux/appStore'

const App = () => {
  const appRoutes= createBrowserRouter([
    {
      path:'/pdf',
      element:<PdfDemoPage1/>
    },
    {
      path:'/auth',
      element:<AuthPage/>
    },
    {
      path:"/infinite",
      element:<InfiniteScrollPage2/>
    },
    {
      path:'/',
      element:<HomePage/>
    },
    {
      path:"/features",
      children:[
        {
          path:'image-carousel',
          element:<ImageCarouselPage/>
        },
        {
          path:'infinite-scroll',
          element:<InfiniteScrollPage/>
        },
        {
          path:'infinite-scroll2',
          element:<InfiniteScrollPageIntersectionObserver/>
        },
        {
          path:'demo-auth',
          element:<AuthPage demo={true}/>
        },
        {
          path:'tabs',
          element:<TabsPage/>
        }
      ]
    }
  ])

  return (
    <Provider store={appStore}>
    <RouterProvider router={appRoutes}/>
    </Provider>
  )
}

export default App