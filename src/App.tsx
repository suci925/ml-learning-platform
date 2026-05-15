import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import ChapterPage from './pages/ChapterPage';
import PlaygroundPage from './pages/PlaygroundPage';
import RestaurantDemo from './pages/RestaurantDemo';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="flex h-screen bg-[var(--color-bg)]">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chapter/:chapterId" element={<ChapterPage />} />
              <Route path="/playground" element={<PlaygroundPage />} />
              <Route path="/demo" element={<RestaurantDemo />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
