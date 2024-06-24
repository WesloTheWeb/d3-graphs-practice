import './App.scss'
import ComingSoon from './components/ComingSoon/ComingSoon';
import BarChart from './components/Graphs/BarChart/BarChart';
import ConceptBarChart from './components/Graphs/ConceptBarChart/ConceptBarChart';
import ConceptSpiderChart from './components/Graphs/ConceptSpiderChart/ConceptSpiderChart';
import GroupedBarChart from './components/Graphs/ConceptSpiderChart/GroupedBarChart';
import DonutChart from './components/Graphs/DonutChart/DonutChart';

function App() {

  return (
    <>
      <section className="introContainer">
        <h1>D3 Graph Exploration</h1>
        <h2>🎵Look at this graph🎵</h2>
        <sub>Exploratory work and new technology experimentation with the <a href="https://d3js.org/" target="_blank">D3 Library</a></sub>
        <ComingSoon />
        <DonutChart />
      </section>
      <h3>Bar Charts</h3>
      <ConceptBarChart />
      <h3>Spider Chart</h3>
      {/* <ConceptSpiderChart /> */}
      <GroupedBarChart />
    </>
  )
};

export default App;