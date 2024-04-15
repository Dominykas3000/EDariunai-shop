import { signIn, signOut, useSession } from "next-auth/react";

interface AuthButtonProps {
  inNav?: boolean;
  inSideMenu?: boolean;
}

const AuthButton = ({ inNav = false, inSideMenu = false }: AuthButtonProps) => {
  const { data: session } = useSession();

  let conditionalStyle = "";
  if (inNav) {
    conditionalStyle = "-m-2 block p-2 font-medium text-red-900";
  } else if (inSideMenu) {
    conditionalStyle = "text-sm font-medium text-red-500 hover:text-red-800";
  }

  // Combine baseStyle with conditionalStyle
  const buttonClass = `${conditionalStyle}`;

  return (
    <button
      className={buttonClass}
      onClick={() => session ? signOut() : signIn()}
    >
      {session ? "Sign out" : "Sign in"}
    </button>
  );
};

export default AuthButton;

//for styling reference, taken from current tailwind navbar

{/* <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
  Sign Up
</a>

 <a
 href="#"
 className="text-sm font-medium text-white hover:text-gray-100"
>
 Sign Up
</a> */}