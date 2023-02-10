import React from 'react';
import Style from "../Styles/HistoryDetailStyle";
import Icon from 'react-native-vector-icons/FontAwesome';
import call from 'react-native-phone-call';
import { View, ScrollView} from "react-native";
import { Avatar } from 'react-native-paper'; 
import { AbsoluteButton } from '../Component/CustomButton';
import { CustomText } from "../Component/CustomText";
import { Rating } from "react-native-ratings";
import { useAppDispatch, useAppSelector } from '../../redux';
import { setTransaction } from '../../redux/component/transaction';

export function HistoryDetail(props : any){

  const transactionID : number = props.route.params.id;
  
  const raw_transaction = useAppSelector(state => state.transaction);
  const currentTransaction = raw_transaction.find((item) => item.id === transactionID)
  
  const user_data = useAppSelector(state => state.userAuth);
  const mechanicData = user_data.find((item) => item.id === currentTransaction.mechanicId);

  const fix_detail = useAppSelector(state => state.costListApp);
  const current_fix_detail = fix_detail.find((item) => item.id === currentTransaction.fixId);

  const garage_data = useAppSelector(state => state.garageData);
  const current_garage_data = garage_data.find((item) => item.id === currentTransaction.garageId);
  
  const args = {
    number: mechanicData.phone,
    prompt: false,
    skipCanOpen: true
  }

  const dispatch = useAppDispatch();
 

  const onRating = (rate : number) => {
    const prevData = raw_transaction.map((item) => {return {...item}});
    for(let j = 0; j <= prevData.length - 1; j++){
      if(prevData[j].id == currentTransaction.id){
        prevData[j].rating = rate;
      }
    }
    dispatch(setTransaction(prevData));
  }

  let Content: any[] = [], repairList: string[], 
  repairPrice: number[], repairTotal: number[],
  Payment: any[] = [], PaymentDesc: string[], 
  PaymentPrice: string[], changeMoney: number;
  
  repairList = current_fix_detail.description;
  repairTotal = current_fix_detail.quantity;
  repairPrice = current_fix_detail.price;
  changeMoney = currentTransaction.customer_paid - currentTransaction.service_cost;
  PaymentDesc = ['Biaya Total', 'Total Bayar', 'Kembalian']
  PaymentPrice = [ 
    String(currentTransaction.service_cost),
    String(currentTransaction.customer_paid),
    String(changeMoney)
  ]
  
  for(let i = 0; i <= repairTotal.length - 1;i++){
    Content.push(
      <View style={Style.descriptionLayout} key={"HistoryDetail" + i}>
        <View style={{flex:4}}>
        <CustomText
          selectable={true}
          title={repairList[i]}
          style={Style.descriptionStyle}/> 
        </View>
        <View style={{flex:5}}>
          <View style={{flexDirection:'row', justifyContent:'center'}}>
            <CustomText
              selectable={true}
              title={repairTotal[i]}
              style={[Style.descriptionStyle, {flex:1, fontSize:12, color:'#a5b3c8'}]}/> 
            <CustomText
              selectable={true}
              title={'x'}
              style={[Style.descriptionStyle, {flex:1, fontSize:12, color:'#a5b3c8'}]}/> 
            <CustomText
              selectable={true}
              title={'Rp. ' + repairPrice[i]}
              style={[Style.descriptionStyle, {flex:3, fontSize:12, color:'#a5b3c8'}]}/> 
          </View>
        </View>
        <View style={{flex:3, alignItems:'flex-end',paddingHorizontal:10}}>
          <CustomText
            title={'Rp. ' + (Number(repairTotal[i]) * Number(repairPrice[i]))} 
            style={[Style.descriptionStyle, {fontSize:12}]}
            />
        </View>
      </View>
    )
  }

  for(let i = 0; i <= PaymentDesc.length;i++){
    Payment.push(
      <View style={Style.descriptionLayout} key={"Payment" + i}>
        <View style={{flex:7}}>
        <CustomText
          selectable={true}
          title={PaymentDesc[i]}
          style={Style.descriptionStyle}/> 
        </View>
        <View style={{flex:2, alignItems:'flex-end',paddingHorizontal:10}}>
          <CustomText
            title={PaymentPrice[i]} 
            style={Style.descriptionStyle}
            />
        </View>
      </View>
    )
  }

  return(
  <View style={{flex:1}}>
    <View style={{flex:1, paddingHorizontal: 5, marginBottom:70}}>  
      <View style={Style.descriptionContainer}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          overScrollMode="never">
          <CustomText 
            title={'Beri Rating untuk Bengkel ini?'} 
            style={Style.titleText}
            size={20}/> 
          <Rating
            type='custom'
            startingValue={currentTransaction.rating}
            ratingBackgroundColor="#B1B5C1"
            imageSize={30}
            tintColor='white'
            onFinishRating={onRating}
            readonly={currentTransaction.rating == null || undefined ? false : true} 
            />
          <View style={Style.avatarContainer}>
            <View style={{flex:1}}>
              <Avatar.Image 
                size={60}
                source={{uri:mechanicData.photoUrl}}
                />
            </View>
            <View style={{flexDirection:'column', flex:4}}>
              <CustomText 
                title={mechanicData.name}
                style={{textAlign:'left', fontWeight:'700'}}/>
              <CustomText 
                title={mechanicData.phone}
                style={{textAlign:'left'}}/>
            </View>
          </View>
          <View style={Style.pickupContainer}>
            <CustomText 
              title="Detail Penjemputan" 
              color="#c5c2c0"
              style={{textAlign:'left', fontWeight:'600'}}/>
            
            <View style={Style.horizontalContainer}>
              <View style={Style.iconContainer}>
                <Icon name="wrench" size={30} color={'#b99504'}/>
              </View>
              <View style={{flex:5}}>
                <CustomText 
                  title="Alamat Bengkel"
                  color="#c5c2c0"
                  style={{textAlign:'left', fontWeight:'700'}}/>
                <CustomText 
                  title={current_garage_data.address}
                  color="black"
                  size={15}
                  style={{textAlign:'left', fontWeight:'600'}}/>
              </View>
            </View>
            
            <View style={Style.horizontalContainer}>
              <View style={Style.iconContainer}>
                <Icon name="map-pin" size={30} color={'#b99504'}/>
              </View>
              <View style={{flex:5}}>
                <CustomText 
                  title="Lokasi Penjemputan"
                  color="#c5c2c0"
                  style={{textAlign:'left', fontWeight:'700'}}/>
                <CustomText 
                  title={currentTransaction.pickup_address}
                  color="black"
                  size={15}
                  style={{textAlign:'left', fontWeight:'600'}}/>
              </View>
            </View>
          </View>
          
          <View style={[Style.pickupContainer, {paddingBottom:-20}]}>
            <CustomText 
              title="Detail Perbaikan" 
              color="#c5c2c0"
              style={{textAlign:'left', fontWeight:'600'}}/>
              { Content }
            </View>
          <View style={[Style.pickupContainer, {paddingBottom:-20}]}>
            <CustomText 
              title="Detail Pembayaran" 
              color="#c5c2c0"
              style={{textAlign:'left', fontWeight:'600'}}/>
              { Payment }
            </View>
        </ScrollView>
      </View>
    </View>
    <AbsoluteButton 
      title={'Hubungi Bengkel'}
      style={{marginHorizontal:15}}
      onPress={()=>call(args).catch(console.error)}/>
  </View>
  )
};


