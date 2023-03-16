import { Text, View } from "react-native"

const Title = ({...props}) => {
    return(
        <View>
            <Text>{props.name}:</Text>
        </View>
    )
}

export default Title;