import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView, TouchableHighlight, View, Image, Text } from "react-native";
import { RootStackParamList } from "../RootStackParamList";
import Style from "../../Styles/mechanicViewStyle";
import { useNavigation } from "@react-navigation/native";

type MechanicViewType = StackNavigationProp<RootStackParamList, 'MechanicView'>

const MECHANIC = [
    {
        id: 1,
        mechanicPhoto: '',
        mechanicName: 'Mechanic A'
    },
    {
        id: 2,
        mechanicPhoto: '',
        mechanicName: 'Mechanic B'
    }
];

export default function MechanicView() {
    const navigation = useNavigation<MechanicViewType>();

    return (
        <View style={{flex:1, marginTop:20}}>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={{ flex:1 }}>
                <TouchableHighlight style={{alignItems: "center",
                    backgroundColor: "#DDDDDD",
                    padding: 10, marginLeft: 50, marginRight: 50}}>
                    <View style={{alignItems:'center', justifyContent: 'center', flexDirection: 'row'}}>
                        
                            <Image style={Style.iconImage} source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.jixXH_Els1MXBRmKFdMQPAHaHa%26pid%3DApi&f=1&ipt=f6226b19fdf84268925ffde0669899308c1e64ed116e980234d3ee7858d409c6&ipo=images'}}></Image>
                            <Text style={Style.titleStyle}>Tambah Montir</Text>
                        
                    </View>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </View>
    )
}