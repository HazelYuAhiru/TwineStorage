import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Common from './routes/commonRoute';
import Choice from './routes/Choice';
import Route1 from './routes/route1/index';
import Choice1 from './routes/route1/Choice1';
import Route1Sub1 from './routes/route1/route1sub1';
import Route1Sub2 from './routes/route1/route1sub2';
import Route2 from './routes/route2/index';
import Choice2 from './routes/route2/Choice2';
import Route2Sub1 from './routes/route2/route2sub1';
import Route2Sub2 from './routes/route2/route2sub2';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/common" element={<Common />} />
        <Route path="/choice" element={<Choice />} />
        <Route path="/route1" element={<Route1 />} />
        <Route path="/route1/choice" element={<Choice1 />} />
        <Route path="/route1/sub1" element={<Route1Sub1 />} />
        <Route path="/route1/sub2" element={<Route1Sub2 />} />
        <Route path="/route2" element={<Route2 />} />
        <Route path="/route2/choice" element={<Choice2 />} />
        <Route path="/route2/sub1" element={<Route2Sub1 />} />
        <Route path="/route2/sub2" element={<Route2Sub2 />} />
      </Routes>
    </Router>
  );
}