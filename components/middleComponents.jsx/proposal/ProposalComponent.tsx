import React, { useState, useEffect } from 'react';
import { Card } from '@nextui-org/react';
import { Button, Progress } from '@nextui-org/react';
import axios from 'axios';
import { ethers } from 'ethers';
import swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { changeValue } from '../../../redux/slices/refreshPageSlice';
import {
	Election,
	EnvOptions,
	PlainCensus,
	PublishedElection,
	VocdoniSDKClient,
	Vote,
} from '@vocdoni/sdk';

const ProposalComponent = ({ prp }) => {
	const [userHasVoted, setUserHasVoted] = useState(-1);
	const userAddr = useSelector((state) => state.addr.myAddress);

	const myDispatch = useDispatch();

	useEffect(() => {
		axios
			.get(`https://www.backend.drift-dao.com/voting/${userAddr}/${prp._id}`)
			.then((res) => {
				setUserHasVoted(res.data.option);
			})
			.catch((e) => {
				console.log('error occurred', e);
			});
	}, []);

	const isProposalOver = prp._finalResults;
	const voteOnProposal = async (i) => {
		try {
			let provider = new ethers.providers.Web3Provider(window.ethereum);
			await provider.send('eth_requestAccounts', []);
			let signer = provider.getSigner();
			const client = new VocdoniSDKClient({
				env: EnvOptions.STG, // mandatory, can be 'dev' or 'prod'
				wallet: signer, // optional, the signer used (Metamask, Walletconnect)
			});
			await client.createAccount();

			await client.setElectionId(prp._id);
			const vote = new Vote([i]);
			const voteId = await client.submitVote(vote);
			axios
				.post(`https://www.backend.drift-dao.com/voting/vote`, {
					userAddr: userAddr,
					electionId: prp._id,
					option: i,
				})
				.then((res) => {
					myDispatch(changeValue());
					swal.fire('Voted🥳', 'Voted successfully in the proposal', 'success');
				})
				.catch((e) => {
					myDispatch(changeValue());
					console.log('error is: ', e);
					swal.fire('Error😵‍💫', 'An unexpected error occurred', 'error');
				});
		} catch (err) {
			console.log('error is: ', err);
			swal.fire('Error😵‍💫', 'An unexpected error occurred', 'error');
		}
	};

	return (
		<div className="flex justify-center justify-items-center my-6">
			<Card variant="bordered" style={{ width: '60vw' }}>
				<Card.Body>
					<div className="pb-3">
						<div className="text-2xl px-8 font-bold text-red-600">
							{prp._questions[0].title.default}
						</div>
						<div className="text-md px-8">
							{prp._questions[0].description.default}
						</div>
					</div>
					<hr className="py-3" />
					{[...Array(prp._questions[0].choices.length)].map((e, i) => (
						<div className="my-1 flex justify-center" key={i}>
							<div>
								<Button
									disabled={isProposalOver}
									style={{ width: '45vw' }}
									onPress={() => {
										if (userHasVoted === -1) {
											voteOnProposal(i);
										}
									}}
									bordered={userHasVoted !== i}
									color={`${userHasVoted === i ? 'success' : 'gradient'}`}
								>
									<div className="font-bold text-black">
										{prp._questions[0].choices[i].title.default}
										{isProposalOver ? (
											<span className="text-gray-600 pl-3 pr-2 ">
												Votes:{' '}
												<span className="font-bold text-blue-600">
													{prp._results[0][i]}
												</span>
											</span>
										) : (
											<span></span>
										)}
									</div>
								</Button>
							</div>
						</div>
					))}
					<div className="py-2">
						{isProposalOver ? (
							<div className="text-center text-pink-500 font-bold">
								Proposal is over
							</div>
						) : (
							<div></div>
						)}
					</div>
				</Card.Body>
				{/* <Progress
					value={90}
					shadow
					color="warning"
					status="warning"
					style={{ height: '8vh' }}
				>
					<div className="py-3" style={{ height: '8vh' }}>
						hello world
					</div>
				</Progress> */}
			</Card>
		</div>
	);
};

export default ProposalComponent;
