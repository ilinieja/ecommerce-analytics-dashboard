import { Test } from "@/models/test.model";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Test[]>
) {
  res.status(200).json([]);
}
