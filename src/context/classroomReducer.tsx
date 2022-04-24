import * as T from "../types/global"

export default (state: any, action: { payload: any; type: string }) => {
  switch (action.type) {
    case T.GET_CLASSROOMS:
      return {
        ...state,
        classrooms: action.payload,
        loading: false,
      }

    default:
      return state
  }
}
