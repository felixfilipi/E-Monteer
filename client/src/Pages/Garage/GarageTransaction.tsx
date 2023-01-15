import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ToastAndroid,  ScrollView, View,  FlatList, Modal, Alert } from "react-native";
import { RootStackParamList } from "../RootStackParamList";
import Style from "../../Styles/GarageStyle/GarageTransaction";
import { CustomButton } from "../../Component/CustomButton";
import { CustomText } from "../../Component/CustomText";
import Icon from "react-native-vector-icons/Entypo";
import { Avatar, Divider } from "react-native-paper";
import { EditOrder } from "../../Component/EditOrder";
import { AddPayment } from "../../Component/AddPayment";
import { Confirmation } from "../../Component/Confirmation";
import { Done } from "../../Component/Done";

type GarageTransactionType = StackNavigationProp<RootStackParamList, 'GarageTransaction'>;

const Item = ({ description, quantity, price, onSubmit, 
  editItemModal, setEditItemModal, itemDescription, setItemDescription,
  itemQuantity, setItemQuantity, itemPrice, setItemPrice, setItemRendered}) => {

  return(
    <View style={{flexDirection:'row', flex:1, paddingVertical:15, paddingLeft:15, alignItems:'center'}}>
      <CustomText title={description} size={15} color='#919b9f' style={{flex:4, marginBottom:0, marginLeft:0, textAlign:'left'}}/>
        <View style={{flex:2, flexDirection:'row'}}>
          <CustomText title={'Rp. ' + price} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
          <CustomText title={' x '} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
          <CustomText title={'('+ quantity + ')'} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
        </View>
      <CustomText title={'Rp. ' + price * quantity} size={15} color='#919b9f' style={{flex:4, marginLeft:0, marginBottom:0, textAlign:'right'}}/>
      <Icon name="edit" 
        size={20} 
        color='#919b9f' 
        onPress={() => setEditItemModal(true)}
        style={{flex:1, marginLeft:8}}
        />
      <Icon name="trash" size={20} color='#919b9f' style={{flex:1}}/>
      <EditOrder 
        descTitle="Ganti Detail Perbaikan"
        submitTitle="Ganti Data"
        visibleModal={editItemModal}
        setVisibleModal={setEditItemModal}
        fixDescription={itemDescription}
        setFixDescription={setItemDescription}
        fixNumber={itemQuantity}
        setFixNumber={setItemQuantity}
        fixPrice={itemPrice}
        setFixPrice={setItemPrice}
        onSubmit={onSubmit}
        onCloseState={setItemRendered}
        />
    </View>
  )
}

const DATA = {
  mech_name:'Rico Purwanto',
  location:'Plaza Araya, jl blimbing indah megah no 2, malang',
  photoUrl: 'https://media.istockphoto.com/id/1255420917/id/foto/teknisi-mobil-pengecekan-otomotif-di-garasi.jpg?s=612x612&w=0&k=20&c=MMwKFYfoyo2fm6hkqaRZz10VuQV8VAIGMiqn12zvYdE=',
  cust_name: 'Alexander Wijaya'
}

