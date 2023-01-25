import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import {
	changeLeftSide,
	changeDAOId,
} from '../../../redux/slices/leftRightSlice';
import { RootState } from '@/redux/store';

type DaoIconComponentType = {
	img: string;
	name: string;
	dao_id: string;
};

const DaoIconComponent = ({ img, name, dao_id }:DaoIconComponentType) => {
	const myDispatch = useDispatch();
	const currLeft = useSelector((state:RootState) => state.leftRight.leftSide);
	const active = currLeft === name;

	const changeLeftSideBtnClick = async () => {
		myDispatch(changeLeftSide(name));
		myDispatch(changeDAOId(dao_id));
	};
	return (
		<div
			className={`${
				active ? 'bg-gradient-to-r from-pink-500' : ''
			} flex justify-center justify-items-center py-2`}
		>
			<motion.div
				whileHover={{ scale: 1.2 }}
				transition={{ type: 'spring', stiffness: 400, damping: 10 }}
			>
				<button className="overflow-hidden" onClick={changeLeftSideBtnClick}>
					<Image
						className="rounded-lg bg-white"
						src={img}
						width={45}
						height={45}
						alt={name}
					/>
				</button>
			</motion.div>
		</div>
	);
};

export default DaoIconComponent;
