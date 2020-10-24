import Mock from "mockjs";
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body);
    console.log(JSON.parse(config.body));
    // 先判断用户是否存在
    if (username === "admin" || username === "wp") {
      // 判断账号和密码是否对应
      if (username === "admin" && password === "123456") {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: "/",
                name: "home",
                label: "个人中心",
                icon: "s-home",
                url: "Home/Home"
              },
              {
                path: "/video",
                name: "video",
                label: "职位管理",
                icon: "video-play",
                url: "VideoManage/VideoManage"
              },
              {
                path: "/user",
                name: "user",
                label: "简历管理",
                icon: "user",
                url: "UserManage/UserManage"
              },
              {
                path: "/gismap",
                name: "gismap",
                label: "gismapTest",
                icon: "user",
                url: "gisMap/gisMap"
              },
              {
                label: "其他",
                icon: "location",
                children: [
                  {
                    path: "/main",
                    name: "main",
                    label: "父组件",
                    icon: "setting",
                    url: "Other/main"
                  },
                  {
                    path: "/page1",
                    name: "page1",
                    label: "页面1",
                    icon: "setting",
                    url: "Other/PageOne"
                  },
                  {
                    path: "/page2",
                    name: "page2",
                    label: "页面2",
                    icon: "setting",
                    url: "Other/PageTwo"
                  }
                ]
              }
            ],
            token: Mock.Random.guid(),
            message: "获取成功"
          }
        };
      } else if (username === "wp" && password === "123456") {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home"
              },
              {
                path: "/video",
                name: "video",
                label: "视频管理页",
                icon: "video-play",
                url: "VideoManage/VideoManage"
              }
            ],
            token: Mock.Random.guid(),
            message: "获取成功"
          }
        };
      } else {
        return {
          code: -999,
          data: {
            message: "密码错误"
          }
        };
      }
    } else {
      return {
        code: -999,
        data: {
          message: "用户不存在"
        }
      };
    }
  }
};
