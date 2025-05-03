import { Grid } from "@mui/material";
import React from "react";
import Login from "./Login";
import Registration from "./Registration";

const Authentication = ({ page }) => {
  return (
    <Grid container className="full-width">
      <Grid className="hidden flex-[1.5] lg:block" item xs={7}>
        <img
          className="w-[800px] h-[100vh] object-cover"
          src="/assets/signin.png"
          alt="auth-cover-bg"
        />
      </Grid>
      <Grid
        item
        xs={5}
        className="flex-1 bg-bg-2 text-center grid place-items-center py-[50px]"
      >
        <div className="max-w-[800px]">
          {page === "login" ? <Login /> : <Registration />}
        </div>
      </Grid>
    </Grid>
  );
};

export default Authentication;
