function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import { useState } from "react";
export default function Tabs({ currentTab, setCurrentTab, handleFetchOrders }) {
  const [tabs, setTabs] = useState([
    { name: "Awaiting Approval" },
    { name: "Approved" },
    { name: "Fulfilled" },
    { name: "Rejected" },
  ]);
  return (
    <div className="  my-4 py-4 bg-white  md:my-10 sticky top-56 xsm:top-40 sm:top-36 z-20">
      <div className="sm:hidden  max-w-xs border rounded-md">
        <select
          id="tabs"
          name="tabs"
          value={currentTab}
          onChange={(e) => handleFetchOrders(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200 bg-gray-50 rounded-md px-4">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => {
                  handleFetchOrders(tab.name);
                }}
                className={classNames(
                  currentTab == tab.name
                    ? "border-indigo-500 text-indigo-600 text-lg"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                )}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
