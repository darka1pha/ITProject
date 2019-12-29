import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { getOrders, setOrders, addOrder } from "../../content/orders";
import { NavigationEvents } from "react-navigation";
import { CommonActions } from "@react-navigation/core";
import { Icon } from "native-base";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
var totalCost;

const Cart = ({ navigation }) => {
  const orders = getOrders();

  totalCost = 0;

  orders.forEach(element => {
    totalCost += element.price * element.num;
  });

  const [isEmpty, setIsEmpty] = useState(orders.length === 0);
  const [v, setV] = useState(0); //just for forceUpdate

  const checkOrders = () => {
    if (orders.length !== 0) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
    setV(v + 1); //just for forceUpdate
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          width: "94%",
          height: screenHeight / 4,
          backgroundColor: "white",
          marginTop: 15,
          alignSelf: "center",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          borderRadius: 15,
          borderBottomWidth: index === orders.length - 1 ? 0 : 0.4,
          borderBottomColor: "#7f8c8d",
          paddingVertical: 10
        }}
      >
        <View
          style={{
            height: "100%",
            width: "33%",
            padding: 5
          }}
        >
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "cover",
              borderRadius: 15
            }}
            source={item.image}
          />
        </View>
        <View
          style={{
            height: "100%",
            padding: 10,
            justifyContent: "space-around"
          }}
        >
          <View>
            <Text style={{ fontSize: 24, fontFamily: "Vazir-Bold" }}>
              {item.name}
            </Text>
            <Text style={{ color: "gray", fontFamily: "Vazir" }}>
              {item.category}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: "Vazir" }}> ريال</Text>
            <Text
              style={{ fontSize: 20, color: "#3498db", fontFamily: "Vazir" }}
            >
              {item.price}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: "100%",
            padding: 15
          }}
        >
          <TouchableOpacity
            onPress={() => {
              deleteProduct(item);
            }}
          >
            <View
              style={{
                alignSelf: "flex-end",
                marginRight: 15,
                marginBottom: 30,
                marginTop: 12
              }}
            >
              <Icon name="ios-trash" style={{ fontSize: 32, color: "red" }} />
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                addProduct(item);
              }}
            >
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderWidth: 0.5,
                  borderRadius: 500,
                  borderColor: "gray",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Icon name="add" style={{ fontSize: 18, color: "gray" }} />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 26,
                marginHorizontal: 15,
                marginBottom: 5,
                fontFamily: "Vazir"
              }}
            >
              {item.num}
            </Text>
            <TouchableOpacity
              onPress={() => {
                removeProduct(item);
              }}
            >
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderWidth: 0.5,
                  borderRadius: 500,
                  borderColor: "gray",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Icon name="remove" style={{ fontSize: 18, color: "gray" }} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const keyExtractor = item => {
    return item.id.toString();
  };

  const calcuteTotalCost = (item, type) => {
    if (type === "add") {
      totalCost += item.price;
    } else if (type === "sub") {
      totalCost -= item.price;
    }
    if (totalCost === 0) {
      setV(v + 1);
    }
  };

  const deleteProduct = item => {
    calcuteTotalCost(item, "sub");
    var orders = getOrders();

    orders.splice(
      orders
        .map(element => {
          return element.id;
        })
        .indexOf(item.id),
      1
    );

    setOrders(orders);
    if (orders.length === 0) {
      setIsEmpty(true);
    }
    setV(v + 1);
  };

  const addProduct = item => {
    var orders = getOrders();
    orders.forEach(element => {
      if (item.id === element.id) {
        item.num++;
        calcuteTotalCost(item, "add");
      }
    });

    setOrders(orders);
    setV(v + 1);
  };

  const removeProduct = item => {
    var orders = getOrders();
    orders.forEach(element => {
      if (item.id === element.id) {
        if (item.num === 1) {
          deleteProduct(item);
        } else {
          item.num--;
          calcuteTotalCost(item, "sub");
        }
      }
    });

    setOrders(orders);
    setV(v + 1);
  };

  const shopingBtn = () => {
    navigation.dispatch(
      CommonActions.replace({
        name: "Home"
      })
    );
    // navigation.navigate('Home');
  };

  if (isEmpty) {
    return (
      <>
        <NavigationEvents onWillFocus={checkOrders} />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 24, fontFamily: "Vazir-Medium" }}>
            سبد خرید شما خالی میباشد
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 25,
              backgroundColor: "#2980b9",
              width: "40%",
              paddingVertical: 10,
              alignItems: "center",
              borderRadius: 25
            }}
            onPress={shopingBtn}
          >
            <Text
              style={{
                fontFamily: "Vazir-Medium",
                fontSize: 16,
                color: "white"
              }}
            >
              خرید کردن
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
  return (
    <>
      <NavigationEvents onWillFocus={checkOrders} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row-reverse",
            justifyContent: "space-around",
            padding: 15
          }}
        >
          <Text style={{ fontFamily: "Vazir-Medium", fontSize: 24 }}>
            قیمت کل :{" "}
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
              {totalCost}
            </Text>
          </View>
        </View>
        <FlatList
          data={orders}
          extraData={totalCost}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default Cart;
