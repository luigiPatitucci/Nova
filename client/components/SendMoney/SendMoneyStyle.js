import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "black",
   
  },
  header: {
    backgroundColor: "#4A1491",
    height: 150,
    flexDirection: 'column',
    marginHorizontal:20
  },
  headerTitle: {
    color: "white",
    alignSelf: "center",
  },
  title: {
    flex: 1,
    color: "#ffff57",
    fontSize: 35,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    backgroundColor: "white",
    margin: 4,
    marginTop: 10,
  },
  pickerItem: {
    backgroundColor: "red",
  },
  label: {
    marginTop: 10,
  },
  error: {
    color: "red",
  },
  card: {
    flex: 8,
    justifyContent: "center",
  },
  textArea: {
    width: 275,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttom: {
    marginTop: 50
  },
  main: {
    backgroundColor: "#EFEFEF",
    flex: 1,
    paddingTop: 50
  },
  main1:{
    flex: 1,
  },
  main2:{
    flex: 2,
    padding: 15,
    marginHorizontal:20,
  },
  input:{
      color:'#171717'
  },

  infoContainer: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    borderRadius: 10,
    paddingBottom: '5%'
},

});
