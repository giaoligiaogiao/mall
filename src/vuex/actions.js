// 获取秒杀数据
import axios from 'axios';
export const loadSeckillsInfo = ({ commit }) => {
  return new Promise((resolve, reject) => {
    const data = [
      {
        title: '【赠小风扇】维他 柠檬茶250ml*32盒 礼品装 整箱',
        img: 'static/img/index/seckill/seckill-item1.jpg',
        price: 71.9,
        realPrice: 89.6
      },
      {
        title: 'Kindle Paperwhite 全新升级版6英寸护眼非反光电子墨水',
        img: 'static/img/index/seckill/seckill-item2.jpg',
        price: 989.0,
        realPrice: 1299.0
      },
      {
        title: '粮悦 大吃兄糯米锅巴 安徽特产锅巴糯米原味400g*2盒',
        img: 'static/img/index/seckill/seckill-item3.jpg',
        price: 21.8,
        realPrice: 49.0
      },
      {
        title: '【京东超市】清风（APP）抽纸 原木纯品金装系列 3层',
        img: 'static/img/index/seckill/seckill-item4.jpg',
        price: 49.9,
        realPrice: 59.0
      },
      {
        title: 'NIKE耐克 男子休闲鞋 AIR MAX 90 ESSENTIAL 气垫',
        img: 'static/img/index/seckill/seckill-item5.jpg',
        price: 559.9,
        realPrice: 759.9
      }
    ];
    const date = new Date();
    const hours = date.getHours();
    const minute = date.getMinutes();
    const seconds = date.getSeconds();
    console.log([hours, minute, seconds]);
    // 距离开始秒杀时间
    const deadline = {
      hours: 1,
      minute: 38,
      seconds: 36
    };
    commit('SET_SECKILLS_INFO', [data, deadline]);
  });
};

// 获取轮播(营销)图片
export const loadCarouselItems = ({ commit }) => {
  return new Promise((resolve, reject) => {
    const data = {
      carouselItems: [
        'static/img/nav/1.jpg',
        'static/img/nav/2.jpg',
        'static/img/nav/3.jpg',
        'static/img/nav/4.jpg',
        'static/img/nav/5.jpg'
      ],
      activity: [
        'static/img/nav/nav_showimg1.jpg',
        'static/img/nav/nav_showimg2.jpg'
      ]
    };
    commit('SET_CAROUSELITEMS_INFO', data);
  });
};

// 加载电脑专栏数据
export const loadComputer = ({ commit }) => {
  return new Promise((resolve, reject) => {
    const computer = {
      title: '电脑数码',
      link: ['电脑馆', '游戏极品', '装机大师', '职场焕新', '女神频道', '虚拟现实', '二合一平板', '电子教育', '万物周刊'],
      detail: [
        {
          bigImg: 'static/img/index/computer/item-computer-1.jpg',
          itemFour: [
            {
              title: '电脑馆',
              title: '笔记本999元限量秒！',
              img: 'static/img/index/computer/item-computer-2.jpg'
            },
            {
              title: '外设装备',
              title: '1000减618',
              img: 'static/img/index/computer/item-computer-1-3.jpg'
            },
            {
              title: '电脑配件',
              title: '联合满减最高省618',
              img: 'static/img/index/computer/item-computer-1-4.jpg'
            },
            {
              title: '办公生活',
              title: '5折神券 精品文具',
              img: 'static/img/index/computer/item-computer-1-5.jpg'
            }
          ],
          itemContent: [
            'static/img/index/computer/item-computer-1-6.jpg',
            'static/img/index/computer/item-computer-1-7.jpg',
            'static/img/index/computer/item-computer-1-8.jpg'
          ]
        },
        {
          bigImg: 'static/img/index/computer/item-computer-2-1.jpg',
          itemFour: [
            {
              title: '平板电脑',
              title: '爆款平板12期免息',
              img: 'static/img/index/computer/item-computer-2-2.jpg'
            },
            {
              title: '智能酷玩',
              title: '抢999减666神券',
              img: 'static/img/index/computer/item-computer-2-3.jpg'
            },
            {
              title: '娱乐影音',
              title: '大牌耳机低至5折',
              img: 'static/img/index/computer/item-computer-2-4.jpg'
            },
            {
              title: '摄影摄像',
              title: '大牌相机5折抢',
              img: 'static/img/index/computer/item-computer-2-5.jpg'
            }
          ],
          itemContent: [
            'static/img/index/computer/item-computer-2-6.jpg',
            'static/img/index/computer/item-computer-2-7.jpg',
            'static/img/index/computer/item-computer-2-8.jpg'
          ]
        }
      ]
    };
    commit('SET_COMPUTER_INFO', computer);
  });
};

