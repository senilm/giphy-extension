const LogoutBtn = ({logOut}) => {
  return (
    <button onClick={logOut} className=" border rounded-lg px-2 hover:bg-black hover:text-white transition-all">Logout</button>
  )
}

export default LogoutBtn