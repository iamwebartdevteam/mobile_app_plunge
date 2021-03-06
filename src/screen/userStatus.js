import { View, Text, Image } from "react-native";
import React from "react";
import { notification } from "../../assets/style";

const UserStatus = () => {
  return (
    <View style={notification.userStatubg}>
      <Image
        source={{
          uri: "https://cdni.iconscout.com/illustration/premium/thumb/young-man-working-on-laptop-and-sitting-on-bean-bag-showing-concept-of-freelancing-2127309-1791051.png",
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
