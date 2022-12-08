export type RootStackParamList = {
    Register: undefined;
    Login: undefined;
    Home:  undefined;
    Edit: undefined;
    Order: {id: number, handleType: string} | undefined;
    Waiting: undefined;
    Find: {prevScreen: boolean} |undefined;
    Garage: {id: number} | undefined;
    BottomNav: undefined;
    History: undefined;
    HistoryDetail: {id: number} | undefined;
    Chat: {phone: number} | undefined;
    ChatHistory: undefined;
};
