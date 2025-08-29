import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { updateFullCode, updateCurrentLang } from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/store";
import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import RenderCode from "@/components/RenderCode";
import { loadCode } from "@/utils/firestoreHelpers";

export default function Compiler() {
    const { urlId } = useParams();
    const dispatch = useDispatch();

    const currentLang = useSelector((state: RootState) => state.compilerSlice.currentLang);

    // Fetch snippet from Firestore when opening a shared URL
    useEffect(() => {
        if (urlId) {
            loadCode(urlId).then((data) => {
                console.log("🚀 Snippet fetched from Firestore:", data);
                if (data) {
                    dispatch(updateFullCode(data.fullCode));
                    dispatch(updateCurrentLang(data.currentLang));
                }
            });
        }
    }, [urlId, dispatch]);

    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50} className="h-[calc(100dvh-60px)] min-w-[350px]">
                <HelperHeader />
                <CodeEditor key={urlId + currentLang} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50} className="h-[calc(100dvh-60px)] min-w-[350px]">
                <RenderCode key={urlId} />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
