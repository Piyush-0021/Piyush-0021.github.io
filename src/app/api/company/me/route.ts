import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyToken } from '../../../lib/jwt';


export async function PUT(req: Request) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const user = verifyToken(token);

  // ✅ Verify token structure and presence of email
  if (!user || typeof user === 'string' || !('email' in user)) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const updates = await req.json();

  const { data, error } = await supabase
    .from('companies')
    .update(updates)
    .eq('email', user.email)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
