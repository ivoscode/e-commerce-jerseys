import { useSession } from "next-auth/client";
import { useContext } from "react";
import { Store } from "../../utils/Store";
export default function UserInfo() {
  const { dispatch } = useContext(Store);
  const [session] = useSession();

  return (
    <div className="flex flex-1 items-center justify-center md:justify-end space-x-6 text-gray-700 text-sm ">
      {session?.user.name}
      <img
        src={session?.user.image}
        className="rounded rounded-full h-8 ml-2"
      />
      <button
        className="text-sm font-medium border rounded-md p-1 cursor-pointer text-gray-700 hover:text-gray-800 hover:bg-gray-300"
        onClick={() => {
          dispatch({ type: "USER_LOGOUT" });
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
