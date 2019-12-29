import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { Root } from "native-base";

import Home from "./src/components/Home/Home";
import Cart from "./src/components/Cart/Cart";
import Categories from "./src/components/Categories/Categories";
import Profile from "./src/components/Profile/Profile";
import Search from "./src/components/Search/Search";
import Details from "./src/components/Home/Details";
import { CartContext } from "./src/contexts/CartContext";

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: "صفحه اصلی"
      }
    },
    Details: {
      screen: Details
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        elevation: 0,
        shadowOffset: {
          height: 0,
          width: 0
        },
        shadowOpacity: 0
      },
      headerTitleStyle: {
        fontFamily: "Vazir-Bold",
        fontWeight: "normal"
      },
      headerTitleContainerStyle: { justifyContent: "flex-end" },
      headerLeft: () => {
        return (
          <TouchableOpacity onPress={() => alert("Drawer Open")}>
            <Feather name={"menu"} size={25} style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        );
      },
      headerRight: () => {
        return (
          <Image
            source={require("./assets/app.png")}
            style={{ width: 40, height: 40, marginRight: 15 }}
          />
        );
      }
    },
    initialRouteName: "Home"
  }
);

const CartStack = createStackNavigator(
  {
    Cart: {
      screen: Cart,
      navigationOptions: {
        title: "سبد خرید",
        headerTitleContainerStyle: {
          justifyContent: "flex-end"
        },
        headerTitleStyle: {
          fontFamily: "Vazir-Bold",
          fontWeight: "normal"
        }
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        elevation: 0,
        shadowOffset: {
          height: 0,
          width: 0
        },
        shadowOpacity: 0
      },
      headerLeft: () => {
        return (
          <TouchableOpacity onPress={() => alert("Drawer Open")}>
            <Feather name={"menu"} size={25} style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        );
      },
      headerRight: () => {
        return (
          <Image
            source={require("./assets/app.png")}
            style={{ width: 40, height: 40, marginRight: 15 }}
          />
        );
      }
    }
  }
);

const CategoriesStack = createStackNavigator(
  {
    Categories: {
      screen: Categories,
      navigationOptions: {
        title: "دسته بندی محصولات",
        headerTitleContainerStyle: {
          justifyContent: "flex-end"
        },
        headerTitleStyle: {
          fontFamily: "Vazir-Bold",
          fontWeight: "normal"
        }
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        elevation: 0,
        shadowOffset: {
          height: 0,
          width: 0
        },
        shadowOpacity: 0
      },
      headerLeft: () => {
        return (
          <TouchableOpacity onPress={() => alert("Drawer Open")}>
            <Feather name={"menu"} size={25} style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        );
      },
      headerRight: () => {
        return (
          <Image
            source={require("./assets/app.png")}
            style={{ width: 40, height: 40, marginRight: 15 }}
          />
        );
      }
    }
  }
);

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: "پروفایل",
        headerTitleContainerStyle: {
          justifyContent: "flex-end"
        },
        headerTitleStyle: {
          fontFamily: "Vazir-Bold",
          fontWeight: "normal"
        }
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        elevation: 0,
        shadowOffset: {
          height: 0,
          width: 0
        },
        shadowOpacity: 0
      },
      headerLeft: () => {
        return (
          <TouchableOpacity onPress={() => alert("Drawer Open")}>
            <Feather name={"menu"} size={25} style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        );
      },
      headerRight: () => {
        return (
          <Image
            source={require("./assets/app.png")}
            style={{ width: 40, height: 40, marginRight: 15 }}
          />
        );
      }
    }
  }
);

const SearchStack = createStackNavigator({
  Search: {
    screen: Search
  }
});

const TabNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack
    },
    Categories: {
      screen: CategoriesStack
    },
    Search: {
      screen: SearchStack
    },
    Cart: {
      screen: CartStack
    },
    Profile: {
      screen: ProfileStack
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        const IconComponent = Feather;
        let iconName;
        switch (routeName) {
          case "Profile":
            iconName = "user";
            break;
          case "Home":
            iconName = "home";
            break;
          case "Cart":
            iconName = "shopping-cart";
            break;
          case "Search":
            iconName = "search";
            break;
          case "Categories":
            iconName = "grid";
            break;
          default:
            break;
        }
        return (
          <View>
            <IconComponent name={iconName} size={25} color={tintColor} />
          </View>
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "#00cec9",
      showLabel: false
    },
    initialRouteName: "Cart",
    resetOnBlur: false
  }
);

const AppContainer = createAppContainer(TabNavigation);

export default function App() {
  const [loading, setLoading] = useState(true);

  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      "Vazir-Medium": require("./assets/fonts/Vazir-Medium-FD.ttf"),
      "Vazir-Light": require("./assets/fonts/Vazir-Light-FD.ttf"),
      Vazir: require("./assets/fonts/Vazir-FD.ttf"),
      "Vazir-Black": require("./assets/fonts/Vazir-Black-FD.ttf"),
      "Vazir-Bold": require("./assets/fonts/Vazir-Bold-FD.ttf"),
      "Vazir-Thin": require("./assets/fonts/Vazir-Thin-FD.ttf"),
      ...Ionicons.font
    });

    setLoading(false);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (loading) return <AppLoading />;

  return (
    <Root>
      <AppContainer />
    </Root>
  );
}
