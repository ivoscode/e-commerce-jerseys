import axios from "axios";
import { getSession, signIn } from "next-auth/client";
import { useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";

export default function Layout(props) {
  const [user, setUser] = useState(null);

  const checkUser = async (e) => {
    try {
      const { data } = await axios.post("/api/users/check", {
        email: e?.user?.email,
        profileImage: e?.user?.image,
        name: e?.user?.name,
      });
      setUser(data);

      if (data?.status == "allowed") {
        sessionStorage.setItem(`userSession`, JSON.stringify(data));
      }
    } catch (err) {
      console.log(err.response?.data ? err.response.data.message : err.message);
    }
  };

  useEffect(() => {
    if (JSON.parse(window.sessionStorage.getItem("userSession"))) {
      setUser(JSON.parse(window.sessionStorage.getItem("userSession")));

      return null;
    }
    getSession().then((session) => {
      if (!session) {
        signIn();
      } else if (session) {
        console.log("we have session,checking user now", session);
        checkUser(session);
      }
    });
  }, []);

  if (user?.status == "pending") {
    return (
      <div className=" w-full  h-full min-h-screen  flex justify-center items-center bg-main-bg-color">
        Pending for approval
      </div>
    );
  }
  // Main view
  if (user?.status == "allowed") {
    return (
      <div className=" w-full  h-full min-h-screen  flex flex-col bg-main-bg-color mt-20">
        <Navbar isAdmin={user?.isAdmin} />
        <main className="  mx-auto w-full max-w-8xl  pt-20 px-3 sm:px-6 lg:px-8   text-main-text-color  ">
          {props.children}
        </main>
      </div>
    );
  } else {
    return null;
  }
}
