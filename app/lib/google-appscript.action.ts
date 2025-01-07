'use server';

export async function populateVOLCodes() {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxpy07geaxztmwvBQwNsyfmk-oeV58QGdbKzCCzIZjQByHf5uDh5S1ELV3O3ZgN9zKkVg/exec');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(response);
}