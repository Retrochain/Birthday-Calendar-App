import { useState } from "react";
import supabase from "../../apis/supabaseClient.js";

// Simple modal component for login/signup
function AuthModal() {
  // State to toggle between login and signup
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission for both login and signup
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Call the appropriate Supabase auth method based on the current mode (login/signup)
    if (isLogin) {
      // Attempt to sign in the user with the provided email and password
      await supabase.auth.signInWithPassword({ email, password });
    } else { // Attempt to sign up the user with the provided email and password
      await supabase.auth.signUp({ email, password });
    }
  };

  // Render the modal with a form for email and password input, and a button to toggle between login and signup modes
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">{isLogin ? "Login" : "Create Account"}</button>
        </form>

        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

// Export the AuthModal component as the default export of this module
export default AuthModal;