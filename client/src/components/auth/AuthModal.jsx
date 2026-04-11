import { useState } from "react";
import supabase from "../../apis/supabaseClient.js";
import PropTypes from "prop-types";

// Simple modal component for login/signup
function AuthModal({ theme }) {
  // State to toggle between login and signup
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Handle form submission for both login and signup
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    setError(null);

    // Call the appropriate Supabase auth method based on the current mode (login/signup)
    try {
      if (isLogin) {
        // Attempt to sign in the user with the provided email and password
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        // Attempt to sign up the user with the provided email and password
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Render the modal with a form for email and password input, and a button to toggle between login and signup modes
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div
        className={`${theme.container} w-full max-w-md p-6 rounded-xl shadow-xl`}
      >
        <h2 className="text-2xl font-semibold mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Email */}
          <label htmlFor="email" className="block mb-1 text-lg font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`${theme.grid} w-full p-2 mb-3 rounded text-xl`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />

          {/* Password */}
          <label
            htmlFor="password"
            className="block mb-1 text-lg font-semibold"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`${theme.grid} w-full p-2 mb-3 rounded text-xl`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

          {error && <p className="mb-3 text-red-500 text-lg">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className={`${theme.buttonSecondary} px-3 py-1 rounded text-xl font-semibold`}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>

            <button
              type="submit"
              className={`${theme.buttonPrimary} px-3 py-1 rounded text-xl font-semibold`}
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Export the AuthModal component as the default export of this module
export default AuthModal;

// PropType validation
AuthModal.propTypes = {
  theme: PropTypes.shape({
    container: PropTypes.string,
    grid: PropTypes.string,
    buttonPrimary: PropTypes.string,
    buttonSecondary: PropTypes.string,
  }),
};
