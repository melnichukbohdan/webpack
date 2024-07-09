import React, {useState} from 'react';
import classes from './App.module.scss';
import {Link, Outlet} from "react-router-dom";
import About from "@/pages/About/About";
import avatarPng from "@/assets/608258.png";
import avatarJpg from "@/assets/608.jpg";
import AvatarSvg from "@/assets/app-image.svg";

export const App = () => {

    const [count, setCount] = useState(0)
    const increment = () => setCount(prev => prev + 1)

  function TODO(int: number ) {
    console.log(int);
  }

    TODO(155);

  // if (__PLATFORM__ === 'desktop') {
  //   return <div>IS DESKTOP</div>
  // }
  //
  // if (__PLATFORM__ === 'mobile') {
  //   return <div>IS MOBILE</div>
  // }
  //
  // if (__ENV__ === 'development') {
  //   // developmentTools();
  // }
    return (
      <div>
        test
        <Link to={'/about'}>About</Link>
        <br/>
        <Link to={'/shop'}>Shop</Link>
        <br/>
        <h1 className={classes.value}>{count}</h1>
        <button className={classes.button} onClick={increment}><span>inc</span></button>
        <About/>
        <div>
          <img src={avatarPng} alt="AvatarPng"/>
        </div>
        <div>
          <img src={avatarJpg} alt="avatarJpg"/>
        </div>
        <div>
          <AvatarSvg width={500} height={500} style={{color: 'green'}}/>
        </div>
      </div>
    );
};
