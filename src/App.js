import React, { useState, useEffect } from "react";// usestate manage state and useefect manage effect
import { auth, db } from "./firebaseConfig";// to manage data and take data of users
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth"; // t0 handle the users login and signup functionality
import LandingPage from "./LandingPage";
import Login from "./Login";
import Signup from "./Signup";
import UserDetails from "./UserDetails";
import Questionnaire from "./Questionnaire";
import MedicineSchedule from "./MedicineSchedule";
import HealthTips from "./HealthTips";
import AppFeedback from "./AppFeedback";
import "./App.css"; 

const App = () => {
  const [currentPage, setCurrentPage] = useState("landing");// currently displayed page
  const [lastPage, setLastPage] = useState(null);// store last page
  const [medicines, setMedicines] = useState([]);//store medicines
  const [username, setUsername] = useState("");// user details
  const [loading, setLoading] = useState(true);

  useEffect(() => { //hook
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userDoc = await getDoc(doc(db, "users", authUser.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
        }
        setCurrentPage("userdetails");
      } else {
        setUsername("");
        setCurrentPage("landing");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {// logout function , so user goes to main page
    await signOut(auth);
    setCurrentPage("landing");
  };

  const handleAddMedicine = (newMedicines) => {//Update medicines state when  user submits medicine schedule
    setMedicines(newMedicines);
    setCurrentPage("medicineschedule");
  };

  const navigateTo = (page) => {// saves last page and current page while we naviogate
    setLastPage(currentPage);
    setCurrentPage(page);
  };

  return (
    <div>
      {loading && <div>Loading...</div>}

      {currentPage === "landing" && <LandingPage onGetStarted={() => setCurrentPage("login")} />}
      {currentPage === "login" && <Login onSignup={() => setCurrentPage("signup")} onLoginSuccess={() => setCurrentPage("userdetails")} />}
      {currentPage === "signup" && <Signup onBack={() => setCurrentPage("login")} />}
      {currentPage === "userdetails" && <UserDetails onSubmit={() => setCurrentPage("questionnaire")} />}
      {currentPage === "questionnaire" && <Questionnaire medicines={medicines} onSubmit={handleAddMedicine} onLogout={handleLogout} />}
      
      {/* Medicine Schedule with Feedback  and health tips Button */}
      {currentPage === "medicineschedule" && (
        <MedicineSchedule
          medicines={medicines}
          username={username}
          onAddMedicine={() => setCurrentPage("questionnaire")}
          onLogout={handleLogout}
          onHealthTips={() => navigateTo("healthtips")}  // to Pass navigation prop
          onAppFeedback={() => navigateTo("appfeedback")} //  to Pass navigation prop
        />
      )}

      {/* Health Tips Page */}
      {currentPage === "healthtips" && <HealthTips onBack={() => setCurrentPage(lastPage || "medicineschedule")} />}

      {/* App Feedback Page */}
      {currentPage === "appfeedback" && <AppFeedback onBack={() => setCurrentPage(lastPage || "medicineschedule")} />}
    </div>
  );
};

export default App;
