import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";

const App = () => {
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
