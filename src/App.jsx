import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import GovernedExecution from './components/GovernedExecution.jsx'
import Footer from './components/Footer.jsx'
import SectionDissolve from './components/SectionDissolve.jsx'
import ProofRow from './sections/ProofRow.jsx'
import Shift from './sections/Shift.jsx'
import Risk from './sections/Risk.jsx'
import Farewell from './sections/Farewell.jsx'
import ThreeQuestions from './sections/ThreeQuestions.jsx'
import OperatingModel from './sections/OperatingModel.jsx'
import Platform from './sections/Platform.jsx'
import UseCases from './sections/UseCases.jsx'
import Enterprise from './sections/Enterprise.jsx'
import GetStarted from './sections/GetStarted.jsx'

/* Each section's actual resolved background, so the dissolve strip between
   two sections starts and ends flush with the ground on either side of it.
   Kept here rather than sampled at runtime — most of these colours come
   from gradients/images, not a single flat rule. */
const BG = {
  white: '#ffffff',
  altGrey: '#f5f6f8',
  riskNavy: '#14163a',
  operatingBlack: '#202020',
  platformDeep: '#14122a',
  ctaPlum: '#241f38',
  footerBlack: '#0c0e12',
}

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProofRow />
        <SectionDissolve from={BG.white} to={BG.altGrey} />
        <Shift />
        <SectionDissolve from={BG.altGrey} to={BG.riskNavy} />
        <Risk />
        <SectionDissolve from={BG.riskNavy} to={BG.white} />
        <Farewell />
        <SectionDissolve from={BG.white} to={BG.altGrey} />
        <ThreeQuestions />
        <SectionDissolve from={BG.altGrey} to={BG.white} />
        <GovernedExecution />
        <SectionDissolve from={BG.white} to={BG.operatingBlack} />
        <OperatingModel />
        <SectionDissolve from={BG.operatingBlack} to={BG.platformDeep} />
        <Platform />
        <SectionDissolve from={BG.platformDeep} to={BG.white} />
        <UseCases />
        <SectionDissolve from={BG.white} to={BG.white} />
        <Enterprise />
        <SectionDissolve from={BG.white} to={BG.ctaPlum} />
        <GetStarted />
        <SectionDissolve from={BG.ctaPlum} to={BG.footerBlack} />
      </main>
      <Footer />
    </>
  )
}

export default App
