import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Text } from '@react-pdf/renderer';
import { sampleBase64 } from '../helpers/sampleBae64';

const getFileBlob = (data) => {
	const byteChars = window.atob(data);
	const byteNums = new Array(byteChars.length);
	for (let i = 0; i < byteChars.length; i += 1) {
		byteNums[i] = byteChars.charCodeAt(i);
	}
	const byteArray = new Uint8Array(byteNums);
	const fileURL = new Blob([byteArray], { type: 'application/pdf' });
	return URL.createObjectURL(fileURL);
};

const styles = {
	body: {
		paddingTop: 35,
		paddingBottom: 65,
		paddingHorizontal: 35,
	},
	pageNumber: {
		position: 'absolute',
		fontSize: 12,
		bottom: 30,
		left: 0,
		right: 0,
		textAlign: 'center',
		color: 'grey',
	},
};

function SamplePDF() {
	const [numPages, setNumPages] = React.useState(null);
	const [pageNumber, setPageNumber] = React.useState(1);

	pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
		setPageNumber(1);
	}

	return (
		<div className='container'>
            <div style={{ width: '600px', margin: '0 auto', border: '1px solid' }}>
                <Document file={getFileBlob(sampleBase64)} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page style={styles.body} pageNumber={pageNumber}>
                    </Page>
                </Document>
            </div>
            <p style={{ textAlign: 'center' }}>{pageNumber} / {numPages}</p>
		</div>
	);
}

export default SamplePDF;
