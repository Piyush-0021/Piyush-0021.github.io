import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const { company_name, industry, email, password, logo_url } = await req.json();

    if (!company_name || !industry || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const { data: existing } = await supabase
      .from('companies')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const safeLogoUrl = typeof logo_url === 'string' ? logo_url : null;

    console.log('Payload being inserted:', {
      company_name,
      industry,
      email,
      password_hash: hashedPassword,
      logo_url: safeLogoUrl
    });

    const { data, error } = await supabase
      .from('companies')
      .insert([
        {
          company_name,
          industry,
          email,
          password_hash: hashedPassword,
          logo_url: safeLogoUrl
        }
      ])
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Registration failed', detail: error?.message }, { status: 500 });
    }

    const token = jwt.sign(
      { id: data.id, email: data.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      token,
      user: {
        id: data.id,
        email: data.email,
        company_name: data.company_name
      }
    });
  } catch (err: any) {
    console.error('Register error:', err.message);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
