import React, { useEffect } from 'react'

import './page-header.scss'

import { Link } from 'react-router-dom'

import { useParams } from 'react-router-dom'

import { useState, useRef } from 'react'


const PageHeader = props => {

  const typeElement = Object.values(props.listTypes);
  const typeLink = Object.values(props.listUrl);



  const { type } = useParams();

  const { keyword } = useParams()

  const isKeyword = keyword ? true : false;


  const [icon, setIcon] = useState('down');

  const dropdownRef = useRef();

  useEffect(() => {
    if(dropdownRef){
      dropdownRef.current.classList.remove("showss");
      setIcon('down')
    }
  }, [props.category])

  const handleShowType = (e) => {
    e.stopPropagation();
    dropdownRef.current.classList.toggle("showss");
    if (icon === 'down') {
      setIcon('up');
    } else {
      setIcon('down')
    }
  }


  const handleEffectShow = () => {
    dropdownRef.current.classList.remove("showss");
    setIcon('down')

  }

  return (
    <>
      <div className="container" style={{marginTop:'7rem'}}>
        <div className="link__components">
          <h1 className="movie-type-wrap">
            {isKeyword ? 'Searching' : (type === 'popular' ? 'Popular' : type === 'top_rated' ? 'Top Rated' : type === 'on_the_air' ? 'Airing Today' : 'Up Coming')}
            {isKeyword ? '' : props.category === 'movie' ? ' Movies' : ' TV Shows'}
          </h1>
          <div className="dropdown-container">
            <div className="active-item-type dropbtn" onClick={handleShowType}>
              <h3 className='prevent__copy'  onClick={handleShowType} >{props.category === 'movie' ? ' Movies' : ' TV Shows'}</h3>
              <i  onClick={handleShowType} className={`fa-solid fa-caret-${icon} check`}></i>
            </div>
            <div ref={dropdownRef} className="dropdown-content">
              {typeElement.map((item, i) => (
                <Link onClick={handleEffectShow} className='hover--effect' to={`/${props.category}/${typeLink[i]}`} key={i}>
                  {
                    typeLink[i] === type ? 
                    <span className='hover--effect-active'>{item}</span>:
                    item
                  }
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default PageHeader