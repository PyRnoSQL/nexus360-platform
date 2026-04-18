import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

export class GoogleSheetsService {
  private sheets;
  private spreadsheetId: string;

  constructor() {
    const auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    
    this.sheets = google.sheets({ version: 'v4', auth });
    this.spreadsheetId = process.env.GOOGLE_SHEETS_ID || '';
  }

  async getSheetData(sheetName: string): Promise<any[]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:Z`,
      });
      
      const rows = response.data.values || [];
      if (rows.length === 0) return [];
      
      const headers = rows[0];
      return rows.slice(1).map(row => {
        const obj: any = {};
        headers.forEach((header, index) => {
          obj[header] = row[index] || '';
        });
        return obj;
      });
    } catch (error) {
      console.error(`Error fetching ${sheetName}:`, error);
      return [];
    }
  }

  async getFinanceOptions() {
    const data = await this.getSheetData('finance_transactions');
    return {
      region: [...new Set(data.map(row => row['region']).filter(Boolean))],
      unit: [...new Set(data.map(row => row['unit']).filter(Boolean))],
      budget_line: [...new Set(data.map(row => row['budget_line']).filter(Boolean))],
      is_fraud_flagged: ['FALSE', 'TRUE']
    };
  }

  async getHROptions() {
    const data = await this.getSheetData('hr_employees');
    return {
      region: [...new Set(data.map(row => row['region']).filter(Boolean))],
      unit: [...new Set(data.map(row => row['unit']).filter(Boolean))],
      rank: [...new Set(data.map(row => row['rank']).filter(Boolean))],
      present_verified: ['FALSE', 'TRUE'],
      assignment_verified: ['FALSE', 'TRUE']
    };
  }

  async getIncidentsOptions() {
    const data = await this.getSheetData('incidents');
    return {
      incident_type: [...new Set(data.map(row => row['incident_type']).filter(Boolean))],
      region: [...new Set(data.map(row => row['region']).filter(Boolean))],
      city: [...new Set(data.map(row => row['city']).filter(Boolean))],
      severity: ['1', '2', '3', '4', '5'],
      assigned_precinct: [...new Set(data.map(row => row['assigned_precinct']).filter(Boolean))],
      status: [...new Set(data.map(row => row['status']).filter(Boolean))]
    };
  }

  async getFleetOptions() {
    const data = await this.getSheetData('fleet_assets');
    return {
      asset_type: [...new Set(data.map(row => row['asset_type']).filter(Boolean))],
      region: [...new Set(data.map(row => row['region']).filter(Boolean))],
      unit: [...new Set(data.map(row => row['unit']).filter(Boolean))],
      oil_pressure_warning: ['FALSE', 'TRUE']
    };
  }

  async getTrainingOptions() {
    const data = await this.getSheetData('training_programs');
    return {
      program_name: [...new Set(data.map(row => row['program_name']).filter(Boolean))],
      region: [...new Set(data.map(row => row['region']).filter(Boolean))],
      program_type: [...new Set(data.map(row => row['program_type']).filter(Boolean))]
    };
  }

  async getLeanOptions() {
    const data = await this.getSheetData('process_improvements');
    return {
      region: [...new Set(data.map(row => row['region']).filter(Boolean))],
      process_name: [...new Set(data.map(row => row['process_name']).filter(Boolean))]
    };
  }
}

export const googleSheetsService = new GoogleSheetsService();
