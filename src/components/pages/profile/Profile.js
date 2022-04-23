import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    axios
      .get("/api/user")
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return userData !== undefined ? (
    <div className="bg-gray-100 h-full block w-full">
      <nav className="block w-full p-4 shadow-sm bg-white">
        <div class="flex">
          <svg
            class="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <span class="font-semibold text-xl tracking-tight">My Account</span>
        </div>
      </nav>
      <div className="w-1/2 bg-white mt-5 ml-5 text-left px-5 pt-3 shadow-sm">
        <p className="text-lg font-semibold my-2 mb-5">User Details</p>
        <div className="my-3">
          <label htmlFor="name" className="block text-gray-500 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={userData.name}
            className="w-1/2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="my-3">
          <label htmlFor="name" className="block text-gray-500 mb-2">
            Email
          </label>
          <input
            type="email"
            value={userData.email}
            disabled
            className="w-1/2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mt-3">
          <label htmlFor="name" className="block text-gray-500 mb-2">
            Short Bio
          </label>
          <textarea className="w-3/4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <button class="btn btn-primary w-36 min-h-0 h-10 my-5">Save</button>
      </div>
    </div>
  ) : null;
}
