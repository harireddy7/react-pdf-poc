import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const HomeLazy = React.lazy(() => import(/* webpackChunkName: "HomeComponent" */'./pages/Home'));
const TextPDFLazy = React.lazy(() => import(/* webpackChunkName: "TextPDFComponent" */'./pages/TextPDF'));
const SamplePDFLazy = React.lazy(() => import(/* webpackChunkName: "SamplePDFComponent" */'./pages/SamplePDF'));

export default function App() {
	return (
		<Router>
			<Suspense fallback={<div>Loading...</div>}>
				<nav>
					<div>
						<Link to='/'>Home</Link>
					</div>
					<div>
						<Link to='/text-pdf'>Text PDF</Link>
					</div>
					<div>
						<Link to='/sample-pdf'>Sample PDF</Link>
					</div>
				</nav>

				<div className='route-container'>
					<Switch>
						<Route path='/text-pdf'>
							<TextPDFLazy />
						</Route>
						<Route path='/sample-pdf'>
							<SamplePDFLazy />
						</Route>
						<Route path='/'>
							<HomeLazy />
						</Route>
					</Switch>
				</div>
			</Suspense>
		</Router>
	);
}
