import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import SearchBar from "../search/SearchBar";
import AdminNavbar from "./AdminNavbar";
import CartInfo from "./CartInfo";
import UserInfo from "./UserInfo";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Navbar(props) {
  const [open, setOpen] = useState(false);
  const [navigation, setNavigation] = useState(null);

  const { data, error } = useSWR("/api/categories/get-categories", fetcher);

  useEffect(() => {
    if (data?.success === true) {
      console.log("data", data);
      const result = data.data.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 9);
        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []; // start a new chunk
        }
        resultArray[chunkIndex].push(item);
        return resultArray;
      }, []);

      setNavigation({
        ...navigation,
        categories: [
          {
            id: "categories",
            name: "Categories",
            featured: [
              {
                name: "New jerseys",
                href: "/product/category?category=new%20jerseys&name=New%20jerseys",
                imageSrc: "/ecommerce/p4si8raogdk5amblfnkh",
                imageAlt: "t-shirt new",
              },
              {
                name: "UK Premier League",
                href: "/product/category?category=uk%20premier%20legue&name=UK%20Premier%20League",
                imageSrc: "/ecommerce/ixglaufcjvsgczvwltlo",
                imageAlt: "premier t-shirt",
              },
            ],
            sections: [
              {
                id: "col1",
                name: "Col1",
                items: result[0],
              },
              {
                id: "col2",
                name: "Col2",
                items: result[1],
              },
              {
                id: "col3",
                name: "Col3",
                items: result[2],
              },
            ],
          },
        ],
        pages: [{ name: "Home", href: "/" }],
      });
    }
  }, [data]);

  if (navigation == null) {
    return null;
  }
  return (
    <div className="bg-white z-40 fixed w-full top-0">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden "
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              {/* ---close button----- */}
              <div className="px-4 mb-10 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="m-2 mb-8 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {/* ---user info and sign out----- */}
              <div className=" md:hidden border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <UserInfo />
                </div>
              </div>
              {/* ------Nav links-------- */}
              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a
                      href={page.href}
                      className="-m-2 p-2 block font-medium text-gray-900"
                    >
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>
              {/* ---------------category links ------------------*/}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex px-4 space-x-8">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? "text-indigo-600 border-indigo-600"
                              : "text-gray-900 border-transparent",
                            "flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {navigation.categories.map((category) => (
                    <Tab.Panel
                      key={category.name}
                      className="pt-10 pb-8 px-4 space-y-10 "
                    >
                      <div className="grid grid-cols-2 gap-x-4">
                        {category.featured.map((item) => (
                          <div
                            key={item.name}
                            className="group relative text-sm"
                          >
                            <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                              <Image
                                src={item.imageSrc}
                                alt={item.imageAlt}
                                layout="fill"
                                className="w-full h-full object-center object-cover"
                              />
                            </div>
                            <a
                              href={item.href}
                              className="mt-6 block font-medium text-gray-900"
                            >
                              <span
                                className="absolute z-10 inset-0"
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                            <p aria-hidden="true" className="mt-1">
                              Shop now
                            </p>
                          </div>
                        ))}
                      </div>
                      {/* -----categories------- */}
                      {category?.sections?.map((section) => (
                        <div key={section.name}>
                          {/* <p
                            id={`${category.id}-${section.id}-heading-mobile`}
                            className="font-medium text-gray-900"
                          >
                            {section.name}
                          </p> */}
                          <ul
                            role="list"
                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                            className=" flex flex-col space-y-6 -mt-4"
                          >
                            {section?.items?.map((item) => (
                              <li key={item.name} className="flow-root">
                                <a
                                  href={`/product/category?category=${item.value}&name=${item.name}`}
                                  className="-m-2 p-2 block text-gray-500"
                                >
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
      {/* ---------desktop version-------------- */}
      <header className="relative bg-white">
        <p className="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
          Get free delivery on orders over £100
        </p>

        <nav
          aria-label="Top"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center">
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              {/* <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Workflow</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
              </div> */}

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch  ">
                <div className="h-full flex space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute  top-full inset-x-0 text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow "
                                aria-hidden="true"
                              />

                              <div className="relative bg-white ">
                                <div className="max-w-7xl mx-auto px-8">
                                  <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-w-1 aspect-h-1 relative rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                            <Image
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              layout="fill"
                                              className="object-center object-cover"
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute z-10 inset-0"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                      {category?.sections?.map((section) => (
                                        <div key={section.name}>
                                          {/* <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900"
                                          >
                                            {section.name}
                                          </p> */}
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section?.items?.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex "
                                              >
                                                <a
                                                  className="hover:text-gray-800 hover:shadow-md "
                                                  href={`/product/category?category=${item.value}&name=${item.name}`}
                                                  // onClick={() => {
                                                  //   router.push(
                                                  //     `/product/category?category=${item.name}`
                                                  //   );
                                                  // }}
                                                >
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <Link href={page.href} key={page.name}>
                      <a className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                        {page.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </Popover.Group>
              <div className="ml-auto flex items-center">
                <div className="hidden xsm:block xsm:mr-8 ">
                  <SearchBar />
                </div>
                <div className="hidden md:block">
                  <UserInfo />
                </div>
                <CartInfo />
              </div>
            </div>
          </div>
        </nav>
        <div className="xsm:hidden mx-auto flex flex-col items-center">
          {/* <div className=" mt-4 ">
            <UserInfo />
          </div> */}
          <div className=" my-4 ">
            <SearchBar />
          </div>
        </div>
      </header>
      {props.isAdmin && <AdminNavbar />}
    </div>
  );
}
