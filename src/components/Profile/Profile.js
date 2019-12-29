import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  TouchableOpacityBase
} from "react-native";
import { Icon } from "native-base";

const items = [
  { id: 0, name: "لیست محصولات مورد علاقه" },
  { id: 1, name: "واحد پول", showCurrency: true },
  { id: 5, name: "زبان", showLanguage: true },
  { id: 2, name: "ارسال اعلانیه", showSwitch: true },
  { id: 3, name: "تماس با ما" },
  { id: 4, name: "درباره ما" }
];

const Profile = () => {
  const [isPushNotificationActive, setIsPushNotificationActive] = useState(
    true
  );
  const [currency, setCurrency] = useState("ریال");
  const [language, setLanguage] = useState("فارسی");

  //TODO:be jaye karbar mehman byd username biad
  //TODO:dokme login ham byd vaqti nshun dade bshe k karbar login nkrde
  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: 150,
            height: 150,
            marginTop: 15
          }}
        >
          <Image
            source={require("./../../../assets/photos/avatar.png")}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "cover",
              borderRadius: 500
            }}
          />
        </View>
        <Text
          style={{ marginTop: 15, fontSize: 16, fontFamily: "Vazir-Medium" }}
        >
          مهمان
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              marginTop: 5,
              fontSize: 14,
              fontFamily: "Vazir",
              color: "#2980b9"
            }}
          >
            وارد شدن
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ flex: 1, marginTop: 15, padding: 15 }}
        showsVerticalScrollIndicator={false}
      >
        {items.map(item => {
          return (
            <TouchableOpacity key={item.id.toString()} onPress={() => alert('btn')}>
              <View                
                style={{
                  borderBottomWidth: 0.2,
                  borderBottomColor: "#7f8c8d",
                  padding: 15,
                  width: "98%",
                  alignSelf: "center",
                  justifyContent: "space-between",
                  flexDirection: "row-reverse"
                }}
              >
                <Text style={{ fontFamily: "Vazir", fontSize: 15 }}>
                  {item.name}
                </Text>
                {item.showSwitch ? (
                  <Switch
                    value={isPushNotificationActive}
                    onValueChange={() =>
                      setIsPushNotificationActive(!isPushNotificationActive)
                    }
                  />
                ) : item.showCurrency || item.showLanguage ? (
                  <View
                    style={{
                      flexDirection: "row-reverse",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        marginLeft: 10,
                        fontFamily: "Vazir",
                        fontSize: 14
                      }}
                    >
                      {item.showCurrency ? currency : language}
                    </Text>
                    <Icon name="ios-arrow-back" fontSize={20} />
                  </View>
                ) : (
                  <Icon name="ios-arrow-back" fontSize={20} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Profile;
