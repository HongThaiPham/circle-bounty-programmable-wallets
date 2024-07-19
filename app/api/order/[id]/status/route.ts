import prisma from "@/utils/db";

type Params = { params: { id: string } };
export async function GET(req: Request, { params: { id } }: Params) {
  const data = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  if (!data) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  return Response.json({ orderId: data.id, status: data.status });
}
