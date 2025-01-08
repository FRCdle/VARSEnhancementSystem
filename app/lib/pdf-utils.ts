import { PDFDocument } from 'pdf-lib';

export async function base64ToPDFBlob(base64PDF: string) : Promise<Blob> {
    // decode base64 string, remove space for IE compatibility
    var binary = atob(base64PDF.replace(/\s/g, ''));
    var len = binary.length;
    var buffer = new ArrayBuffer(len);
    var view = new Uint8Array(buffer);
    for (var i = 0; i < len; i++) {
        view[i] = binary.charCodeAt(i);
    }

    var blob = new Blob( [view], { type: "application/pdf" });
    return blob;
}

export async function PDFBlobToLink(pdfBlob: Blob) : Promise<HTMLAnchorElement> {
    var link = document.createElement('a');
    link.href = URL.createObjectURL(pdfBlob);
    var fileName = "output";
    link.download = fileName;
    return link;
}

export async function base64ToPDFLink(base64PDF: string) : Promise<HTMLAnchorElement> {
    const blob = await base64ToPDFBlob(base64PDF);
    return PDFBlobToLink(blob);
}

export async function processBadgesPDF(base64PDF: string) : Promise<Blob> {
    const existingPDF = await PDFDocument.load(base64PDF);
    const pages = existingPDF.getPages();

    const resize = pages.map((page, i) => {
        const { width, height } = page.getSize();
        console.log(width);
        console.log(height);
        page.setSize(width * (3.7/8.5), height * (2.6/11));
        page.translateContent(-40, -230);
    });
    const pdfBytes = await existingPDF.save();
    return new Blob( [pdfBytes], { type: "application/pdf" });
}

export async function badgePDFtoLink(base64PDF: string) : Promise<HTMLAnchorElement> {
    const blob = await processBadgesPDF(base64PDF);
    return PDFBlobToLink(blob);
}