export type RootStackParamList = {
    Register: undefined;
    Login: undefined;
    Home:  undefined;
    Edit: undefined;
    Order: undefined;
    Waiting: undefined;
    Find: {prevScreen: boolean} |undefined;
    Garage: {id: number} | undefined;
    BottomNav: undefined;
    History: undefined;
    HistoryDetail: {id: number} | undefined;
};
