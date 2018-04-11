import * as actionType from '../action/actionType';

const initState = {
	num: 0 
};

export default function add(state = initState, action ){
	switch(action.type) {
		case actionType.ADD_NUM:
			return {
				num: ++state.num
			}
		case actionType.REDUCE_NUM:
			return {
				num: --state.num
			}
		case actionType.RESET_NUM:
			return {
				num: 0
			}
		default:
			return state
	}
}