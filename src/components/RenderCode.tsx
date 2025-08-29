import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { updateFullCode } from "@/redux/slices/compilerSlice";

export default function RenderCode() {
  const { urlId } = useParams();
  const dispatch = useDispatch();
  const fullCode = useSelector((state: RootState) => state.compilerSlice.fullCode);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCode = async () => {
      if (!urlId) {
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "snippets", urlId);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const data = snap.data();
          // ✅ Corrected from `data.code` to `data.fullCode`
          if (data?.fullCode) {
            dispatch(updateFullCode(data.fullCode));
          }
        } else {
          setError("No such snippet found!");
        }
      } catch (err) {
        console.error("Error fetching snippet:", err);
        setError("Failed to load snippet.");
      } finally {
        setLoading(false);
      }
    };

    fetchCode();
  }, [urlId, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100dvh-60px)] text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[calc(100dvh-60px)] text-red-500">
        {error}
      </div>
    );
  }

  const combinedCode = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
${fullCode.css ?? ""}
</style>
</head>
<body>
${fullCode.html ?? ""}
<script>
${fullCode.javascript ?? ""}
</script>
</body>
</html>
`;

  const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(combinedCode)}`;

  return (
    <div className="bg-white h-[calc(100dvh-60px)]">
      <iframe
        key={urlId} // ensures refresh when navigating to a new snippet
        className="w-full h-full"
        src={iframeCode}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
