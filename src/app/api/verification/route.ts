import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req:any) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    await req.json();
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  
  
  const expectedSignature = crypto
    .createHmac("sha256", process.env.SECRET!)
    .update(body.toString())
    .digest("hex");


  const isAuthentic = expectedSignature === razorpay_signature;
  
  return NextResponse.json({isAuthentic:isAuthentic})
 
}