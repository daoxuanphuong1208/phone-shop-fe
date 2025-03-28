import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import * as UserServices from "./services/UserSevice";
import { updateUser } from "./redux/slides/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { storeData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storeData);
    }
  }, []);

  const handleDecoded = () => {
    let storeData = localStorage.getItem("access_token");
    let decoded = {};
    if (storeData && isJsonString(storeData)) {
      storeData = JSON.parse(storeData);
      decoded = jwtDecode(storeData);
    }

    return { decoded, storeData };
  };

  UserServices.axiosJWT.interceptors.request.use(
    async (config) => {
      const { decoded } = handleDecoded();
      const currentTime = new Date().getTime() / 1000;
      if (decoded?.exp < currentTime) {
        const data = await UserServices.refreshToken();
        config.headers["token"] = `Bearer ${data.access_token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserServices.getDetailsUser(id, token);
    dispatch(
      updateUser({
        ...res?.data,
        access_token: token,
      })
    );
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => {
            const Page = route.page;
            let Layout = React.Fragment;
            if (route.layout) {
              Layout = route.layout;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
