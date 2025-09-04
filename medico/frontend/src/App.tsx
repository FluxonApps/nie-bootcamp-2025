// import React from "react";
// import "./App.css";

// // 👈 1. Import routing components and your pages
// import { Routes, Route } from "react-router-dom";
// import HomePage from "../pages/homePage"; 
// import SearchPage from "../pages/SearchPage"; 
// import Navbar from "../components/Navbar";    
// // import AddProduct from "../components/AddProducts"; 

// function App() {
//   return (
//     <div className="App">
//       <Navbar />

//       <main className="p-4">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/search" element={<SearchPage />} />
//         </Routes>
//       </main>

//       <footer className="p-4 text-center text-gray-500 text-sm">
//         &copy; {new Date().getFullYear()} Medico. All rights reserved.
//       </footer>
//     </div>
//   );
// }

// export default App;



import React from "react";
import "./App.css";

// 👈 1. Import routing components and your pages
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage"; 
import SearchPage from "../pages/SearchPage"; 
import Navbar from "../components/Navbar";    
import AddProduct from "../components/AddProducts"; 

function App() {
  return (
    <div className="App">
      <Navbar />

      <main className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </main>

      <footer className="p-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Medico. All rights reserved.
      </footer>
    </div>
  );
}

export default App;