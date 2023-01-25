import React from 'react';
import SimpleBar from 'simplebar-react';
import { useDispatch, useSelector } from 'react-redux';
import { changeRightSide } from '../../../redux/slices/leftRightSlice';
import { RootState } from '@/redux/store';

const RightSideUpperComponent = () => {
	const myDispatch = useDispatch();
	const rightSide = useSelector((state:RootState) => state.leftRight.rightSide);

	return (
		<div className="mx-6 my-5">
			<SimpleBar style={{ maxHeight: '83vh' }}>
				<div
					className={`${
						rightSide === 'announcement' ? 'text-green-500' : ''
					} font-bold text-xl`}
				>
					<button
						onClick={() => myDispatch(changeRightSide('announcement'))}
					>{`# Announcement 📢`}</button>
				</div>
				<hr className="mt-3" />

				<div className="pt-6">
					<div className="font-bold text-xl">{`> Chat room 💬`}</div>
					<div className="">
						<div className="">
							<div
								className={`${
									rightSide === 'chat-general' ? 'text-green-500 font-bold' : ''
								}`}
							>
								<button
									onClick={() => myDispatch(changeRightSide('chat-general'))}
								>
									# General
								</button>
							</div>
							<div
								className={`${
									rightSide === 'chat-technical'
										? 'text-green-500 font-bold'
										: ''
								}`}
							>
								<button
									onClick={() => myDispatch(changeRightSide('chat-technical'))}
								>
									# Technical
								</button>
							</div>
							<div
								className={`${
									rightSide === 'chat-important'
										? 'text-green-500 font-bold'
										: ''
								}`}
							>
								<button
									onClick={() => myDispatch(changeRightSide('chat-important'))}
								>
									# Important
								</button>
							</div>
							<div
								className={`${
									rightSide === 'chat-doubt' ? 'text-green-500 font-bold' : ''
								}`}
							>
								<button
									onClick={() => myDispatch(changeRightSide('chat-doubt'))}
								>
									# Doubt
								</button>
							</div>
						</div>
					</div>
				</div>
				<hr className="mt-3" />

				<div className="pt-6">
					<div className="font-bold text-xl">{`> Forum 🚀`}</div>
					<div
						className={`${
							rightSide === 'forum-general' ? 'text-green-500 font-bold' : ''
						}`}
					>
						<button
							onClick={() => myDispatch(changeRightSide('forum-general'))}
						>
							# General Discussion
						</button>
					</div>
					<div
						className={`${
							rightSide === 'forum-improvement'
								? 'text-green-500 font-bold'
								: ''
						}`}
					>
						<button
							onClick={() => myDispatch(changeRightSide('forum-improvement'))}
						>
							# Improvement Proposal
						</button>
					</div>
					<div
						className={`${
							rightSide === 'forum-grant' ? 'text-green-500 font-bold' : ''
						}`}
					>
						<button onClick={() => myDispatch(changeRightSide('forum-grant'))}>
							# Grant Program
						</button>
					</div>
					<div
						className={`${
							rightSide === 'forum-important' ? 'text-green-500 font-bold' : ''
						}`}
					>
						<button
							onClick={() => myDispatch(changeRightSide('forum-important'))}
						>
							# Important Discussion
						</button>
					</div>
				</div>
				<hr className="mt-3" />

				<div className="pt-6">
					<div className="font-bold text-xl">{`> Proposal 🗳️`}</div>
					<div
						className={`${
							rightSide === 'proposal-rfp' ? 'text-green-500 font-bold' : ''
						}`}
					>
						<button onClick={() => myDispatch(changeRightSide('proposal-rfp'))}>
							# RFP
						</button>
					</div>
					<div
						className={`${
							rightSide === 'proposal-onChainVoting'
								? 'text-green-500 font-bold'
								: ''
						}`}
					>
						<button
							onClick={() =>
								myDispatch(changeRightSide('proposal-onChainVoting'))
							}
						>
							# On-chain voting
						</button>
					</div>
				</div>
				<hr className="mt-3" />
				<div className="pt-6">
					<div
						className={`${
							rightSide === 'analytics' ? 'text-green-500' : ''
						} font-bold text-xl`}
					>
						<button
							onClick={() => myDispatch(changeRightSide('analytics'))}
						>{`# Analytics 📊`}</button>
					</div>
				</div>
			</SimpleBar>
		</div>
	);
};

export default RightSideUpperComponent;
