import { Measurement } from "@/models/measurement.model";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Measurement[]>
) {
  res.status(200).json([]);
}
