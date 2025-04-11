import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import * as UserServices from "./services/UserSevice";
import { updateUser } from "./redux/slides/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/Loading/Loading";

const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const { storeData, decoded } = handleDecoded();
      if (decoded?.id) {
        await handleGetDetailsUser(decoded.id, storeData);
      }
      setIsLoading(false);
    };

    init();
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
        localStorage.setItem("access_token", JSON.stringify(data.access_token));
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
    setIsLoading(false);
  };

  return (
    <div>
      <BrowserRouter>
        <Loading isLoading={isLoading}>
          <Routes>
            {routes.map((route, index) => {
              const Page = route.page;
              const isCheckAuth = !route.isPrivate || user?.isAdmin;
              let Layout = React.Fragment;
              if (route.layout) {
                Layout = route.layout;
              }
              return (
                <Route
                  key={index}
                  path={isCheckAuth ? route.path : ""}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Loading>
      </BrowserRouter>
    </div>
  );
};

export default App;
