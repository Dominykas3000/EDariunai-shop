"use client";
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { SlClose } from "react-icons/sl";


const SellerForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(undefined);
  //@ts-ignore
  const sellerId = session?.user?.id;

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.name) {
        errors.name = 'Required';
      } 
      if (!values.description) {
        errors.description = 'Required';
      }
      return errors;
    },
    onSubmit: onSubmit
  });


  async function onSubmit(values: any) {
    const response = await fetch('/api/seller/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          creator: sellerId,
          name: formik.values.name,
          description: formik.values.description,
        }
      ),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Seller created successfully');
      router.push('/');
    } else {
      setErrorMessage(data.error);
    }

  }

  return (
    <form
      className="space-y-6"
      onSubmit={formik.handleSubmit}
    >
      <h5 className="text-xl font-medium text-gray-900 ">
        Complete this form:
      </h5>

      <div className="flex flex-col">
        <label
          htmlFor="name"
          className="block mb-2 text-base font-medium text-gray-900 ">
          Username:
        </label>
        <input type="text"
          id="name"
          autoComplete='off'
          placeholder="Seller123"
          required
          {...formik.getFieldProps('name')}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 "
        />
        {
          formik.errors.name && formik.touched.name ?
            <div className='pt-3 text-red-500 text-sm'>{formik.errors.name}</div>
            :
            null
        }
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="username"
          className="block mb-2 text-base font-medium text-gray-900 ">
          Description:
        </label>
        <textarea
          id="description"
          placeholder="Description"
          rows={4}
          cols={50}
          required
          {...formik.getFieldProps('description')}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 "
        />
        {
          formik.errors.description && formik.touched.description ?
            <div className='pt-3 text-red-500 text-sm'>{formik.errors.description}</div>
            :
            null
        }
      </div>

      {
        errorMessage ?
          <div className='text-red-500 text-m flex items-center gap-2'>
            <SlClose />
            {errorMessage}
          </div>
          :
          null
      }

      <button
        type="submit"
        className="w-full text-white bg-gray-900 hover:bg-gray-800  font-medium rounded-lg text-base px-5 py-2.5 text-center dark:gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800">
        Start selling
      </button>

    </form>
  )
}

export default SellerForm