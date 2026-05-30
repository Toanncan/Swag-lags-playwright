import * as XLSX from "xlsx";
import * as path from "path";

export function readExcel(fileName: string, sheetName: string): any[] {
    const filePath = path.resolve(__dirname, "../test-data", fileName);

    const workBook = XLSX.readFile(filePath);
    const sheet = workBook.Sheets[sheetName];

    if (!sheet) {
        throw new Error(`${sheetName} does not exit.`);
    }

    const data = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });
    return data;
}