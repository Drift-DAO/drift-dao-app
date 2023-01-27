import React, { useState } from 'react';
import { Modal, Input, Row, Button, Loading } from '@nextui-org/react';
import { useSelector, useDispatch } from 'react-redux';
import { changeValue } from '../../../redux/slices/refreshPageSlice';
import Swal from 'sweetalert2';
import axios from 'axios';
import Image from 'next/image';
import { ethers } from 'ethers';

import { RootState } from '@/redux/store';

const CreateProposal = () => {
	const { leftSide, rightSide, dao_id } = useSelector(
		(state: RootState) => state.leftRight
	);
	const myDispatch = useDispatch();

	const [currState, setCurrState] = React.useState('set options');
	const [visible, setVisible] = React.useState(false);
	const [posting, setPosting] = React.useState(false);
	const [heading, setHeading] = React.useState('');
	const [desc, setDesc] = React.useState('');
	const [options, setOptions] = React.useState(2);
	const [optionChoices, setOptionChoices] = React.useState<string[]>([]);

	const createProposalButtonClicked = async () => {
		setVisible(true);
	};

	const closeHandler = () => {
		setHeading('');
		setDesc('');
		setCurrState('set options');
		setOptions(2);
		setVisible(false);
	};

	const increaseOptions = () => {
		if (options == 5) {
			alert("you can't have more than 5 options.");
			return;
		}
		setOptions(options + 1);
	};
	const decreaseOptions = () => {
		if (options == 2) {
			alert("you can't have less than 2 options.");
			return;
		}
		setOptions(options - 1);
	};

	const changeOptionChoices = (
		idx: number,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		let currChoices = optionChoices;
		currChoices[idx] = e.target.value;
		setOptionChoices((optionChoices) => currChoices);
	};

	const postProposalBtnClicked = async () => {
		if (heading === '' || desc === '') {
			alert('heading or description is empty.');
			return;
		}

		if (currState === 'set options') {
			setOptionChoices(Array(options).fill(''));
			setCurrState('post');
			// return;
		} else {
			if (heading === '' || desc === '') {
				alert('heading or description is empty.');
				return;
			}
			for (let i = 0; i < options; i++) {
				if (optionChoices[i] === '') {
					alert('one or more options are empty.');
					return;
				}
			}

			// console.log('proposal heading is: ', heading);
			// console.log('proposal description is: ', desc);
			// console.log('proposal options are: ', options);
			// for (let i = 0; i < options; i++) {
			// 	console.log(`option ${i + 1}: `, optionChoices[i]);
			// }

			setPosting(true);
			let provider = new ethers.providers.Web3Provider(window.ethereum);
			await provider.send('eth_requestAccounts', []);
			let signer = provider.getSigner();
			return;

			// const client = new VocdoniSDKClient({
			// 	env: EnvOptions.STG, // mandatory, can be 'dev' or 'prod'
			// 	wallet: signer, // optional, the signer used (Metamask, Walletconnect)
			// });
			// const info = await client.createAccount();
			// if (info.balance === 0) {
			// 	await client.collectFaucetTokens();
			// }

			// const res = await axios.get(
			// 	`https://www.backend.drift-dao.com/DAO/allMembers/${dao_id}`
			// );

			// const census = new PlainCensus();

			// for (let m = 0; m < res.data.length; m++) {
			// 	// console.log("address is: ",res.data[m].userAddr )
			// 	census.add(res.data[m].userAddr);
			// }

			// const endDate = new Date();
			// endDate.setMinutes(endDate.getMinutes() + 5);

			// const election = Election.from({
			// 	title: 'Election title',
			// 	description: 'Election description',
			// 	header: 'https://source.unsplash.com/random',
			// 	streamUri: 'https://source.unsplash.com/random',
			// 	endDate: endDate.getTime(),
			// 	census,
			// });

			// let myOptions = [];
			// for (let i = 0; i < optionChoices.length; i++) {
			// 	let a = { value: i, title: optionChoices[i] };
			// 	myOptions.push(a);
			// }

			// // add questions
			// election.addQuestion(heading, desc, myOptions);
			// const electionId = await client.createElection(election);
			axios
				.post('https://www.backend.drift-dao.com/voting', {
					dao_id,
					electionId:"",
				})
				.then((res) => {
					setHeading('');
					setDesc('');
					setCurrState('set options');
					setOptions(2);
					setOptionChoices([]);
					myDispatch(changeValue());
					setPosting(false);
					setVisible(false);
					Swal.fire('Posted!', 'Proposal posted successfully.', 'success');
				})
				.catch((err) => {
					setHeading('');
					setDesc('');
					setCurrState('set options');
					setOptions(2);
					setOptionChoices([]);
					myDispatch(changeValue());
					setPosting(false);
					setVisible(false);
					Swal.fire('Erro!', 'An unexpected error occurred', 'error');
				});

			// Swal.fire('Posted!', 'Posted successfully in the forum', 'success');
		}

		// setPosting(true);

		// setPosting(false);
		// // myDispatch(changeValue());
		// setHeading('');
		// setDesc('');
		// setCurrState("set options")
		// setVisible(false);
		// Swal.fire('Posted!', 'Posted successfully in the forum', 'success');
	};
	return (
		<div className="flex justify-center">
			<Button
				auto
				color="gradient"
				shadow
				onPress={createProposalButtonClicked}
				style={{ width: '50vw' }}
			>
				<div className="text-lg">Create a proposal for voting</div>
			</Button>
			<Modal
				preventClose
				closeButton
				blur
				open={visible}
				onClose={closeHandler}
				scroll
				width="50vw"
			>
				<Modal.Header>
					<div>
						<div className="font-bold text-2xl text-pink-500">
							Your proposal 🗳️{' '}
						</div>
						<hr style={{ width: '40vw' }} />
					</div>
				</Modal.Header>
				<Modal.Body>
					{currState === 'set options' ? (
						<div className="text-center">
							<div className="mt-3">
								<input
									placeholder="proposal heading..."
									value={heading}
									onChange={(e) => setHeading(e.target.value)}
									className="px-3"
									style={{
										borderWidth: '1px',
										height: '40px',
										borderRadius: '10px',
										width: '40vw',
										borderColor: 'purple',
									}}
								/>
							</div>
							<div className="mt-3">
								<textarea
									placeholder="Brief description of the proposal..."
									value={desc}
									onChange={(e) => setDesc(e.target.value)}
									className="px-3"
									style={{
										borderWidth: '1px',
										borderRadius: '10px',
										width: '40vw',
										borderColor: 'purple',
									}}
									rows={4}
								/>
							</div>
							<div className="flex justify-center my-3">
								<span className="mx-3">Options: </span>
								<button onClick={decreaseOptions}>
									<Image
										src="/proposal_icons/minus.png"
										height={30}
										width={30}
										alt="-"
									/>
								</button>
								<span className="mx-3 text-xl">{options}</span>
								<button onClick={increaseOptions}>
									<Image
										src="/proposal_icons/plus.png"
										height={30}
										width={30}
										alt="+"
									/>
								</button>
							</div>
						</div>
					) : (
						<div>
							{[...Array(options)].map((e, i) => (
								<div className="text-center mb-3" key={i}>
									<input
										placeholder={`option ${i + 1}`}
										onChange={(e) => changeOptionChoices(i, e)}
										className="px-3"
										style={{
											borderWidth: '1px',
											height: '40px',
											borderRadius: '10px',
											width: '40vw',
											borderColor: 'blue',
										}}
									/>
								</div>
							))}
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button size="md" flat color="error" onPress={closeHandler}>
						<div className="text-xl">cancel</div>
					</Button>
					<Button size="md" onPress={postProposalBtnClicked} color="gradient">
						{posting ? (
							<div className="text-xl">
								<span className="mx-2">posting</span>
								<Loading color="error" type="points-opacity" />
							</div>
						) : (
							<div className="text-xl">{currState}</div>
						)}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default CreateProposal;
