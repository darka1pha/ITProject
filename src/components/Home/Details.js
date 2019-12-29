import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Toast } from "native-base";
import { addOrder, setOrders, getOrders } from "../../content/orders";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Details = ({ navigation }) => {
  const product = navigation.getParam("product", null);

  const orderBtn = () => {
    var isDuplicated = false;

    const orders = getOrders();
    if (orders.length !== 0) {
      let id = product.id;
      orders.forEach(element => {
        if (element.id === id) {
          element.num++;
          isDuplicated = true;
        }
      });

      if (!isDuplicated) {
        let order = {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          num: 1
        };

        addOrder(order);
      }
    } else {
      let order = {
        id: product.id,
        name: product.name,
        category: product.category,
        image: product.image,
        price: product.price,
        num: 1
      };

      addOrder(order);
    }

    setOrders(orders);

    Toast.show({
      text: "سفارش ثبت شد",
      textStyle: { fontSize: 16, fontFamily: "Vazir" },
      type: "success",
      duration: 1500,
      position: "top"
    });
  };

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View
        style={{
          marginTop: 25,
          width: "85%",
          height: screenHeight / 1.75,
          alignSelf: "center"
        }}
      >
        <Image
          source={product.image}
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: "cover",
            borderRadius: 25
          }}
        />
        <View
          style={{
            position: "absolute",
            top: 10,
            right: 15,
            flexDirection: "row-reverse"
          }}
        >
          <TouchableOpacity onPress={() => alert("Add To WishList")}>
            <Feather name={"heart"} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert("Share Btn")}
            style={{ marginRight: 10 }}
          >
            <Feather name={"share-2"} size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginTop: 15,
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "center",
          width: "85%"
        }}
      >
        <Text
          style={{
            fontFamily: "Vazir-Medium",
            fontSize: 24
          }}
        >
          {product.name}
        </Text>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Text style={{ fontSize: 16, fontFamily: "Vazir" }}> ريال</Text>
          <Text style={{ fontSize: 16, color: "#3498db", fontFamily: "Vazir" }}>
            {product.price}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "85%",
          alignSelf: "center"
        }}
      >
        <Text
          style={{
            fontFamily: "Vazir",
            fontSize: 14,
            color: "#7f8c8d"
          }}
        >
          {product.category}
        </Text>
      </View>
      <View style={{ width: "85%", alignSelf: "center", marginTop: 15 }}>
        <Text style={{ fontSize: 16, fontFamily: "Vazir" }}>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
          درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد
        </Text>
      </View>
      <View
        style={{
          alignSelf: "center",
          marginVertical: 15,
          width: "85%",
          flexDirection: "row-reverse",
          justifyContent: "center"
        }}
      >
        <TouchableOpacity
          style={{
            flex: 0.8,
            paddingVertical: 8,
            backgroundColor: "#2ed573",
            borderRadius: 25,
            alignItems: "center"
          }}
          onPress={orderBtn}
        >
          <Text
            style={{
              fontFamily: "Vazir-Medium",
              color: "white",
              fontSize: 16
            }}
          >
            سفارش
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

Details.navigationOptions = ({ navigation }) => {
  const product = navigation.getParam("product", null);
  var productName = "جزییات محصول";
  if (product) {
    productName = product.name;
  }
  return {
    title: productName
  };
};

export default Details;
