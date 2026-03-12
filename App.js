import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  Image, StyleSheet, SafeAreaView, StatusBar,
} from "react-native";

const SCREENS = { SIGNIN: "signin", EXPLORER: "explorer", ACCOUNT: "account" };

const foodImages = {
  pizza:  { uri: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=120&h=120&fit=crop" },
  burger: { uri: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=120&h=120&fit=crop" },
  steak:  { uri: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=120&h=120&fit=crop" },
  food1:  { uri: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&h=200&fit=crop" },
  food2:  { uri: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=200&fit=crop" },
  food3:  { uri: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop" },
  food4:  { uri: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=200&h=200&fit=crop" },
};

function BottomNav({ screen, onNav }) {
  return (
    <View style={styles.bottomNav}>
      {[
        { id: SCREENS.EXPLORER, label: "Explorer", icon: "🧭" },
        { id: SCREENS.ACCOUNT,  label: "Account",  icon: "👤" },
      ].map((item) => (
        <TouchableOpacity key={item.id} onPress={() => onNav(item.id)} style={styles.navItem}>
          <Text style={styles.navIcon}>{item.icon}</Text>
          <Text style={[styles.navLabel, screen === item.id && styles.navActive]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function SignInScreen({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [pass,  setPass]  = useState("");

  return (
    <ScrollView contentContainerStyle={styles.signInContainer}>
      <Text style={styles.signInTitle}>Sign In</Text>

      <Text style={styles.label}>Email ID</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email here!"
        placeholderTextColor="#bbb"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={pass}
        onChangeText={setPass}
        placeholder="Enter your password here!"
        placeholderTextColor="#bbb"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.forgotWrap}>
        <Text style={styles.forgotText}>For got password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInBtn} onPress={onSignIn}>
        <Text style={styles.signInBtnText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or sign in with</Text>

      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.googleBtn}>
          <Text style={styles.googleBtnText}>G  Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.facebookBtn}>
          <Text style={styles.facebookBtnText}>f  Facebook</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signUpRow}>
        <Text style={styles.signUpGray}>Not yet a member? </Text>
        <TouchableOpacity>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function ExplorerScreen() {
  const categories = [
    { label: "Pizza",   img: foodImages.pizza  },
    { label: "Burgers", img: foodImages.burger },
    { label: "Steak",   img: foodImages.steak  },
  ];

  const sections = [
    {
      title: "Popular Items",
      items: [
        { name: "Food 1", sub: "By Viet Nam", price: "1$", img: foodImages.food1 },
        { name: "Food 2", sub: "By Chef",     price: "3$", img: foodImages.food2 },
      ],
    },
    {
      title: "Popular Items",
      items: [
        { name: "Food 3", sub: "Fresh",   price: "2$", img: foodImages.food3, badge: "10% OFF" },
        { name: "Food 4", sub: "Organic", price: "4$", img: foodImages.food4 },
      ],
    },
  ];

  return (
    <ScrollView style={styles.explorerScroll}>
      <View style={styles.explorerHeader}>
        <Text style={styles.screenTitle}>Explorer</Text>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>📍</Text>
          <TextInput
            placeholder="Search for meals or area"
            placeholderTextColor="#bbb"
            style={styles.searchInput}
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Categories</Text>
          <TouchableOpacity>
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catScrollContent}
        >
          {categories.map((cat) => (
            <TouchableOpacity key={cat.label} style={styles.catItem}>
              <Image source={cat.img} style={styles.catImage} />
              <Text style={styles.catLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {sections.map((section, si) => (
        <View key={si} style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.itemsRow}>
            {section.items.map((item, ii) => (
              <View key={ii} style={styles.foodCard}>
                {item.badge ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                ) : null}
                <Image source={item.img} style={styles.foodImage} />
                <View style={styles.foodInfo}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.foodSub}>{item.sub}</Text>
                  <Text style={styles.foodPrice}>{item.price}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function AccountScreen({ onSignOut }) {
  return (
    <ScrollView>
      <View style={styles.accountBanner} />
      <View style={styles.accountCard}>
        <Text style={styles.accountName}>Hung Nguyen</Text>
        <Text style={styles.accountRole}>Mobile developer</Text>
        <Text style={styles.accountBio}>
          I have above 5 years of experience in native mobile apps development,
          now i am learning React Native
        </Text>
        <TouchableOpacity style={styles.signOutBtn} onPress={onSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default function App() {
  const [screen, setScreen] = useState(SCREENS.SIGNIN);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {screen === SCREENS.SIGNIN && (
        <SignInScreen onSignIn={() => setScreen(SCREENS.EXPLORER)} />
      )}

      {screen === SCREENS.EXPLORER && (
        <>
          <ExplorerScreen />
          <BottomNav screen={screen} onNav={setScreen} />
        </>
      )}

      {screen === SCREENS.ACCOUNT && (
        <>
          <AccountScreen onSignOut={() => setScreen(SCREENS.SIGNIN)} />
          <BottomNav screen={screen} onNav={setScreen} />
        </>
      )}
    </SafeAreaView>
  );
}

const ORANGE = "#F4A636";

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fafafa" },

  bottomNav: { flexDirection: "row", backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#eee" },
  navItem:   { flex: 1, alignItems: "center", paddingVertical: 10 },
  navIcon:   { fontSize: 20 },
  navLabel:  { fontSize: 11, color: "#aaa", fontWeight: "600" },
  navActive: { color: ORANGE },

  signInContainer: { padding: 28, paddingTop: 48 },
  signInTitle:     { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 32, color: "#222" },
  label:           { fontSize: 13, color: "#444", marginBottom: 6 },
  input:           { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 12, fontSize: 14, marginBottom: 18, color: "#333" },
  forgotWrap:      { alignItems: "flex-end", marginTop: -10, marginBottom: 24 },
  forgotText:      { color: ORANGE, fontSize: 13 },
  signInBtn:       { backgroundColor: ORANGE, borderRadius: 8, padding: 14, alignItems: "center", marginBottom: 16 },
  signInBtnText:   { color: "#fff", fontSize: 15, fontWeight: "700" },
  orText:          { textAlign: "center", color: "#aaa", fontSize: 13, marginBottom: 14 },
  socialRow:       { flexDirection: "row", gap: 10, marginBottom: 20 },
  googleBtn:       { flex: 1, borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 11, alignItems: "center" },
  googleBtnText:   { fontSize: 13, fontWeight: "600", color: "#444" },
  facebookBtn:     { flex: 1, backgroundColor: "#3B5998", borderRadius: 8, padding: 11, alignItems: "center" },
  facebookBtnText: { fontSize: 13, fontWeight: "600", color: "#fff" },
  signUpRow:       { flexDirection: "row", justifyContent: "center" },
  signUpGray:      { fontSize: 13, color: "#aaa" },
  signUpLink:      { fontSize: 13, color: ORANGE, fontWeight: "600" },

  explorerScroll:  { flex: 1 },
  explorerHeader:  { backgroundColor: "#fff", padding: 16, paddingBottom: 12 },
  screenTitle:     { fontSize: 18, fontWeight: "700", color: "#222", marginBottom: 12 },
  searchBar:       { flexDirection: "row", alignItems: "center", backgroundColor: "#f5f5f5", borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10 },
  searchIcon:      { fontSize: 16, marginHorizontal: 4 },
  searchInput:     { flex: 1, fontSize: 13, color: "#888" },
  card:            { backgroundColor: "#fff", padding: 16, marginTop: 8 },
  sectionHeader:   { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle:    { fontWeight: "700", fontSize: 14, color: "#222" },
  filterText:      { color: ORANGE, fontSize: 12 },
  viewAll:         { color: ORANGE, fontSize: 12 },
  catScrollContent: { paddingRight: 8, paddingVertical: 4 },
  catItem:         { alignItems: "center", marginRight: 16, width: 80 },
  catImage:        { width: 72, height: 72, borderRadius: 14 },
  catLabel:        { fontSize: 11, color: "#555", fontWeight: "500", marginTop: 6, textAlign: "center" },
  itemsRow:        { flexDirection: "row", gap: 12 },
  foodCard:        { flex: 1, borderRadius: 12, overflow: "hidden", borderWidth: 1, borderColor: "#f0f0f0" },
  badge:           { position: "absolute", top: 6, right: 6, backgroundColor: "#e53935", borderRadius: 4, paddingHorizontal: 5, paddingVertical: 2, zIndex: 1 },
  badgeText:       { color: "#fff", fontSize: 9, fontWeight: "700" },
  foodImage:       { width: "100%", height: 90 },
  foodInfo:        { padding: 8 },
  foodName:        { fontWeight: "600", fontSize: 12, color: "#222" },
  foodSub:         { fontSize: 10, color: "#aaa" },
  foodPrice:       { fontWeight: "700", fontSize: 12, color: ORANGE, marginTop: 2 },

  accountBanner:   { height: 120, backgroundColor: "#4fc3f7" },
  accountCard:     { backgroundColor: "#fff", padding: 20, alignItems: "center" },
  accountName:     { fontSize: 20, fontWeight: "700", color: "#222", marginBottom: 4 },
  accountRole:     { fontSize: 13, color: ORANGE, fontWeight: "600", marginBottom: 12 },
  accountBio:      { fontSize: 13, color: "#777", textAlign: "center", lineHeight: 20, marginBottom: 20 },
  signOutBtn:      { backgroundColor: ORANGE, borderRadius: 20, paddingHorizontal: 32, paddingVertical: 10 },
  signOutText:     { color: "#fff", fontSize: 14, fontWeight: "700" },
});