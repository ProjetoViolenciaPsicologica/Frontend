// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { api } from "@/services/index";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { data } = req.body;
    console.log(data);
    const response = await api.post("formulario/novo", {
      campo_questoes: data,
    });
    res.status(200).json(response.data);
  }
}
