import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { Tooltip } from '@nextui-org/react';
import { Modal, useModal, Text, Avatar } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { RootState } from '@/redux/store';

type DAODataType = {
	dao_name: string;
	dao_chain: any[];
	dao_creator_address: string;
	dao_short_desc?: string | undefined;
	dao_desc?: string | undefined;
	dao_logo?: string | undefined;
};

const DAO_detail = () => {
	const [visible, setVisible] = useState(false);
	const { dao_id } = useSelector((state: RootState) => state.leftRight);
	const [loading, setLoading] = useState(false);
	const [DAOData, setDAOData] = useState({} as DAODataType);

	const daoDetailsBtn = async () => {
		setVisible(true);
		setLoading(true);
		const result = await axios.get(
			`https://www.backend.drift-dao.com/DAO/${dao_id}`
		);
		// console.log('fetched result is:', result.data);
		setDAOData(result.data);
		setLoading(false);
	};

	const closeHandler = () => {
		setVisible(false);
	};

	return (
		<div>
			<Tooltip
				color="secondary"
				content="see the details of the DAO"
				placement="left"
			>
				<Button bordered color="gradient" size="md" onPress={daoDetailsBtn}>
					DAO details
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
						<div className="font-bold text-2xl text-violet-800">
							DAO details
						</div>
						<hr style={{ width: '40vw' }} />
					</div>
				</Modal.Header>
				<Modal.Body>
					{loading ? (
						<div className="flex justify-center">
							<ReactLoading
								type="spinningBubbles"
								color="purple"
								height={45}
								width={45}
								className="my-auto"
							/>
						</div>
					) : (
						<div>
							{Object.keys(DAOData).length !== 0 ? (
								<div>
									<div className="flex justify-center mb-3">
										<Avatar src={DAOData.dao_logo} css={{ size: '$20' }} />
									</div>
									<div className="font-bold text-black">
										DAO name:
										<span className="text-xl text-blue-500 px-3">
											{DAOData.dao_name.toUpperCase()}
										</span>
									</div>

									<div className="font-bold text-black">
										Description:
										<span className="text-md text-pink-700 px-3">
											{DAOData.dao_desc}
										</span>
									</div>
									<div className="font-bold text-black">
										DAO chain:
										<span className="text-md text-pink-700 px-3">
											{' '}
											{DAOData.dao_chain}
										</span>
									</div>
									<div className="font-bold text-black">
										Group`&apos;`s creator address:
										<span className="text-md text-pink-700 px-3">
											{DAOData.dao_creator_address}
										</span>
									</div>
								</div>
							) : (
								<div></div>
							)}
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					<div className="flex justify-end">
						<Button size="md" flat color="error" onPress={closeHandler}>
							<div className="text-xl">close</div>
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default DAO_detail;
