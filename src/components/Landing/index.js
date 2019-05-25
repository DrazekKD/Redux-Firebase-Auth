import React from 'react';
import './landing.scss'
import widowWorld from '../../img/alex-knight-181471-unsplash.jpg'
import conversation from '../../img/conversation.png'
import location from '../../img/location.png'
import promotion from '../../img/promotion.png'
const Landing = () => (
  <div className="landing-container">
      <div className="landing-window-component">
          <div className="landing-header-container">
              <h2 className="landing-header">
                  english is a window for world
              </h2>
          </div>
      </div>
      <div className="about-as-component">
          <div className="about-us-item">
			  <img src={location} alt=""/>
              <h3>It’s the Official Language of 53 Countries</h3>
              <p>400 million people around the world speak English as their first language. Not only that, but English is listed as one of the official languages in more than a quarter of the countries in the world. That’s a lot of new people you can communicate with just by improving one language!</p>
          </div>
          <div className="about-us-item">
			  <img src={conversation} alt=""/>
              <h3>It’s the Most Widely Spoken Language in the World</h3>
              <p>What’s more, English is the rest of the world’s “second language”. While Chinese Mandarin and Spanish are the mother tongues of more people overall, most people in the world choose to learn some English after their native language. In fact, one in five people on the planet speak or understand at least a little bit of English.</p>
          </div>
          <div className="about-us-item">
			  <img src={promotion} alt=""/>
              <h3>It Can Help You Get a Better Job</h3>
              <p>Companies are becoming more international, and English is listed as an essential skill for more and more jobs. There are some organisations that now conduct all their business in English, no matter where in the world they are based. If you want the best paid opportunities, learning English is a great idea.</p>
          </div>
      </div>
  </div>
);

export default Landing;
