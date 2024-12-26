import { Skeleton } from "@mui/material";
import { pallete } from "../../../styles/pallete.m";

const ClothSkeleton: React.FC = () => {
  return (
    <Skeleton
      width={266}
      height={270}
      variant="rounded"
      animation="wave"
      sx={{ bgcolor: pallete.secondary[600] }}
    />
  );
};

export default ClothSkeleton;
