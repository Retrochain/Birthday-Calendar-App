// Extra helper component that just contains the header of the document
import PropTypes from "prop-types";

function Header({ theme, handleSignOut }) {
  return (
    <>
      <div className="w-full flex justify-end mt-5">
        <button
          onClick={handleSignOut}
          className={`${theme.buttonSecondary} px-4 py-2 rounded text-xl font-semibold`}
        >
          Sign Out
        </button>
      </div>

      <h1
        className={`${theme.title} flex flex-row text-left mt-3 uppercase text-7xl font-bebas`}
      >
        Birthday
        <br />
        Calendar
      </h1>
    </>
  );
}

export default Header;

// PropType validation
Header.propTypes = {
  handleSignOut: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    buttonSecondary: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};