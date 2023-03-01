import './index.css';
import Header from '../Header/Header';
import CardList from '../CardList/CardList';
import Search from '../Search/Search';
import data from '../../assets/data.json'
import Logo from '../Logo/Logo';
import { useEffect, useState } from 'react';

function App() {

  const [cards, setCards] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect( () => {
    handleRequest()
  }, [searchQuery]);
  
  const handleRequest = () => {
    const filterCard = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()))
    setCards(filterCard);
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    handleRequest()
  }

    const handleInputChange = (inputValue) => {
      setSearchQuery(inputValue)
    }


  return (
    <div className="App">
      <Header>
        <Logo />
        <Search onInput={handleInputChange} onSubmit={handleFormSubmit}/>
      </Header>
      <CardList goods={cards} />
    </div>
  );
}

export default App;