// 加载爱吃专栏数据
export const loadEat = ({ commit }) => {
  return new Promise((resolve, reject) => {
    const eat = {
      title: '爱吃',
      link: ['休闲零食', '坚果', '牛奶', '饮料冲调', '食用油', '大米', '白酒', '红酒', '烧烤食材', '牛排', '樱桃'],
      detail: [
        {
          bigImg: 'static/img/index/eat/item-eat-1-1.jpg',
          itemFour: [
            {
              title: '粮油调味',
              title: '买2免1',
              img: 'static/img/index/eat/item-eat-1-2.jpg'
            },
            {
              title: '饮料冲调',
              title: '第二件半价',
              img: 'static/img/index/eat/item-eat-1-3.jpg'
            },
            {
              title: '休闲零食',
              title: '满99减40',
              img: 'static/img/index/eat/item-eat-1-4.jpg'
            },
            {
              title: '中外名酒',
              title: '满199减100',
              img: 'static/img/index/eat/item-eat-1-5.jpg'
            }
          ],
          itemContent: [
            'static/img/index/eat/item-eat-1-6.jpg',
            'static/img/index/eat/item-eat-1-7.jpg',
            'static/img/index/eat/item-eat-1-8.jpg'
          ]
        },
        {
          bigImg: 'static/img/index/eat/item-eat-2-1.jpg',
          itemFour: [
            {
              title: '东家菜',
              title: '丰富好味',
              img: 'static/img/index/eat/item-eat-2-2.jpg'
            },
            {
              title: '东家菜',
              title: '丰富好味',
              img: 'static/img/index/eat/item-eat-2-2.jpg'
            },
            {
              title: '东家菜',
              title: '丰富好味',
              img: 'static/img/index/eat/item-eat-2-2.jpg'
            },
            {
              title: '东家菜',
              title: '丰富好味',
              img: 'static/img/index/eat/item-eat-2-2.jpg'
            }
          ],
          itemContent: [
            'static/img/index/eat/item-eat-2-6.jpg',
            'static/img/index/eat/item-eat-2-7.jpg',
            'static/img/index/eat/item-eat-2-8.jpg'
          ]
        }
      ]
    };
    commit('SET_EAT_INFO', eat);
  });
};

