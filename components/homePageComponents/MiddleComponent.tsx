import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import MainAnalytics from '../middleComponents.jsx/Analytics/MainAnalytics';
import AnnouncementCard from '../middleComponents.jsx/announcement/AnnouncementCard';
import CreateAnnouncementPost from '../middleComponents.jsx/announcement/CreateAnnouncementPost';
import MainAnnouncement from '../middleComponents.jsx/announcement/MainAnnouncement';
import MainChatRoom from '../middleComponents.jsx/chatRoom/MainChatRoom';
import CreateForumPost from '../middleComponents.jsx/forum/CreateForumPost';
import ForumPostComponent from '../middleComponents.jsx/forum/ForumPostComponent';
import MainForum from '../middleComponents.jsx/forum/MainForum';
import MainProposal from '../middleComponents.jsx/proposal/MainProposal';

const MiddleComponent = () => {
	const { leftSide, rightSide } = useSelector(
		(state: RootState) => state.leftRight
	);

	if (rightSide === 'announcement') {
		return (
			<div>
				<MainAnnouncement />
			</div>
		);
	}

	if (rightSide.substring(0, 4) === 'chat') {
		return (
			<div>
				<MainChatRoom />
			</div>
		);
	}

	if (rightSide.substring(0, 5) === 'forum') {
		return (
			<div>
				<MainForum />
			</div>
		);
	}

	if (rightSide.substring(0, 8) === 'proposal') {
		return (
			<div>
				<MainProposal />
			</div>
		);
	}

	if (rightSide === 'analytics') {
		return (
			<div>
				<MainAnalytics />
			</div>
		);
	}

	return <></>;
};

export default MiddleComponent;
