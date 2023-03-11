import MyFiles from "@/pages/MyFiles.vue"
import Recent from "@/pages/Recent.vue"
import Starred from "@/pages/Starred.vue"
import Drive from "@/pages/Drive.vue"

const routes = [
    {
      path: "/drive",
      component: Drive,
      children: [
          {
              path: "my-files",
              component: MyFiles,
              name: "my-files"
          },
          {
              path: "recent",
              component: Recent,
              name: "recent"
          },
          {
              path: "starred",
              component: Starred,
              name: "starred"
          }
      ]

    },
]

export default routes