export type RootStackParamList = {
  Register: undefined;
  RegisterMechanic: undefined;
  Login: undefined;
  CustomerMain:  undefined;
  EditProfile: undefined;
  OrderGarage: {id: number, handleType: string} | undefined;
  Waiting: undefined;
  FindGarage: {prevScreen: boolean} |undefined;
  GarageDetail: {id: number} | undefined;
  BottomNav: undefined;
  History: undefined;
  HistoryDetail: {id: number} | undefined;
  Chat: {phone: number} | undefined;
  ChatHistory: undefined;
  RegisterGarage: undefined;
  MechanicMain: undefined;
  MechanicOrder: undefined;
  CustomerOrder: undefined;
  RegisterOwner: undefined;
  GarageMain: undefined;
  GarageTransaction: {id: number} | undefined;
  ChatHistoryMechanic: undefined;
  GarageEmployee: undefined;
  MechanicEdit: undefined;
  GarageHistory: undefined;
};
