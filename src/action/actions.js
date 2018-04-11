
import * as actionType from './actionType';

// 点击加一
export const add = (data) => {
	return {
		type: actionType.ADD_NUM,
		data
	}
}

// 点击减一
export const reduce = (data) => {
	return {
		type: actionType.REDUCE_NUM,
		data
	}
}

// 点击减一
export const reset = (data) => {
	return {
		type: actionType.RESET_NUM,
		data
	}
}