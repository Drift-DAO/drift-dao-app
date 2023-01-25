import React from 'react';
import DAO_detail from '../rightSideComponents/lowerPart/DAO_detail';
import Exit_DAO from '../rightSideComponents/lowerPart/Exit_DAO';
import RightSideUpperComponent from '../rightSideComponents/upperPart/RightSideUpperComponent';
import { useSelector } from 'react-redux';
import HomeRight from '../rightSideComponents/HomeRight';
import { RootState } from '@/redux/store';

const RightSide = () => {
	const leftSide = useSelector((state:RootState) => state.leftRight.leftSide);
	return (
		<div
			className="bg-gradient-to-r from-purple-900  mx-2 my-2 divide-y divide-dashed"
			style={{ width: '20vw', borderRadius: '15px' }}
		>
			{leftSide === 'home' ? (
				<div>
					<HomeRight />
				</div>
			) : (
				<div>
					<div className="">
						<div style={{ height: '85vh' }} className=" py-2 overflow-hidden">
							<RightSideUpperComponent />
						</div>
					</div>
					<div className="grid justify-items-center py-3">
						<div>
							<DAO_detail />
						</div>
						<div className="mt-4">
							<Exit_DAO />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default RightSide;
