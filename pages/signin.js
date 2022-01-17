import { getProviders, getSession, signIn } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";

//Data for testing purposes only
const data = {
  email: "ilegzdins@yahoo.com",
  isAdmin: true,
  name: "Test User",
  profileImage:
    "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10159224341674807&height=50&width=50&ext=1645009279&hash=AeTsuhb8CqMdt2i-5iI",
  status: "allowed",
  _id: "61769495379ff44fb3eca944",
};

export default function SignIn({ providers }) {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-gray-50 py-12 px-4 ">
      <div className="flex-1 flex items-center ">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              disabled
              className=" flex items-center bg-fb text-white p-3 rounded-lg font-semibold text-lg"
              onClick={() => signIn(provider.id)}
            >
              <img
                src="/images/fbooklogo.png"
                alt="FB logo"
                className="w-8 h-8 mr-2"
              />
              <span> Login with {provider.name}</span>
            </button>
            <div>
              <button
                className="bg-pink-400 mt-10 py-3 rounded text-center w-full "
                onClick={() => {
                  sessionStorage.setItem(`userSession`, JSON.stringify(data));
                  router.push("/");
                }}
              >
                TEST
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link href="/privacy">
        <a className="">Privacy Policy</a>
      </Link>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }
  const providers = await getProviders();

  return {
    props: { providers },
  };
}