export function HistoryDetailMechanic(props : any){

  const transactionID : number = props.route.params.id;
  
  const raw_transaction = useAppSelector(state => state.transaction);
  const currentTransaction = raw_transaction.find((item) => item.id === transactionID)
  
  const user_data = useAppSelector(state => state.userAuth);
  const customerData = user_data.find((item) => item.id === currentTransaction.cust_id);

  const fix_detail = useAppSelector(state => state.costListApp);
  const current_fix_detail = fix_detail.find((item) => item.id === currentTransaction.fixId);

  const garage_data = useAppSelector(state => state.garageData);
  const current_garage_data = garage_data.find((item) => item.id === currentTransaction.garageId);
  
  const args = {
    number: customerData.phone,
    prompt: false,
    skipCanOpen: true
  }

  let Content: any[] = [], repairList: string[], 
  repairPrice: number[], repairTotal: number[],
  Payment: any[] = [], PaymentDesc: string[], 
  PaymentPrice: string[], totalCost:number = 0, changeMoney: number;
  
  repairList = current_fix_detail.description;
  repairTotal = current_fix_detail.quantity;
  repairPrice = current_fix_detail.price;
  changeMoney = currentTransaction.customer_paid - currentTransaction.service_cost;
  PaymentDesc = ['Biaya Total', 'Total Bayar', 'Kembalian']
  PaymentPrice = [ 
    currentTransaction.service_cost == null ? 'Proses' : String(currentTransaction.service_cost),
    currentTransaction.customer_paid == null ? 'Proses' : String(currentTransaction.customer_paid),
    changeMoney == null ? 'Proses' : String(changeMoney)
  ]
  
  for(let i = 0; i <= repairTotal.length - 1;i++){
    Content.push(
      <View style={Style.descriptionLayout} key={"HistoryDetail" + i}>
        <View style={{flex:4}}>
        <CustomText
          selectable={true}
          title={repairList[i]}
          style={Style.descriptionStyle}/> 
        </View>
        <View style={{flex:5}}>
          <View style={{flexDirection:'row', justifyContent:'center'}}>
            <CustomText
              selectable={true}
              title={repairTotal[i]}
              style={[Style.descriptionStyle, {flex:1, fontSize:12, color:'#a5b3c8'}]}/> 
            <CustomText
              selectable={true}
              title={'x'}
              style={[Style.descriptionStyle, {flex:1, fontSize:12, color:'#a5b3c8'}]}/> 
            <CustomText
              selectable={true}
              title={'Rp. ' + repairPrice[i]}
              style={[Style.descriptionStyle, {flex:3, fontSize:12, color:'#a5b3c8'}]}/> 
          </View>
        </View>
        <View style={{flex:3, alignItems:'flex-end',paddingHorizontal:10}}>
          <CustomText
            title={'Rp. ' + (Number(repairTotal[i]) * Number(repairPrice[i]))} 
            style={[Style.descriptionStyle, {fontSize:12}]}
            />
        </View>
      </View>
    )
  }

  for(let i = 0; i <= PaymentDesc.length;i++){
    Payment.push(
      <View style={Style.descriptionLayout} key={"Payment" + i}>
        <View style={{flex:7}}>
        <CustomText
          selectable={true}
          title={PaymentDesc[i]}
          style={Style.descriptionStyle}/> 
        </View>
        <View style={{flex:2, alignItems:'flex-end',paddingHorizontal:10}}>
          <CustomText
            title={PaymentPrice[i]} 
            style={Style.descriptionStyle}
            />
        </View>
      </View>
    )
  }

  return(
  <View style={{flex:1}}>
    <View style={{flex:1, paddingHorizontal: 5, marginBottom:30}}>  
      <View style={Style.descriptionContainer}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          overScrollMode="never">
          <CustomText 
            title={'Rating yang diberikan oleh pelanggan'} 
            style={Style.titleText}
            size={20}/> 
          <Rating
            type='custom'
            startingValue={currentTransaction.rating}
            ratingBackgroundColor="#B1B5C1"
            imageSize={30}
            tintColor='white'
            readonly={true} 
            />
          <View style={Style.avatarContainer}>
            <View style={{flex:1}}>
              <Avatar.Image 
                size={60}
                source={{uri:customerData.photoUrl}}
                />
            </View>
            <View style={{flexDirection:'column', flex:4}}>
              <CustomText 
                title={customerData.name}
                style={{textAlign:'left', fontWeight:'700'}}/>
              <CustomText 
                title={customerData.phone}
                style={{textAlign:'left'}}/>
            </View>
          </View>
          <View style={Style.pickupContainer}>
            <CustomText 
              title="Detail Penjemputan" 
              color="#c5c2c0"
              style={{textAlign:'left', fontWeight:'600'}}/>
            
            <View style={Style.horizontalContainer}>
              <View style={Style.iconContainer}>
                <Icon name="wrench" size={30} color={'#b99504'}/>
              </View>
              <View style={{flex:5}}>
                <CustomText 
                  title="Alamat Bengkel"
                  color="#c5c2c0"
                  style={{textAlign:'left', fontWeight:'700'}}/>
                <CustomText 
                  title={current_garage_data.address}
                  color="black"
                  size={15}
                  style={{textAlign:'left', fontWeight:'600'}}/>
              </View>
            </View>
            
            <View style={Style.horizontalContainer}>
              <View style={Style.iconContainer}>
                <Icon name="map-pin" size={30} color={'#b99504'}/>
              </View>
              <View style={{flex:5}}>
                <CustomText 
                  title="Lokasi Penjemputan"
                  color="#c5c2c0"
                  style={{textAlign:'left', fontWeight:'700'}}/>
                <CustomText 
                  title={currentTransaction.pickup_address}
                  color="black"
                  size={15}
                  style={{textAlign:'left', fontWeight:'600'}}/>
              </View>
            </View>
          </View>
          
          <View style={[Style.pickupContainer, {paddingBottom:-20}]}>
            <CustomText 
              title="Detail Perbaikan" 
              color="#c5c2c0"
              style={{textAlign:'left', fontWeight:'600'}}/>
              { Content }
            </View>
          <View style={[Style.pickupContainer, {paddingBottom:-20}]}>
            <CustomText 
              title="Detail Pembayaran" 
              color="#c5c2c0"
              style={{textAlign:'left', fontWeight:'600'}}/>
              { Payment }
            </View>
        </ScrollView>
      </View>
    </View>
  </View>
  )
};
