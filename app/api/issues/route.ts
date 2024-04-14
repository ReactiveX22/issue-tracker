import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { createIssueSchema } from '../../validationSchemas';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    console.log('not success');
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // create the issue
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
