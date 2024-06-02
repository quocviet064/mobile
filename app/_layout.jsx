import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="login">
      <Stack.Screen 
        name="login" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="(tabs)" 
        options={{ 
          headerTitle: "",  // Để tiêu đề trống để không hiển thị (tabs)
          headerBackTitleVisible: false // Ẩn tiêu đề nút "Back"
        }} 
      />
    </Stack>
  );
}
