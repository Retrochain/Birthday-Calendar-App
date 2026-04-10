import PropTypes from "prop-types";

// This react component maps out theme buttons that when selected set the appropriate theme
const ThemeSelector = ({ setTheme, themeButtonClass }) => {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => setTheme("default")}
        className={themeButtonClass("default", "bg-blue-800")}
      />

      <button
        onClick={() => setTheme("orange")}
        className={themeButtonClass("orange", "bg-orange-500")}
      />

      <button
        onClick={() => setTheme("teal")}
        className={themeButtonClass("teal", "bg-teal-500")}
      />

      <button
        onClick={() => setTheme("dark")}
        className={themeButtonClass("dark", "bg-gray-800")}
      />

      <button
        onClick={() => setTheme("midnightPurple")}
        className={themeButtonClass("midnightPurple", "bg-purple-800")}
      />
    </div>
  );
}

export default ThemeSelector;

ThemeSelector.propTypes = {
  setTheme: PropTypes.func.isRequired,
  themeButtonClass: PropTypes.func.isRequired,
};
