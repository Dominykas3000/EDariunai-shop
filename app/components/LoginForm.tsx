import { useFormik } from 'formik';
import { connectToDatabase } from "@/app/utils/database";


const LoginForm = () => {
  connectToDatabase()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 8) {
        errors.password = 'Must be 8 characters or more';
      }
      return errors;
    },
    onSubmit,
  });

  async function onSubmit(values: any) {
    console.log(values);

  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6" >
      <h5 className="text-xl font-medium text-gray-900 ">Log in: </h5>
      <div className='flex flex-col'>
        <label htmlFor="email" className="block mb-2 text-base font-medium text-gray-900 ">Your email:</label>
        <input
          type="email"
          id="email"
          placeholder="name@company.com"
          required
          {...formik.getFieldProps('email')}
          className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 text-base"
        />
        {
          formik.errors.email && formik.touched.email ?
            <div className='pt-3 text-red-500 text-sm'>{formik.errors.email}</div>
            :
            null
        }
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-base font-medium text-gray-900 ">Your password:</label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          required
          {...formik.getFieldProps('password')}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 "
        />

        {
          formik.errors.password && formik.touched.password?
            <div className='pt-3 text-red-500 text-sm'>{formik.errors.password}</div>
            :
            null
        }
      </div>

      <button
        type="submit"
        className="w-full text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-800 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800">
        Login!
      </button>

    </form>
  )
}

export default LoginForm