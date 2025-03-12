import { Badge } from "@/components/Elements";

interface PresentStatusProps {
  isPresent: boolean;
  faceRecognitionStatus: "PENDING" | "SUCCESS" | "FAILED" | "NOT_REQUIRED";
}

export const PresentStatus = (props: PresentStatusProps) => {
  const { isPresent, faceRecognitionStatus } = props;

  if (faceRecognitionStatus === "PENDING") {
    return <Badge color="yellow">Processing</Badge>;
  }

  return (
    <Badge color={isPresent ? "green" : "red"}>
      {isPresent ? "Present" : "Absent"}
    </Badge>
  );
};
