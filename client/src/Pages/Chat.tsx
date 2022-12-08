import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import AppLoading from 'expo-app-loading'
import React, { Component } from 'react'
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
import {earlierMessages} from './example-expo/data/earlierMessages'
import { ChatBar } from '../Component/navBar'

const styles = StyleSheet.create({
  container: { flex: 1 },
})

const user = {
  _id: 1,
  name: 'Developer',
}

const otherUser = {
  _id: 2,
  name: 'React Native',
  avatar: 'https://facebook.github.io/react/img/logo_og.png',
}

export default class App extends Component {
  state = {
    inverted: false,
    step: 0,
    messages: [],
    loadEarlier: true,
    typingText: null,
    isLoadingEarlier: false,
    appIsReady: false,
    isTyping: false,
  }

  _isMounted = false

  componentDidMount() {
    this._isMounted = true
    this.setState({
      messages: messagesData, // messagesData.filter(message => message.system),
      appIsReady: true,
      isTyping: false,
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  onLoadEarlier = () => {
    this.setState(() => {
      return {
        isLoadingEarlier: true,
      }
    })

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState: any) => {
          return {
            messages: GiftedChat.prepend(
              previousState.messages,
              earlierMessages() as IMessage[],
              Platform.OS !== 'web',
            ),
            loadEarlier: true,
            isLoadingEarlier: false,
          }
        })
      }
    }, 1500) // simulating network
  }

  onSend = (messages = []) => {
    const step = this.state.step + 1
    this.setState((previousState: any) => {
      const sentMessages = [{ ...messages[0], sent: true, received: true }]
      return {
        messages: GiftedChat.append(
          previousState.messages,
          sentMessages,
        ),
        step,
      }
    })
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
              user: otherUser,
            },
          ],
          Platform.OS !== 'web',
        ),
      }
    })
  }

  onSendFromUser = (messages: IMessage[] = []) => {
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

  renderSystemMessage = props => {
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
    <ChatBar/>
      <View
        style={styles.container}
        accessibilityLabel='main'
        testID='main'
      >
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          loadEarlier={this.state.loadEarlier}
          onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={this.state.isLoadingEarlier}
          user={user}
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
