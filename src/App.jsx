import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ItemsList from "./component/ItemsList";
import Students from "./component/StudentsList";
import Subjects from "./component/SubjectsList";
import SignIn from "./component/SignIn";
import Register from "./component/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-blue-500 text-white py-4">
          <div className="container mx-auto flex justify-between items-center">
            <h3 className="text-xl">My Project</h3>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    หน้าหลัก
                  </Link>
                </li>
                <li>
                  {!isLoggedIn ? (
                    <Link to="/signin" className="hover:text-gray-300">
                      เข้าสู่ระบบ
                    </Link>
                  ) : (
                    <button
                      className="hover:text-gray-300"
                      onClick={() => setIsLoggedIn(false)}
                    >
                      ออกจากระบบ
                    </button>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <div className="container mx-auto py-8 w-auto max-w-screen-lg">
          <Routes>
            <Route
              path="/signin"
              element={<SignIn onLoginSuccess={handleLoginSuccess} />}
            />
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <div className="grid grid-cols-3 gap-4">
                    <div className="card p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 w-full">
                      <ItemsList />
                    </div>
                    <div className="card p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 w-full">
                      <Subjects />
                    </div>
                    <div className="card p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 w-full">
                      <Students />
                    </div>
                  </div>
                ) : (
                  <h1 className="text-3xl font-semibold text-center">
                    Hello กรุณาเข้าสู่ระบบ
                  </h1>
                )
              }
            />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
