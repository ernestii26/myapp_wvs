import { Modal, View, TextInput, Button, Text, StyleSheet } from 'react-native';

const CreatePostModal = ({isVisible, onClose, onSubmit, title, setTitle, postContent, setPostContent}: {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    postContent: string;
    setPostContent: React.Dispatch<React.SetStateAction<string>>;
}) => {
    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>創建貼文</Text>

                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder="輸入標題"
                        style={styles.input}
                    />

                    <TextInput
                        value={postContent}
                        onChangeText={setPostContent}
                        placeholder="輸入貼文內容"
                        multiline
                        style={styles.textArea}
                    />

                    <Button title="提交" onPress={onSubmit} />
                    <Button title="取消" onPress={onClose} color="red" />
                </View>
            </View>
        </Modal> 
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    textArea: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
});

export default CreatePostModal;
