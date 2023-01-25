import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
import { HomeMiddle } from '../middleComponents.jsx/HomeMiddle';
import MiddleComponent from './MiddleComponent';

export const MainMiddleComponent = () => {
	const { leftSide, rightSide } = useSelector((state:RootState) => state.leftRight);

	return (
		<div
			className="mx-2 my-2 rounded-2xl"
			style={{
				width: '71vw',
				backgroundColor: '#260033',
				borderColor: '#4d0066',
				borderWidth: '2px',
			}}
		>
			{leftSide === 'home' ? (
				<div>
					<HomeMiddle />
				</div>
			) : (
				<div>
					{' '}
					<div className="flex justify-between" style={{ height: '8vh' }}>
						<div
							className="font-bold text-xl text-pink-500 font-mono"
							style={{ margin: '2.5vh' }}
						>
							{leftSide.toUpperCase()}
						</div>
						<div
							className="font-bold text-xl text-pink-500 font-mono"
							style={{ margin: '2.5vh' }}
						>
							{rightSide.toUpperCase()}
						</div>
						<div
							className="font-bold text-xl text-pink-500 font-mono"
							style={{ margin: '2.5vh' }}
						>
							Drift-DAO
						</div>
					</div>
					<hr />
					<div>
						<MiddleComponent />
					</div>
				</div>
			)}
		</div>
	);
};
