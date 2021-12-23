
interface menu {
  icon?: string;
  title: string;
  id: string;
  uri?: string;
  route?: string;
  children?: menu[];
}
const menus: menu[] = [
  {
    "icon": "pie-chart-outlined",
    "title": "首页",
    "id": "10001",
    "uri": "dashboard",
    "route": "/dashboard"
  },
  {
    "icon": "desktop-outlined",
    "title": "Option 2",
    "id": "10002",
    "uri": "teacher",
    "route": "/teacher"
  },
  {
    "icon": "user-outlined",
    "title": "User",
    "id": "10003",
    "uri": "student",
    "route": "/student"
  },
  {
    "icon": "team-outlined",
    "title": "Team",
    "id": "10004",
    "children": [
      {
        "title": "Team A",
        "id": "20004"
      },
      {
        "title": "Team B",
        "id": "20005"
      }
    ]
  },
  {
    "icon": "file-outlined",
    "title": "File",
    "id": "10005",
    "uri": "role",
    "route": "/role"
  }
]

export default menus