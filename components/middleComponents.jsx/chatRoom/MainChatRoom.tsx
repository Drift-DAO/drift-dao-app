import React, { useState, useEffect, useRef } from 'react';
import Input_and_Button from './lowerPart/Input_and_Button';
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
import axios from 'axios';
import socketIO from 'socket.io-client';
import ChatCardRight from './upperPart/ChatCardRight';
import ChatCardLeft from './upperPart/ChatCardLeft';
const ENDPOINT = 'https://www.backend.drift-dao.com';
const socket = socketIO(ENDPOINT, { transport: ['websocket'] });
// the axios instance with the api endpoint
const axiosInstance = axios.create({
	baseURL: 'https://www.backend.drift-dao.com',
});

const MainChatRoom = () => {
	const myAddr = useSelector((state) => state.addr.myAddress);
	const msgEndRef = useRef(null);

	const [loading, setLoading] = useState(false);
	const { leftSide, rightSide } = useSelector((state) => state.leftRight);
	const [msgs, setMsgs] = useState([]);

	socket.on('connect', () => {
		// console.log('hello world');
		// console.log('new connection frontend'); // ojIckSD2jqNzOqIrAGzL
		// console.log(`socket.id: ${socket.id}`);
	});

	socket.emit('join_room', `${leftSide}-${rightSide}`);

	useEffect(() => {
		msgEndRef.current?.scrollIntoView();
	}, [msgs]);

	useEffect(() => {
		socket.on('receive_message', (data) => {
			if (data.room === `${leftSide}-${rightSide}`) {
				// console.log('data', data);
				setMsgs((msgs) => [...msgs, data]);
			}
		});
	}, [socket, leftSide, rightSide]);

	useEffect(() => {
		fetchData();
	}, [leftSide, rightSide]);

	const fetchData = () => {
		axiosInstance
			.get(`/${leftSide}-${rightSide}`)
			.then((resp) => {
				// console.log('resp: ', resp);
				setMsgs(resp.data);
			})
			.catch((err) => {
				console.log('error occurred: ', err);
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
						{msgs.map((ms, idx) => (
							<div key={idx}>
								{ms.sender !== myAddr ? (
									<div>
										<ChatCardLeft sender={ms.sender} msg={ms.msg} />
									</div>
								) : (
									<div>
										<ChatCardRight sender={ms.sender} msg={ms.msg} />
									</div>
								)}
							</div>
						))}
						<div ref={msgEndRef}></div>
					</SimpleBar>
				)}
			</div>
			<div>
				<hr className="py-3" />
				<Input_and_Button msgs={msgs} setMsgs={setMsgs} />
			</div>
		</div>
	);
};

export default MainChatRoom;
