"use client";
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { SlClose } from "react-icons/sl";
import { toast } from 'sonner';


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
      } else if (!/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9ĄČĘĖĮŠŲŪąčęėįšųū.\s]*$/.test(values.name)) {
        errors.name = 'Invalid name, it should contain 3-20 alphanumeric characters and be unique!';
      }
      if (!values.description) {
        errors.description = 'Required';
      } else if (!/^.{10,500}$/.test(values.description)) {
        errors.description = 'Invalid description, it should contain between 10 and 500 characters!';
      }
      return errors;
    },
    onSubmit: onSubmit
  });


  async function onSubmit() {
    const response = await fetch('/api/seller', {
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
      toast("Seller created successfully!");
      router.push('/');
    } else {
      toast("Failed to create seller, please try again later.");
      setErrorMessage(data.error);
    }

  }

  return (
    <form
      className="space-y-6"
      onSubmit={formik.handleSubmit}
    >
      <h5 className="dark:text-white text-xl font-medium text-gray-900 ">
        Complete this form:
      </h5>

      <div className="flex flex-col">
        <label
          htmlFor="name"
          className="dark:text-white block mb-2 text-base font-medium text-gray-900 ">
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
          className="dark:text-white block mb-2 text-base font-medium text-gray-900 ">
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
        className="w-full text-white bg-gray-900 hover:bg-gray-800  font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Start selling
      </button>

    </form>
  )
}

export default SellerForm