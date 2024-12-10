import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";



const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register",
             {name, email, password});
             console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                onChange={(e)=> setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 text-white font-medium rounded-md bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 transition-colors"
            >
              Submit
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-green-500 hover:underline" >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  };
  
  export default Signup;
  