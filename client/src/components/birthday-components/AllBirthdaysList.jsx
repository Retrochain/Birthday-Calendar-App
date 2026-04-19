import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { MONTH_NAMES } from "../../utils/CalendarUtils.js";
import EditBirthdayModal from "../crud-modals/EditBirthdayModal";
import DeleteBirthdayModal from "../crud-modals/DeleteBirthdayModal";

// Define sorting options for the birthday list, allowing users to sort by name or date in ascending or descending order
const SORT_OPTIONS = [
  { value: "name-asc", label: "Name (A → Z)" },
  { value: "name-desc", label: "Name (Z → A)" },
  { value: "date-asc", label: "Date (Earliest first)" },
  { value: "date-desc", label: "Date (Latest first)" },
];

// Component to display a list of all birthdays with options to edit or delete each entry
const AllBirthdaysList = ({
  birthdays,
  loading,
  error,
  updateBirthday,
  deleteBirthday,
  theme,
}) => {
  // State to manage the currently editing and deleting birthday entries
  const [editingBirthday, setEditingBirthday] = useState(null);
  const [deletingBirthday, setDeletingBirthday] = useState(null);

  // State to manage search input and sorting options selected by the user
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date-asc");

  // Filter and sort birthdays client-side based on the search query and selected sorting option
  const displayedBirthdays = useMemo(() => {
    let result = [...birthdays];

    // Filter by search query (name or note)
    if (search.trim()) {
      const query = search.trim().toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.note?.toLowerCase().includes(query),
      );
    }

    // Sort the results based on the selected sorting option
    result.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "date-asc":
          return a.birthdate.localeCompare(b.birthdate);
        case "date-desc":
          return b.birthdate.localeCompare(a.birthdate);
        default:
          return 0;
      }
    });

    return result;
  }, [birthdays, search, sortBy]);

  // Render the list of birthdays with appropriate messages for loading, errors, and empty state
  return (
    <div className="container mx-auto items-center justify-center pl-2">
      <h1 className={`${theme.title} font-bebas text-5xl mt-3`}>
        Your Added Birthdays
      </h1>

      {/* Search and Sort controls */}
      {!loading && !error && (
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          {/* Search input */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or note..."
            className={`${theme.search} p-2 rounded text-lg flex-1`}
          />

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`${theme.select} p-2 rounded text-lg`}
          >
            {SORT_OPTIONS.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className={theme.option}
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Display error message if there is an error, loading message if data is being fetched, and a message for no birthdays found */}
      {error && <div className="mt-3 text-3xl">Error: {error}</div>}

      {loading && (
        <div
          className={`${theme.allBirthdays} shadow rounded-md p-4 max-w-sm w-full`}
        >
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className={`${theme.select} h-4 rounded w-3/4`}></div>
              <div className="space-y-2">
                <div className={`h-4 ${theme.select} rounded`}></div>
                <div className={`h-4 ${theme.select} rounded w-5/6`}></div>
                <div className="flex flex-col lg:flex-row gap-2 mt-3">
                  <div
                    className={`${theme.action} px-2 py-1 rounded-lg font-semibold text-lg w-12 h-9`}
                  ></div>
                  <div
                    className={`${theme.action} px-2 py-1 rounded-lg font-semibold text-lg w-16 h-9`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && birthdays.length === 0 && (
        <div className={`${theme.noBirthdays} mt-3 text-2xl`}>
          No birthdays found.
        </div>
      )}

      {!loading &&
        !error &&
        birthdays.length > 0 &&
        displayedBirthdays.length === 0 && (
          <div className={`${theme.noBirthdays} mt-3 text-2xl font-semibold`}>
            No birthdays match your search.
          </div>
        )}

      {/* Map through the list of birthdays and display each one with options to edit or delete */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-5 mt-5">
        {displayedBirthdays.map((birthday) => {
          const [year, month, day] = birthday.birthdate.split("-");

          return (
            <div
              key={birthday.id}
              className={`${theme.allBirthdays} rounded-xl shadow-sm p-3`}
            >
              <div className="text-xl font-bold truncate">{birthday.name}</div>

              <div className="text-lg mt-1 font-semibold">
                {MONTH_NAMES[Number.parseInt(month) - 1]} {day}, {year}
              </div>

              {birthday.note === "" ? (
                <div className={`${theme.noNote} text-lg mt-2 line-clamp-3`}>
                  No note
                </div>
              ) : (
                <div className="text-lg mt-2 line-clamp-3 font-semibold">
                  {birthday.note}
                </div>
              )}

              {/* ACTION BUTTONS */}
              <div className="flex flex-col lg:flex-row gap-2 mt-3">
                <button
                  className={`${theme.action} px-2 py-1 rounded-lg font-semibold text-lg`}
                  onClick={() => setEditingBirthday(birthday)}
                >
                  Edit
                </button>

                <button
                  className={`${theme.action} px-2 py-1 rounded font-semibold text-lg`}
                  onClick={() => setDeletingBirthday(birthday)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals for editing and deleting birthdays, which are conditionally rendered based on the state of editingBirthday and deletingBirthday */}
      {editingBirthday && (
        <EditBirthdayModal
          birthday={editingBirthday}
          onClose={() => setEditingBirthday(null)}
          onUpdate={updateBirthday}
          theme={theme}
        />
      )}

      {deletingBirthday && (
        <DeleteBirthdayModal
          birthday={deletingBirthday}
          onClose={() => setDeletingBirthday(null)}
          onDelete={deleteBirthday}
          theme={theme}
        />
      )}
    </div>
  );
};

// Define prop types for the component to ensure correct usage and provide better documentation
AllBirthdaysList.propTypes = {
  birthdays: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  updateBirthday: PropTypes.func.isRequired,
  deleteBirthday: PropTypes.func.isRequired,

  theme: PropTypes.shape({
    title: PropTypes.string,
    allBirthdays: PropTypes.string,
    action: PropTypes.string,
    select: PropTypes.string.isRequired,
    option: PropTypes.string,
    search: PropTypes.string,
    noNote: PropTypes.string.isRequired,
    noBirthdays: PropTypes.string.isRequired,
  }).isRequired,
};

// Export the component as the default export of the module
export default AllBirthdaysList;
