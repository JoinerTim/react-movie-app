import React from 'react'
import './header.scss'
import { GlobalContext } from '../../context/GlobalState'
import axios from 'axios'

import { useContext } from 'react'

import { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import apiConfig from '../../api/apiConfig'

import logo from '../../assets/logo/Netflix.png'

const headerNav = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "Movies",
    path: "/movie"
  },
  {
    name: "TV Shows",
    path: "/tv"
  },
  {
    name: "My List",
    path: "/mylist/movie/watchlist"
  },
  // {
  //   name:"People",
  //   path:"person"
  // }
]



const Header = () => {

  const [username, setUsername] = useState('')

  const email = localStorage.getItem('authId')
  useEffect(() => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const getData = async () => {
      const { data } = await axios.post(
        "https://app-main-react-nghia.herokuapp.com/api/auth/getuser",
        { email: email },
        config
      );
      setUsername(data.user.username)
    }
    getData();
  }, [email])


  const { watchlist } = useContext(GlobalContext);

  const tooltipsRef = useRef(null)
  const languageRef = useRef(null)
  const notificationRef = useRef(null)
  const findingRef = useRef(null)
  const refFocus = useRef(null)
  const refToolbars = useRef(null)


  const handleIconToggle = () => {

    refToolbars.current.style.transform = 'translateX(0%)';
  }

  const handleExitToolbars = () => {
    refToolbars.current.style.transform = 'translateX(200%)';
  }


  window.onclick = function (e) {
    if (window.location.href === 'https://movie-app-nghia-pd.netlify.app/') {
      if (!e.target.matches('.tooltips')) {
        tooltipsRef.current.classList.remove('show--tooltips');
      }
      if (!e.target.matches('.language__tooltips')) {
        languageRef.current.classList.remove('show--tooltips');
      }
      if (!e.target.matches('.notification')) {
        notificationRef.current.classList.remove('show--tooltips');
      }
    }
  }

  const handleToggleDisplayTooltips = () => {
    tooltipsRef.current.classList.remove('show--tooltips');
    languageRef.current.classList.remove('show--tooltips');

  }

  const handleDisplayTooltips = (e) => {
    e.stopPropagation();
    languageRef.current.classList.remove('show--tooltips');
    notificationRef.current.classList.remove('show--tooltips');
    findingRef.current.classList.remove('show--tooltips');
    tooltipsRef.current.classList.toggle('show--tooltips');
  }

  const handleToggleDisplayLgTooltips = (e) => {
    e.stopPropagation();
    notificationRef.current.classList.remove('show--tooltips');
    findingRef.current.classList.remove('show--tooltips');
    tooltipsRef.current.classList.remove('show--tooltips');
    languageRef.current.classList.toggle('show--tooltips');
  }

  const handleToggleDisplayIfTooltips = (e) => {
    e.stopPropagation();
    tooltipsRef.current.classList.remove('show--tooltips');
    languageRef.current.classList.remove('show--tooltips');
    findingRef.current.classList.remove('show--tooltips');
    notificationRef.current.classList.toggle('show--tooltips');
  }

  const handleDisplayFinding = (e) => {
    e.stopPropagation();
    tooltipsRef.current.classList.remove('show--tooltips');
    languageRef.current.classList.remove('show--tooltips');
    notificationRef.current.classList.remove('show--tooltips');
    findingRef.current.classList.toggle('show--tooltips');
    refFocus.current.focus()
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authTokenPrev')
    localStorage.removeItem('authId')
  }


  const [isEnglishs, setIsEnglishs] = useState(localStorage.getItem('language') ? false : true)


  const handleChangeLanguage = () => {
    let isEnglish = localStorage.getItem('language') ? false : true;
    isEnglish ? localStorage.setItem('language', JSON.stringify("vi")) : localStorage.removeItem('language')
    setIsEnglishs(!isEnglishs)
  }

  const handleChangeLanguageEnglish = () => {
    localStorage.removeItem('language')
  }

  const handleChangeLanguageVN = () => {
    localStorage.setItem('language', JSON.stringify("vi"))
  }


  const headerRef = useRef(null);


  //handle search push history
  const history = useNavigate();
  const [keyword, setKeyword] = useState('');
  const goToSearch = useCallback(
    () => {
      if (keyword.trim().length > 0) {
        history(`/search/movie/${keyword}`);
      } else if (keyword === '') {
        history(`/`);
      }
    },
    [keyword, history]
  );

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13 && keyword !== '') {
        goToSearch();
      }
    }
    document.addEventListener('keyup', enterEvent);
    return () => {
      document.removeEventListener('keyup', enterEvent);
    };
  }, [keyword, goToSearch]);

  const refreshKeyword = () => {
    if (keyword !== '') {
      setKeyword('')
      refFocus.current.focus()
    } else {
      findingRef.current.classList.remove('show--tooltips')
    }

  }

  //


  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="header__navigation">
          <div className="header__navigation__logo">
            <Link to="/"> <img width="111px" height="100px" src={logo} alt="Logo" /> </Link>
          </div>
          <ul className="header__navigation__list">
            {headerNav.map((item, index) => (
              <li key={index} >
                <Link onClick={() => window.scrollTo(0, 0)} className="effect-shine" to={`${item.path === "/tv" || item.path === '/movie' ? `${item.path}/popular` : `${item.path}`}`}> {item.name} </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="tool--bars">
          <div onClick={handleIconToggle} className="tool-bars-icon">
            <i className="fa-solid fa-bars"></i>
          </div>
          <div ref={refToolbars} className="tool--bars--list">
            <ul>
              <li className='exit--toggle'>
                <i onClick={handleExitToolbars} className="fa-solid fa-xmark"></i>
                <Link onClick={handleExitToolbars} to={"/"}><i className="fa-solid fa-house"></i></Link>
              </li>
              {/* <li onClick={handleExitToolbars}>
                <Link to="#">
                {username.charAt(0).toUpperCase() + username.slice(1)}<i className="fa-solid fa-house-user"></i>
                </Link>
              </li> */}
              <li className='english__toggle' >
                <Link to="#">
                  <i className="fa-solid fa-language"></i>
                  <h3 className='language__now'>Language</h3>
                </Link>
                <ul className='abc-language'>
                  <li><Link to="/" onClick={() => { handleChangeLanguageEnglish(); handleExitToolbars()}}>English </Link></li>
                  <li><Link to="/" onClick={() => { handleChangeLanguageVN(); handleExitToolbars()}}>Vietnamese </Link></li>

                </ul>
              </li>
              {/* <li>
                <Link to="#">
                  <i className="fa-solid fa-bell"></i>
                  <h3 className='language__now'>Notification</h3>
                </Link>
              </li> */}
              <li onClick={handleExitToolbars}>
                <Link to="mylist/movie/watchlist" >
                  <i className='fa-solid fa-bookmark'></i>
                  <h3 className='language__now'>Watchlist</h3></Link>
              </li>
              <li>
                <Link to="/login" target="_self" onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <h3 className='language__now'>Log out</h3>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <ul className="header__settings">
          {/* <li >
            <i className="fa-solid fa-plus"></i>
          </li> */}
          <li>
            <i onClick={handleToggleDisplayLgTooltips} className="fa-solid fa-language"></i>
            <div ref={languageRef} className="language__tooltips " >
              <h3 className='language__now'>{isEnglishs ? 'English' : 'Vietnamese'} <i className="fa-solid fa-snowflake"></i> </h3>
              <ul onClick={handleToggleDisplayTooltips} className="language__tooltips--list">
                <li className="language__tooltips--list-item">
                  <Link to="/" onClick={handleChangeLanguage}>{isEnglishs ? 'Vietnamese' : 'English'} <i className="fa-solid fa-earth-americas"></i></Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <i onClick={handleToggleDisplayIfTooltips} className="fa-solid fa-bell"></i>
            {
              watchlist ? <div onClick={handleToggleDisplayIfTooltips} className="count--notifycation">
                <span>{watchlist.length}</span>
              </div> : <></>
            }
            <div ref={notificationRef} className="notification">
              <h3 className='notification-title'>Notification 🌻</h3>
              <ul className="notification__list">
                {
                  watchlist.map((item, i) => (
                    <li key={i} className="notification__list--item">
                      <img src={`${apiConfig.originalImage(item.backdrop_path || item.poster_path)}`} alt="Movie" />
                      <div className="notification__list--item-info">
                        <Link to={'/movie' + '/' + item.id + `/${item.name ? item.name.replace(/\s/g, '-') : item.title.replace(/\s/g, '-')}`} className="notification__list--item-name">{item.name || item.title} <span> ({item.release_date.slice(0, 4)})</span></Link>
                        <div className='percentage-wrap'>
                          <div className="item--percentage">
                            <div style={{ width: `${item.vote_average * 10}%` }} className="item--percentage-process"></div>
                          </div>
                          <span>{(item.vote_average * 10).toFixed(0)} %</span>
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
              <div className="closet-notification">
                <span onClick={handleToggleDisplayIfTooltips}>Closed <i className="fa-solid fa-bell-slash"></i></span>
              </div>
            </div>
          </li>
          <li>
            <div onClick={handleDisplayTooltips} className="header__settings__avt">
              <span>{username.slice(0, 1).toUpperCase()}</span>
            </div>

            <div ref={tooltipsRef} className="tooltips">
              <div className="user__account">
                <Link to="#" onClick={handleToggleDisplayTooltips} className='User__account--name'>{username.charAt(0).toUpperCase() + username.slice(1)}<i className="fa-solid fa-house-user"></i></Link>
              </div>
              <ul className="tooltips__list">
                <li className="tooltips__list__item">
                  <Link to="/mylist/movie/watchlist" onClick={handleToggleDisplayTooltips}>Watchlist <i className='fa-solid fa-bookmark'></i></Link>
                </li>
                <li className="tooltips__list__item">
                  <Link to="/login" target="_self" onClick={handleLogout}>Logout<i className="fa-solid fa-right-from-bracket"></i></Link>
                </li>
              </ul>
            </div>

            <div className=""></div>
          </li>
          <li >
            <i onClick={handleDisplayFinding} className="fa-solid fa-magnifying-glass"></i>
          </li>
        </ul>
      </div>
      <div ref={findingRef} className="input__search--main">
        <button ><i onClick={() => goToSearch()} className="fa-solid fa-magnifying-glass"></i></button>
        <input
          ref={refFocus}
          type="text"
          placeholder='Search to watch more and more Movies or TV Shows...'
          value={keyword}
          onChange={(e) => { setKeyword(e.target.value); }}
        />
        <div className="close-upp">
          <i onClick={refreshKeyword} className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>
  )
}

export default Header








