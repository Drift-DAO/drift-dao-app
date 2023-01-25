import React from 'react';
import { Tooltip } from '@nextui-org/react';
import { Modal, Input, Row, Button, Loading } from '@nextui-org/react';
import { useSelector, useDispatch } from 'react-redux';
import { changeLeftSide } from '../../../redux/slices/leftRightSlice';
import { changeValue } from '../../../redux/slices/refreshPageSlice';
import axios from 'axios';
import { RootState } from '@/redux/store';

const Exit_DAO = () => {
	const myDispatch = useDispatch();
	const { leftSide, rightSide, dao_id } = useSelector(
		(state: RootState) => state.leftRight
	);
	const userAddr = useSelector((state: RootState) => state.addr.myAddress);
	const [visible, setVisible] = React.useState(false);
	const [leaving, setLeaving] = React.useState(false);

	const closeHandler = () => {
		setVisible(false);
	};

	const leaveBtnClicked = () => {
		setVisible(true);
		setLeaving(false);
	};

	const leaveDAO = async () => {
		setLeaving(true);
		// console.log('dao_id is: ', dao_id);
		const res = await axios.post(
			'https://www.backend.drift-dao.com/DAO/leave',
			{
				userAddr,
				daoId: dao_id,
			}
		);
		// console.log('result is: ', res.data);
		// console.log('left DAO', leftSide);
		myDispatch(changeLeftSide('home'));
		myDispatch(changeValue());
		setLeaving(false);
		setVisible(false);
	};

	return (
		<div>
			<Tooltip color="error" content="leave DAO" placement="left">
				<Button color="error" size="md" onPress={leaveBtnClicked}>
					leave DAO
				</Button>
			</Tooltip>
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
						<div className="font-bold text-2xl text-red-500">
							leave {leftSide} DAO?
						</div>
						<hr style={{ width: '40vw' }} />
					</div>
				</Modal.Header>
				<Modal.Body>
					<div className="text-center">
						Are you sure, you want to leave {leftSide} DAO?
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button size="md" flat color="primary" onPress={closeHandler}>
						<div className="text-xl">cancel</div>
					</Button>
					<Button size="md" onPress={leaveDAO} color="error">
						{leaving ? (
							<div className="text-xl">
								<span className="mx-2">leaving</span>
								<Loading color="white" type="points-opacity" />
							</div>
						) : (
							<div className="text-xl">yes</div>
						)}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Exit_DAO;
