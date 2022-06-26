import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails"

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      console.log("fetching workouts");
      const response = await fetch("/api/workouts");
      console.log(response);
      const json = await response.json();
      if (response.ok) {
        setWorkouts(json);
      }
    }
    fetchWorkouts()
  }, []);


  return (
    <div className="home">
      <h2>Home</h2>
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
