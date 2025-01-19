import Header from "./components/Header";
import Intro from "./components/Intro/Intro";
import VoiceInput from "./components/VoiceInput/VoiceInput";

function App() {
  return (
    <>
     {/*  <Header />
      <Intro /> */}
      <VoiceInput />
    </>
  );
}

/* const API_URL = import.meta.env.VITE_API_BASE_URL;
  console.log("API_URL : ", API_URL);
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => console.log(data));
 */

export default App;
