import React from 'react';
import TextPDFViewer from '../components/TextPDFViewer';

const Loader = () => <div>Loading pdf....</div>;

const LoadPDF = ({ module, children }) => {
	const { PDFViewer } = module || {};
	if (PDFViewer) {
		return <PDFViewer>{children}</PDFViewer>;
	}
	return <Loader />;
};

function TextPDF() {
	const [PDFViewer, setPdfViewer] = React.useState(null);

	React.useEffect(() => {
		async function loadPdfViewer() {
			try {
				const module = await import('@react-pdf/renderer');
				if (module && module.PDFViewer) {
					setPdfViewer({ PDFViewer: module.PDFViewer });
				}
			} catch (err) {
				console.log(err);
			}
		}
		loadPdfViewer();
	}, []);

	return (
		<div className='container'>
			<LoadPDF module={PDFViewer}>
				<TextPDFViewer />
			</LoadPDF>
		</div>
	);
}

export default TextPDF;
