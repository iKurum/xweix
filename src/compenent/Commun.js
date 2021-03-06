import React, { Component } from 'react';
import axios from 'axios';
import FriendInfo from './FriendInfo';
import css from '../assets/css/commun.module.css';

const listArr = ['↑', '♥', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'];

export default class Commun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      dInfo: {
        "name": "Info",
        "email": "xxx@xxx",
        "sentence": "",
        "img": "https://via.placeholder.com/40/66ccff"
      },
      error: null,
      isSuccess: false,
      isInfo: false
    }
  }

  componentDidMount() {
    axios.get('./mock.json')
      .then(res => {
        let data = res.data.data.sort((a, b) => a.email[0].localeCompare(b.email[0]));
        this.setState({
          data: data,
          isSuccess: true
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: err
        });
      });
  }

  //分组
  getSortList(data) {
    let dlist = [];
    let c = [];
    let d = {};
    data.forEach(el => {
      let u = el.email[0].toUpperCase();
      if (!d[u]) {
        c.push({
          sort: u,
          data: [el]
        });
        d[u] = el;
      } else {
        c.forEach(ele => {
          if (ele.sort === u) {
            ele.data.push(el)
          }
        });
      }
      dlist.push(el);
    });
    return c.sort((a, b) => a.sort.localeCompare(b.sort));
  }

  getInfo = e => {
    if (e.currentTarget.getAttribute('data-index')) {
      let i = e.currentTarget.getAttribute('data-index');
      this.setState({
        dInfo: this.state.data[i]
      })
    }
    this.setState({ isInfo: !this.state.isInfo });
  }

  render() {
    let listNav = listArr.map((v, k) => {
      if (/[A-Z]/.test(v)) {
        return <a href={`#${v}`} key={k}>{v}</a>;
      } else if (v === '↑') {
        return <a href='#A' key={k}>{v}</a>;
      } else if (v === '#') {
        return <a href='#Z' key={k}>{v}</a>;
      } else {
        return <p key={k}>{v}</p>;
      }
    });

    if (this.state.isSuccess) {
      let dataIndex = 0;
      let list = this.getSortList(this.state.data).map((item, key) => {
        let l = item.data.map((i, k) => {
          // let s = process.env.NODE_ENV !== 'development'
          //   ?
          //   ('/api/40/' + color16())
          //   :
          //   ('https://via.placeholder.com/40/' + color16());
          return (
            <li
              key={k}
              className={css.listLi}
              onClick={this.getInfo}
              data-index={dataIndex++}
            >
              <div>
                <img src={i.img} alt='' className={css.put} />
              </div>
              <div>
                <p>{i.name}</p>
                <p>{i.email}</p>
              </div>
            </li>
          )
        });

        return (
          <div id={item.sort} key={key} className={css.listArr}>
            <p>{item.sort}</p>
            <ul className={css.listUl}>
              {l}
            </ul>
          </div>
        );
      })

      return (
        <div className={css.listBox}>
          <FriendInfo
            callback={this.getInfo}
            isInfo={this.state.isInfo}
            info={this.state.dInfo}
          />
          <div className={css.listNav}>
            {listNav}
          </div>
          {list}
          <ul>
            <li className={css.lastLi}><p>{this.state.data.length} 位联系人</p></li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className={css.listBox}>
          <p>加载中 ...</p>
        </div>
      );
    }
  }
}

// function color16() {
//   const color = [];
//   for (let i = 0; i < 3; i++) {
//     let rgb = Math.floor(Math.random() * 265).toString(16);
//     rgb = rgb.length === 1 ? ('0' + rgb) : rgb;
//     color.push(rgb);
//   }
//   return color.join('').toUpperCase();
// }
