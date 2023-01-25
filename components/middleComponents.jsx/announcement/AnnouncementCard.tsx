import React from 'react';
import { Card, Grid, Text, Button, Row, Spacer } from '@nextui-org/react';

type AnnouncementCardType = {
	title:string, 
	desc:string,
	by:string
}

const AnnouncementCard = ({ title, desc, by }:AnnouncementCardType) => {
	return (
		<div className="flex justify-center my-6">
			<Card css={{ mw: '60vw' }}>
				<div className="flex justify-between my-3 mx-3">
					<div className="font-bold text-xl text-red-600">📢 {title}</div>
					<div>
						<span className="font-bold text-pink-700">by:</span>{' '}
						{by.substring(17)}
					</div>
				</div>
				<Card.Divider />
				<Card.Body css={{ py: '$10    ' }}>
					<div>{desc}</div>
				</Card.Body>
			</Card>
		</div>
	);
};

export default AnnouncementCard;
