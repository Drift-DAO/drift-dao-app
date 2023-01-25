import React, { useEffect, useState } from 'react';
import { Card } from '@nextui-org/react';
import axios from 'axios';
import Image from 'next/image';
import { Orbis } from '@orbisclub/orbis-sdk';
import moment from 'moment';

let orbis = new Orbis();
const ForumPostComponent = ({ post }) => {
	const [reaction, setReaction] = useState('');
	const [totalLikes, setTotalLikes] = useState(0);
	const [totalDislikes, setTotalDislikes] = useState(0);
	const time = JSON.stringify(moment.unix(post.timestamp)._d);

	const fetchReaction = async () => {
		let res = await orbis.isConnected();
		if (!res) {
			await orbis.connect_v2({
				provider: window.ethereum,
				lit: false,
			});
		}
		let { data, error } = await orbis.getReaction(post.stream_id, res.did);
		if (data) {
			setReaction(data.type);
		} else {
			setReaction('');
		}
	};

	useEffect(() => {
		fetchReaction();
		setTotalLikes(post.count_likes);
		setTotalDislikes(post.count_downvotes);
	}, []);

	const likeThePost = async () => {
		if (reaction === 'like') {
			return;
		}
		if (reaction === 'downvote') {
			if (totalDislikes > 0) {
				setTotalDislikes(totalDislikes - 1);
			}
		}
		setTotalLikes(totalLikes + 1);
		setReaction('like');
		let res = await orbis.isConnected();
		if (!res) {
			await orbis.connect_v2({
				provider: window.ethereum,
				lit: false,
			});
		}

		let result = await orbis.react(post.stream_id, 'like');
	};

	const dislikeThePost = async () => {
		if (reaction === 'downvote') {
			return;
		}
		if (reaction === 'like') {
			if (totalLikes > 0) {
				setTotalLikes(totalLikes - 1);
			}
		}
		setTotalDislikes(totalDislikes + 1);
		setReaction('downvote');
		let res = await orbis.isConnected();
		if (!res) {
			await orbis.connect_v2({
				provider: window.ethereum,
				lit: false,
			});
		}
		await orbis.react(post.stream_id, 'downvote');
	};

	return (
		<div className="flex justify-center justify-items-center my-6">
			<Card variant="bordered" style={{ width: '60vw' }}>
				<div className="text-xl font-bold my-4 mx-3">{post.content.title}</div>
				<Card.Divider></Card.Divider>
				<Card.Body>
					<div>{post.content.body}</div>
				</Card.Body>
				<Card.Divider></Card.Divider>
				<div className="my-3 mx-3">
					<div className="flex justify-between justify-items-center">
						<div>
							<div>
								<span className="font-bold text-pink-700">Date & time:</span>{' '}
								{time.substring(12, 17)}, {time.substring(1, 11)}
							</div>
							<div className="justify-end">
								<span className="font-bold text-pink-700">by:</span>{' '}
								{post.creator.substring(17)}
							</div>
						</div>
						<div className="flex my-1">
							<div className="mx-2 flex">
								<div className="mx-1 my-1">{totalLikes}</div>
								<button className="" onClick={likeThePost}>
									<Image
										src={`${
											reaction === 'like'
												? '/forum_icons/supported.png'
												: '/forum_icons/support.png'
										}`}
										height={35}
										width={35}
										alt="support"
									/>
								</button>
							</div>

							<div className="flex mx-2">
								<div className="mx-1 my-1">{totalDislikes}</div>
								<button className="" onClick={dislikeThePost}>
									<Image
										src={`${
											reaction === 'downvote'
												? '/forum_icons/disliked.png'
												: '/forum_icons/dislike.png'
										}`}
										height={35}
										width={35}
										alt="dislike"
									/>
								</button>
							</div>
							{/* <div className="flex mx-2">
								<div className="mx-1 my-1">5</div>
								<button className="">
									<Image
										src="/forum_icons/comment.png"
										height={35}
										width={35}
										alt="comment"
									/>
								</button>
							</div> */}
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default ForumPostComponent;
