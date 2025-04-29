import { Card, Grid } from "@mui/material";
import React from "react";
import Login from "./Login";
import Registration from "./Registration";

const Authentication = () => {
  return (
    <div>
      <Grid container className="flex items-center justify-between">
        <Grid className="h-screen overflow-hidden flex-1" item xs={7}>
          <img className="h-full w-full " src="assets/signin.png" />
        </Grid>
        <Grid item xs={5} className="flex-1.2">
          <div className="p-20 flex flex-col justify-center h-full">
            <Card className="card p-8">
              {/* <div className="flex flex-col  items-center mb-5 space-y-1">
                <h1 className="logo">ShutterSync</h1>
                <p className="text-left text-sm w-[70&]">A Community to Learn, Share, and Snap Brighter</p>
              </div> */}
              {/* <Login/> */}
              <Registration/>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Authentication;
