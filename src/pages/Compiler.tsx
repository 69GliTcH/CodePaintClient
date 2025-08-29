import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { updateFullCode } from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/store";
import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import RenderCode from "@/components/RenderCode";
import { saveCode, loadCode } from "@/utils/firestoreHelpers";

export default function Compiler() {
    const { urlId } = useParams();
    const dispatch = useDispatch();
    const fullCode = useSelector((state: RootState) => state.compilerSlice.fullCode);

    // Load code from Firebase when visiting a URL
    useEffect(() => {
        if (urlId) {
            loadCode(urlId).then((data) => {
                if (data) {
                    dispatch(updateFullCode(data));
                }
            });
        }
    }, [urlId, dispatch]);

    // Optional: Auto-save only after user edits, not immediately on load
    useEffect(() => {
        if (urlId && fullCode && Object.values(fullCode).some(code => code.trim() !== "")) {
            // ✅ Only save if there is actual content
            saveCode(urlId, fullCode);
        }
    }, [fullCode, urlId]);

    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50} className="h-[calc(100dvh-60px)] min-w-[350px]">
                <HelperHeader />
                <CodeEditor />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50} className="h-[calc(100dvh-60px)] min-w-[350px]">
                <RenderCode />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
