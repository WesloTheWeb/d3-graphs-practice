import './App.scss'
import ComingSoon from './components/ComingSoon/ComingSoon';

function App() {

  return (
    <>
      <section className="introContainer">
        <h1>D3 Graph Exploration</h1>
        <h2>🎵Look at this graph🎵</h2>
        <sub>Exploratory work and new technology experimentation with the <a href="https://d3js.org/" target="_blank">D3 Library</a></sub>
        <ComingSoon />
      </section>
    </>
  )
};

export default App;