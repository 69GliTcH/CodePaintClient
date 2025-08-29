import { useCallback } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { tags as t } from "@lezer/highlight";
import { tokyoNightInit } from "@uiw/codemirror-theme-tokyo-night";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateCodeValue } from "@/redux/slices/compilerSlice";

export default function CodeEditor() {
    const dispatch = useDispatch();
    const currentLang = useSelector(
        (state: RootState) => state.compilerSlice.currentLang
    );
    const fullCode = useSelector(
        (state: RootState) => state.compilerSlice.fullCode
    );

    const onChange = useCallback(
        (value: string) => dispatch(updateCodeValue(value)),
        [dispatch]
    );

    const languageExtension = loadLanguage(currentLang) || [];

    return (
        <ReactCodeMirror
            key={currentLang}
            value={fullCode[currentLang]}
            className="code-editor rounded-2xl"
            height="calc(100vh - 60px - 50px)"
            extensions={[languageExtension]}
            onChange={onChange}
            theme={tokyoNightInit({
                settings: {
                    caret: "#ffffff",
                    background: "#111827",
                    fontFamily: "monospace",
                    fontSize: "16px",
                    selection: "#ffffff33",
                },
                styles: [
                    { tag: t.comment, color: "#6272a4" },
                    { tag: t.keyword, color: "#ff79c6", fontWeight: "bold" },
                    { tag: t.string, color: "#f1fa8c" },
                    { tag: t.number, color: "#bd93f9" },
                    { tag: t.variableName, color: "#50fa7b" },
                    { tag: t.function(t.variableName), color: "#8be9fd" },
                ],
            })}
        />
    );
}
