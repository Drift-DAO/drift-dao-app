import React from 'react';
import { Card, Grid, Text, Link } from '@nextui-org/react';

const ChatCardRight = ({ sender, msg }) => {
	return (
		<div className="flex justify-end my-2 mx-2">
			<Card css={{ p: '$2', mw: '500px' }}>
				<Card.Header>
					<img
						alt="nextui logo"
						src="/icons/myaccount.png"
						width="34px"
						height="34px"
					/>
					<Grid.Container css={{ pl: '$6' }}>
						<Grid xs={12}>
							<Text h4 css={{ lineHeight: '$xs' }}>
								{sender}
							</Text>
						</Grid>
					</Grid.Container>
				</Card.Header>
				<Card.Body css={{ py: '$1' }}>
					<Text>{msg}</Text>
				</Card.Body>
			</Card>
		</div>
	);
};

export default ChatCardRight;
