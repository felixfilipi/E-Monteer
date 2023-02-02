import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import AppLoading from 'expo-app-loading'
import React, { Component, useEffect } from 'react'
import { StyleSheet, View, Text, Platform, Alert } from 'react-native'
import {
  Bubble,
  GiftedChat,
  SystemMessage,
  IMessage,
  Send,
  SendProps,
} from 'react-native-gifted-chat'

import {messagesData} from './example-expo/data/messages'
import { ChatBar } from '../Component/navBar'
import { useAppDispatch, useAppSelector } from '../../redux'
import { setChatMessage } from '../../redux/component/chatMessage'
import { setChatRoom } from '../../redux/component/chatRoom'

const styles = StyleSheet.create({
  container: { flex: 1 },
})

export default class App extends Component {
   
  state = {
    inverted: false,
    step: 0,
    messages: [],
    typingText: null,
    appIsReady: false,
    isTyping: false,
    curr_user: {id:null, name:null, photoUrl:null},
    curr_otherUser: {phone:null, name:null, photoUrl:null},
    user: {_id: null, name:null},
    otherUser: {_id:null, name:null, avatar:null},
    targetUser: {roomTopic:null, targetId:null},
    dispatch: null,
    all_messages: null,
    chatRoom: null,
  }

  _isMounted = false

  loadHooks = () => {
    const activeUser = useAppSelector(state => state.activeStatus);    
    const user_data = useAppSelector(state => state.userAuth);
    const targetUser = useAppSelector(state => state.chatTarget);
    const curr_user = user_data.find((item) => item.id === activeUser.id);
    const curr_otherUser = user_data.find((item) => item.id === targetUser.targetId);

    const user = {_id: curr_user.id, name: curr_user.name}
    const otherUser = {_id: curr_otherUser.id, name: curr_otherUser.name, avatar:curr_otherUser.photoUrl}
   
    const messages = useAppSelector(state => state.chatMessage);
    const curr_message = messages.filter((item) => item.roomTopic === targetUser.roomTopic)
    const chatRoom = useAppSelector(state => state.chatRoom);
    const dispatch = useAppDispatch();

    useEffect(() => {
      this.setState({
        all_messages: messages,
        messages: curr_message,
        curr_user: curr_user,
        curr_otherUser: curr_otherUser,
        user: user,
        otherUser: otherUser,
        targetUser: targetUser,
        chatRoom: chatRoom,
        dispatch: dispatch,
      })
    }, [])

    return null;
  }


  componentDidMount() {
    this._isMounted = true
    this.setState({
      messages: messagesData,
      appIsReady: true,
      isTyping: false,
    })
  
  }

  componentWillUnmount() {
    this._isMounted = false
  }
  
  onSend = (messages = []) => {

    const step = this.state.step + 1
    const sentMessages = [{ ...messages[0], sent: true, received: true }]
    this.setState((previousState: any) => {
      return {
        messages: GiftedChat.append(
          previousState.messages,
          sentMessages,
        ),
        step,
      }
    })
    this.state.dispatch(setChatMessage([
      {
        _id:this.state.all_messages[0]._id + 1, 
        roomTopic: this.state.targetUser.roomTopic,
        text: messages[0].text,
        createdAt: new Date().toLocaleString(),
        user:{
          _id: this.state.curr_user.id,
          name: this.state.curr_user.name,
          avatar: this.state.curr_user.photoUrl,
        },
        sent:true,
        received:true,
      }, ...this.state.all_messages
    ]))

    const new_chatRoom = this.state.chatRoom.map((item : any) => {return {...item}});
    
    for(let i = 0; i<= new_chatRoom.length - 1; i++){
      if(new_chatRoom[i].roomTopic == this.state.targetUser.roomTopic){
        new_chatRoom[i].lastMessage = messages[0].text;
        new_chatRoom[i].last_date_time = new Date().toLocaleDateString() + ', ' + new Date().toLocaleTimeString()
      }
    }

    this.state.dispatch(setChatRoom(new_chatRoom));
  }

  onReceive = (text: string) => {
    this.setState((previousState: any) => {
      return {
        messages: GiftedChat.append(
          previousState.messages as any,
          [
            {
              _id: Math.round(Math.random() * 1000000),
              text,
              createdAt: new Date(),
              user: this.state.otherUser,
            },
          ],
          Platform.OS !== 'web',
        ),
      }
    })
  }

  onSendFromUser = (messages: IMessage[] = []) => {
    const user = this.state.user;
    const createdAt = new Date()
    const messagesToUpload = messages.map(message => ({
      ...message,
      user,
      createdAt,
      _id: Math.round(Math.random() * 1000000),
    }))
    this.onSend(messagesToUpload)
  }

  setIsTyping = () => {
    this.setState({
      isTyping: !this.state.isTyping,
    })
  }

  renderBubble = (props: any) => {
    return <Bubble {...props} />
  }

  renderSystemMessage = (props : any) => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    )
  }

  renderQuickReplySend = () => <Text>{' custom send =>'}</Text>

  renderSend = (props: SendProps<IMessage>) => (
    <Send {...props} containerStyle={{ justifyContent: 'center' }}>
      <MaterialIcons size={30} color={'tomato'} name={'send'} />
    </Send>
  )

  render() {
    if (!this.state.appIsReady) {
      return <AppLoading />
    }
    return (
      <>
      <this.loadHooks/>
    <ChatBar
      title={this.state.curr_otherUser.name}
      photoUrl={this.state.curr_otherUser.photoUrl}
      phoneNumber={this.state.curr_otherUser.phone}/>
      <View
        style={styles.container}
        accessibilityLabel='main'
        testID='main'
      >
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={this.state.user}
          scrollToBottom
          onLongPressAvatar={user => alert(JSON.stringify(user))}
          onPressAvatar={() => alert('short press')}
          onPress={() => {
            Alert.alert('Bubble pressed')
          }}
          keyboardShouldPersistTaps='never'
          renderBubble={this.renderBubble}
          renderSystemMessage={this.renderSystemMessage}
          renderSend={this.renderSend}
          quickReplyStyle={{ borderRadius: 2 }}
          quickReplyTextStyle={{
            fontWeight: '200',
          }}
          renderQuickReplySend={this.renderQuickReplySend}
          timeTextStyle={{ left: { color: 'red' }, right: { color: 'yellow' } }}
          isTyping={this.state.isTyping}
          infiniteScroll
        />
      </View>
      </>
    )
  }
}
