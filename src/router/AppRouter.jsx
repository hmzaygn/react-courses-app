import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import Dashboard from "../pages/Dashboard";
import Courses from "../pages/Courses";
import Students from "../pages/Students";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"register"} element={<Register />} />

        <Route path="courses" element={<PrivateRouter />}>
          <Route path="" element={<Dashboard />}>
            <Route index element={<Courses />} />
            <Route path={"students"} element={<Students />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
