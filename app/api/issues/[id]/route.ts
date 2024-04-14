import { issueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // find the issue first
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json('Invalid Issue', { status: 404 });
  }

  // update the issue

  const updatedIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(updatedIssue, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // find the issue first
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json('Invalid Issue', { status: 404 });
  }

  // delete the issue
  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });

  return NextResponse.json({ status: 201 });
}