export default function GarageTransaction(){

  let distance : number = 5.9;
  let service_cost : number = 0;
  let CostList : any = [
    {
      id:1,
      description:'Perjalanan',
      quantity:distance,
      price: 2000,
    },
    {
      id:2,
      description:'Isi Bensin',
      quantity:2,
      price: 12000,
    },
  ];

  const [fixNumber, setFixNumber] = React.useState<number>(0);
  const [fixPrice, setFixPrice] = React.useState<string>('');
  const [costList, setCostList] = React.useState<any[]>(CostList);
  const [fixDescription, setFixDescription] = React.useState<string>('');
  const [serviceCost, setServiceCost] = React.useState<number>(service_cost);
  const [addEstModal, setAddEstModal] = React.useState<boolean>(false); 
  
  const [editItemModal, setEditItemModal] = React.useState<boolean>(false);
  const [itemDescription, setItemDescription] = React.useState<string>();
  const [itemQuantity, setItemQuantity] = React.useState<number>();
  const [itemPrice, setItemPrice] = React.useState<number>();
  const [itemId, setItemId] = React.useState<number>(2);
  const [currItemId, setCurrItemId] = React.useState<number>();
  const [itemRendered, setItemRendered] = React.useState<boolean>(false);

  const [paymentModal, setPaymentModal] = React.useState<boolean>(false);
  const [confModal, setConfModal] = React.useState<boolean>(false);
  const [totalPayment, setTotalPayment] = React.useState<number>();
  const [doneModal, setDoneModal] = React.useState<boolean>(false);
  const [paymentFailModal, setPaymentFailModal] = React.useState<boolean>(false);
  const [isFinished, setIsFinished] = React.useState<boolean>(false);

  const changeData = () => {
    for(let i = 0; i <= costList.length - 1; i++){
      if(costList[i].id === currItemId){
        costList[i].description = itemDescription;
        costList[i].quantity = itemQuantity;
        costList[i].price = itemPrice;
      }
    }
    setCostList(costList);
    setEditItemModal(false);
    ToastAndroid.show('Item berhasil diganti', ToastAndroid.LONG)
  }

  //problem edit data here
  const renderItem = ({ item }) => {
    if(itemRendered === false){
      setItemDescription(item.description)
      setItemQuantity(item.quantity)
      setItemPrice(item.price)
      setCurrItemId(item.id)
      setItemRendered(true)
    } 
    return(
      <Item
        description = {item.description}
        quantity = {item.quantity}
        price = {item.price}
        editItemModal = {editItemModal}
        setEditItemModal = {setEditItemModal}
        itemDescription = {itemDescription}
        setItemDescription = {setItemDescription}
        itemQuantity = {itemQuantity}
        setItemQuantity = {setItemQuantity}
        itemPrice = {itemPrice}
        setItemPrice = {setItemPrice}
        onSubmit={changeData}
        setItemRendered={setItemRendered}
        />
    )
  }

  React.useEffect(() => {
    for(let i = 0; i <= costList.length - 1; i++){
      service_cost += costList[i].quantity * costList[i].price;
    };
    setServiceCost(service_cost);
  }, [costList])

  const addOrder = () => {
    setItemId(itemId + 1);
    setCostList( prevCostList => [...prevCostList, {
      id:itemId,
      description:fixDescription,
      quantity: fixNumber,
      price: Number(fixPrice),
    }]);
    setFixDescription('');
    setFixPrice('');
    setFixNumber(0);
    setAddEstModal(false);
    ToastAndroid.show('List Perbaikan Berhasil Ditambahkan', ToastAndroid.SHORT)
  }

  const createPayment = () => {
    if(totalPayment < serviceCost){
      setPaymentFailModal(true);
    }else{
      setConfModal(true);
    }
  }

  const OnTransaction = () => {
    return(
      <View style={Style.modalButtonLayout}>
        <CustomButton 
          title="Tambah Pesanan" 
          style={{flex:1}}
          onPress={() => setAddEstModal(true)}
          textStyle={Style.modalButtonText}
        />
        <CustomButton
          onPress={() => setPaymentModal(true)}
          title="Buat Bukti Pembayaran" 
          style={{flex:1, backgroundColor:'#59a540'}} 
          textStyle={Style.modalButtonText}
        />
      </View>
    )
  }

  const DoneTransaction = () => {
    return(
      <View style={{marginTop:-20}}>
        <View style={{flexDirection:'row', flex:1}}>
          <CustomText
            title="Jumlah Pembayaran"
            color="black"
            size={15}
            style={{flex:1, textAlign:'left'}} 
          />
          <CustomText
            title={'Rp. ' + totalPayment}
            color="black"
            size={15}
            style={{flex:1, textAlign:'right'}} 
          />
        </View>
        <Divider/>
        <View style={{flexDirection:'row', flex:1, marginTop:10}}>
          <CustomText
            title="Total Kembalian"
            color="black"
            size={15}
            style={{flex:1, textAlign:'left'}} 
          />
          <CustomText
            title={'Rp. ' + (totalPayment - serviceCost)}
            color="black"
            size={15}
            style={{flex:1, textAlign:'right'}} 
          />
        </View>
      </View>
    )
  }
   return(
    <View style={{flex:1, marginTop:20}}>
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{ flex:1 }}>
          <View style={{padding:15, borderRadius:20, margin:15, backgroundColor:'#3a4447'}}>
            <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
              <Avatar.Image source={{uri:DATA.photoUrl}} size={50}/>
              <CustomText title={DATA.mech_name} size={20} color="white" style={{marginLeft:15, marginBottom:0}}/>
            </View>
            <View style={{backgroundColor:'#181a1d', padding:20, marginTop:20, borderRadius:20}}>   
              <View style={{flexDirection:'row'}}>
                <CustomText title="Nama Pelanggan" size={15} color="white" style={{flex:2, textAlign:'left', marginLeft:0}}/>
                <CustomText title=":" size={15} color="white" style={{flex:1, textAlign:'center', marginLeft:0}}/>
                <CustomText title={DATA.cust_name} size={15} color="white" style={{flex:2, textAlign:'right', marginLeft:0}}/>
              </View>
              <View style={{flexDirection:'row'}}>
                <CustomText title="Lokasi" size={15} color="white" style={{flex:2, textAlign:'left', marginLeft:0}}/>
                <CustomText title=":" size={15} color="white" style={{flex:1, textAlign:'center', marginLeft:0}}/>
                <CustomText title={DATA.location} size={15} color="white" style={{flex:2, textAlign:'right', marginLeft:0}}/>
              </View>
            </View>
          </View>
          <View style={Style.modalLayout}>
            <CustomText 
              title="Rincian Perbaikan" 
              color="black" 
              size={20}
              style={Style.modalTitle}/>
            <View style={Style.modalListLayout}>
              <FlatList
                data={costList}
                renderItem={renderItem}
                nestedScrollEnabled/>
            </View>
            <View style={Style.modalMetaContainer}>
              <View style={Style.modalTotalLayout}>
                <CustomText
                  title="Total Biaya"
                  color="black"
                  size={15}
                  style={{flex:1, textAlign:'left'}}
                  />
                <CustomText
                  title={'Rp. ' + serviceCost}
                  color="black"
                  size={15}
                  style={{flex:1, textAlign:'right'}}
                  />
              </View>
              <View style={{flex:1}}>
                {isFinished === true ? <DoneTransaction/> : <OnTransaction/>}
              </View>
            </View>
          </View>
        </View>  
        <EditOrder 
          descTitle="Tambah Detail Perbaikan"
          submitTitle="Tambah Data"
          visibleModal={addEstModal}
          setVisibleModal={setAddEstModal}
          fixDescription={fixDescription}
          setFixDescription={setFixDescription}
          fixNumber={fixNumber}
          setFixNumber={setFixNumber}
          fixPrice={fixPrice}
          setFixPrice={setFixPrice}
          onSubmit={addOrder}
          onCloseState={setItemRendered}
        />
        <AddPayment
          descTitle="Konfirmasi Pembayaran"
          submitTitle="Buat Pembayaran"
          total_cost = {serviceCost}
          totalPayment={totalPayment}
          setTotalPayment={setTotalPayment}
          visibleModal={paymentModal}
          setVisibleModal={setPaymentModal}
          onSubmit={createPayment}
        />
        <Confirmation 
          visibleModal={confModal} 
          setVisibleModal={setConfModal} 
          title= "Apakah Pesanan Anda Dapat Diselesaikan?"
          onTrue={() => {setConfModal(false), setIsFinished(true), setDoneModal(true)}}/>
        <Done
          visibleModal={doneModal} 
          setVisibleModal={setDoneModal} 
          title= "Pesanan Berhasil Ditambahkan"
          onTrue={() => {setDoneModal(false), setPaymentModal(false)}}
          />
        <Done
          visibleModal={paymentFailModal} 
          setVisibleModal={setPaymentFailModal} 
          title= "Pembayaran Tidak Dapat Lebih Rendah Dari Total Biaya"
          onTrue={() => {setPaymentFailModal(false)}}
          />
      </ScrollView>
    </View>
   )
}
