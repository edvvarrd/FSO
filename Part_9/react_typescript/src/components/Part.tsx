import { CoursePart } from '../types';

import { assertNever } from '../utils';

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
	switch (coursePart.kind) {
		case 'basic':
			return (
				<>
					<p>
						<b>{`${coursePart.name} ${coursePart.exerciseCount}`}</b>
					</p>
					<p>
						<i>{coursePart.description}</i>
					</p>
				</>
			);
		case 'group':
			return (
				<>
					<p>
						<b>{`${coursePart.name} ${coursePart.exerciseCount}`}</b>
					</p>
					<p>{`project exercises ${coursePart.groupProjectCount}`}</p>
				</>
			);
		case 'background':
			return (
				<>
					<p>
						<b>{`${coursePart.name} ${coursePart.exerciseCount}`}</b>
					</p>
					<p>
						<i>{coursePart.description}</i>
					</p>
					<p>{`submit to ${coursePart.backgroundMaterial}`}</p>
				</>
			);
		case 'special':
			return (
				<>
					<p>
						<b>{`${coursePart.name} ${coursePart.exerciseCount}`}</b>
					</p>
					<p>
						<i>{coursePart.description}</i>
					</p>
					<p>{`required skills: ${coursePart.requirements.join(', ')}`}</p>
				</>
			);
		default:
			return assertNever(coursePart);
	}
};

export default Part;
