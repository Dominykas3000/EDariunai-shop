/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

import Link from "next/link"

const CategoriesPage = () => {
  let categories = [
    {
      name: "Phones",
      image: "https://images.unsplash.com/photo-1587017234728-932c80f3e56f?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: 'all-items-page?category=Phones'

    },
    {
      name: "Shoes",
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1996&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: 'all-items-page?category=Shoes'

    },
    {
      name: "Jackets",
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: 'all-items-page?category=Jackets'
    },
    {
      name: "Shirts",
      image: "https://plus.unsplash.com/premium_photo-1678218594563-9fe0d16c6838?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: 'all-items-page?category=Shirts'
    },
    {
      name: "T-shirts",
      image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: 'all-items-page?category=T-shirts'
    },
    {
      name: "Hats",
      image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8SGF0c3xlbnwwfHwwfHx8MA%3D%3D",
      url: 'all-items-page?category=Hats'
    },
    {
      name: "Tech",
      image: "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: 'all-items-page?category=Tech'
    },
  ]


  return (
    <section className='w-full flex flex-col justify-center text-center'>
      <h1 className="text-4xl font-extrabold dark:text-white" >
        Choose a category you want to browse!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {categories.map((category, index) => (
          <Link key={index} href={category.url}>
            <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <img src={category.image} alt={category.name} className="w-48 h-48 object-cover rounded-full" />
              <h2 className="text-2xl font-bold dark:text-white">{category.name}</h2>
            </div>
          </Link>
        ))}
      </div>

    </section>
  )
}

export default CategoriesPage