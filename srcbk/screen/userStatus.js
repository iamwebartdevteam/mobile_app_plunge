import { View, Text, Image } from "react-native";
import React from "react";
import { notification } from "../../assets/style";

const UserStatus = () => {
  return (
    <View style={notification.userStatubg}>
      <Image
        source={{
          uri: "https://cdn.dribbble.com/users/790111/screenshots/15027427/media/e8dc8cbbb22e997d0105043f01391153.png?compress=1&resize=400x300&vertical=top",
        }}
        style={notification.userStatusImg}
      />
      <Text style={notification.pragaphText}>
        Please update your profile details
      </Text>
    </View>
  );
};

export default UserStatus;
