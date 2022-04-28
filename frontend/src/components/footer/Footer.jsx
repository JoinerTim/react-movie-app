import React, { useEffect, useState } from 'react'
import './footer.scss'

import logo from '../../assets/logo/Netflix.png'


import { Link } from 'react-router-dom'




const Footer = () => {
  let isEnglishs = localStorage.getItem('language') ? false : true

  return (
    <div className='footer'>
      <div className="footer__content container">
        <div className="footer__content__logo">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
        </div>
        {
          isEnglishs ?
            <>
              <div className="questions">
                <Link to="/">Questions? Contact us.</Link>
              </div>
              <div className="footer__content__menus">
                <div className="footer__content__menu">
                  <Link to="/">FAQ</Link>
                  <Link to="/">Investor Relations</Link>
                  <Link to="/">Privacy</Link>
                  <Link to="/">Speed Test</Link>
                </div>
                <div className="footer__content__menu">
                  <Link to="/">Help Center</Link>
                  <Link to="/">Jobs</Link>
                  <Link to="/">Cookie Preferences</Link>
                  <Link to="/">Legal Notices</Link>
                </div>
                <div className="footer__content__menu">
                  <Link to="/">Account</Link>
                  <Link to="/">Ways to Watch</Link>
                  <Link to="/">Corporate Information</Link>
                  <Link to="/">Only on Netflix</Link>
                </div>
                <div className="footer__content__menu">
                  <Link to="/">Media Center</Link>
                  <Link to="/">Terms of Use</Link>
                  <Link to="/">Contact Us</Link>
                </div>
              </div>
            </>
            :
            <>
              <div className="questions">
                <Link to="/">Câu hỏi? Liên hệ chúng tôi.</Link>
              </div>
              <div className="footer__content__menus">
                <div className="footer__content__menu">
                  <Link to="/">FAQ</Link>
                  <Link to="/">Nhà đầu tư</Link>
                  <Link to="/">Chính sách riêng tư</Link>
                  <Link to="/">Tốc độ</Link>
                </div>
                <div className="footer__content__menu">
                  <Link to="/">Trung tâm trợ giúp</Link>
                  <Link to="/">Công việc</Link>
                  <Link to="/">Tùy chọn cookie</Link>
                  <Link to="/">Thông báo pháp lý</Link>
                </div>
                <div className="footer__content__menu">
                  <Link to="/">Tài khoản</Link>
                  <Link to="/">Cách xem</Link>
                  <Link to="/">Thông tin công ty</Link>
                  <Link to="/">Chỉ trên Netflix</Link>
                </div>
                <div className="footer__content__menu">
                  <Link to="/">Trung tâm Truyền thông</Link>
                  <Link to="/">Terms of Use</Link>
                  <Link to="/">Liên hệ chúng tôi</Link>
                </div>
              </div>
            </>
        }
      </div>

    </div>
  )
}

export default Footer