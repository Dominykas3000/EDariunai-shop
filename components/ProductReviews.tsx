"use client";

import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

const ProductReviews = (props: any) => {
  const router = useRouter();
  const { data: session } = useSession();

  const formik = useFormik({
    initialValues: {
      rating: 0,
      review: '',
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.rating) {
        errors.rating = 'Required';
      }
      if (!values.review) {
        errors.review = 'Required';
      }
      return errors;
    },
    onSubmit: onSubmit
  });

  async function onSubmit() {
    const response = await fetch('/api/item-review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          userId: session?.user?.id,
          itemId: props.props,
          rating: formik.values.rating,
          review: formik.values.review,
        }
      ),
    });


    if (response.ok) {
      toast('Review created successfully');
      router.push('/');
    }
  }


  return (
    <div className='w-full flex flex-col'>
      <h1>write your own Review !</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full "
      >
        <div className=" w-full flex flex-row gap- justify-start gap-3  items-start mb-2">
          <div className="w-1/3 flex flex-col">
            <label htmlFor="rating">Rating:</label>
            <select
              id="rating"
              name="rating"
              onChange={formik.handleChange}
              value={formik.values.rating}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            {formik.errors.rating ? <div className='pt-3 text-red-500 text-sm'>{formik.errors.rating}</div> : null}
          </div>
          <div className="w-1/2 flex flex-col">
            <label htmlFor="review">Review:</label>
            <textarea
              id="review"
              name="review"
              onChange={formik.handleChange}
              value={formik.values.review}
              className="border border-gray-300 rounded-md"
            />
            {formik.errors.review ? <div className='pt-3 text-red-500 text-sm'>{formik.errors.review}</div> : null}
          </div>
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-blue-500 text-white p-2 rounded-md">
          Submit
        </button>
      </form>

    </div>
  )
}

export default ProductReviews