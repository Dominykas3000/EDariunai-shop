"use client";

import FormSection from "@/components/FormSection";
import { UploadButton } from "@/utils/uploadthing";
import { useFormik } from 'formik';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddItem = () => {
  // const [name, setName] = useState("");
  // const [price, setPrice] = useState("");
  // const [description, setDescription] = useState("");
  // const [tags, setTags] = useState("");
  // const [stock, setStock] = useState("");
  // const [category, setCategory] = useState("");

  const [isPhotoUploaded, setisPhotoUploaded] = useState(false)
  const [photoLink, setPhotoLink] = useState("")
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      description: '',
      tags: '',
      stock: '',
      category: ''
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.name) {
        errors.name = 'Required';
      } else if (!/^.{3,}$/.test(values.name)) {
        errors.name = 'Invalid name, it should contain at least 3 characters!';
      }
      if (!values.price) {
        errors.price = 'Required';
      } else if (!/^\d+(\.\d{1,2})?$/.test(values.price.toString())) {
        errors.price = 'Invalid price, it should be a number!';
      }
      if (!values.description) {
        errors.description = 'Required';
      } else if (!/^.{10,}$/.test(values.description)) {
        errors.description = 'Invalid description, it should contain at least 10 characters!';
      }
      if (!values.tags) {
        errors.tags = 'Required';
      } else if (!/^.{3,}$/.test(values.tags)) {
        errors.tags = 'Invalid tags, it should contain at least 3 characters!';
      }
      if (!values.stock) {
        errors.stock = 'Required';
      } else if (!/^\d+$/.test(values.stock)) {
        errors.stock = 'Invalid stock, it should be a number!';
      }
      if (!values.category) {
        errors.category = 'Required';
      }

      return errors;
    },
    onSubmit: onSubmit,
  });

  const { data: session } = useSession();
  // console.log(session);

  async function onSubmit(values: any) {

    const response = await fetch('/api/item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...values,
        photoLink,
        sellerId: session?.user?.sellerId,
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Item added successfully');
      router.push('/seller/dashboard');
    } else {
      console.log(data.error);
    }

  }

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <h2 className="lg:text-3xl sm:text-2xl text-center pb-4">
        Add New Item!
      </h2>
      <FormSection>

        <form onSubmit={formik.handleSubmit}
          className="flex flex-col gap-3">

          <div className='flex flex-col'>
            <label
              htmlFor="name"
              className="block mb-2 text-base font-medium text-gray-900 ">
              Product Name:
            </label>
            <input
              // onChange={(e) => setName(e.target.value)}
              // value={name}
              {...formik.getFieldProps('name')}
              id="product-name"
              placeholder="Item Name"
              autoComplete='off'
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 "
              type="text"
            />
            {
              formik.errors.name && formik.touched.name ?
                <div className='pt-3 text-red-500 text-sm'>{formik.errors.name}</div>
                :
                null
            }
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor="price"
              className="block mb-2 text-base font-medium text-gray-900 ">
              Price:
            </label>
            <input
              // onChange={(e) => setPrice(e.target.value)}
              // value={price}
              {...formik.getFieldProps('price')}
              id="price"
              type="Number"
              placeholder="33 Euro"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 "
            />
            {
              formik.errors.price && formik.touched.price ?
                <div className='pt-3 text-red-500 text-sm'>{formik.errors.price}</div>
                :
                null
            }
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor="Description"
              className="block mb-2 text-base font-medium text-gray-900 ">
              Description:
            </label>
            <textarea
              // onChange={(e) => setDescription(e.target.value)}
              // value={description}
              {...formik.getFieldProps('description')}
              id="Description"
              placeholder="Item Description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 "
            />
            {
              formik.errors.description && formik.touched.description ?
                <div className='pt-3 text-red-500 text-sm'>{formik.errors.description}</div>
                :
                null
            }
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor="tags"
              className="block mb-2 text-base font-medium text-gray-900 ">
              Tags:
            </label>
            <input
              // onChange={(e) => setTags(e.target.value)}
              // value={tags}
              {...formik.getFieldProps('tags')}
              id="tags"
              type="text"
              placeholder="Tags"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 "
            />
            {
              formik.errors.tags && formik.touched.tags ?
                <div className='pt-3 text-red-500 text-sm'>{formik.errors.tags}</div>
                :
                null
            }
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor="stock"
              className="block mb-2 text-base font-medium text-gray-900 ">
              Stock:
            </label>
            <input
              {...formik.getFieldProps('stock')}
              // onChange={(e) => setStock(e.target.value)}
              // value={stock}
              id="stock"
              type="number"
              placeholder="15"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 "
            />
            {
              formik.errors.stock && formik.touched.stock ?
                <div className='pt-3 text-red-500 text-sm'>{formik.errors.stock}</div>
                :
                null
            }
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="block mb-2 text-base font-medium text-gray-900 ">
              Category:
            </label>
            <select
              {...formik.getFieldProps('category')}
              id="category"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400"
            >
              <option value="">Select a category</option>
              <option value="Phones">Phones</option>
              <option value="Shoes">Shoes</option>
              <option value="Jackets">Jackets</option>
              <option value="Shirts">Shirts</option>
              <option value="T-shirts">T-shirts</option>
              <option value="Something More">Hats</option>
              <option value="Something More">Tech</option>
            </select>
            {
              formik.errors.category && formik.touched.category ? (
                <div className='pt-3 text-red-500 text-sm'>
                  {formik.errors.category}
                </div>
              ) : null
            }
          </div>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              //console.log("Files: \n", res[0].url);
              alert("Upload Completed");
              setPhotoLink(res[0].url)

            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
          <button
            type="submit"
            className="w-full text-white bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800">
            Add Item
          </button>
        </form >
      </FormSection>
    </div>
  );
};

export default AddItem;
