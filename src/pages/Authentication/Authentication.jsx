import { Card, Grid } from "@mui/material";
import React from "react";
import Login from "./Login";
import Registration from "./Registration";
import { Route, Routes } from "react-router-dom";

const Authentication = () => {
  return (
    <div>
      <Grid container className="full-width flex">
        <Grid className="hidden flex-[1.5] lg:block" item xs={7}>
          <img
            className=" w-[850px] h-[100vh] object-cover"
            src="assets/signin.png"
            alt="auth-cover-bg"
          />
        </Grid>
        <Grid item xs={5} className="flex-1 bg-bg-2 text-center grid place-items-center py-[50px]">
          <div className="max-w-[800px]">
            <Card className="card p-8">
              {/* <div className="flex flex-col  items-center mb-5 space-y-1">
                <h1 className="logo">ShutterSync</h1>
                <p className="text-left text-sm w-[70&]">A Community to Learn, Share, and Snap Brighter</p>
              </div> */}
              {/* <Login/> */}
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
              </Routes>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Authentication;
