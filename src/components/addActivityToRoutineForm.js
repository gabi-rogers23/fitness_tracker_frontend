import React from "react";
import { useState, useEffect } from "react";
import { getAllActivities, BASE_URL } from "../api/api";

function AddActivityToRoutineForm(props) {
  const [activities, setActivities] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState("");
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    getAllActivities().then((allActivities) => setActivities(allActivities));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newActivity = {
      activityId: selectedActivityId,
      count: count,
      duration: duration,
    };

    console.log("FEATURED ROUTINE ", props.featuredRoutine);

    try {
      const response = await fetch(
        `${BASE_URL}/routines/${props.featuredRoutine.id}/activities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newActivity),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add activity to routine");
      }
      const data = await response.json();
      data.routineActivityId = data.id;
      props.onAddActivity(data);
      setCount(0);
      setDuration(0);
      setSelectedActivityId("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="formU" onSubmit={handleSubmit}>
      <div>
        <label className="labelU" htmlFor="activity">
          Activity:
        </label>
        <select
          className="selectU"
          name="activity"
          id="activity"
          value={selectedActivityId}
          onChange={(event) => setSelectedActivityId(event.target.value)}
        >
          <option value="">Select an activity...</option>
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="labelU" htmlFor="count">
          Count:
        </label>
        <input
          type="number"
          id="count"
          name="count"
          value={count}
          onChange={(event) => setCount(event.target.value)}
        />
      </div>
      <div>
        <label className="labelU" htmlFor="duration">
          Duration (in minutes):
        </label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
        />
      </div>
      <button className="buttonU" type="submit">
        Add Activity
      </button>
    </form>
  );
}

export default AddActivityToRoutineForm;
