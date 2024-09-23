import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
function Header() {
  const { data: session } = useSession();
  const { pathname } = useRouter();

  if (session) {
    return (
      <>
        <ul className="flex items-center  py-4 px-4 bg-gray-800 ">
          <li className="mr-6">
            <Link
              className={
                pathname === "/home" || pathname === "/"
                  ? "text-white text-2xl"
                  : "text-gray-400 hover:text-blue-800 text-2xl"
              }
              href="/home"
            >
              Home
            </Link>
          </li>
          <li className="mr-6">
            <Link
              className={
                pathname === "/toprated"
                  ? "text-white text-2xl"
                  : "text-gray-400 hover:text-blue-800 text-2xl"
              }
              href="/toprated"
            >
              Top Rated
            </Link>
          </li>
          <li className="mr-6">
            <Link
              className={
                pathname === "/upcoming"
                  ? "text-white text-2xl"
                  : "text-gray-400 hover:text-blue-800 text-2xl"
              }
              href="/upcoming"
            >
              Up Coming
            </Link>
          </li>
          <li className="mr-6">
            <Link
              className={
                pathname === "/search"
                  ? "text-white text-2xl"
                  : "text-gray-400 hover:text-blue-800 text-2xl"
              }
              href="/search"
            >
              Search
            </Link>
          </li>
          <li className="mr-6">
            <Link
              className="text-gray-400 hover:text-blue-800 text-2xl"
              href="/api/auth/signout"
            >
              Sign Out
            </Link>
          </li>
        </ul>
      </>
    );
  } else {
    return (
      <>
        <ul className="flex items-center  py-4 px-4 bg-gray-800 ">
          <li className="mr-6">
            <Link
              className={
                pathname === "/home" || pathname === "/"
                  ? "text-white text-2xl"
                  : "text-gray-400 hover:text-blue-800 text-2xl"
              }
              href="/home"
            >
              Home
            </Link>
          </li>
          <li className="mr-6">
            <Link
              className="text-gray-400 hover:text-blue-800 text-2xl"
              href="/api/auth/signin"
            >
              Sign In
            </Link>
          </li>
        </ul>
      </>
    );
  }
}

export default Header;
