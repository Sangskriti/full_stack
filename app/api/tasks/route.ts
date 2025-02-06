import { NextResponse } from "next/server";
import { connectDB } from "./mongodb"; // ✅ Corrected Import
import Task from "../models/task";    // ✅ Corrected Import

export async function GET() {
  await connectDB();
  const tasks = await Task.find({});
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  await connectDB();
  const { title, description, dueDate } = await req.json();
  const newTask = await Task.create({ title, description, dueDate });
  return NextResponse.json(newTask, { status: 201 });
}

export async function PATCH(req: Request) {
  await connectDB();
  const { id, completed } = await req.json();
  const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true });
  return NextResponse.json(updatedTask);
}

export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();
  await Task.findByIdAndDelete(id);
  return NextResponse.json({ message: "Task deleted" });
}
