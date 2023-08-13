import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerLight : {
        backgroundColor:'#fff'
    },
    containerDark : {
        backgroundColor:'#181818'
    },
    subContainerDark : {
        backgroundColor:'#2f2f2f'
    },
    textLight : {
        color:'black'
    },
    textDark : {
        color:'white'
    },
    searchLight : {
        backgroundColor:'rgb(240,240,240)'
    },
    searchDark : {
        backgroundColor:'#2f2f2f'
    },
    progressCircle : {
        bg : {
            light : '#fff',
            dark : '#1e1e1e'
        },
        text : {
            light : "rgb(188, 201, 255)",
            dark : 'white'
        }
    },
    tabBar : {
        light : {
            backgroundColor:'#fff'
        },
        dark: {
            backgroundColor:'#181818'
        }
    },
    tabBarActive : {
        light : '#000',
        dark: '#fff'
    }
})