// 请求获得商品详细信息
export const loadGoodsInfo = ({ commit }) => {
  commit('SET_LOAD_STATUS', true);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        goodsImg: [],
        title: [],
        discount: ['满148减10', '满218减20', '满288减30'],
        promotion: ['跨店满减', '多买优惠'],
        remarksNum: [],
        setMeal: [
          [
            {
              img: 'static/img/goodsDetail/pack/1.jpg',
              title: '4.7英寸-深邃蓝',
              price: 28.0
            },
            {
              img: 'static/img/goodsDetail/pack/2.jpg',
              title: '4.7英寸-星空黑',
              price: 29.0
            },
            {
              img: 'static/img/goodsDetail/pack/3.jpg',
              title: '5.5英寸-香槟金',
              price: 28.5
            }
         ,
            {
              img: 'static/img/goodsDetail/pack/4.jpg',
              title: '5.5英寸-玫瑰金',
              price: 32.0
            },
            {
              img: 'static/img/goodsDetail/pack/5.jpg',
              title: '5.5英寸-深邃蓝',
              price: 32.0
            },
            {
              img: 'static/img/goodsDetail/pack/6.jpg',
              title: '5.5英寸-星空黑',
              price: 35.0
            }
          ],
          [
            {
              img: 'static/img/goodsDetail/pack/7.jpg',
              title: '4.7英寸-香槟金',
              price: 26.0
            },
            {
              img: 'static/img/goodsDetail/pack/8.jpg',
              title: '4.7英寸-玫瑰金',
              price: 25.0
            },
            {
              img: 'static/img/goodsDetail/pack/9.jpg',
              title: '4.7英寸-中国红',
              price: 28.0
            }
          ]
        ],
        hot: [
          {
            img: 'static/img/goodsDetail/hot/1.jpg',
            price: 28.0,
            sale: 165076
          },
          {
            img: 'static/img/goodsDetail/hot/2.jpg',
            price: 36.0,
            sale: 135078
          },
          {
            img: 'static/img/goodsDetail/hot/3.jpg',
            price: 38.0,
            sale: 105073
          },
          {
            img: 'static/img/goodsDetail/hot/4.jpg',
            price: 39.0,
            sale: 95079
          },
          {
            img: 'static/img/goodsDetail/hot/5.jpg',
            price: 25.0,
            sale: 5077
          },
          {
            img: 'static/img/goodsDetail/hot/6.jpg',
            price: 20.0,
            sale: 3077
          }
        ],
        goodsDetail: [
          'static/img/goodsDetail/title/1.jpg',
          'static/img/goodsDetail/title/2.jpg',
          'static/img/goodsDetail/title/3.jpg',
          'static/img/goodsDetail/title/4.jpg'
        ],
        param: [
          {
            title: '商品名称',
            content: 'iPhone 7手机壳'
          },
          {
            title: '商品编号',
            content: '10435663237'
          },
          {
            title: '店铺',
            content: 'Gavin Shop'
          },
          {
            title: '商品毛重',
            content: '100.00g'
          },
          {
            title: '商品产地',
            content: '中国大陆'
          },
          {
            title: '机型',
            content: 'iPhone 7'
          },
          {
            title: '材质',
            content: 'PC/塑料'
          },
          {
            title: '款式',
            content: '软壳'
          },
          {
            title: '适用人群',
            content: '通用'
          }
        ],
        remarks: {
          goodAnalyse: 90,
          remarksTags: ['颜色可人', '实惠优选', '严丝合缝', '极致轻薄', '质量没话说', '比定做还合适', '完美品质', '正品行货', '包装有档次', '不容易发热', '已经买第二个', '是全覆盖'],
          remarksNumDetail: [2000, 3000, 900, 1],
          detail: [
            {
              username: 'p****1',
              values: 3,
              content: '颜色很好看，质量也不错！，还送了个指环，想不到哦！',
              goods: '4.7英寸-深邃蓝',
              create_at: '2018-05-15 09:20'
            },
            {
              username: '13****1',
              values: 5,
              content: '手感没的说，是硬壳，后背带有磨砂手感。很不错，很喜欢，还加送了钢化膜，支架环，物超所值，准备再买一个。很满意。物流很快。很愉快的一次购物！',
              goods: '5.5英寸-玫瑰金',
              create_at: '2018-05-13 15:23'
            },
            {
              username: '3****z',
              values: 4.5,
              content: '相当轻薄，店家还送了一大堆配件，*元非常值得！',
              goods: '4.7英寸-玫瑰金',
              create_at: '2018-05-05 12:25'
            },
            {
              username: 'gd****c',
              values: 3.5,
              content: '就是我想要的手机壳，壳子很薄，手感不错，就像没装手机壳一样，想要裸机手感的赶快下手了。',
              goods: '4.7英寸-中国红',
              create_at: '2018-04-06 16:23'
            },
            {
              username: 'r****b',
              values: 4.5,
              content: '壳子还不错，送的膜也可以，不过还是感觉膜小了那么一点，屏幕没法完全覆盖。对了，壳子稍微有点硬，可能会伤漆，所以不要频繁取壳就好。',
              goods: '4.7英寸-中国红',
              create_at: '2018-03-15 19:24'
            },
            {
              username: 'd****e',
              values: 5,
              content: '磨砂的，相当漂亮，尺寸非常合适！精工细作！',
              goods: '5.5英寸-星空黑',
              create_at: '2018-03-10 10:13'
            }
          ]
        }
      };
      commit('SET_GOODS_INFO', data);
      commit('SET_LOAD_STATUS', false);
    }, 300);
  });
};

// 获取商品列表
export const loadGoodsList = ({ commit }) => {
  commit('SET_LOAD_STATUS', true);
  axios({
    method: 'get',
    url: 'http://localhost:8081/goods',

  })
    .then((res) => {
      console.log(res)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = {
            goodsList: res.data,
            asItems: [
              {
                img: 'static/img/goodsList/item-as-.jpg',
                price: 39.9,
                title: 'SKSK 苹果7/7plus手机壳 iPhone 7 Plus保护套全包硬',
                num: 3140,
                sale: 9000
              },
            ]
          }
          commit('SET_GOODS_LIST', data);
          commit('SET_LOAD_STATUS', false);
        });

      });
    });
};

