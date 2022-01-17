import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function OrderCompleteScreen() {
  const [seconds, setSeconds] = useState(6);
  const router = useRouter();
  useEffect(() => {
    if (seconds > 0) {
      const myTimeout = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      router.push("/");
    }
  }, [seconds]);

  return (
    <div className="  flex mt-20 flex-col justify-center items-center">
      <h1 className="text-4xl mb-10">Thank you.</h1>
      <p>Your order was completed unsuccessfully</p>
      <div className="mt-5">Redirect in {seconds} s</div>
      <div className="dot-rolling h-10"></div>
      <div className="text-blue-500 cursor-pointer mt-5">
        <Link href="/">
          <a> Home</a>
        </Link>
      </div>
    </div>
  );
}
