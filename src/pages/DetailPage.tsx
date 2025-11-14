import { useNavigate, useParams } from "react-router-dom";
import UmkmDetail from "../components/UmkmDetail";

export default function DetailPage() {
  const navigate = useNavigate();
  const { umkmId } = useParams<{ umkmId: string }>();

  const handleBackFromDetail = () => {
    navigate("/katalog");
  };

  return (
    <UmkmDetail umkmId={Number(umkmId) || 0} onBack={handleBackFromDetail} />
  );
}
