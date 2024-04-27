import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: NextRequest) {
  const data = await request.json();

  
  const instance: any = new Razorpay({
    key_id: process.env.KEY!,
    key_secret: process.env.SECRET,
  });

  const options = {
    amount: Number(data.sum*100),
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  return NextResponse.json({
    success: true,
    order,
  });
}
