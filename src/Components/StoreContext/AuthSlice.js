import { createSlice } from "@reduxjs/toolkit";

const intitalToken = localStorage.getItem("token")
const intitalEmail = localStorage.getItem("email")

const initialAuthState = {
  idToken: intitalToken,
  isLoggedIn: !!intitalToken,
  isPrime: false,
  email: intitalEmail,
}

const AuthSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload.idToken)
      localStorage.setItem("email", action.payload.email)
      state.idToken = action.payload.idToken
      state.email = action.payload.email
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("token")
      localStorage.removeItem("email")
      state.idToken = null
      state.email = ''
      state.isLoggedIn = false
    },
    makeIsPrime(state) {
      state.isPrime = true;
    }
  }
})


export const AuthAction = AuthSlice.actions;

export default AuthSlice.reducer;