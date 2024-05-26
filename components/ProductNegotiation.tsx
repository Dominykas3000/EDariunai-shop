'use client';
import { useState } from "react";
import { useFormik } from 'formik';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  tags: string[];
  stock: number;
  image?: string;
  category: string;
  sellerId: Seller;
  salePrice?: number;
}

interface Seller {
  _id: string;
  creator: string;
  name: string;
  description: string;
}
interface ProductNegotiationProps {
  product: Product;
  userId: string | undefined;
}

const ProductNegotiation = ({ product, userId }: ProductNegotiationProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values: any) => {
    setSubmitting(true);

    const response = await fetch('/api/negotiation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        negotiator: userId,
        item: product._id,
        newPrice: formik.values.offerPrice,
        comment: formik.values.offerComment
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Offer submitted successfully');
      formik.resetForm();
      setSubmitting(false);
      handleCloseModal();

    } else {
      setSubmitting(false);
      console.error('Error submitting offer:', data);
    }
  };

  const formik = useFormik({
    initialValues: {
      offerPrice: '',
      offerComment: ''
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.offerPrice) {
        errors.offerPrice = 'Required';
      }

      if (!values.offerComment) {
        errors.offerComment = 'Required';
      }
      else if (values.offerComment.length < 10) {
        errors.offerComment = 'Comment should be at least 10 characters!';
      }
      return errors;
    },
    onSubmit: onSubmit
  });


  const handleOpenModal = () => {
    document.body.style.overflow = 'hidden';
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    document.body.style.overflow = 'auto';
    setIsModalOpen(false);
  };


  return (
    <>
      <button
        className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-base px-5 py-2.5 text-center"
        onClick={handleOpenModal}
      >
        Offer New Price
      </button>


      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-80 "
            onClick={handleCloseModal}
          ></div>
          <div
            className="relative  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mx-auto dark:bg-gray-800 z-10 w-96 "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <form onSubmit={formik.handleSubmit}>

              <div className="flex flex-col mb-4 pt-4">
                <label htmlFor="offerPrice" className="dark:text-white block mb-2 text-base font-medium text-gray-900 ">
                  New Price Offer
                </label>
                <input
                  type="number"
                  id="offerPrice"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 "
                  min="1"
                  step="0.01"
                  {...formik.getFieldProps('offerPrice')}
                />
                {
                  formik.errors.offerPrice && formik.touched.offerPrice ?
                    <div className='pt-3 text-red-500 text-sm'>{formik.errors.offerPrice}</div>
                    :
                    null
                }
              </div>

              <div className="fex flex-col mb-4 pt-4">
                <label htmlFor="offerComment" className="dark:text-white block mb-2 text-base font-medium text-gray-900 ">
                  Comment
                </label>
                <textarea
                  id="offerComment"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 "
                  rows={4}
                  cols={50}
                  {...formik.getFieldProps('offerComment')}
                ></textarea>
                {
                  formik.errors.offerComment && formik.touched.offerComment ?
                    <div className='pt-3 text-red-500 text-sm'>{formik.errors.offerComment}</div>
                    :
                    null
                }
              </div>

              <button
                disabled={submitting}
                type="submit"
                className="w-full text-white bg-gray-900 hover:bg-gray-800  font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-cyan-900"
              >
                Submit Offer
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductNegotiation