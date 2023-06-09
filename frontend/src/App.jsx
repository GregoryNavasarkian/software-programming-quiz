import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// Utils
import Auth from "./utils/Auth";
// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Login from "./pages/Login";
import GetStarted from "./pages/GetStarted";
import RegisterEmployer from "./pages/RegisterEmployer";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import UpdateEmployer from "./pages/UpdateEmployer";
import CreateQuiz from "./pages/CreateQuiz";
import QuizDetail from "./pages/QuizDetail";
import AddQuestion from "./pages/AddQuestion";
import Candidates from "./pages/Candidates";
import AddCandidate from "./pages/AddCandidate";
import TakeQuiz from "./pages/TakeQuiz";
import QuizResults from "./pages/QuizResults";

import CandidateResult from "./pages/CandidateResults";

function App() {
  return (
    <div className="landscape:lg:mt-0 landscape:md:mt-20 landscape:sm:mt-0">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/register" element={<RegisterEmployer />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:resetToken"
            element={<ResetPassword />}
          />
          <Route path="/dashboard" element={<Auth Component={Dashboard} />} />
          <Route path="/update" element={<Auth Component={UpdateEmployer} />} />
          <Route
            path="/create-quiz"
            element={<Auth Component={CreateQuiz} />}
          />
          <Route path="/quiz/:id" element={<Auth Component={QuizDetail} />} />
          <Route
            path="/add-question/:id"
            element={<Auth Component={AddQuestion} />}
          />
          <Route
            path="/candidates/:id"
            element={<Auth Component={Candidates} />}
          />
          <Route
            path="/quiz-results/:id"
            element={<Auth Component={QuizResults} />}
          />
          <Route
            path="/quiz-results-detail/:candidateId/:quizId"
            element={<Auth Component={CandidateResult} />}
          />
          <Route
            path="/add-candidate/:id"
            element={<Auth Component={AddCandidate} />}
          />
          <Route
            path="/take-quiz/:candidateId/:quizId"
            element={<TakeQuiz />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
