import { StyleSheet, StatusBar } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export const registration = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    alignItems: "center",
    width: wp("100%"),
    resizeMode: "cover",
    justifyContent: "center",
    paddingHorizontal: 15,
    height: hp("100%"),
  },
  heading: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "700",
    textTransform: "capitalize",
    marginVertical: 15,
    textAlign: "center",
  },
  inputFeild: {
    backgroundColor: "#fff",
    width: wp("90%"),
    height: 40,
    borderRadius: 50,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  inputFeildNomb: {
    backgroundColor: "#fff",
    width: wp("90%"),
    height: 40,
    borderRadius: 50,
    paddingHorizontal: 15,
  },
  mbsm: {
    backgroundColor: "#fff",
    width: wp("90%"),
    height: 40,
    borderRadius: 50,
    paddingHorizontal: 15,
    marginBottom: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 10,
  },
  checkBox: {
    flexDirection: "row-reverse",
    width: wp("5%"),
    textAlign: "center",
    margin: 0,
  },
  button: {
    borderRadius: 50,
    backgroundColor: "#BD69EE",
    width: wp("90%"),
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  errorMessage: {
    color: "#e50000",
    marginTop: 0,
    paddingTop: 0,
    marginBottom: 0,
    fontWeight: "bold",
  },
  buttonDisable: {
    borderRadius: 50,
    backgroundColor: "gray",
    width: wp("90%"),
    color: "#fff",
  },
  pragreph: {
    textTransform: "capitalize",
    fontSize: 15,
    marginTop: 25,
    textAlign: "center",
    width: wp("100%"),
    flexDirection: "row",
    fontWeight: "bold",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "red",
  },
  login: {
    textTransform: "capitalize",
    color: "#BD69EE",
    fontWeight: "bold",
    fontSize: 15,
    paddingBottom: 0,
    marginLeft: 10,
  },
  touchBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
  logheading: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "700",
    textTransform: "capitalize",
    marginBottom: 15,
    marginTop: -20,
  },
  loginPra: {
    textAlign: "center",
    marginBottom: 20,
    width: wp("90%"),
    color: "#fff",
  },
  forgot: {
    color: "#FF4433",
    textTransform: "capitalize",
    fontSize: 17,
    fontWeight: "700",
  },
  logpragreph: {
    textTransform: "capitalize",
    fontSize: 15,
    marginTop: 100,
    color: "#000",
  },
  otpfeild: {
    backgroundColor: "#ffff",
    width: 40,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    textAlign: "center",
    height: 40,
  },

  navBar: {
    justifyContent: "center",
    marginTop: 5,
  },
  safearray: {
    flex: 1,
    marginTop: 30,
  },
  sideBar: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginLeft: 0,
  },
  btnMenu: {
    marginTop: 0,
    flexDirection: "row",
    lineHeight: 0,
  },
  iconHumber: {
    marginTop: 0,
  },
  menubtn: {
    paddingTop: 0,
  },
  menudrwar: {
    marginTop: 16,
    left: 0,
    flexDirection: "row",
  },
  dasboard: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
  },
  checkBoxSec: {
    flexDirection: "row",
    marginVertical: 15,
  },
  checkLable: {
    marginLeft: 10,
  },
  erroMeg: {
    fontSize: 12,
    textTransform: "capitalize",
    marginBottom: 5,
    color: "red",
  },
  pragrephContaint: {
    //marginRight: 15,
  },
  phoneNumber: {
    backgroundColor: "#fff",
    flexDirection: "row",
    width: wp("90%"),
    paddingHorizontal: 15,
    borderRadius: 100,
    marginBottom: 10,
  },
});

// ? >>>>>>>>>>>>>>>>>>>>>>>>>
export const loginScreen = StyleSheet.create({
  icondiv: {
    width: wp("50%"),
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  extraIcon: {
    backgroundColor: "#fff",
    height: 100,
    borderRadius: 100,
    width: 100,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  logoImg: {
    width: wp("30%"),
    height: hp("15%"),
  },
  logheading: {
    marginBottom: 30,
    fontSize: 25,
    color: "#fff",
    fontWeight: "700",
    textTransform: "capitalize",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCustom: {
    backgroundColor: "red",
  },
  otpFeildSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  userImg: {
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  textContant: {
    width: wp("90%"),
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
  },
});

// ? >>>>>>>>>>>

export const dashBoard = StyleSheet.create({
  heading: {
    fontSize: 20,
  },
  dasboardScreen: {
    paddingHorizontal: 20,
    alignItems: "center",
    width: wp("100%"),
  },
  scrollback: {
    height: hp("105%"),
  },
  userImg: {
    width: 150,
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    marginTop: 150,
    borderWidth: 5,
    borderColor: "green",
  },
  userImgBorder: {
    borderWidth: 5,
    borderColor: "gray",
    width: 150,
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    marginTop: 150,
  },
  camaraIcon: {
    marginLeft: 125,
    backgroundColor: "#ebebe0",
    padding: 5,
    borderRadius: 50,
  },
  details: {
    marginTop: 50,
  },
  detailsHeading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    textTransform: "capitalize",
    marginRight: 10,
  },
  labname: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 15,
    marginTop: 8,
    width: wp("75%"),
    color: "#4c4343",
  },
  leftSide: {
    textAlign: "center",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  lastHeading: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "green",
    display: "flex",
    width: wp("90%"),
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    textAlign: "center",
    color: "#fff",
    marginTop: 10,
  },
  diclamer: {
    fontSize: 12,
    color: "#000",
    width: 320,
    marginTop: 15,
    fontWeight: "700",
  },
  package: {
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    height: 200,
    backgroundColor: "#FFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 16,
    alignItems: "center",
  },
  subPackeg: {
    backgroundColor: "#FFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    width: wp("90%"),
    marginVertical: 20,
    justifyContent: "space-between",
    height: hp("70%"),
    marginRight: 15,
    textAlign: "center",
    marginTop: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  editProfileFormBg: {
    marginRight: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingTop: 20,
    marginBottom: 70,
    flex: 1,
  },
  subPackDetail: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  expiryDate: {
    color: "red",
    fontSize: 20,
    marginTop: 15,
    fontWeight: "700",
  },
  packageHeading: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#825ac7",
    borderBottomWidth: 2,
    borderBottomColor: "#825ac7",
    marginBottom: 15,
    textTransform: "uppercase",
  },
  packageHeading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#825ac7",
    borderBottomWidth: 2,
    borderBottomColor: "#825ac7",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  packageAmount: {
    fontSize: 50,
    color: "#000",
  },
  subpackageAmount: {
    fontSize: 50,
    color: "#825ac7",
    fontWeight: "bold",
  },
  subPacMonth: {
    color: "#000",
    fontSize: 20,
    marginTop: 15,
    marginLeft: 10,
  },
  packageValidDate: {
    color: "red",
    fontSize: 15,
    fontWeight: "bold",
  },
  subpackageStatus: {
    backgroundColor: "#825ac7",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 15,
    borderRadius: 50,
    fontSize: 20,
    width: wp("80%"),
    textAlign: "center",
    fontWeight: "700",
  },

  packageStatus: {
    backgroundColor: "green",
    color: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 15,
    borderRadius: 5,
  },
  menudrwar: {
    marginTop: 16,
    left: 0,
    flexDirection: "column",
    backgroundColor: "#FFF",
    height: 700,
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 50 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    justifyContent: "flex-start",
  },
  itemList: {
    fontSize: 15,
  },

  navBar: {
    justifyContent: "center",
    marginTop: 0,
  },
  toggleBtn: {
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  pageTitle: {
    fontSize: 20,
    textTransform: "capitalize",
    marginVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  pragarph: {
    color: "#000",
    marginTop: 0,
    textAlign: "center",
  },
  subScrollbg: {
    display: "flex",
    flexDirection: "column",
  },
  subImgIcon: {
    width: 100,
    height: 100,
    backgroundColor: "#FF8000",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  headerBg: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
    width: wp("100%"),
  },
  toggleOpen: {
    width: wp("20%"),
    padding: 0,
  },
  navigationContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    backgroundColor: "#825ac7",
    marginBottom: 10,
    paddingVertical: 10,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700",
    color: "#fff",
    backgroundColor: "#825ac7",

    textTransform: "capitalize",
  },
  userMenuImg: {
    width: 110,
    height: 110,
    backgroundColor: "#fff",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8.3,
    elevation: 50,
    marginBottom: 20,
  },
  userMenuImgI: {
    width: 140,
    height: 140,
    borderRadius: 100,
  },
  userMenuImgPic: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  menuIcon: {
    width: 30,
    backgroundColor: "#fd248a",
    marginRight: 15,
    borderRadius: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 5,
    shadowColor: "#adaaaa",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 20,
    color: "#fff",
  },
  menuItem: {
    fontSize: 15,
    width: wp("40%"),
    fontWeight: "700",
    paddingTop: 10,
    color: "#0a45ad",
  },
  logOut: {
    backgroundColor: "#fd248a",
    borderRadius: 100,
  },
  ProgressBar: {
    width: wp("50%"),
  },
  userCoverImg: {
    width: wp("90%"),
    height: hp("25%"),
    justifyContent: "center",
    alignItems: "center",
  },
  userCoverBg: {
    marginTop: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  borderRedus: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  editBtn: {
    backgroundColor: "#3f51b5",
    color: "#fff",
  },
  divider: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  profileDet: {
    flexDirection: "row",
  },
  profileDtText: {
    color: "gray",
    fontWeight: "500",
  },
  manuSech: {
    height: hp("60%"),
  },
  nagativetext: {
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 20,
  },
  dasGrayBg: {
    fontSize: 20,
    fontWeight: "bold",
    display: "flex",
    width: wp("90%"),
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    textAlign: "center",
    color: "#fff",
    marginTop: 10,
    backgroundColor: "gray",
  },
  logOutSec: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    alignItems: "center",
    padding: 10,
  },

  imagesSelfi: {
    width: wp("90%"),
    height: hp("60%"),
    resizeMode: "cover",
    borderRadius: 20,
  },
  nonImg: {
    width: wp("30%"),
  },
  imageUpoladDetact: {
    position: "absolute",
    top: "30%",
    borderWidth: 4,
    left: 120,
    borderColor: "#fff",
    width: wp("40%"),
    height: hp("25%"),
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },

  notification: {
    position: "absolute",
    top: -10,
    zIndex: 90000,
    bottom: -100,
  },
});

// ? IMAGE UPLOAD SECTION

export const imageUpload = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  userImg: {
    backgroundColor: "#fff",
    width: 150,
    height: 150,
    marginTop: 25,
    borderRadius: 100,
  },
  userMenuImgI: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  camaraBtn: {
    marginTop: 15,
    color: "#fff",
    fontSize: 50,
  },
  cameraSec: {
    position: "relative",
    height: hp("50%"),
    width: wp("75%"),
    borderRadius: 20,
  },
  finalImg: {
    // marginBottom: 20,
    // height: hp("50%"),
    // width: wp("75%"),
    // borderRadius: 20,
    marginBottom: 20,
  },
  camaraBg: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ccc",
  },
  inprogressImg: {
    height: hp("50%"),
    width: wp("75%"),
  },
  inprogressImgBG: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.9,
  },
  redoButton: {
    width: 110,
    height: 40,
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#3d5d9a",
    marginRight: 45,
  },
  confirmButton: {
    width: 110,
    height: 40,
    backgroundColor: "#3d5d9a",
    alignItems: "center",
    borderRadius: 4,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1,
  },
  preagraph: {
    textTransform: "capitalize",
    marginBottom: 30,
  },
  defaltCamara: {
    width: wp("100%"),
    height: hp("100%"),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const question = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  qimg: {
    width: wp("70%"),
    height: hp("30%"),
    marginBottom: 15,
  },
  lableName: {
    paddingTop: 5,
    fontSize: 18,
    width: wp("65%"),
  },
  ansFeild: {
    backgroundColor: "#209488",
    width: wp("80%"),
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  ansFeildItem: {
    color: "#fff",
  },
  buttonSec: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("80%"),
    marginTop: 20,
  },
  buttonHan: {
    backgroundColor: "#fd248a",
  },
  buttonHandis: {
    backgroundColor: "gray",
  },
  tipsSec: {
    backgroundColor: "#e1f5fe",
    width: wp("80%"),
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
  },
  tipstext: {
    color: "#0a45ad",
    fontWeight: "600",
  },
});
export const editProfile = StyleSheet.create({
  inputFeild: {
    backgroundColor: "#fff",
    width: wp("80%"),
    height: 40,
    borderRadius: 100,
    paddingHorizontal: 15,
    marginBottom: 15,
    shadowColor: "#dfe1e5",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#dfe1e5",
  },
  formBgScreen: {
    paddingHorizontal: 0,
    justifyContent: "center",
    width: wp("90%"),
    backgroundColor: "#fff",
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
    borderRadius: 25,
  },
  updateBtn: {
    width: wp("80%"),
    paddingVertical: 10,
  },
  editIcon: {
    width: wp("80%"),
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 5,
  },
});
export const testHistory = StyleSheet.create({
  testListBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    width: wp("90%"),
    marginTop: 20,
  },
  table: {
    justifyContent: "center",
    marginRight: 20,
    alignItems: "center",
  },
  Headlab: {
    fontSize: 20,
    fontWeight: "700",
    color: "#825ac7",
  },
  iconLab: {
    backgroundColor: "#fd248a",
    padding: 10,
    borderRadius: 8,
    width: wp("15%"),
  },
  testDate: {
    fontSize: 15,
  },
  zipCode: {
    fontSize: 15,
    fontWeight: "700",
  },
  tableBody: {
    width: wp("50%"),
  },
  newTestBtn: {
    backgroundColor: "#fff",
    marginTop: 15,
    fontWeight: "700",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    color: "#825ac7",
  },
  listHistoryBg: {
    height: hp("80%"),
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  defulttextMess: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 5,
    textAlign: "center",
    borderRadius: 20,
    width: wp("90%"),
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  messTest: {
    fontSize: 20,
    marginTop: 25,
    fontWeight: "700",
  },
});

export const newTestStyle = StyleSheet.create({
  dateFeild: {
    width: wp("80%"),
    marginTop: 50,
  },
  welcomePage: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  regisButton: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 100,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8.3,
    elevation: 15,
    marginTop: 10,
  },
  login: {
    marginLeft: 10,
    color: "#7487ea",
    fontWeight: "700",
    fontSize: 17,
  },
  welcomeImg: {
    width: wp("100%"),
    height: hp("100%"),
    justifyContent: "center",
    alignItems: "center",
  },
  regText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  textSection: {
    flexDirection: "row",
    justifyContent: "center",
    width: wp("100%"),
  },
  headingW: {
    fontSize: 20,
    marginBottom: 8,
    color: "#825ac7",
    fontWeight: "700",
  },
  contantSec: {
    justifyContent: "center",
    alignItems: "center",
    width: wp("95%"),
  },
});

export const notification = StyleSheet.create({
  maintable: {
    width: wp("100%"),
    padding: 15,
  },
  contant: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    color: "#7b8ce6",
    fontWeight: "700",
    width: wp("90%"),
  },
  imagesL: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  disable: {
    color: "gray",
    backgroundColor: "red",
  },
  scannerSec: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  qrBtn: {
    backgroundColor: "#fd248a",
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  scanner: {
    width: wp("100%"),
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  ditaction: {
    borderWidth: 4,
    borderColor: "#fff",
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  modalView: {
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: wp("100%"),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  reloadIcon: {
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 5,
    position: "absolute",
    top: -15,
  },
  dataHeading: {
    fontWeight: "700",
    textTransform: "capitalize",
  },
  extarnalLink: {
    backgroundColor: "#355898",
    width: wp("40%"),
    marginTop: 20,
  },
  centeredViewBack: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "rgba(0,0,0, 0.7)",
  },
  forgotBtn: {
    color: "#ffff",
    fontWeight: "700",
  },
  userStatubg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  pragaphText: {
    fontSize: 20,
    color: "red",
    fontWeight: "700",
  },
  userStatusImg: {
    width: wp("80%"),
    height: hp("50%"),
  },
});