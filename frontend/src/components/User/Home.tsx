import searchIcon from "../../assets/icons/search.svg"
import Cross from "./Cross";
import Intervel from "./Intervels";
import Line from "./Line";
import Pen from "./Pen";
import Square from "./Square";


export const Home = () => {
  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-2 border-b border-gray-700">
        <div className="flex items-center">
          <img
            className="pr-2"
            src="/public/icones/icons8-male-user-48.png"
            alt="icones"
          />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 px-4 py-2 rounded-full"
          />
          <img className="px-2" src={searchIcon} alt="search" />
          <div className=" mx-0 h-5 border-l-2 border-gray-400"></div>
          <Intervel/>
        </div>

        <div className="flex items-center space-x-4">
          <span>📋</span>
          <span>🔔</span>
          <span>👤</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-16 bg-gray-800 flex flex-col items-center py-4 space-y-4">
            <Cross/>
            <Line/>
            <Square/>
            <Pen/>
          <button className="text-gray-400 hover:text-white">📈</button>
          <button className="text-gray-400 hover:text-white">🗑</button>
        </aside>

        {/* Chart area */}
        <section className="flex-1 p-4">
          {/* This is where you'd implement your chart */}
          <div className="bg-gray-800 h-full rounded-lg flex items-center justify-center">
            Chart
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 p-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-green-500">▲</span>
          <span>trading app</span>
        </div>
        <span>⚙️</span>
      </footer>
    </div>
  );
};
