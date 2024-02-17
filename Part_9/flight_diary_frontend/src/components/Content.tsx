import { NonSensitiveDiaryEntry } from '../types';

const Content = ({ diaries }: { diaries: NonSensitiveDiaryEntry[] }) => {
	return (
		<>
			<h2>Diary entries</h2>
			{diaries.map(diary => (
				<div key={diary.id}>
					<p>
						<b>{diary.date}</b>
					</p>
					<p>visibility: {diary.visibility}</p>
					<p>weather: {diary.weather}</p>
				</div>
			))}
		</>
	);
};

export default Content;
