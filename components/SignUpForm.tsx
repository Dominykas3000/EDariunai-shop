import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SlClose } from "react-icons/sl";
import { toast } from 'sonner';

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      cpassword: ''
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.username) {
        errors.username = 'Required';
      } else if (!/^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9ĄČĘĖĮŠŲŪąčęėįšųū._]+(?<![_.])$/.test(values.username)) {
        errors.username = 'Invalid username, it should contain 5-20 alphanumeric letters and be unique!';
      }
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(values.password)) {
        errors.password = 'Invalid password, it should contain at least 8 characters, one uppercase letter, one lowercase letter and one number!';
      }
      if (!values.cpassword) {
        errors.cpassword = 'Required';
      } else if (values.cpassword !== values.password) {
        errors.cpassword = 'Passwords do not match!';
      }
      return errors;
    },
    onSubmit: onSubmit
  });


  async function onSubmit(values: any) {

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Signed up successfully');
      toast("Signed up successfully!");
      router.push('/authorization');
    } else {
      toast("Failed to sign up, please try again later.");
      return setErrorMessage(data.error);
    }
  }

  return (
    <form
      className="space-y-6"
      onSubmit={formik.handleSubmit}
    >
      <h5 className="text-xl font-medium text-gray-900  dark:text-white">Sign up:</h5>
      <div className='flex flex-col'>
        <label
          htmlFor="username"
          className="dark:text-white block mb-2 text-base font-medium text-gray-900 ">
          Username:
        </label>
        <input type="text"
          id="username"
          autoComplete='off'
          placeholder="User123"
          required
          {...formik.getFieldProps('username')}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 "
        />
        {
          formik.errors.username && formik.touched.username ?
            <div className='pt-3 text-red-500 text-sm'>{formik.errors.username}</div>
            :
            null
        }
      </div>

      <div className='flex flex-col'>
        <label
          htmlFor="email"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
          Your email:
        </label>
        <input
          type="email"
          id="email"
          placeholder="example@email.com"
          autoComplete='email'
          required
          {...formik.getFieldProps('email')}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 "
        />
        {
          formik.errors.email && formik.touched.email ?
            <div className='pt-3 text-red-500 text-sm'>{formik.errors.email}</div>
            :
            null
        }
      </div>

      <div className='flex flex-col'>
        <label
          htmlFor="password"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
          Your password:
        </label>
        <input type="password"
          id="password"
          placeholder="••••••••"
          autoComplete='off'
          required
          {...formik.getFieldProps('password')}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 "
        />
        {
          formik.errors.password && formik.touched.password ?
            <div className='pt-3 text-red-500 text-sm'>{formik.errors.password}</div>
            :
            null
        }
      </div>

      <div className='flex flex-col'>
        <label
          htmlFor="cpassword"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
          Re-enter your password:
        </label>
        <input type="password"
          id="cpassword"
          placeholder="••••••••"
          autoComplete='off'
          required
          {...formik.getFieldProps('cpassword')}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 "
        />
        {
          formik.errors.cpassword && formik.touched.cpassword ?
            <div className='pt-3 text-red-500 text-sm'>{formik.errors.cpassword}</div>
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
        Sign-up
      </button>

    </form>
  )
}

export default SignUpForm