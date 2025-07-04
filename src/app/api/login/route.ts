
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const { data: user, error } = await supabase
    .from('companies')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );

  return NextResponse.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      company_name: user.company_name
    }
  });
}
