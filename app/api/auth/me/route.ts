import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// In-memory user storage (should match other auth routes)
const users: Array<{ id: string; name: string; email: string; password: string }> = [];

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as {
      userId: string;
      email: string;
    };

    // Find user
    const user = users.find(u => u.id === decoded.userId);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Auth verification error:', error);
    return NextResponse.json(
      { message: 'Invalid token' },
      { status: 401 }
    );
  }
}