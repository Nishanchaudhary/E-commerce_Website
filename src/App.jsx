import Routeprovider from "./Routeprovider"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
      <Routeprovider />
      <ToastContainer />
    </>
  )
}

export default App
