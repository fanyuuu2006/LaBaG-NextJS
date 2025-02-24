import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import credentials from '@/config/credentials.json'; // 金鑰
const PropertyID = 479378323;

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analyticsData = google.analyticsdata({
      version: 'v1beta',
      auth,
    });

    // 設定時間範圍（當月）
    const startDate = new Date();
    startDate.setDate(1); // 當月第一天
    const startDateStr = startDate.toISOString().split('T')[0];

    const response = await analyticsData.properties.runReport({
      property: `properties/${PropertyID}`, // GA4資源ID
      requestBody: {
        dateRanges: [{ startDate: startDateStr, endDate: 'today' }],
        metrics: [{ name: 'activeUsers' }],
      },
    });

    const visitors = response.data.rows?.[0]?.metricValues?.[0]?.value || '0';

    return NextResponse.json({ visitors });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
