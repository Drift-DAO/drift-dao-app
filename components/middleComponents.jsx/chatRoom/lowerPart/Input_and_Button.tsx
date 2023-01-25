import React from 'react';
import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeinputVal } from '../../../../redux/slices/chatRoomSlice';
import axios from 'axios';
import socketIO from 'socket.io-client';
const ENDPOINT = 'https://www.backend.drift-dao.com';
const socket = socketIO(ENDPOINT, { transport: ['websocket'] });
// the axios instance with the api endpoint
const axiosInstance = axios.create({
	baseURL: 'https://www.backend.drift-dao.com',
});

const Input_and_Button = ({ setMsgs, msgs }) => {
	const [val, setval] = useState('');

	// const dispatch = useDispatch();
	// const { inputVal } = useSelector((state) => state.inputValue);
	const { leftSide, rightSide } = useSelector((state) => state.leftRight);
	const myAddr = useSelector((state) => state.addr.myAddress);

	const sendBtnClicked = async () => {
		if (val === '') {
			return;
		}
		socket.emit('send_message', {
			room: `${leftSide}-${rightSide}`,
			msg: val,
			sender: myAddr,
		});
		// setMsgs([
		// 	...msgs,
		// 	{ room: `${leftSide}-${rightSide}`, msg: val, sender: myAddr },
		// ]);
		setval('');
	};

	return (
		<div className="flex justify-center">
			<div>
				<Input
					aria-label="input"
					value={val}
					onChange={(e) => {
						setval(e.target.value);
					}}
					placeholder="Type your message..."
					width="35vw"
				/>
			</div>
			<div className="ml-2">
				<Button color="success" rounded auto onClick={sendBtnClicked}>
					<Image src="/icons/sent.png" width="39" height="39" alt="load..." />
				</Button>
			</div>
		</div>
	);
};

export default Input_and_Button;
