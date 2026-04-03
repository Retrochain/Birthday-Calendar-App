// React component that displays a list of upcoming birthdays for the current month
import axios from "axios";
import { useState, useEffect } from "react";
import supabase from "../../apis/supabaseClient.js";
import { MONTH_NAMES } from "../../utils/CalendarUtils.js";

const UpcomingBirthdays = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const token = session?.access_token;

        if (!token) {
          console.error("No auth token found");
          return;
        }

        const response = await axios.get(
          "/api/birthdays/month/" + (new Date().getMonth() + 1),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setBirthdays(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching birthdays:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBirthdays();
  }, []);

  return (
    <div className="upcoming-birthdays">
      <h1 className="upcoming-title">Upcoming Birthdays</h1>
      {error && <div className="error-message">Error: {error}</div>}
      {loading && <div className="loading-message">Loading...</div>}
      {birthdays.map((birthday) => {
        const date = birthday.birthdate.split("-");
        return (
          <div key={birthday.id} className="birthday-item">
            {birthday.name} - {MONTH_NAMES[Number.parseInt(date[1]) - 1]}{" "}
            {date[2]}, {date[0]}: {birthday.note}
          </div>
        );
      })}
    </div>
  );
};

// Export the UpcomingBirthdays component as the default export of this module
export default UpcomingBirthdays;
