import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function RenderCode() {
  const fullCode = useSelector((state: RootState) => state.compilerSlice.fullCode);

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
        key={iframeCode} // forces remount when code changes
        className="w-full h-full"
        src={iframeCode}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
