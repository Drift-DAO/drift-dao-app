import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginPage from '../components/loginComponents/LoginPage';
// import { useAccount } from 'wagmi';
import LeftSide from '../components/homePageComponents/LeftSide';
import RightSide from '../components/homePageComponents/RightSide';
import { MainMiddleComponent } from '../components/homePageComponents/MainMiddleComponent';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const Index = () => {
	const myAddr = useSelector((state: RootState) => state.addr.myAddress);
	const myrouter = useRouter();
	// const { address } = useAccount();

	if (myAddr !== '') {
		return (
			<div className="bg-black min-h-screen text-white flex justify-between">
				<LeftSide />
				<MainMiddleComponent />
				<RightSide />
			</div>
		);
	} else {
		return (
			<div>
				<LoginPage />
			</div>
		);
	}
};

export default Index;
