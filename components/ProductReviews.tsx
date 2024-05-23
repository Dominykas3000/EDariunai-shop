"use client";

import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FormSection from './FormSection';
import { toast } from 'sonner';

const ProductReviews = (props: any) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [existingReview, setExistingReview] = useState(null);

  const itemId = props.props;

  useEffect(() => {
    async function fetchReview() {
      const response = await fetch(`/api/item-review?userId=${session?.user?.id}&itemId=${itemId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.review) {
          setExistingReview(data.review);
          formik.setValues({
            rating: data.review.rating,
            review: data.review.review,
          });
        }
      }
    }

    if (session?.user?.id && itemId) {
      fetchReview();
    }
  }, [session?.user?.id, itemId]);

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
    const method = existingReview ? 'PUT' : 'POST';
    const response = await fetch('/api/item-review', {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          userId: session?.user?.id,
          itemId: itemId,
          rating: formik.values.rating,
          review: formik.values.review,
        }
      ),
    });

    if (response.ok) {
      toast('Review submitted successfully');
      router.push('/');
    }
  }

  let submitForm = (
    <div className='w-full flex flex-col'>
      {/* <h1>Write your own Review!</h1> */}
      <FormSection className='mx-auto'>

        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto"
        >
          <div className="w-full flex flex-col  justify-start gap-3  items-start mb-2">
            <div className="w-full flex flex-col">
              <label htmlFor="rating">Rating:</label>
              <select
                id="rating"
                name="rating"
                onChange={formik.handleChange}
                value={formik.values.rating}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {formik.errors.rating ? <div className='pt-3 text-red-500 text-sm'>{formik.errors.rating}</div> : null}
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="review">Review:</label>
              <textarea
                id="review"
                name="review"
                onChange={formik.handleChange}
                value={formik.values.review}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {formik.errors.review ? <div className='pt-3 text-red-500 text-sm'>{formik.errors.review}</div> : null}
            </div>
          </div>
          {
            session?.user ? (
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full mt-3 text-white bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            )
              :
              (
                <div className="text-red-500">Please login to submit a review</div>
              )
          }
        </form>
      </FormSection>
    </div>
  )

  if (session?.user)
    return submitForm;
  else
    return <div className="text-red-500">Please login to submit a review</div>
}

export default ProductReviews;
