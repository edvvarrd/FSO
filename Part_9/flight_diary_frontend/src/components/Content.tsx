import { DiaryEntry } from '../types';

const Content = ({ diaries }: { diaries: DiaryEntry[] }) => {
	return (
		<>
			<h2>Diary entries</h2>
			{diaries.map(diary => (
				<div key={diary.id}>
					<h3>{diary.date}</h3>
					<p>visibility: {diary.visibility}</p>
					<p>weather: {diary.weather}</p>
					{diary.comment && <p>comment: {diary.comment}</p>}
				</div>
			))}
		</>
	);
};

export default Content;
