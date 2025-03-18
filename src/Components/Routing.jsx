import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexHome from "./homepage/Index-home";

import Members from "./Team/Members";
import CampusAmbassadorProgram from "./CampusAmbassador/CampusAmbassadorProgram";
import AuthForm from "./Profile/AuthForm";
import ProfileRoute from "./Profile/ProfileRoute";
import Events from "./Events/Events";
import EventDetail from "./Events/EventDetail";
import { Toaster } from "react-hot-toast";

import Sponsors from "./Sponsors/Sponsors";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminPayment from './Contact/AdminPayment';
import AdminEvents from './Events/AdminEvents';
import AdminUserDet from './Contact/AdminUserDet';
import EventAdminPanel from "./Events/AdminEvents";
import AdminPanel from "./Contact/AdminPayment";


const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  
  if (!user) {
    return <Navigate to="/profile" replace />;
  }
  
  return children;
};

function Routing() {
  return (
    <div
      style={{
        paddingLeft: "calc(var(--sidebar-width) + 0px)", // Ensure px unit
        width: "100%",
      }}
      className="min-h-screen bg-gray-900"
    >
      <Toaster />

      <Routes>
        <Route path="/profile" element={<ProfileRoute />} />


        <Route path="/" element={<ProtectedRoute> <IndexHome />  </ProtectedRoute> } />
        {/* <Route path="/about" element={<ProtectedRoute> <Members />  </ProtectedRoute> } />
        <Route
          path="/campus-ambassador"
          element={<ProtectedRoute> <CampusAmbassadorProgram />  </ProtectedRoute> }
        /> */}
  
        <Route path="/payment" element={<ProtectedRoute> <AdminPanel />  </ProtectedRoute> } />
        <Route path="/events" element={<ProtectedRoute> <EventAdminPanel />  </ProtectedRoute> } />
        <Route path="/events/:id" element={<ProtectedRoute> <EventDetail />  </ProtectedRoute> } />
        <Route path="/adminevent" element={<ProtectedRoute> <AdminEvents />  </ProtectedRoute> } />
        <Route path="/admpay" element={<ProtectedRoute> <AdminPayment />  </ProtectedRoute> } />
        <Route path="/admuserdet" element={<ProtectedRoute> <AdminUserDet />  </ProtectedRoute> } />



       
        
      </Routes>
    </div>
  
  );
}

export default Routing;
