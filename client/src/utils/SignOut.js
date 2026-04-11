import supabase from "../apis/supabaseClient.js";

const handleSignOut = async () => {
  await supabase.auth.signOut();
};

export default handleSignOut;