import { Badge } from "@/components/Elements";

interface FacialRecognitionProps {
  status: "PENDING" | "SUCCESS" | "FAILED" | "NOT_REQUIRED";
}

export const FacialRecognitionStatus = ({ status }: FacialRecognitionProps) => {
  if (status === "SUCCESS") {
    return <Badge color="green">Success</Badge>;
  }

  if (status === "FAILED") {
    return <Badge color="red">Failed</Badge>;
  }

  if (status === "PENDING") {
    return <Badge color="yellow">Processing</Badge>;
  }

  return <Badge color="gray">Not Required</Badge>;
};