// 添加购物车
export const addShoppingCart = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    commit('ADD_SHOPPING_CART', data);
  });
};

// 获取用户推荐
export const loadRecommend = ({ commit }) => {
  return new Promise((resolve, reject) => {
    const data = [
      [
        {
          img: 'static/img/otherBuy/1.jpg',
          title: 'iPhone7/6s/8钢化膜苹果7Plus全屏全覆盖3D抗蓝',
          price: 29.00
        },
        {
          img: 'static/img/otherBuy/2.jpg',
          title: '苹果数据线 苹果iPhoneX/6s/7plus/8充电线',
          price: 36.00
        },
        {
          img: 'static/img/otherBuy/3.jpg',
          title: '苹果8/7/6/6s钢化膜 iphone8/7/6s/6钢化玻璃',
          price: 19.00
        },
        {
          img: 'static/img/otherBuy/4.jpg',
          title: 'iPhone6s/7钢化膜苹果8 Plus手机膜抗蓝光非全屏',
          price: 28.00
        }
      ],
      [
        {
          img: 'static/img/otherBuy/5.jpg',
          title: '苹果6s手机壳iPhone6s Plus保护壳防摔全',
          price: 28.00
        },
        {
          img: 'static/img/otherBuy/6.jpg',
          title: 'iPhone7/8手机壳手机套防摔磨砂保护壳星空黑☆全包保护',
          price: 30.00
        },
        {
          img: 'static/img/otherBuy/7.jpg',
          title: '数据线 适用于苹果iPhone 6s/6plus/7plus/8/X',
          price: 18.00
        },
        {
          img: 'static/img/otherBuy/8.jpg',
          title: 'iPhone8/7/6S/6钢化膜 苹果8/7/6s/6玻璃膜 手机高',
          price: 15.00
        }
      ]
    ];
    commit('SET_RECOMMEND_INFO', data);
  });
};

export const loadAddress = ({ commit }) => {
  return new Promise((resolve, reject) => {
    const address = [
      {
        addressId: '123456',
        name: 'Gavin',
        province: '广东省',
        city: '广州市',
        area: '天河区',
        address: '燕岭路633号',
        phone: '152****0609',
        postalcode: '510000'
      },
      {
        addressId: '123458',
        name: 'Kevin',
        province: '上海市',
        city: '上海市',
        area: '浦东新区',
        address: '沙新镇',
        phone: '158****0888',
        postalcode: '200120'
      }
    ];
    commit('SET_USER_ADDRESS', address);
  });
};
export const qwe=({commit})=> {console.log(123)
};
export const loadShoppingCart = ({ commit }) => {
  return new Promise((resolve, reject) => {
    const data = [
    
    ];
    commit('SET_SHOPPING_CART', data);
  });
};

// 添加注册用户
export const addSignUpUser = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'http://localhost:8081/users/signup',
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    })
      .then(
        console.log('1')
      );
  });
};

// 用户登录
export const login = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'http://localhost:8081/users/login',
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    })
      .then((res) => {
        if (res.data.code == 1) {
          localStorage.setItem("level", res.data.data.level);
          localStorage.setItem("userId", res.data.data.id);
          localStorage.setItem('loginInfo', JSON.stringify(data));
          commit('SET_USER_LOGIN_INFO', data);
          resolve(true);
          return true
        }
        else {
          resolve(false);
          return false
        }
      })



    // const userArr = localStorage.getItem('users');
    // console.log(userArr);
    // if (userArr) {
    //   const users = JSON.parse(userArr);
    //   for (const item of users) {
    //     if (item.username === data.username) {
    //       localStorage.setItem('loginInfo', JSON.stringify(item));
    //       commit('SET_USER_LOGIN_INFO', item);
    //       resolve(true);
    //       break;
    //     }
    //   }
    // } else {
    //   resolve(false);
    // }
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:8081/users/login',
    //   data: JSON.stringify(data),
    //   headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    // })

  });
};

// 退出登陆
export const signOut = ({ commit }) => {
  localStorage.removeItem('loginInfo');
  commit('SET_USER_LOGIN_INFO', {});
};

// 判断是否登陆
export const isLogin = ({ commit }) => {
  const user = localStorage.getItem('loginInfo');
  if (user) {
    commit('SET_USER_LOGIN_INFO', JSON.parse(user));
  }
};
