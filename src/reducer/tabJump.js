import * as actionType from '../action/actionType';

const initState = {
	index: 0 ,
	left: 0,
	tabLeft:0,
	tabWidth: '20%', // tab的默认宽度
};


export default function tabJump(state = initState, action ){
	const {
		type,
		data
	} = action
	switch(type) {
		case actionType.TAP_JUMP:
			return Object.assign(state,data,{
				index: data.id,
				left: data.left
			})
		default:
			return state
	}
}