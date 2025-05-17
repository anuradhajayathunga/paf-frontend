// import { Grid } from "@mui/material";
// import React from "react";
// import Login from "./Login";
// import Registration from "./Registration";

// const Authentication = ({ page }) => {
//   return (
//     <Grid container className="full-width">
//       <Grid className="hidden flex-[1.5] lg:block" item xs={7}>
//         <img
//           className="w-full h-[91vh] object-cover"
//           src="/assets/auth.png"
//           alt="auth-cover-bg"
//         />
//       </Grid>
//       <Grid
//         item
//         xs={5}
//         className="flex-1 bg-bg-2 text-center grid place-items-center py-[50px]"
//       >
//         <div className="max-w-[800px]">
//           {page === "login" ? <Login /> : <Registration />}
//         </div>
//       </Grid>
//     </Grid>
//   );
// };

// export default Authentication;

import { Grid } from "@mui/material";
import React from "react";
import Login from "./Login";
import Registration from "./Registration";

const Authentication = ({ page }) => {
  return (
    <Grid container className="relative w-ful">
      {/* Full-screen background image */}
      
      {page === "login" ? <img
        className="w-full h-[91vh] object-cover  top-0 left-0 "
        src="/assets/signin.png"
        alt="auth-cover-bg"
      /> : <img
        className="w-full h-[91vh] object-cover  top-0 left-0 "
        src="/assets/signup.png"
        alt="auth-cover-bg"
      />}

      {/* Overlay for better visibility of the form */}
      {/* <div className="absolute top-0 right-0 w-full md:w-1/2 lg:w-2/5 h-full bg-black/30 backdrop-blur-sm z-10" /> */}

      {/* Login/Registration form positioned on the right side */}
      <Grid
        item
        xs={5}
        className="absolute bg-bg-2  place-items-center py-[50px] right-0 w-full md:w-1/2 lg:w-2/5  flex items-center justify-center z-20"
      >
        <div className="max-w-[800px]">
          {page === "login" ? <Login /> : <Registration />}
        </div>
      </Grid>
    </Grid>
  );
};

export default Authentication;
