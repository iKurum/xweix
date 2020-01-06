import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import home from '../assets/img/微信.png';
import homeAct from '../assets/img/微信_选中.png';
import about from '../assets/img/个人.png';
import aboutAct from '../assets/img/个人_选中.png';
import commun from '../assets/img/通讯录.png';
import communAct from '../assets/img/通讯录_选中.png';

import './index.css';

const tabbarArr = [
  {
    img: home,
    imgAct: homeAct,
    path: '/'
  }, {
    img: commun,
    imgAct: communAct,
    path: '/commun'
  },
  {
    img: about,
    imgAct: aboutAct,
    path: '/about'
  }
];

export default class Tabbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    }
  }

  componentDidMount() {
    const p = window.location.pathname;
    tabbarArr.map((item, key) => {
      if (item.path === p) {
        this.setState({
          index: key
        })
      }
      return null;
    });
  }

  itemChange(key) {
    this.setState({
      index: key
    })
  }

  render() {
    const tab = tabbarArr.map((item, key) => {
      return (
        <Link to={item.path} key={key} onClick={() => this.itemChange(key)}>
          <img src={this.state.index === key ? item.imgAct : item.img} className='navImg' alt="" />
        </Link>
      );
    });

    return (
      <footer className='tabbar'>
        {tab}
      </footer>
    );
  }
}