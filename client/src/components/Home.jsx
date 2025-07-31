import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the about page when the component mounts
    navigate("/about");
  }, [navigate]);

  return }
