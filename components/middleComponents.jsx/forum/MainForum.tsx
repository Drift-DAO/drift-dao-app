import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import CreateForumPost from './CreateForumPost';
import ForumPostComponent from './ForumPostComponent';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
// @ts-ignore
import { Orbis } from '@orbisclub/orbis-sdk';
import { RootState } from '@/redux/store';

let orbis = new Orbis();
const MainForum = () => {
	const { leftSide, rightSide } = useSelector(
		(state: RootState) => state.leftRight
	);
	const { value } = useSelector((state: RootState) => state.refreshPage);
	const [allPosts, setAllPosts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			let res = await orbis.isConnected();
			if (!res) {
				await orbis.connect_v2({
					provider: window.ethereum,
					lit: false,
				});
			}

			let { data, error } = await orbis.getPosts({
				context: `${leftSide}-${rightSide}`,
			});
			setAllPosts(data);
			setLoading(false);
		};
		fetchData();
	}, [value, leftSide, rightSide]);

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
						{allPosts.map((post, index) => (
							<ForumPostComponent key={index} post={post} />
						))}
					</SimpleBar>
				)}
			</div>
			<div>
				<hr className="py-3" />
				<CreateForumPost />
			</div>
		</div>
	);
};

export default MainForum;
