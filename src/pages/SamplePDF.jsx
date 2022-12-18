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

	console.log({ numPages });
	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
		setPageNumber(1);
	}

	return (
		<div className='container'>
            <div style={{ width: '600px', margin: '0 auto', border: '1px solid' }}>
                <Document file={getFileBlob(sampleBase64)} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page style={styles.body} pageNumber={pageNumber}>
                        {/* <p
                            style={styles.pageNumber}
                            data-text="pagenumber"
                        >
                            {pageNumber} / {numPages}
                        </p> */}
                    </Page>
                </Document>
            </div>
            <p style={{ textAlign: 'center' }}>{pageNumber} / {numPages}</p>
		</div>
	);
}

// const allStyles = StyleSheet.create({
//     body: {
//       paddingTop: 35,
//       paddingBottom: 65,
//       paddingHorizontal: 35,
//     },
//     title: {
//       fontSize: 24,
//       textAlign: 'center',
//       fontFamily: 'Oswald'
//     },
//     author: {
//       fontSize: 12,
//       textAlign: 'center',
//       marginBottom: 40,
//     },
//     subtitle: {
//       fontSize: 18,
//       margin: 12,
//       fontFamily: 'Oswald'
//     },
//     text: {
//       margin: 12,
//       fontSize: 14,
//       textAlign: 'justify',
//       fontFamily: 'Times-Roman'
//     },
//     image: {
//       marginVertical: 15,
//       marginHorizontal: 100,
//     },
//     header: {
//       fontSize: 12,
//       marginBottom: 20,
//       textAlign: 'center',
//       color: 'grey',
//     },
//     pageNumber: {
//       position: 'absolute',
//       fontSize: 12,
//       bottom: 30,
//       left: 0,
//       right: 0,
//       textAlign: 'center',
//       color: 'grey',
//     },
//   });

export default SamplePDF;
