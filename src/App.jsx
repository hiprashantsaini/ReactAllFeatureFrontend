import { useEffect } from 'react'
import { Provider, useSelector } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ToastProvider from '../context/ToastProvider.jsx'
import AuthPage from './pages/auth/AuthPage.jsx'
import DockerLayout from './pages/dockerDocs/DockerLayout.jsx'
import QuickSetup from './pages/dockerDocs/quickSetup/QuickSetup.jsx'
import AccordionOrFaqPage from './pages/features/ui/FAQPage.jsx'
import ImageCarouselPage from './pages/features/ui/ImageCarouselPage'
import InfiniteScrollPage from './pages/features/ui/InfiniteScrollPage'
import ModalPage from './pages/features/ui/ModalPage.jsx'
import TabsPage from './pages/features/ui/TabsPage.jsx'
import ToastNotificationPage from './pages/features/ui/ToastNotificationPage.jsx'
import HomePage from './pages/home/HomePage'
import InfiniteScrollPage2 from './pages/InfiniteScrollPage'
import InfiniteScrollPageIntersectionObserver from './pages/InfiniteScrollPageIntersectionObserver.jsx'
import PdfDemoPage1 from './pages/pdfGenerator/PdfDemoPage1'
import ProfilePage from './pages/profile/ProfilePage.jsx'
import BottomSheetDocs from './pages/reactNativeNotes/BottomSheetDocs.jsx'
import BottomTabsDocs from './pages/reactNativeNotes/BottomTabsDocs.jsx'
import BuildCommands from './pages/reactNativeNotes/BuildCommands.jsx'
import ImageViewerDocs from './pages/reactNativeNotes/ImageViewerDocs.jsx'
import NavigationSetupDocs from './pages/reactNativeNotes/NavigationSetupDocs.jsx'
import ReactNativeLayout from './pages/reactNativeNotes/ReactNativeLayout.jsx'
import RefreshScreenDataDocs from './pages/reactNativeNotes/RefreshScreenDataDocs.jsx'
import RouteNavigationDocs from './pages/reactNativeNotes/RouteNavigationDocs.jsx'
import SetupCommands from './pages/reactNativeNotes/SetupCommands.jsx'
import SimpleReusableAnimationDocs from './pages/reactNativeNotes/SimpleReusableAnimationDocs.jsx'
import appStore from './redux/appStore'

const AppWrapper = () => {
  return (
    <Provider store={appStore}>
      <App />
    </Provider>
  );
};

const App = () => {
  const appRoutes = createBrowserRouter([
    {
      path: '/pdf',
      element: <PdfDemoPage1 />
    },
    {
      path: '/auth',
      element: <AuthPage />
    },
    {
      path: '/profile',
      element: <ProfilePage />
    },
    {
      path: "/infinite",
      element: <InfiniteScrollPage2 />
    },
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: "/features",
      children: [
        {
          path: 'image-carousel',
          element: <ImageCarouselPage />
        },
        {
          path: 'infinite-scroll',
          element: <InfiniteScrollPage />
        },
        {
          path: 'infinite-scroll2',
          element: <InfiniteScrollPageIntersectionObserver />
        },
        {
          path: 'demo-auth',
          element: <AuthPage demo={true} />
        },
        {
          path: 'tabs',
          element: <TabsPage />
        },
        {
          path: 'accordion',
          element: <AccordionOrFaqPage />
        },
        {
          path: 'modal',
          element: <ModalPage />
        },
        {
          path: 'toast',
          element: <ToastNotificationPage />
        }
      ]
    },
    {
      path: "/react-native",
      element: <ReactNativeLayout />,
      children: [
        {
          path: "",
          element: <SetupCommands />,
        },
        {
          path: "setup-commands",
          element: <SetupCommands />,
        },
        {
          path: "build-commands",
          element: <BuildCommands />,
        },
        {
          path: "image-viewer",
          element: <ImageViewerDocs />,
        },
        {
          path: "bottom-sheet",
          element: <BottomSheetDocs />,
        },
        {
          path: "bottom-tabs",
          element: <BottomTabsDocs />,
        },
        {
          path: "refresh-screen-data",
          element: <RefreshScreenDataDocs />,
        },
        {
          path: "simple-reusable-animation",
          element: <SimpleReusableAnimationDocs />,
        },
        {
          path: "navigation-setup",
          element: <NavigationSetupDocs />,
        },
        {
          path: "route-navigation",
          element: <RouteNavigationDocs />,
        },
      ],
    },
    {
      path: "/docker",
      element: <DockerLayout />,
      children: [
        {
          path: "",
          element: <QuickSetup />,
        },
        {
          path: "quick-setup",
          element: <QuickSetup />,
        },
      ],
    }
  ])

  const isGray = useSelector((state) => state.user.isGray);

  useEffect(() => {
    if (isGray) {
      document.body.classList.add("gray-theme");
    } else {
      document.body.classList.remove("gray-theme");
    }
  }, [isGray]);

  return (
    <div className="custom-scrollbar">
      <Provider store={appStore}>
        <ToastProvider>
          <RouterProvider router={appRoutes} />
        </ToastProvider>
      </Provider>
    </div>
  )
}

export default AppWrapper;