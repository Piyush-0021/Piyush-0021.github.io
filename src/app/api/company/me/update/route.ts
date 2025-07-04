// import { NextResponse } from 'next/server';
// import { supabase } from '@/lib/supabase';
import { verifyToken } from '../../../../lib/jwt';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
// import { verifyToken } from '@/lib/jwt';

export async function PUT(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const user = verifyToken(token);

  console.log('Decoded user from token:', user);

  if (!user || typeof user === 'string' || !user.email) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const updates = await req.json();
  console.log('Incoming updates:', updates);

  const { data, error } = await supabase
    .from('companies')
    .update(updates)
    .eq('email', user.email)
    .select()
    .single();

  console.log('Supabase update response:', { data, error });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
