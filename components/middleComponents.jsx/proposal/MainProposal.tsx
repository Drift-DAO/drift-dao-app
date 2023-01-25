import React, { useState, useEffect } from 'react';
import SimpleBar from 'simplebar-react';
import ReactLoading from 'react-loading';
import CreateProposal from './CreateProposal';
import ProposalComponent from './ProposalComponent';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ethers } from 'ethers';
import {
	Election,
	EnvOptions,
	PlainCensus,
	PublishedElection,
	VocdoniSDKClient,
	Vote,
} from '@vocdoni/sdk';

const MainProposal = () => {
	const leftSide = useSelector((state) => state.leftRight.leftSide);
	const dao_id = useSelector((state) => state.leftRight.dao_id);
	const value = useSelector((state) => state.refreshPage.value);
	const [allProposals, setAllProposals] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchAllProposals();
	}, [leftSide, value]);

	const fetchAllProposals = async () => {
		setLoading(true);
		axios
			.get(`https://www.backend.drift-dao.com/voting/${dao_id}`)
			.then(async (res) => {
				let provider = new ethers.providers.Web3Provider(window.ethereum);
				await provider.send('eth_requestAccounts', []);
				let signer = provider.getSigner();

				const client = new VocdoniSDKClient({
					env: EnvOptions.STG, // mandatory, can be 'dev' or 'prod'
					wallet: signer, // optional, the signer used (Metamask, Walletconnect)
				});

				await client.createAccount();

				let myProposalArray = [];
				for (let i = res.data.length - 1; i >= 0; i--) {
					// console.log('election id: ', res.data[i].electionId);
					const myElection = await client.fetchElection(res.data[i].electionId);
					myProposalArray.push(myElection);
				}
				setAllProposals(myProposalArray);
				setLoading(false);
				// console.log('my proposal array is: ', myProposalArray);
			})
			.catch((err) => {
				console.log('error occurred');
				setLoading(false);
			});
	};

	return (
		<div>
			<div style={{ height: '80vh' }} className="py-2 overflow-hidden">
				{loading ? (
					<div className="flex justify-center" style={{ height: '80vh' }}>
						<ReactLoading
							type="spinningBubbles"
							color="white"
							height={75}
							width={75}
							className="my-auto"
						/>
					</div>
				) : (
					<SimpleBar style={{ maxHeight: '80vh' }}>
						{allProposals.map((prp, idx) => (
							<div key={idx}>
								<ProposalComponent prp={prp} />
							</div>
						))}
					</SimpleBar>
				)}
			</div>
			<div>
				<hr className="py-3" />
				<CreateProposal />
			</div>
		</div>
	);
};

export default MainProposal;
