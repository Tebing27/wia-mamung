import { useNavigate } from "react-router-dom";
import UmkmCatalog from "../components/UmkmCatalog";

export default function KatalogPage() {
  const navigate = useNavigate();

  const handleDetailClick = (umkmId: number) => {
    navigate(`/detail/${umkmId}`);
  };

  return <UmkmCatalog onUmkmClick={handleDetailClick} />;
}
