import { Link } from 'react-router-dom';

const MyHotelsPage = () => {
	return (
		<div>
			<p>My hotels page</p>
			<Link to='/new-hotel'>Add Hotel</Link>
		</div>
	);
};

export default MyHotelsPage;
