import React,{useState} from 'react';

const OptionInputField = () => {
	return (
		<div>
			<div className="mt-3">
				<input
					placeholder="proposal heading..."
					value={""}
					onChange={(e) => {return;}}
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
		</div>
	);
};

export default OptionInputField;
