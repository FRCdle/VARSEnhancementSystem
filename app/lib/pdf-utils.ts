import { PDFDocument } from 'pdf-lib';

export async function base64ToPDFBlob(base64PDF: string) : Promise<Blob> {
    // decode base64 string, remove space for IE compatibility
    const binary = atob(base64PDF.replace(/\s/g, ''));
    const len = binary.length;
    const buffer = new ArrayBuffer(len);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < len; i++) {
        view[i] = binary.charCodeAt(i);
    }

    const blob = new Blob( [view], { type: "application/pdf" });
    return blob;
}

export async function PDFBlobToLink(pdfBlob: Blob) : Promise<HTMLAnchorElement> {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(pdfBlob);
    const fileName = "output";
    link.download = fileName;
    return link;
}

export async function base64ToPDFLink(base64PDF: string) : Promise<HTMLAnchorElement> {
    const blob = await base64ToPDFBlob(base64PDF);
    return PDFBlobToLink(blob);
}

export async function badgePDFtoBlobs(base64PDF: string, length: number) : Promise<{full: Blob, backsOnly: Blob, individual: Blob[]}> {
    const fullPDF = await PDFDocument.load(base64PDF);
    const pages = fullPDF.getPages();

    const resize = pages.map((page, i) => {
        const { width, height } = page.getSize();
        // page.setSize(width * (3.7/8.5), height * (2.6/11));
        page.setSize(width * (4.08/8.5), height * (1.98/11));
        page.translateContent(-49, -597);
    });
    
    // Remove all extra pages, given the number of volunteers.
    while (fullPDF.getPageCount() > length * 2) {
        fullPDF.removePage(length * 2);
    }
    
    const fullPDFBytes = await fullPDF.save();
    const fullBlob = new Blob( [fullPDFBytes], { type: "application/pdf" });

    const backsPDF = await fullPDF.copy();
    // Remove all front faces of badges.
    for (let i = backsPDF.getPageCount() - 2; i >= 0; i -= 2) {
        backsPDF.removePage(i);
    }
    const backsPDFBytes = await backsPDF.save();
    const backsBlob = new Blob( [backsPDFBytes], { type: "application/pdf" });

    const individualBlobs: Blob[] = [];
    for (let i = 0; i < length; i += 2) {
        const tempPDF = await PDFDocument.create();
        const copiedPages = await tempPDF.copyPages(fullPDF, [i, i+1]);
        const [firstPage, secondPage] = copiedPages;
        tempPDF.addPage(firstPage);
        tempPDF.addPage(secondPage);
        const tempPDFBytes = await tempPDF.save();
        individualBlobs.push(new Blob( [tempPDFBytes], { type: "application/pdf" }));
    }

    return {
        full: fullBlob,
        backsOnly: backsBlob,
        individual: individualBlobs
    }

}