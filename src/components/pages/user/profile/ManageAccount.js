import axios from "axios";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import Loading from "../../Loading";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountSetting from "./AccountSetting";
import UpdatePassword from "./UpdatePassword";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6366F1",
    },
  },
});

export default function ManageAccount() {
  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(true);

  const [value, setValue] = React.useState("account-setting");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios
      .get("api/user")
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response);
      });
  }, []);

  const pages = {
    "account-setting": <AccountSetting user={user} />,
    "update-password": <UpdatePassword />,
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="w-full bg-white h-screen">
      <div className="bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-500 h-56"></div>
      <div class="grid grid-cols-3 gap-3 w-full px-7 transform -translate-y-20">
        <div className="p-4 bg-white text-left border rounded">
          <div className="justify-center flex">
            <img
              src={process.env.REACT_APP_IMAGE_URL + user.profileImage}
              alt=""
              className="hover:opacity-90 mask mask-circle h-36"
            />
          </div>
          <p className="text-center font-bold mt-4">{user.name}</p>
          <p className="text-center mt-3">
            Joined on <Moment format="YYYY/MM/DD">{user.created_at}</Moment>
          </p>
        </div>
        <div className="bg-white col-span-2 border rounded">
          <ThemeProvider theme={theme}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor={theme.primary}
              indicatorColor={theme.primary}
              aria-label="secondary ta bs example"
            >
              <Tab value="account-setting" label="Account Setting" />
              <Tab value="billing" label="Billing" />
              <Tab value="update-password" label="Update Password" />
            </Tabs>
          </ThemeProvider>

          {pages[value]}
        </div>
      </div>
    </div>
  );
}
