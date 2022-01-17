import axios from "axios";
import { useEffect, useState } from "react";
export default function UsersListScreen() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (e) => {
    try {
      const { data } = await axios.get("/api/users/userlist");
      setUsers(data);
      console.log("users from api", data);
    } catch (err) {
      console.log(err.response?.data ? err.response.data.message : err.message);
    }
  };

  const updateUser = async (id, body) => {
    try {
      const { data } = await axios.post(`/api/users/update?_id=${id}`, body);
      setUsers(data);
      console.log(" updated users from api", data);
    } catch (err) {
      console.log(err.response);
    }
  };

  if (users == null) {
    return null;
  }
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:pb-24 lg:px-8 bg-white overflow-x-auto">
      <div className="max-w-xl">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Users
        </h1>
      </div>

      <table className="w-full ">
        {/* ----headings----- */}
        <thead className=" text-sm text-gray-500 text-left ">
          <tr>
            <th className="w-1/5  pr-8 py-3 font-normal">Image</th>
            <th className=" w-1/5 pr-8 py-3 font-normal sm:table-cell">Name</th>
            <th className=" pr-8 py-3 font-normal ">Email</th>
            <th className=" pr-8 py-3 font-normal ">Access</th>
            <th className=" pr-8 py-3 font-normal ">Admin</th>
          </tr>
        </thead>
        {/* -----body------ */}
        <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
          {users.map((user) => (
            <tr key={user._id} className="">
              <td>
                <img src={user.profileImage}></img>
              </td>

              <td>{user.name}</td>
              <td>{user.email}</td>
              {/* -------- */}
              <td>
                <select
                  value={user.status}
                  onChange={(e) =>
                    updateUser(user._id, { status: e.target.value })
                  }
                  className="block max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value={"allowed"}>allowed</option>
                  <option value={"pending"}>pending</option>
                  <option value={"blocked"}>blocked</option>
                </select>
              </td>
              {/* -------- */}

              <td>
                <select
                  value={user.isAdmin}
                  onChange={(e) =>
                    updateUser(user._id, { isAdmin: e.target.value })
                  }
                  className="block max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value={true}>true</option>
                  <option value={false}>false</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
