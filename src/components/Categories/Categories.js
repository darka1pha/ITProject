import React from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import { data } from "./Data";

const { height: screenHeight } = Dimensions.get("window");

const Categories = () => {
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => alert('Go to category screen')}>
        <View
          style={{
            width: "100%",
            height: screenHeight / 4.5,
            marginBottom: 35
          }}
        >
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "cover",
              borderRadius: 20
            }}
            source={item.image}
          />
          <View
            style={{
              position: "absolute",
              top: screenHeight / 4.5 / 2.5,
              right: 10,
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              padding: 15,
              borderRadius: 20
            }}
          >
            <Text style={{ fontFamily: "Vazir-Medium", fontSize: 24 }}>
              {item.name}
            </Text>
            <Text style={{ fontFamily: "Vazir-Medium", fontSize: 14 }}>
              {item.qty} محصول
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = item => {
    return item.id.toString();
  };

  return (
    <View style={{ flex: 1, padding: 15 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator= {false}
      />
    </View>
  );
};

export default Categories;
