import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ToastAndroid,  ScrollView, View,  FlatList } from "react-native";
import { RootStackParamList } from "../RootStackParamList";
import Style from "../../Styles/GarageStyle/GarageTransaction";
import { CustomButton } from "../../Component/CustomButton";
import { CustomText } from "../../Component/CustomText";
import Icon from "react-native-vector-icons/Entypo";
import { Avatar } from "react-native-paper";
import { EditOrder } from "../../Component/EditOrder";

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
  mech_name:'Felix Filipi',
  location:'BCA',
  photoUrl: 'https://img.favpng.com/12/24/20/user-profile-get-em-cardiovascular-disease-zingah-png-favpng-9ctaweJEAek2WaHBszecKjXHd.jpg',
  cust_name: 'Christoper Luis Alexander'
}

export default function GarageTransaction(){

  let distance : number = 2.4;
  let service_cost : number = 0;
  let CostList : any = [
    {
      id:1,
      description:'Perjalanan',
      quantity:distance,
      price: 2000,
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
    console.log(itemRendered)
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
                  title="Estimasi Total Biaya"
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
                <View style={Style.modalButtonLayout}>
                  <CustomButton 
                    title="Tambah Pesanan" 
                    style={{flex:1}}
                    onPress={() => setAddEstModal(true)}
                    textStyle={Style.modalButtonText}
                  />
                  <CustomButton 
                    title="Konfirmasi Pesanan" 
                    style={{flex:1, backgroundColor:'#59a540'}} 
                    textStyle={Style.modalButtonText}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>  
        <EditOrder 
          descTitle="Tambah Estimasi Perbaikan"
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
        />
      </ScrollView>
    </View>
   )
}