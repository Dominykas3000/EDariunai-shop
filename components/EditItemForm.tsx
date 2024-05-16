"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import { toast } from "sonner";

const EditItemForm = ({
  id,
  name,
  price,
  description,
  tags,
  stock,
  category,
  image,
}: {
  id: string;
  name: string;
  price: number;
  description: string;
  tags: string[];
  stock: number;
  category: string;
  image?: string;
}) => {

  const [sending, setSending] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      newName: name,
      newPrice: price,
      newDescription: description,
      newTags: tags.join(' '),
      newStock: stock,
      newCategory: category,
      image: '',
      salePrice: 0,
      newStartDate: '',
      newEndDate: ''
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.newName) {
        errors.newName = 'Required';
      } else if (!/^.{3,75}$/.test(values.newName)) {
        errors.newName = 'Invalid name, it should contain at least 3 characters and no more than 75!';
      }
      if (!values.newPrice) {
        errors.newPrice = 'Required';
      } else if (!/^\d+(\.\d{1,2})?$/.test(values.newPrice.toString())) {
        errors.newPrice = 'Invalid price, it should be a number!';
      }
      if (!values.newDescription) {
        errors.newDescription = 'Required';
      } else if (!/^.{10,500}$/.test(values.newDescription)) {
        errors.newDescription = 'Invalid description, it should contain between 10 and 500 characters!';
      }
      if (!values.newTags) {
        errors.newTags = 'Required';
      } else if (!/^.{3,}$/.test(values.newTags)) {
        errors.newTags = 'Invalid tags, it should contain at least 3 characters!';
      }
      if (!values.newStock) {
        errors.newStock = 'Required';
      } else if (!/^\d+$/.test(values.newStock.toString())) {
        errors.newStock = 'Invalid stock, it should be a number!';
      }
      if (!values.newCategory) {
        errors.newCategory = 'Required';
      }


      return errors;
    },
    onSubmit: onSubmit,
  });


  console.log(formik.values.newTags);

  async function onSubmit(values: any) {
    try {

      setSending(true);

      const res = await fetch(`/api/item`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          itemId: id,
          newName: values.newName,
          newPrice: values.newPrice,
          newDescription: values.newDescription,
          newTags: values.newTags.split(' '),
          newStock: values.newStock,
          image,
          salePrice: values.salePrice,
          newStartDate: values.newStartDate,
          newEndDate: values.newEndDate,
          newCategory: values.newCategory,
        }),
      });

      if (!res.ok) {
        setSending(false);
        throw new Error("Failed to update topic");
        toast("Failed to update item");
      }

      router.refresh();
      setSending(false);
      router.push("/seller/dashboard");
      toast("Item updated successfully!");
    } catch (error) {
      setSending(false);
      console.log(error);
      toast("Failed to update item");
    }
  };

  let inputClassName = 'bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 '

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">

      <div className='flex flex-col'>
        <label
          htmlFor="name"
          className="block mb-2 text-base font-medium text-gray-900 ">
          Update Product Name:
        </label>
        <input
          // onChange={(e) => setNewName(e.target.value)}
          // value={newName}
          {...formik.getFieldProps('newName')}
          type="text"
          id="product-name"
          placeholder="Item Name"
          className={inputClassName}
        />
        {
          formik.errors.newName && formik.touched.newName ?
            <div className='pt-3 text-red-500 text-sm'>{formik.errors.newName}</div>
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
          // onChange={(e) => setNewPrice(Number(e.target.value))}
          // value={newPrice}
          {...formik.getFieldProps('newPrice')}
          type="number"
          id="price"
          placeholder="Item Price (in Eur)"
          className={inputClassName}
        />
        {
          formik.errors.newPrice && formik.touched.newPrice ?
            <div className='pt-3 text-red-500 text-sm'>{formik.errors.newPrice}</div>
            :
            null
        }
      </div>
      <div className='flex flex-col'>
        <label
          htmlFor="Description"
          className="block mb-2 text-base font-medium text-gray-900 ">
          Update Description:
        </label>
        <textarea
          // onChange={(e) => setNewDescription(e.target.value)}
          // value={newDescription}
          {...formik.getFieldProps('newDescription')}
          id="Description"
          placeholder="Item Description"
          className={inputClassName}
        />
        {
          formik.errors.newDescription && formik.touched.newDescription ?
            <div className='pt-3 text-red-500 text-sm'>{formik.errors.newDescription}</div>
            :
            null
        }
      </div>
      <div className='flex flex-col'>
        <label
          htmlFor="tags"
          className="block mb-2 text-base font-medium text-gray-900 ">
          Update Tags:
        </label>
        <input
          // onChange={(e) => setNewTags([e.target.value])}
          // value={newTags}
          {...formik.getFieldProps('newTags')}
          id="tags"
          type="text"
          placeholder="Tags"
          className={inputClassName}
        />
        {
          formik.errors.newTags && formik.touched.newTags ?
            <div className='pt-3 text-red-500 text-sm'>{formik.errors.newTags}</div>
            :
            null
        }
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="stock"
          className="block mb-2 text-base font-medium text-gray-900 ">
          Update Stock:
        </label>
        <input
          // onChange={(e) => setNewStock(Number(e.target.value))}
          // value={newStock}
          {...formik.getFieldProps('newStock')}
          id="stock"
          type="number"
          placeholder="15"
          className={inputClassName}
        />
        {
          formik.errors.newStock && formik.touched.newStock ?
            <div className='pt-3 text-red-500 text-sm'>{formik.errors.newStock}</div>
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
          {...formik.getFieldProps('newCategory')}
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
          <option value="Hats">Hats</option>
          <option value="Tech">Tech</option>
        </select>
        {
          formik.errors.newCategory && formik.touched.newCategory ? (
            <div className='pt-3 text-red-500 text-sm'>
              {formik.errors.newCategory}
            </div>
          ) : null
        }
      </div>
      {/* <div className="flex flex-col">
        <label
          htmlFor="stock"
          className="block mb-2 text-base font-medium text-gray-900 ">
          Update Image URL:
        </label>
        <input
          // onChange={(e) => setNewImage(e.target.value)}
          // value={newImage}
          {...formik.getFieldProps('image')}
          className={inputClassName}
          type="text"
          placeholder="Image URL"
        />
      </div> */}
      <div className="flex flex-col">
        <label className="block mb-2 text-base font-medium text-gray-900 ">
          Sale Price:
        </label>
        <input
          // onChange={(e) => setSalePrice(Number(e.target.value))}
          // value={salePrice}
          {...formik.getFieldProps('salePrice')}
          className={inputClassName}
          type="number"
          placeholder="Sale Price"
        />
      </div>
      <div className="flex flex-col">
        <label className="block mb-2 text-base font-medium text-gray-900 ">
          Sale Start Date:
        </label>
        <input
          // onChange={(e) => setNewStartDate(e.target.value)}
          // value={newStartDate}
          {...formik.getFieldProps('newStartDate')}
          className={inputClassName}
          type="date"
          placeholder="Sale Start Date"
        />
      </div>
      <div>
        <label className="block mb-2 text-base font-medium text-gray-900 ">
          Sale End Date:
        </label>
        <input
          // onChange={(e) => setNewEndDate(e.target.value)}
          // value={newEndDate}
          {...formik.getFieldProps('newEndDate')}
          className={inputClassName}
          type="date"
          placeholder="Sale End Date"
        />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 w-full text-white bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800">
        Update Item
      </button>
    </form>
  );
};

export default EditItemForm;
