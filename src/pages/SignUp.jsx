import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useUser();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = e => {
    setFormData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await signup(formData);
    toast.success('Signup successfully!', { autoClose: 1000 });
    navigate('/signin');
  };

  return (
    <div
      style={{ fontFamily: "'VT323', monospace" }}
      className="flex flex-col items-center justify-center p-4 text-xl"
    >
      <h2 className="text-4xl font-extrabold text-green-400 mb-8 drop-shadow-sm">Sign Up</h2>
      <div className="border border-green-400 rounded-md p-6 w-full max-w-sm shadow-[0_0_10px_2px_rgba(34,197,94,0.5)] bg-transparent">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 text-green-300">
              Name
            </label>
            <input
              id="username"
              type="text"
              name="username"
              className="w-full px-3 py-2 rounded border border-green-400 bg-black text-green-200 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-green-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full px-3 py-2 rounded bocrder border-green-400 bg-black text-green-200 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-green-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="w-full px-3 py-2 rounded border border-green-400 bg-black text-green-200 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-full bg-green-600 text-black font-bold hover:bg-green-400 transition-colors border-0 text-xl"
          >
            Create Account
          </button>
        </form>
        <div className="mt-4 text-green-300 text-center">
          Already has an account?{' '}
          <Link to="/signin" className="underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
