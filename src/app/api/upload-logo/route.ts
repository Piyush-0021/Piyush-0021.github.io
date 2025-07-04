// src/app/api/upload-logo/route.ts
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  const { data, error } = await supabase.storage
    .from('logos')
    .upload(fileName, fileBuffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }

  const publicUrl = supabase.storage
    .from('logos')
    .getPublicUrl(data.path).data.publicUrl;

  return NextResponse.json({ logo_url: publicUrl });
}
