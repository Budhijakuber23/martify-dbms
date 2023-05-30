import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";

import AdminPage from "./AdminPage";
import AnalystPage from "./AnalystPage";
import FeedbackRead from "./feedbackRead";
import Cat1 from "./Cat1";
import Q1 from "./q1";
import Q2 from "./q2";
import Q3 from "./q3";
import Q4 from "./q4";
import Q5 from "./q5";
import Q6 from "./q6";
import SearchPage from "./SearchPage";
import LoginC from "./loginCustomer";
import Profile from "./pirofile";
import SignUp from "./sign-up";

import Cart from "./Cart";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/customer" element={<Cat1/>} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/analyst" element={<AnalystPage />} />
        <Route path="/feedbacks" element={<FeedbackRead />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/q1" element={<Q1 />} />
        <Route path="/q2" element={<Q2 />} />
        <Route path="/q3" element={<Q3 />} />
        <Route path="/q4" element={<Q4 />} />
        <Route path="/q5" element={<Q5 />} />
        <Route path="/q6" element={<Q6 />} />
        <Route path="/loginC" element={<LoginC />}/>
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/sign-up" element={<SignUp />}/>
      </Routes>
    </div>
  );
};

export default App;
