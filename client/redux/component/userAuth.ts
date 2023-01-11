import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: [
    {
      name: 'admin_customer',
      email: 'admin_customer@gmail.com',
      password:'admin',
      address:'admin',
      photoUrl:'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
      phone: '087892314322',
      role:'customer'
    },
    {
      name: 'admin_mechanic',
      email: 'admin_mechanic@gmail.com',
      password:'admin',
      address:'admin',
      photoUrl:'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
      phone: '087892314322',
      role:'mechanic'
    },
    {
      name: 'admin_garage',
      email: 'admin_garage@gmail.com',
      password:'admin',
      address:'admin',
      photoUrl:'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
      phone: '087892314322',
      role:'garage'
    },
  ],
  reducers: {
    setUserAuth: (state, action: PayloadAction<any[]>) => action.payload
  },
})

export const {setUserAuth} = userAuthSlice.actions
export default userAuthSlice.reducer
