import React from "react";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import AuthModal from "./components/AuthModal";

function App() {
  return (
    <AuthProvider>
      <Home />
      <AuthModal />
    </AuthProvider>
  );
}

export default App;