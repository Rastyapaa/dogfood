import './index.css';
import Header from '../Header/Header';
import CardList from '../CardList/CardList';
import Search from '../Search/Search';
import data from '../../assets/data.json'
import Logo from '../Logo/Logo';
import { useEffect, useState } from 'react';
import useDebounce from "../../hooks/useDebounce";
import Footer from "../Footer/Footer";
import api from "../../utils/api";
import { isLiked } from '../../utils/products';

function App() {

  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const debounceSearchQuery = useDebounce(searchQuery, 300);

  useEffect( () => {
    Promise.all([api.getUserInfo(), api.getProductList()])
    .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData.products);
    })
    .catch(err => console.error(err));
}, []);

useEffect(() => {
  handleRequest();
  console.log('INPUT', debounceSearchQuery)
},[debounceSearchQuery]);
  
  const handleRequest = () => {
    api.search(debounceSearchQuery).then(data => {
      setCards(data);
  }).catch(err => console.error(err));}

  function handleFormSubmit(e) {
    e.preventDefault()
    handleRequest()
  }

    const handleInputChange = (inputValue) => {
      setSearchQuery(inputValue)
    }


    const handleUpdateUser = (userUpdate) => {
      api.setUserInfo(userUpdate).then((newUserData) => {
          setCurrentUser(newUserData);
      })
  }

  const handleProductLike = (product) => {
    const liked = isLiked(product.likes, currentUser._id);
    api.changeLikeProduct(product._id, liked).then((newCard) => { 
        const newCards = cards.map((card) => {
            return card._id === newCard._id ? newCard : card;
         })
        setCards(newCards);
    })
}

  return (
    <div className="App">
      <Header user={currentUser} updateUserHandle={handleUpdateUser}>
        <Logo />
        <Search onInput={handleInputChange} onSubmit={handleFormSubmit}/>
      </Header>
      <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser} />
      <Footer/>
    </div>
  );
}

export default App;
