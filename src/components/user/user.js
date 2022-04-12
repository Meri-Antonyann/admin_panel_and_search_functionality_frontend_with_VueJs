import Profile from "./ProfileComponent";
import Posts from "./AdminPostComponent";
import Edit from "./EditPostComponent";


export default [
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/posts/{id}', name: 'Posts', component: Posts },
  { path: '/edit', name: 'Edit', component: Edit },
]
