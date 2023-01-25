import React from 'react';
import AreaChart from './AreaChart';
import DoughnutChart from './DoughnutChart';
import SimpleBar from 'simplebar-react';

const MainAnalytics = () => {
	return (
		<SimpleBar style={{ maxHeight: '85vh' }}>
			<div className="">
				<AreaChart />
				<DoughnutChart />
			</div>
		</SimpleBar>
	);
};

export default MainAnalytics;
