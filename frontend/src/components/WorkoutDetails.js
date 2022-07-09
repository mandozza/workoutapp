import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// Date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
		const { _id, title, load, reps, createdAt } = workout;
		const { dispatch } = useWorkoutsContext();

		const handleDelete = async () => {
			const response =await fetch(`/api/workouts/${_id}`, {
				method: 'DELETE',
			})
			// expecting the item document as a json object.
			const json = await response.json()

			if (response.ok) {
				dispatch({ type: 'Delete_WORKOUT', payload: json });
			}
		}

	return (
		<div className="workout-details">
			<h4>{title}</h4>
			<p>
				<strong>Load (kg): </strong>
				{load}
			</p>
			<p>
				<strong>Number of reps: </strong>
				{reps}
			</p>
			<p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
			<span className="material-symbols-outlined" onClick={handleDelete}> delete </span>
		</div>
	)
}

export default WorkoutDetails;
