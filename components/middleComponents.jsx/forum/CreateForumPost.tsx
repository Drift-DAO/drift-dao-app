import React from 'react';
import { Orbis } from '@orbisclub/orbis-sdk';
import { Modal, Input, Row, Button, Loading } from '@nextui-org/react';
import { useSelector, useDispatch } from 'react-redux';
import { changeValue } from '../../../redux/slices/refreshPageSlice';
import Swal from 'sweetalert2';

let orbis = new Orbis();
const CreateForumPost = () => {
	const { leftSide, rightSide } = useSelector((state) => state.leftRight);
	const myDispatch = useDispatch();

	const [visible, setVisible] = React.useState(false);
	const [posting, setPosting] = React.useState(false);
	const [heading, setHeading] = React.useState('');
	const [desc, setDesc] = React.useState('');

	const createPostButtonClicked = async () => {
		setVisible(true);
	};

	const closeHandler = () => {
		setVisible(false);
	};

	const postBtnClicked = async () => {
		if (heading === '' || desc === '') {
			alert('heading or description is empty.');
			return;
		}

		setPosting(true);

		let res = await orbis.isConnected();
		if (!res) {
			await orbis.connect_v2({
				provider: window.ethereum,
				lit: false,
			});
		}

		let myFirstPost = await orbis.createPost({
			title: heading,
			body: desc,
			context: `${leftSide}-${rightSide}`,
		});
		setPosting(false);
		myDispatch(changeValue());
		setHeading('');
		setDesc('');
		setVisible(false);
		Swal.fire('Posted!', 'Posted successfully in the forum', 'success');
	};
	return (
		<div className="flex justify-center">
			<Button
				auto
				color="gradient"
				shadow
				onPress={createPostButtonClicked}
				style={{ width: '50vw' }}
			>
				<div className="text-lg">Create post</div>
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
						<div className="font-bold text-2xl text-violet-800">Your Post</div>
						<hr style={{ width: '40vw' }} />
					</div>
				</Modal.Header>
				<Modal.Body>
					<div className="text-center">
						<div className="mt-3">
							<input
								placeholder="heading..."
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
								placeholder="Description..."
								value={desc}
								onChange={(e) => setDesc(e.target.value)}
								className="px-3"
								style={{
									borderWidth: '1px',
									borderRadius: '10px',
									width: '40vw',
									borderColor: 'purple',
								}}
								rows="9"
							/>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button size="md" flat color="error" onPress={closeHandler}>
						<div className="text-xl">cancel</div>
					</Button>
					<Button size="md" onPress={postBtnClicked} color="gradient">
					{posting ? (
							<div className="text-xl">
								<span className="mx-2">posting</span>
								<Loading color="error" type="points-opacity" />
							</div>
						) : (
							<div className="text-xl">post</div>
						)}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default CreateForumPost;
