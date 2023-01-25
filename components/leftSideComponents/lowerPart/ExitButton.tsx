import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tooltip } from '@nextui-org/react';
import { Modal, Input, Row, Checkbox, Button, Text } from '@nextui-org/react';
import { Router } from 'next/router';
import { useDispatch } from 'react-redux';
import { changeAddr } from '../../../redux/slices/addrSlice';

const ExitButton = () => {
	const myDispatch = useDispatch();
	const [visible, setVisible] = React.useState(false);

	const closeHandler = () => {
		// console.log("cancelled")
		setVisible(false);
	};
	const logoutBtnClicked = async () => {
		// console.log("you have been logged out")
		setVisible(true);
	};

	const logoutUser = async () => {
		myDispatch(changeAddr(''));
	};

	return (
		<div className="flex justify-center justify-items-center">
			<motion.div
				whileHover={{ scale: 0.9 }}
				transition={{ type: 'spring', stiffness: 400, damping: 10 }}
			>
				<Tooltip content={'logout'} placement="rightStart" color="error">
					<button onClick={logoutBtnClicked}>
						<Image
							src="/icons/logout.png"
							width={45}
							height={45}
							alt="account"
						/>
					</button>
				</Tooltip>
			</motion.div>
			<Modal closeButton blur open={visible} onClose={closeHandler}>
				<Modal.Header>
					<div className="font-bold text-2xl underline text-red-600">
						logout
					</div>
				</Modal.Header>

				<Modal.Body>
					<div className="text-lg text-center">Do you want to logout?</div>
				</Modal.Body>
				<Modal.Footer>
					<Button auto flat onClick={closeHandler}>
						cancel
					</Button>
					<Button auto color="error" onClick={logoutUser}>
						logout
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default ExitButton;
