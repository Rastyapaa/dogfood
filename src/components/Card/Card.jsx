import './index.css';
import { ReactComponent as Save } from './ic-favorites.svg'
import cn from "classnames";
import { isLiked } from '../../utils/products';

const Card = ({ name, price, discount, wight, description, tags, currentUser, onProductLike, pictures, likes, _id }) => {
  const discountPrice = Math.round(price - price * discount /100)
  const liked =  isLiked(likes, currentUser?._id);
  const handleLikeClick = () => {
    console.log('click', liked);
    onProductLike({_id, likes})
  }

  return (
    <div className='card'>

      <div className='card__sticky card__sticky_type_top-left'>
        {discount !== 0 && <span className='card__discount'>{discount}%</span>}
        </div>
      <div className='card__sticky card__sticky_type_top-right'>
              <button className={cn('card__favorite', {
                  'card__favorite_is-active': liked
              })} onClick={handleLikeClick}>
                  <Save className='card__favorite-icon'/>
              </button>
          </div>
      <a href='#' className='card__link'>
        <img src={pictures} className='card__image ' alt={description}/>
        <div className='card__desc'>
          <span className={discount !== 0 ? 'card__old-price': 'card__price'}>{price}&nbsp;₽</span>
          {discount !== 0 && <span className='card__price card__price_type_discount'>{discountPrice}&nbsp;₽</span>}
          <span className='card__wight'>{wight}</span>
          <p className='card__name'>{name}</p>
        </div>
      </a>
      <a href=' ' className='card__cart btn btn_type_primary'>В корзину</a>
    </div>
  );
};

export default Card;
