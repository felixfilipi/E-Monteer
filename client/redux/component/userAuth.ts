import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: [
    {
      id:13,
      garageId: null,
      name: 'Felix Filipi',
      email: 'felixfilipi4@gmail.com',
      password:'admin123',
      address:'Tirtasani Royal Park 9/6 Karangploso',
      photoUrl:'https://i1.rgstatic.net/ii/profile.image/1070144784711680-1632153807475_Q512/Felix-Filipi.jpg',
      idCard: null,
      phone: '087892314322',
      role:'Customer'
    },
    {
      id:12,
      garageId: 7,
      name: 'Febrian Nugraho',
      email: 'febrian_nugroho@gmail.com',
      password:'febriannugroho',
      address:'Malang',
      photoUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXDah1BTilOy4DOplE2ICBKv11tanHZXN3g&usqp=CAU',
      idCard: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXDah1BTilOy4DOplE2ICBKv11tanHZXN3g&usqp=CAU',
      phone: '087899887729',
      role:'Owner'
    },
    {
      id:11,
      garageId: 6,
      name: 'Nando Fernandez',
      email: 'nando_fernandez@gmail.com',
      password:'nando_fernandez',
      address:'Malang',
      photoUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXDah1BTilOy4DOplE2ICBKv11tanHZXN3g&usqp=CAU',
      idCard: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXDah1BTilOy4DOplE2ICBKv11tanHZXN3g&usqp=CAU',
      phone: '08777722112',
      role:'Owner'
    },
    {
      id:10,
      garageId: 5,
      name: 'Jose Alfonso',
      email: 'jose_alfonso@gmail.com',
      password:'josealfonso',
      address:'Malang',
      photoUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXDah1BTilOy4DOplE2ICBKv11tanHZXN3g&usqp=CAU',
      idCard: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXDah1BTilOy4DOplE2ICBKv11tanHZXN3g&usqp=CAU',
      phone: '087876567872',
      role:'Owner'
    },
    {
      id:9,
      garageId: 4,
      name: 'Ezra Purnomo',
      email: 'ezra_purnomo@gmail.com',
      password:'ezrapurnomo',
      address:'Malang',
      photoUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXDah1BTilOy4DOplE2ICBKv11tanHZXN3g&usqp=CAU',
      idCard: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXDah1BTilOy4DOplE2ICBKv11tanHZXN3g&usqp=CAU',
      phone: '087777665522',
      role:'Owner'
    },
    {
      id:8,
      garageId: 3,
      name: 'Michael Surya',
      email: 'michael_surya@gmail.com',
      password:'michaelsurya',
      address:'Malang',
      photoUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXDah1BTilOy4DOplE2ICBKv11tanHZXN3g&usqp=CAU',
      idCard: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXDah1BTilOy4DOplE2ICBKv11tanHZXN3g&usqp=CAU',
      phone: '087812343211',
      role:'Owner'
    },
    {
      id:7,
      garageId: 2,
      name: 'Andreas Taruna',
      email: 'andreas_taruna@gmail.com',
      password:'andreastaruna',
      address:'Malang',
      photoUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXDah1BTilOy4DOplE2ICBKv11tanHZXN3g&usqp=CAU',
      idCard: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXDah1BTilOy4DOplE2ICBKv11tanHZXN3g&usqp=CAU',
      phone: '087987678908',
      role:'Owner'
    },
    {
      id:6,
      garageId: 1,
      name: 'Budi Kosasih',
      email: 'budi_kosasih@gmail.com',
      password:'budikosasih',
      address:'Batam',
      photoUrl:'https://imgx.gridoto.com/crop/37x13:939x635/700x465/photo/2020/10/22/525870346.jpg',
      idCard: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXDah1BTilOy4DOplE2ICBKv11tanHZXN3g&usqp=CAU',
      phone: '087855332121',
      role:'Mechanic'
    },
    {
      id:5,
      garageId: 1,
      name: 'Hasan Kusnadi',
      email: 'hasan_kusnadi@gmail.com',
      password:'hasankusnadi',
      address:'Batam',
      photoUrl:'http://smanegeri1dayeuhluhur.sch.id/media_library/students/fe689269feb2ef5e13533da06f73711a.jpg',
      idCard: 'https://cdn.pixabay.com/photo/2016/12/13/17/48/master-1904748__480.jpg',
      phone: '087872728899',
      role:'Mechanic'
    },
    {
      id:4,
      garageId: 1,
      name: 'Rico Purwanto',
      email: 'rico_purwanto@gmail.com',
      password:'ricopurwanto',
      address:'Batam',
      photoUrl:'https://www.superprof.co.id/gambar/guru/rumah-guru-saya-orang-indonesia-asli-menawarkan-belajar-bahasa-indonesia-simple-untuk-orang-asing.jpg',
      idCard: 'https://media.istockphoto.com/id/1255420917/id/foto/teknisi-mobil-pengecekan-otomotif-di-garasi.jpg?s=612x612&w=0&k=20&c=MMwKFYfoyo2fm6hkqaRZz10VuQV8VAIGMiqn12zvYdE=',
      phone: '087855332121',
      role:'Mechanic'
    },
    {
      id:3,
      garageId: 1,
      name: 'admin_garage',
      email: 'admin_garage@gmail.com',
      password:'admin',
      address:'admin',
      photoUrl:'https://binus.ac.id/wp-content/uploads/2020/06/2-1.jpg',
      idCard: null,
      phone: '087892314322',
      role:'Garage'
    },
    {
      id:2,
      garageId: 1,
      name: 'admin_mechanic',
      email: 'admin_mechanic@gmail.com',
      password:'admin',
      address:'admin',
      photoUrl:'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
      idCard: null,
      phone: '087892314322',
      role:'Mechanic'
    },
    {
      id:1,
      garageId: null,
      name: 'admin_customer',
      email: 'admin_customer@gmail.com',
      password:'admin',
      address:'admin',
      photoUrl:'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
      idCard: null,
      phone: '087892314300',
      role:'Customer'
    },
  ],
  reducers: {
    setUserAuth: (state, action: PayloadAction<any[]>) => action.payload
  },
})

export const {setUserAuth} = userAuthSlice.actions
export default userAuthSlice.reducer
