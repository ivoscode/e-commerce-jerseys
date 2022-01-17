import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
const navigation = [
  { name: "Users", href: "/admin/users-list" },
  { name: "Orders", href: "/admin/orders-list" },
  { name: "Add Product", href: "/admin/add-product" },
  { name: "Orders Summary", href: "/admin/orders-approved" },
  { name: "Add Product All", href: "/admin/add-product-all" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminNavbar() {
  return (
    <Disclosure as="nav" className="bg-gray-700 sticky top-44  xsm:top-24">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {/* ------nav items----- */}
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-end">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.name}>
                        <a
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-white hover:bg-gray-800 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

// import Link from "next/link";
// import { useState } from "react";
// export default function AdminNavbar() {
//   const [tabs, setTabs] = useState([
//     { name: "Users", href: "/admin/users-list" },
//     { name: "Orders", href: "/admin/orders-list" },
//     { name: "Add Product", href: "/admin/add-product" },
//     { name: "Orders Summary", href: "/admin/orders-approved" },
//   ]);
//   return (
//     <div className="bg-gray-300  justify-evenly sticky   top-44 xsm:top-24 w-full  py-2 z-40">
//       <ul className="  sm:grid sm:grid-cols-2  md:grid-col-3 lg:grid-cols-4 lg:gap-10 max-w-7xl mx-auto  ">
//         {tabs.map((tab) => {
//           return (
//             <li
//               key={tab.name}
//               className="mx-2 my-2 border border-gray-400 rounded-md flex items-center justify-center text-center p-0.5"
//             >
//               <Link href={tab.href}>
//                 <a>{tab.name}</a>
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }
