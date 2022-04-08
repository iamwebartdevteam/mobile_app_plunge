import * as React from "react";
import { Appbar, Divider } from "react-native-paper";
import { Provider, Menu, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { dashBoard } from "../../assets/style";
import { TouchableOpacity } from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
const Navbar = ({ navigation }) => {
  const handalNaviget = (screenName) => {
    navigation.navigate(screenName);
    console.log("hello");
  };

  const _goBack = () => console.log("Went back");

  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => console.log("Shown more");
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header style={dashBoard.navBar}>
      <Provider>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          style={dashBoard.menudrwar}
          anchor={
            <Button style={dashBoard.toggleBtn} onPress={openMenu}>
              <Ionicons name="md-menu" size={32} color="white" />
            </Button>
          }
        >
          {/* <FontAwesome5 name="user-alt" size={20} color="#BD69EE" /> */}
          <TouchableOpacity onPress={() => handalNaviget("editprofile")}>
            <Menu.Item
              style={dashBoard.itemList}
              icon="account"
              title="Edit Profile"
            />
          </TouchableOpacity>
          <Divider />
          <Menu.Item icon="scanner" onPress={() => {}} title="My Status" />
          <Divider />
          <Menu.Item icon="inbox" onPress={() => {}} title="Question" />
          <Divider />
          <Menu.Item icon="more" onPress={() => {}} title="STI Test History" />
          <Divider />
          <Menu.Item icon="book" onPress={() => {}} title="Plunge" />
        </Menu>
      </Provider>

      <Appbar.Action icon="bell" onPress={_handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
};

export default Navbar;
