const EditItemForm = () => {
  return (
    <form className="flex flex-col gap-3">
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Item Name"
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="Number"
        placeholder="Item Price (in Eur)"
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Item Description"
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Tags"
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Stock"
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Category"
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Image URL"
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Sale Price"
      />
      <div>
        <label className="text-gray-900">Sale Start Date</label>
        <input
          className="border border-slate-500 px-8 py-2"
          type="date"
          placeholder="Sale Start Date"
        />
      </div>
      <div>
        <label className="text-gray-900">Sale End Date</label>
        <input
          className="border border-slate-500 px-8 py-2"
          type="date"
          placeholder="Sale End Date"
        />
      </div>
      <button
        type="submit"
        className="w-full text-white bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
      >
        Update Item
      </button>
    </form>
  );
};

export default EditItemForm;
