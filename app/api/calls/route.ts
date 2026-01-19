import { NextResponse } from 'next/server';

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1bG5YLL1btGfc9igGeJFZKbKzOWAE3nxNisq3r5FXo5U/export?format=csv&gid=0';

export async function GET() {
    try {
        // Agregar timestamp para evitar caché
        const cacheBuster = `&t=${new Date().getTime()}`;
        const response = await fetch(SHEET_CSV_URL + cacheBuster, {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch sheet: ${response.statusText}`);
        }

        const csvText = await response.text();

        return new NextResponse(csvText, {
            headers: {
                'Content-Type': 'text/csv',
                'Cache-Control': 'no-store, max-age=0',
            },
        });
    } catch (error) {
        console.error('Error in API proxy:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
