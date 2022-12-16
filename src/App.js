import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import TextPDFViewer from './components/TextPDFViewer';

function App() {
	return (
		<div className='container'>
			<PDFViewer>
				<TextPDFViewer />
			</PDFViewer>
		</div>
	);
}

export default App;
