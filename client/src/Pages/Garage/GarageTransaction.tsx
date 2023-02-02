import { Header, StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ToastAndroid,  View,  FlatList, Modal, Alert } from "react-native";
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
import { useAppDispatch, useAppSelector } from "../../../redux";
import { setCostListApp } from "../../../redux/component/costListApp";

type GarageTransactionType = StackNavigationProp<RootStackParamList, 'GarageTransaction'>;

const Item = ({ id, description, quantity, price, onSubmit, 
  editItemModal, setEditItemModal, itemDescription, setItemDescription,
  itemQuantity, setItemQuantity, itemPrice, setItemPrice, setItemId, costList, setCostList}) => {

  const onEdit = () => {
    setItemDescription(description);
    setItemQuantity(quantity);
    setItemPrice(price);
    setEditItemModal(true);
    setItemId(id);
  }

  const onDelete = () => {
    setCostList(costList.filter((item) => {return item.id !== id}));
  }

  return(
    <View style={{flexDirection:'row', flex:1, paddingVertical:15, paddingLeft:15, alignItems:'center'}}>
      <CustomText title={description} size={15} color='#919b9f' style={{flex:4, paddingHorizontal:7, marginBottom:0, marginLeft:0, textAlign:'left'}}/>
        <View style={{flex:2, flexDirection:'row'}}>
          <CustomText title={'Rp. ' + price} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
          <CustomText title={' x '} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
          <CustomText title={'('+ quantity + ')'} size={10} color='#919b9f' style={{marginLeft:0, marginBottom:0, textAlign:'left'}}/>
        </View>
      <CustomText title={'Rp. ' + price * quantity} size={15} color='#919b9f' style={{flex:4, marginLeft:0, marginBottom:0, textAlign:'right'}}/>
      <Icon 
        name="edit" 
        size={20} 
        color='#919b9f' 
        onPress={onEdit}
        style={{flex:1, marginLeft:8}}
        />
      <Icon 
        name="trash" 
        size={20} 
        color='#919b9f' 
        onPress={onDelete}
        style={{flex:1}}/>
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
        />
    </View>
  )
}

