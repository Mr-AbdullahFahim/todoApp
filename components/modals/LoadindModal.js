import { ActivityIndicator, Modal , StyleSheet , View } from "react-native";



export default function LoadingModal({modalVisible}){
    return (
        <Modal transparent={true} visible={modalVisible}>
            <View style={styles.modal}>
                <ActivityIndicator size="large" color="#BA83DE" />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
})