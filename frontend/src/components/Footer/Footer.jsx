import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

// Import Styles
import './Footer.css';

export default function Footer() {
  // calculates the current date and provides the year for the footer
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer>
      <hr className='mb-5 mt-5' />
      <div className='mb-3 space'>
        <div className='social-container text-center'>
          <div className='footer'>
            <h5>Copyright ⓒ {year} JamSpace</h5>
          </div>
          <div className='footer'>
            {/* Need to add the links to the social pages */}
            <a href='' className='facebook social'>
              <FontAwesomeIcon icon={faFacebook} size='2x' />
            </a>
            <a href='' className='instagram social'>
              <FontAwesomeIcon icon={faInstagram} size='2x' />
            </a>
            <a href='' className='twitter social'>
              <FontAwesomeIcon icon={faTwitter} size='2x' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
