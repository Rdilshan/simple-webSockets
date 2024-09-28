
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Chat from "./Chat";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="chat" element={<Chat />} />
  
        </Route>
      </Routes>
    </BrowserRouter>
  )
}