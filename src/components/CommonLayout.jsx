// import { useEffect } from "react";
// import { Outlet, useLocation } from "react-router-dom";

// const CommonLayout = () => {
//     const location = useLocation();
//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, [location.pathname])
//     return (
//         <>
//             <Outlet />
//         </>
//     )
// }

// export default CommonLayout

import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const CommonLayout = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname, location.hash]);

  return <Outlet />;
};

export default CommonLayout;