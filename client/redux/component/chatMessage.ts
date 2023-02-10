import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const chatMessageSlice = createSlice({
  name: 'chatMessage',
  initialState: [
    {
      _id: 13,
      roomTopic:3,
      text: 'Okee siap mas, saya meluncur sekarang',
      createdAt: '1/18/2023, 05:16 PM',
      user: {
        _id: 6,
        name: 'Budi Kosasih',
        avatar:'https://imgx.gridoto.com/crop/37x13:939x635/700x465/photo/2020/10/22/525870346.jpg'
      },
      sent: true,
      received: true,
    },
    {
      _id: 12,
      roomTopic:3,
      text: 'Iyaa benar saya felix mas, tolong bantuannya ya mas',
      createdAt: '1/18/2023, 05:14 PM',
      user: {
        _id: 13,
        name: 'Felix Filipi',
        avatar:'https://i1.rgstatic.net/ii/profile.image/1070144784711680-1632153807475_Q512/Felix-Filipi.jpg'
      },
      sent: true,
      received: true,
    },
    {
      _id: 11,
      roomTopic:3,
      text: 'Mohon ditunggu ya mas, saya berangkat sekarang',
      createdAt: '1/18/2023, 05:12 PM',
      user: {
        _id: 6,
        name: 'Budi Kosasih',
        avatar:'https://imgx.gridoto.com/crop/37x13:939x635/700x465/photo/2020/10/22/525870346.jpg'
      },
      sent: true,
      received: true,
    },
    {
      _id: 10,
      roomTopic:3,
      text: 'Halo sore, benar dengan mas felix ya?',
      createdAt: '1/18/2023, 05:11 PM',
      user: {
        _id: 6,
        name: 'Budi Kosasih',
        avatar:'https://imgx.gridoto.com/crop/37x13:939x635/700x465/photo/2020/10/22/525870346.jpg'
      },
      sent: true,
      received: true,
    },
    {
      _id: 9,
      roomTopic:2,
      text: 'Okee, terima kasih ya mas',
      createdAt: '1/20/2023, 09:08 AM',
      user: {
        _id: 13,
        name: 'Felix Filipi',
        avatar:'https://i1.rgstatic.net/ii/profile.image/1070144784711680-1632153807475_Q512/Felix-Filipi.jpg'
      },
      sent: true,
      received: true,
    },
    {
      _id: 8,
      roomTopic:2,
      text: 'Ooo itu biarkan saja mas, tunggu saya dulu sebentar.',
      createdAt: '1/20/2023, 09:07 AM',
      user: {
        _id: 5,
        name: 'Hasan Kusnadi',
        avatar:'http://smanegeri1dayeuhluhur.sch.id/media_library/students/fe689269feb2ef5e13533da06f73711a.jpg'
      },
      sent: true,
      received: true,
    },
    {
      _id: 7,
      roomTopic:2,
      text: 'Mobil saya kenapa mengepul asap ya mas??',
      createdAt: '1/20/2023, 09:06 AM',
      user: {
        _id: 13,
        name: 'Felix Filipi',
        avatar:'https://i1.rgstatic.net/ii/profile.image/1070144784711680-1632153807475_Q512/Felix-Filipi.jpg'
      },
      sent: true,
      received: true,
    },
    {
      _id: 6,
      roomTopic:2,
      text: 'Mohon ditunggu, saya otw sekarang',
      createdAt: '1/20/2023, 09:03 AM',
      user: {
        _id: 5,
        name: 'Hasan Kusnadi',
        avatar:'http://smanegeri1dayeuhluhur.sch.id/media_library/students/fe689269feb2ef5e13533da06f73711a.jpg'
      },
      sent: true,
      received: true,
    },
    {
      _id: 5,
      roomTopic:2,
      text: 'Pagi mas',
      createdAt: '1/20/2023, 09:03 AM',
      user: {
        _id: 5,
        name: 'Hasan Kusnadi',
        avatar:'http://smanegeri1dayeuhluhur.sch.id/media_library/students/fe689269feb2ef5e13533da06f73711a.jpg'
      },
      sent: true,
      received: true,
    },
    {
      _id: 4,
      roomTopic:1,
      text: 'Baik, saya menuju kesana sekarang',
      createdAt: '1/23/2023, 11:28 AM',
      user: {
        _id: 4,
        name: 'Rico Purwanto',
        avatar:'https://www.superprof.co.id/gambar/guru/rumah-guru-saya-orang-indonesia-asli-menawarkan-belajar-bahasa-indonesia-simple-untuk-orang-asing.jpg'
      },
      sent: true,
      received: true,
    },
    {
      _id: 3,
      roomTopic:1,
      text: 'Saya daerah simpang borobudur ya mas',
      createdAt: '1/23/2023, 11:28 AM',
      user: {
        _id: 1,
        name: 'Christoper Luis',
        avatar:'https://media.licdn.com/dms/image/C4E03AQG9wiUg-P_K6Q/profile-displayphoto-shrink_800_800/0/1620477059425?e=2147483647&v=beta&t=45L8LTO0vrK88SMi3OjElujUO3u6T6d5Pmv5AGD6oPY'
      },
      sent: true,
      received: true,
    },
    {
      _id: 2,
      roomTopic:1,
      text: 'Saya meluncur kesana',
      createdAt: '1/23/2023, 11:26 AM',
      user: {
        _id: 4,
        name: 'Rico Purwanto',
        avatar:'https://www.superprof.co.id/gambar/guru/rumah-guru-saya-orang-indonesia-asli-menawarkan-belajar-bahasa-indonesia-simple-untuk-orang-asing.jpg'
      },
      sent: true,
      received: true,
    },
    {
      _id: 1,
      roomTopic:1,
      text: 'Halo kak, mohon ditunggu ya kak',
      createdAt: '1/23/2023, 11:25 AM',
      user: {
        _id: 4,
        name: 'Rico Purwanto',
        avatar:'https://www.superprof.co.id/gambar/guru/rumah-guru-saya-orang-indonesia-asli-menawarkan-belajar-bahasa-indonesia-simple-untuk-orang-asing.jpg'
      },
      sent: true,
      received: true,
    },
  ],
  reducers: {
    setChatMessage: (state, action: PayloadAction<any[]>) => action.payload
  },
})

export const {setChatMessage} = chatMessageSlice.actions
export default chatMessageSlice.reducer
