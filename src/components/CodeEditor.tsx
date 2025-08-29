import React, { useCallback } from "react";
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
        (value: string) => {
            dispatch(updateCodeValue(value));
        },
        [dispatch]
    );

    const languageExtension = loadLanguage(currentLang) || [];

    return (
        <ReactCodeMirror
            value={fullCode[currentLang]} // ✅ Prefilled from Firebase if loaded
            className="code-editor"
            height="calc(100vh - 60px - 50px)"
            extensions={[languageExtension]}
            onChange={onChange}
            theme={tokyoNightInit({
                settings: {
                    caret: "#c6c6c6",
                    fontFamily: "monospace",
                    fontSize: "16px",
                    background: "#1A2130",
                },
                styles: [{ tag: t.comment, color: "#6272a4" }],
            })}
        />
    );
}
