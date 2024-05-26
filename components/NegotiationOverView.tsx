'use client';
import { useState } from "react";

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
  negotiations: any[];
}

interface Seller {
  _id: string;
  creator: string;
  name: string;
  description: string;
}

interface ProductNegotiationProps {
  product: Product;
}

const NegotiationOverView = ({ product }: ProductNegotiationProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [negotiations, setNegotiations] = useState(product.negotiations);
  const [submitting, setSubmitting] = useState(false);

  const handleResponse = async (negotiationId: string, action: string) => {
    setSubmitting(true);
    const response = await fetch('/api/negotiation-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ negotiationId, action }),
    });

    const data = await response.json();
    setSubmitting(false);

    if (response.ok) {
      // Filter out the negotiation that was accepted or declined
      const updatedNegotiations = negotiations.filter(n => n._id !== negotiationId);
      setNegotiations(updatedNegotiations);
    } else {
      console.error(`Error: ${data.message}`);
    }
  };

  const handleOpenModal = () => {
    document.body.style.overflow = 'hidden';
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    document.body.style.overflow = 'auto';
    setIsModalOpen(false);
  };

  const handleAcceptClick = (negotiationId: string) => {
    const confirmed = window.confirm("Are you sure you want to accept this offer?");
    if (confirmed) {
      handleResponse(negotiationId, 'accept');
    }
  };

  const handleRejectClick = (negotiationId: string) => {
    const confirmed = window.confirm("Are you sure you want to reject this offer?");
    if (confirmed) {
      handleResponse(negotiationId, 'decline');
    }
  };

  return (
    <>
      <button
        className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-base px-5 py-2.5 text-center"
        onClick={handleOpenModal}
      >
        View Negotiations
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
            className="relative  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mx-auto dark:bg-gray-800 z-10 w-9/12 "
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
            <h1 className="text-bold text-2xl ">Negotiation Requests: </h1>

            <div className="overflow-auto max-h-[550px] pr-5  mt-4">
              {negotiations.map((negotiation) => (
                <div
                  key={negotiation._id}
                  className="p-4 border border-slate-300 my-3 flex justify-between gap-5"
                >
                  <div className="flex  flex-col gap-2">
                    <h2 className="font-bold text-2xl">
                      {negotiation.negotiator.username}
                    </h2>
                    <div>
                      <b>Price: </b>{negotiation.newPrice} €
                    </div>
                    <div>
                      <b>Message: </b> {negotiation.comment}
                    </div>
                  </div>

                  <div className="flex  gap-2 items-center">
                    <button
                      className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-base px-5 py-2.5 text-center"
                      onClick={() => handleAcceptClick(negotiation._id)}
                      disabled={submitting}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectClick(negotiation._id)}
                      className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-base px-5 py-2.5 text-center"
                      disabled={submitting}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
              {
                negotiations.length === 0 && (
                  <h1 className="text-2xl text-bold w-full text-center">All Done! no more negotiations are Available !</h1>
                )
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NegotiationOverView;
