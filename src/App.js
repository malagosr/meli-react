import SearchBar from './components/SearchBar'
import { SearchProvider } from './context/SearchContext'
import Home from './screens/Home'
import ItemList from './screens/ItemList'
import ItemDetail from './screens/ItemDetail'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.scss';

function App() {
  return (
    <Router>
      <div className='App'>
        <SearchProvider>
          <SearchBar/>
          <div className='content'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/itemList" element={<ItemList />} />
              <Route path="/itemDetails/:id" element={<ItemDetail />} />
            </Routes> 
          </div>
        </SearchProvider>
      </div>
    </Router>
  );
}

export default App