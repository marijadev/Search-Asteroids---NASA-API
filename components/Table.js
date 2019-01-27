const tableStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(5, 1fr)',
	gridGap: 5,
	gridAutoRows: '50px 200px',
	textAlign: 'center',
	alignItems: 'center',
	padding: '0 20px'
};

const Table = ({ asteroids, filteredAsteroids }) => {
	
	const displayAsteroids = () => {
		if (filteredAsteroids.length) {
			return filteredAsteroids.map( singleAsteroid => 
				<div key={singleAsteroid.id} style={tableStyle}>
					<div>{singleAsteroid.close_approach_data[0].close_approach_date}</div>
					<div>{singleAsteroid.name}</div>
					<div>{singleAsteroid.close_approach_data[0].relative_velocity.kilometers_per_hour}</div>
					<div>{singleAsteroid.estimated_diameter.kilometers.estimated_diameter_min}</div>
					<div>{singleAsteroid.estimated_diameter.kilometers.estimated_diameter_max}</div>
				</div>
			);
		} else {
			return (
				<div style={{margin: '40px', textAlign: 'center'}}>
					<em>Nema selektovanih asteroida.</em>
				</div>
			)
		}
	};

	return (
		<div>
			<div style={{border: '1px solid grey'}}>
				<div style={tableStyle}>
					<h4>Datum</h4>
					<h4>Ime</h4>
					<h4>Brzina Kretanja (km/h)</h4>
					<h4>Min. Prečnik (m)</h4>
					<h4>Max. Prečnik (m)</h4>
				</div>
			{displayAsteroids()}
			</div>

		</div>
	);
};

export default Table;
