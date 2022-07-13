import * as T from "../types/global"

export default (state: any, action: { payload: any; type: string }) => {
  switch (action.type) {
    case T.DISABLE_STUDENT:
      return {
        ...state,
        disabledStudentIds: [...state.disabledStudentIds, action.payload],
      }
    case T.ENABLE_STUDENT:
      return {
        ...state,
        disabledStudentIds: [
          ...state.disabledStudentIds.filter(
            (id: T.IStudent) => id !== action.payload
          ),
        ],
      }
    case T.SET_GROUPS:
      return {
        ...state,
        groups: [
          ...state.groups.filter(
            (f: T.IStudentGroup) => f.id !== action.payload.id
          ),
          action.payload,
        ],
      }
    case T.RESET_GROUPS:
      return {
        ...state,
        groups: [
          ...state.groups.filter((group: any) => {
            return group.id !== action.payload
          }),
        ],
      }
    default:
      return state
  }
}
