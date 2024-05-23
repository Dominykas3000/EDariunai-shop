
export default function FormSection({ children }: any) {
  return (
    <div className="w-full max-w-[560px] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mx-auto dark:bg-gray-800 ">
      {children}
    </div>
  )
}

