import SellerSideBar from "@/components/SellerSideBar"


export default function SellerLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="w-full h-full flex flex-row">
        <SellerSideBar />
        {children}
      </div>
    )
  }