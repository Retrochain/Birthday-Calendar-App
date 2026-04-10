import PropTypes from "prop-types";

// This is a helper component that allows each theme button to have a tooltip
const ThemeButton = ({ onClick, className, label }) => {
  return (
    <div className="relative inline-block group">
      <button onClick={onClick} className={className} />

      <div
        className="absolute left-1/2 -translate-x-1/2 -top-9
                   opacity-0 scale-95 group-hover:opacity-90 group-hover:scale-100
                   transition-all duration-200
                   bg-black text-white shadow-lg border border-gray-600 text-xs sm:text-sm px-2 py-1 rounded-xl whitespace-nowrap"
      >
        {label}
      </div>
    </div>
  );
};

// This react component maps out theme buttons that when selected set the appropriate theme
const ThemeSelector = ({ setTheme, themeButtonClass }) => {
  return (
    <div className="flex gap-2 mb-4">
      <ThemeButton
        onClick={() => setTheme("default")}
        className={themeButtonClass("default", "bg-blue-800")}
        label="Default Theme"
      />

      <ThemeButton
        onClick={() => setTheme("orange")}
        className={themeButtonClass("orange", "bg-orange-500")}
        label="Orange Theme"
      />

      <ThemeButton
        onClick={() => setTheme("teal")}
        className={themeButtonClass("teal", "bg-teal-500")}
        label="Teal Theme"
      />

      <ThemeButton
        onClick={() => setTheme("dark")}
        className={themeButtonClass("dark", "bg-gray-800")}
        label="Dark Theme"
      />

      <ThemeButton
        onClick={() => setTheme("midnightPurple")}
        className={themeButtonClass("midnightPurple", "bg-purple-800")}
        label="Midnight Purple Theme"
      />

      <ThemeButton
        onClick={() => setTheme("dusk")}
        className={themeButtonClass("dusk", "bg-pink-800")}
        label="Dusk Theme"
      />

      <ThemeButton
        onClick={() => setTheme("blueSky")}
        className={themeButtonClass("blueSky", "bg-yellow-600")}
        label="Blue Sky Theme"
      />
    </div>
  );
};

export default ThemeSelector;

ThemeSelector.propTypes = {
  setTheme: PropTypes.func.isRequired,
  themeButtonClass: PropTypes.func.isRequired,
};

ThemeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};