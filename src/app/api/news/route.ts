import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';

// GET — Frontend এ news পাঠাও
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');

    const query = category ? { category } : {};

    const news = await News.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ 
      success: true, 
      data: news,
      count: news.length
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

// POST — নতুন news save করো
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const newsItem = await News.create(body);
    return NextResponse.json({ success: true, data: newsItem });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to save news' },
      { status: 500 }
    );
  }
}
