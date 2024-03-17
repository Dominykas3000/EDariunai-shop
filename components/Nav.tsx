import { LiaShoppingBagSolid } from "react-icons/lia";

const Nav = () => {
  return (
    <nav className=" bg-zinc-800 fixed w-full z-20 top-0 start-0 border-b border-gray-200 ">
      <div className="max-w-screen-xl lg:px-24 flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <LiaShoppingBagSolid className="text-4xl" />
          <span className="font-semibold text-2xl">Edariunai</span>
        </div>

        <div className="flex justify-center">
          <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-zinc-800 hover:bg-white ">Login</a>
        </div>

      </div>
    </nav>


  )
}

export default Nav