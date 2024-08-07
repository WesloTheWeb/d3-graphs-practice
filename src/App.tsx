import './App.scss'
import ComingSoon from './components/ComingSoon/ComingSoon';
import BarChart from './components/Graphs/BarChart/BarChart';
import ConceptBarChart from './components/Graphs/ConceptBarChart/ConceptBarChart';
import ConceptSpiderChart from './components/Graphs/ConceptSpiderChart/ConceptSpiderChart';
import GroupedBarChart from './components/Graphs/ConceptSpiderChart/GroupedBarChart';
import DonutChart from './components/Graphs/DonutChart/DonutChart';
import ScatterPlot from './components/Graphs/ScatterChart/DemoScatterChart';
import SpecificGroupedBarChart from './components/Graphs/SpecificGraphs/BarSpecific';
import SpecificScatterChart from './components/Graphs/SpecificGraphs/ScatterSpecific';
import ScatterPlotOther from './components/ScatterPlotOthers/ScatterPlotOthers';
import GroupedBarChartByYear from './components/Year/GroupedBarChartByYear';
import ScatterPlotByYear from './components/Year/ScatterPlotByYear';

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
      <h3>Scatter Plot</h3>
      <ScatterPlot />
      <ScatterPlotOther />
      <h2>EXPERIMENTAL</h2>
      <SpecificGroupedBarChart />
      <SpecificScatterChart />
      <h2>Custom Examples</h2>
      <GroupedBarChartByYear />
      <ScatterPlotByYear />
    </>
  )
};

export default App;