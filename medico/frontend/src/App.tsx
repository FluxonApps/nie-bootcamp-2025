import React from "react";
import "./App.css";
import HomePage from "../pages/homePage"; // import your HomePage component

function App() {
  return (
    <div className="App">
      <header className="App-header p-4 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-6">Medico</h1>
      </header>
      
      <main className="p-4">
        <HomePage />
      </main>

      <footer className="p-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Medico. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
