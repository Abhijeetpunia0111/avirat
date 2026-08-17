import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import GovernedExecution from './components/GovernedExecution.jsx'
import Footer from './components/Footer.jsx'
import Shift from './sections/Shift.jsx'
import Risk from './sections/Risk.jsx'
import Farewell from './sections/Farewell.jsx'
import ThreeQuestions from './sections/ThreeQuestions.jsx'
import OperatingModel from './sections/OperatingModel.jsx'
import Platform from './sections/Platform.jsx'
import Capabilities from './sections/Capabilities.jsx'
import UseCases from './sections/UseCases.jsx'
import Enterprise from './sections/Enterprise.jsx'
import GetStarted from './sections/GetStarted.jsx'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Shift />
        <Risk />
        <Farewell />
        <ThreeQuestions />
        <GovernedExecution />
        <OperatingModel />
        <Platform />
        <Capabilities />
        <UseCases />
        <Enterprise />
        <GetStarted />
      </main>
      <Footer />
    </>
  )
}

export default App
