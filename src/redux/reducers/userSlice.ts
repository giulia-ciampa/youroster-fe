import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UserState {
  photoUrl: string | null
  name: string | null
  surname: string | null
  email: string | null
  roleNames: string[] | null
}

const initialState: UserState = {
  photoUrl: localStorage.getItem("photoUrl") || null,
  name: "",
  surname: "",
  email: "",
  roleNames: localStorage.getItem("roleNames")
    ? JSON.parse(localStorage.getItem("roleNames")!)
    : null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      if (action.payload.photoUrl !== undefined) {
        state.photoUrl = action.payload.photoUrl
        if (action.payload.photoUrl)
          localStorage.setItem("photoUrl", action.payload.photoUrl)
      }
      if (action.payload.name !== undefined) state.name = action.payload.name
      if (action.payload.surname !== undefined)
        state.surname = action.payload.surname
      if (action.payload.email !== undefined) state.email = action.payload.email

      if (action.payload.roleNames !== undefined) {
        state.roleNames = action.payload.roleNames
        if (action.payload.roleNames) {
          localStorage.setItem(
            "roleNames",
            JSON.stringify(action.payload.roleNames),
          )
        }
      }
    },
    clearUser: (state) => {
      state.photoUrl = localStorage.getItem("photoUrl")
      state.name = null
      state.surname = null
      state.email = null
      state.roleNames = null

      localStorage.removeItem("token")
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
