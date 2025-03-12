import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import HomePage from './pages/HomePage/HomePage';
import QuestionDetailsAndAnswer from './pages/QuestionDetailsAndAnswer/QuestionDetailsAndAnswer';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import LandingPage from './pages/LandingPage/LandingPage';
import AskQuestionPage from './pages/AskQuestionPage/AskQuestionPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/ask-question" element={<AskQuestionPage />} />
          <Route path="/question/:questionId" element={<QuestionDetailsAndAnswer />} />
        </Route>

      </Routes>
      <Footer />
    </div>
  );
};

export default App;