import { CssBaseline } from "@mui/material";
import "nepali-datepicker-reactjs/dist/index.css";
import { Suspense, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { useDispatch } from "react-redux";
import { authSuccess } from "./apis/authApi";
import SidebarRoutes from "./routes/SidebarRoutes";
import { getToken } from "./utils/features";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomLoader from "./components/common/CustomLoader/CustomLoader";
import ErrorBoundary from "./utils/ErrorBoundary";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authSuccess(getToken()));
  }, []);

  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<CustomLoader />}>
          <CssBaseline />
          <SidebarRoutes />
          <ToastContainer position="bottom-right" />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
