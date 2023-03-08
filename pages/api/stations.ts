import { Station } from "@/models/station.model";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Station[]>
) {
  res.status(200).json([]);
}
