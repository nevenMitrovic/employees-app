import Header from "../components/dashboard/Header"
import PostForm from "../components/forms/Post"
import useStore from "../store/zustand"

const Post = () => {
  const user = useStore((state) => state.updateUser)

  return (
    <>
      <Header />
      <PostForm
        userUpdate={user}
      />
    </>
  )
}

export default Post