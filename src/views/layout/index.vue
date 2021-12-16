<template>
  <a-layout id="components-layout-demo-custom-trigger" style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <template v-for="menu in menuList">
          <a-sub-menu :key="menu.id" v-if="menu.children && menu.children.length">
            <template v-slot:title>
              <span>
                <component v-if="menu.icon" :is="menu.icon" />
                <span>{{ menu.title }}</span>
              </span>
            </template>
            <a-menu-item v-for="subMenu in menu.children" :to="subMenu.route" :key="subMenu.id">{{ subMenu.title }}</a-menu-item>
          </a-sub-menu>
          <a-menu-item :key="menu.id" v-else @click="routeClick(menu.route)">
            <component v-if="menu.icon" :is="menu.icon" />
            <span>{{ menu.title }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <component :is="collapsed ? 'menu-unfold-outlined' : 'menu-fold-outlined'" @click="showMenu"></component>
      </a-layout-header>
      <a-layout-content>
        <a-breadcrumb>
          <a-breadcrumb-item>易学</a-breadcrumb-item>
          <template v-for="breadcrumb in breadcrumbList" :key="`breadcrumb-${breadcrumb.uri}`">
            <a-breadcrumb-item>{{ breadcrumb.title }}</a-breadcrumb-item>
          </template>
        </a-breadcrumb>
        <div :style="{ padding: '12px 24px', background: '#fff', minHeight: '100%' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
  import { reactive, ref } from "vue";
  import { defineComponent, watch } from "vue";
  import { RouteRecordName, useRoute, useRouter } from "vue-router";
  export default defineComponent({
    components: {},
    setup() {
      let collapsed = ref<boolean>(false);
      const showMenu = () => {
        collapsed.value = !collapsed.value;
      };
      let router = useRouter();
      const routeClick = (path: string) => {
        router.push({ path });
      };
      interface menu {
        icon?: string;
        title: string;
        id: string;
        uri?: string;
        route?: string;
        children?: menu[];
      }
      const menuList: menu[] = [
        {
          icon: "pie-chart-outlined",
          title: "首页",
          id: "10001",
          uri: "dashboard",
          route: "/dashboard"
        },
        {
          icon: "desktop-outlined",
          title: "Option 2",
          id: "10002",
          uri: "teacher",
          route: "/teacher"
        },
        {
          icon: "user-outlined",
          title: "User",
          id: "10003",
          uri: "student",
          route: "/student"
        },
        {
          icon: "team-outlined",
          title: "Team",
          id: "10004",
          children: [
            {
              title: "Team A",
              id: "20004"
            },
            {
              title: "Team B",
              id: "20005"
            }
          ]
        },
        {
          icon: "file-outlined",
          title: "File",
          id: "10005"
        }
      ];

      const getCurrentRoute = (list: menu[], name: RouteRecordName | null | undefined): menu | undefined => {
        let current: menu | undefined = undefined;
        list.forEach((menu: menu) => {
          if (menu.uri == name) {
            current = menu;
            breadcrumbList.push(menu);
          } else if (menu.children?.length) {
            let sub = getCurrentRoute(menu.children, name);
            if (sub) {
              current = sub;
              breadcrumbList.push(menu);
              breadcrumbList.push(sub);
            }
          }
        });
        return current;
      };

      const route = useRoute();

      const breadcrumbList = reactive<menu[]>([]);

      let selectedKeys = reactive<string[]>([]);

      watch(
        () => route.name,
        (name) => {
          breadcrumbList.length = 0;
          const menu: menu | undefined = getCurrentRoute(menuList, name);
          selectedKeys = breadcrumbList.map((e) => e.id);
          menu && (document.title = `${menu.title || menu.uri} - 易学`);
        },
        { immediate: true }
      );

      return {
        showMenu,
        routeClick,
        collapsed,
        menuList,
        breadcrumbList,
        selectedKeys
      };
    }
  });
</script>

<style lang="scss">
  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }

  .site-layout .site-layout-background {
    background: #fff;
  }
  [data-theme="dark"] .site-layout .site-layout-background {
    background: #141414;
  }
  .ant-menu-inline-collapsed-tooltip .ant-tooltip-inner .anticon + span {
    margin-left: 10px;
  }
</style>