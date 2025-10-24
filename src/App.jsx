import React from "react";
import Body from "./components/Body";
import { AuthProvider } from "./lib/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Body />
    </AuthProvider>
  );
}
