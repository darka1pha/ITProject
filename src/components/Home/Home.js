import React, { useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import { Feather } from "@expo/vector-icons";

//Temp=============
import { data, featuredProduct } from "./Data";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Home = ({ navigation }) => {
  //FIXME: icon absoulute position
  const detailsBtn = item => {
    navigation.navigate("Details", { product: item });
  };

  const renderFirstFlatList = ({ item }) => {
    return (
      <View style={{ marginTop: 20 }}>
        <TouchableWithoutFeedback onPress={() => detailsBtn(item)}>
          <Image
            source={item.image}
            style={{
              width: screenWidth * 0.8,
              height: "100%",
              marginRight: 15,
              marginLeft: data.indexOf(item) === 0 ? 15 : 0,
              borderRadius: 20
            }}
          />
        </TouchableWithoutFeedback>
        <TouchableOpacity
          onPress={() => alert("Add to wishlist")}
          style={{ position: "absolute", top: 8, right: 25 }}
        >
          <Feather name={"heart"} size={22} />
        </TouchableOpacity>
        <View
          style={{
            width: "100%",
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            flexDirection: "row-reverse",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 24, fontFamily: "Vazir-Bold" }}>
            {item.name}
          </Text>
          <Text
            style={{ fontSize: 18, fontFamily: "Vazir-Bold", color: "#2d3436" }}
          >
            {item.price} ریال
          </Text>
        </View>
      </View>
    );
  };

  const firstFlatListKeyExtractor = item => {
    return item.id.toString();
  };

  const renderFeaturedProductFlatList = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={() => detailsBtn(item, navigation)}>
        <View
          style={{
            width: "48%",
            height: screenHeight / 3,
            marginBottom: 15,
            marginRight: index % 2 === 0 ? 15 : 0
          }}
        >
          <Image
            source={item.image}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "cover",
              borderRadius: 15
            }}
          />
          <View style={{ position: "absolute", top: 5, right: 7 }}>
            <TouchableOpacity onPress={() => alert("Add To WishList")}>
              <Feather name={"heart"} size={20} />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              alignSelf: "center",
              marginTop: 5,
              fontSize: 17,
              fontFamily: "Vazir-Medium"
            }}
          >
            {item.name}
          </Text>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              alignSelf: "center"
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: "Vazir" }}> ريال</Text>
            <Text
              style={{ fontSize: 16, color: "#3498db", fontFamily: "Vazir" }}
            >
              {item.price}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const featuredProductFlatListKeyExtractor = item => {
    return item.id.toString();
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          horizontal
          renderItem={renderFirstFlatList}
          keyExtractor={firstFlatListKeyExtractor}
          data={data}
          style={{ height: screenHeight - 350 }}
          showsHorizontalScrollIndicator={false}
        />
        <TouchableWithoutFeedback onPress={() => alert("Go to Details screen")}>
          <View
            style={{
              width: "94%",
              alignSelf: "center",
              marginTop: 25,
              height: screenHeight * 0.3,
              marginBottom: 25
            }}
          >
            <Image
              source={require("./../../../assets/photos/woman.jpg")}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: "cover",
                borderRadius: 20
              }}
            />
            <Text
              style={{
                fontFamily: "Vazir-Thin",
                fontSize: 24,
                position: "absolute",
                top: (screenHeight * 0.3) / 2,
                right: 25
              }}
            >
              برای زیبایی و
            </Text>
            <Text
              style={{
                fontFamily: "Vazir-Thin",
                fontSize: 24,
                position: "absolute",
                top: (screenHeight * 0.3) / 2 + 25,
                right: 25
              }}
            >
              تناسب اندام
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
            width: "100%",
            padding: 15
          }}
        >
          <Text style={{ fontSize: 24, fontFamily: "Vazir-Bold" }}>
            پیشنهادات ویژه
          </Text>
        </View>
        <FlatList
          style={{ flex: 1, padding: 15 }}
          data={featuredProduct}
          renderItem={renderFeaturedProductFlatList}
          keyExtractor={featuredProductFlatListKeyExtractor}
          numColumns={2}
          horizontal={false}
        />
      </ScrollView>
    </View>
  );
};

export default Home;
