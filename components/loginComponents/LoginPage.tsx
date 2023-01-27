import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Loading } from '@nextui-org/react';
import { ethers } from 'ethers';

/** Import Orbis SDK */
// @ts-ignore
import { Orbis } from '@orbisclub/orbis-sdk';
import { useDispatch } from 'react-redux';
import { changeAddr } from '../../redux/slices/addrSlice';
import Swal from 'sweetalert2';

let orbis = new Orbis();
const Home = () => {
	const myDispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const connectWithWallet = async () => {
		setLoading(true);
		try {
			let provider = new ethers.providers.Web3Provider(window.ethereum);
			await provider.send('eth_requestAccounts', []);
			let signer = provider.getSigner();
			const userAddress = await signer.getAddress();

			let res = await orbis.isConnected();
			if (!res) {
				await orbis.connect_v2({
					provider: window.ethereum,
					lit: false,
				});
			}

			myDispatch(changeAddr(userAddress));
		} catch (err) {
			console.log('an error occurred: ', err);
			Swal.fire('Error!', 'an unexpected error occurred.', 'error');
		}
		setLoading(false);
	};
	return (
		<div className="bg-[url('/landingPageImg/landingbg.jpg')] bg-fixed">
			<div className="grid sm:grid-cols-2 gap-4">
				<div className="sm:flex items-center justify-center sm:h-screen">
					<div>
						<div>
							<div className="my-10">
								<Image
									src="/landingPageLogo/logo-white.png"
									height="200"
									width="450"
									alt="load.."
								/>
							</div>
							<span className="text-white text-3xl">
								A unified platform for all your DAOs
							</span>
						</div>
					</div>
				</div>
				<div>
					<div className="sm:flex items-center justify-center sm:h-screen">
						<div>
							<div className="text-white text-3xl italic font-bold">
								Connect with your wallet to continue
							</div>
							<div className="my-4"></div>
							<div className="flex justify-center justify-items-center">
								<Button
									onPress={connectWithWallet}
									shadow
									color="gradient"
									size="lg"
									style={{ width: '25vw' }}
								>
									{loading ? (
										<div>
											Connecting... <Loading color="currentColor" size="sm" />
										</div>
									) : (
										<div>Connect your wallet</div>
									)}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