export default function GarageTransaction(props : any){

  const dispatch = useAppDispatch();
  let curr_transaction_id = props.route.params.id;
  let service_cost : number = 0;
  const transaction = useAppSelector(state => state.transaction);
  const curr_transaction = transaction.find((item) => item.id == curr_transaction_id);
  const all_user = useAppSelector(state => state.userAuth);
  const curr_mechanic = all_user.find((item) => item.id == curr_transaction.mechanicId);
  const curr_customer = all_user.find((item) => item.id == curr_transaction.cust_id);

  const HeaderData = {
    mech_name: curr_mechanic.name,
    location: curr_transaction.pickup_address,
    photoUrl: curr_mechanic.photoUrl,
    cust_name: curr_customer.name,
  }

  const CostList = useAppSelector(state => state.costListApp);
  const curr_costList = CostList.find((item) => item.id === curr_transaction.fixId);
  
  // Convert Array Data to JSON type
  const new_costList : any[] = [];

  const [fixNumber, setFixNumber] = React.useState<number>(1);
  const [fixPrice, setFixPrice] = React.useState<string>('');
  const [costList, setCostList] = React.useState<any>(new_costList);
  const [fixDescription, setFixDescription] = React.useState<string>('');
  const [serviceCost, setServiceCost] = React.useState<number>(service_cost);
  const [addEstModal, setAddEstModal] = React.useState<boolean>(false); 
  
  const [editItemModal, setEditItemModal] = React.useState<boolean>(false);
  const [itemDescription, setItemDescription] = React.useState<string>();
  const [itemQuantity, setItemQuantity] = React.useState<number>();
  const [itemPrice, setItemPrice] = React.useState<number>();
  const [itemId, setItemId] = React.useState<number>();

  const [paymentModal, setPaymentModal] = React.useState<boolean>(false);
  const [confModal, setConfModal] = React.useState<boolean>(false);
  const [totalPayment, setTotalPayment] = React.useState<number>();
  const [doneModal, setDoneModal] = React.useState<boolean>(false);
  const [paymentFailModal, setPaymentFailModal] = React.useState<boolean>(false);
  const [isFinished, setIsFinished] = React.useState<boolean>(false);
  const [max_id, setMax_id] = React.useState<number>(curr_costList.description.length);
 
  for(let i = 0 ; i <= max_id - 1 ; i ++){
    new_costList.push(
      {
        id: i + 1,
        description: curr_costList.description[i],
        price: curr_costList.price[i],
        quantity: curr_costList.quantity[i],
      }
    )
  }
  
  const changeData = () => {
    
    const new_costList = costList.map((item : any) => {return {...item}});
    for(let i = 0; i <= new_costList.length - 1; i++){
      if(new_costList[i].id === itemId){
        new_costList[i].description = itemDescription;
        new_costList[i].quantity = itemQuantity;
        new_costList[i].price = itemPrice;
      }
    }

    setCostList(new_costList);
    setEditItemModal(false);
    ToastAndroid.show('Item berhasil diganti', ToastAndroid.LONG)
  }

  const renderItem = ({ item }) => {
    return(
      <Item
        id = {item.id}
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
        setItemId = {setItemId}
        costList={costList}
        setCostList={setCostList}
        onSubmit={changeData}
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
    setCostList( prevCostList => [...prevCostList, {
      id: max_id,
      description:fixDescription,
      quantity: fixNumber,
      price: Number(fixPrice),
    }]);
    setMax_id(max_id + 1);
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
      <View style={{marginTop:20, flex:1}}>
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

  const completeOrder = () => {
    const new_costList = CostList.map((item : any) => {return {...item}});
    const description : any[] = [], price : any[] = [], quantity : any[] = [];
    for(let j = 0; j <= costList.length - 1; j++){
      description.push(costList[j].description);
      price.push(costList[j].price);
      quantity.push(costList[j].quantity)
    }

    const new_Data = {
      id:curr_costList.id,
      description: description,
      price: price,
      quantity: quantity,
    }

    for(let i = 0; i <= new_costList.length - 1; i++){
      if(new_costList[i].id == curr_transaction.fixId){
        new_costList[i] = new_Data;
      }
    }
    dispatch(setCostListApp(new_costList));
    setConfModal(false), 
    setIsFinished(true), 
    setDoneModal(true)
  }
   return(
    <View style={{flex:1, marginTop:20}}>
        <View style={{ flex:1 }}>
          <View style={{padding:15, borderRadius:20, margin:15, backgroundColor:'#3a4447'}}>
            <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
              <Avatar.Image source={{uri:HeaderData.photoUrl}} size={50}/>
              <CustomText title={HeaderData.mech_name} size={20} color="white" style={{marginLeft:15, marginBottom:0}}/>
            </View>
            <View style={{backgroundColor:'#181a1d', padding:20, marginTop:20, borderRadius:20}}>   
              <View style={{flexDirection:'row'}}>
                <CustomText title="Nama Pelanggan" size={15} color="white" style={{flex:2, textAlign:'left', marginLeft:0}}/>
                <CustomText title=":" size={15} color="white" style={{flex:1, textAlign:'center', marginLeft:0}}/>
                <CustomText title={HeaderData.cust_name} size={15} color="white" style={{flex:2, textAlign:'right', marginLeft:0}}/>
              </View>
              <View style={{flexDirection:'row'}}>
                <CustomText title="Lokasi" size={15} color="white" style={{flex:2, textAlign:'left', marginLeft:0}}/>
                <CustomText title=":" size={15} color="white" style={{flex:1, textAlign:'center', marginLeft:0}}/>
                <CustomText title={HeaderData.location} size={12} color="white" style={{flex:2, textAlign:'right', marginLeft:0}}/>
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
                {(isFinished === true || curr_transaction.trans_end_dt != null) ? <DoneTransaction/> : <OnTransaction/>}
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
          onTrue={completeOrder}/>
        <Done
          visibleModal={doneModal} 
          setVisibleModal={setDoneModal} 
          title= "Pesanan Berhasil Diselesaikan"
          onTrue={() => {setDoneModal(false), setPaymentModal(false)}}
          />
        <Done
          visibleModal={paymentFailModal} 
          setVisibleModal={setPaymentFailModal} 
          title= "Pembayaran Tidak Dapat Lebih Rendah Dari Total Biaya"
          onTrue={() => {setPaymentFailModal(false)}}
          />
    </View>
   )
}
