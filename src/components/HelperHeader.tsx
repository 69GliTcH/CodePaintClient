import { Button } from './ui/button';
import { ClipboardCopy, ExternalLink, FileCode2, Loader2 } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from 'react-redux';
import { compilerSliceStateType, updateCurrentLang, updateFullCode } from '@/redux/slices/compilerSlice';
import { RootState } from '@/redux/store';
import { handleError } from '@/utils/handleError';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { loadCode } from "@/utils/firestoreHelpers";
import { db } from "@/utils/firebase";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

export default function HelperHeader() {
    const [saveLoading, setSaveLoading] = useState(false);
    const [shareBtn, setShareBtn] = useState(false);

    const navigate = useNavigate();
    const { urlId } = useParams();
    const dispatch = useDispatch();

    const fullCode = useSelector((state: RootState) => state.compilerSlice.fullCode);
    const currentLang = useSelector((state: RootState) => state.compilerSlice.currentLang);

    // If this is a shared URL, fetch saved code from Firestore on mount
    useEffect(() => {
        setShareBtn(!!urlId);

        const fetchSavedCode = async () => {
            if (urlId) {
                try {
                    const docRef = doc(db, "snippets", urlId);
                    const snapshot = await getDoc(docRef);
                    if (snapshot.exists()) {
                        const data = snapshot.data();
                        if (data.fullCode && data.currentLang) {
                            dispatch(updateFullCode(data.fullCode));
                            dispatch(updateCurrentLang(data.currentLang));
                        }
                    } else {
                        toast.error("Snippet not found!");
                    }
                } catch (error) {
                    handleError(error);
                }
            }
        };

        fetchSavedCode();
    }, [urlId, dispatch]);

    const handleSaveCode = useCallback(async () => {
        if (!fullCode.html.trim() && !fullCode.css.trim() && !fullCode.javascript.trim()) {
            toast.error("Nothing to save!");
            return;
        }

        setSaveLoading(true);
        try {
            const newDocRef = urlId ? doc(db, "snippets", urlId) : doc(collection(db, "snippets"));
            await setDoc(newDocRef, {
                fullCode,
                currentLang,
                updatedAt: new Date().toISOString(),
                createdAt: new Date().toISOString(),
            });

            // Sync Redux state with saved Firestore data
            const saved = await loadCode(newDocRef.id);
            if (saved) {
                dispatch(updateFullCode(saved.fullCode));
                dispatch(updateCurrentLang(saved.currentLang));
            }

            navigate(`/compiler/${newDocRef.id}`, { replace: true });
            toast.success("Code saved successfully!");
        } catch (error) {
            handleError(error);
        } finally {
            setSaveLoading(false);
        }
    }, [fullCode, currentLang, urlId, navigate, dispatch]);

    const handleCopyUrl = () => {
        const url = window.location.href;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url);
            toast("URL copied to clipboard!");
        } else {
            toast.error("Clipboard not supported!");
        }
    };

    return (
        <div className="h-[50px] bg-black text-white p-2 flex justify-between items-center">
            <div className="flex gap-2">
                <Button
                    variant="success"
                    onClick={handleSaveCode}
                    disabled={saveLoading}
                >
                    {saveLoading ? (
                        <>
                            <Loader2 className="animate-spin" size={16} /> Saving...
                        </>
                    ) : (
                        "Save"
                    )}
                </Button>

                {shareBtn && (
                    <Dialog>
                        <DialogTrigger className="whitespace-nowrap rounded-md text-sm font-medium bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 flex items-center gap-1">
                            Share <ExternalLink size={16} />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="flex gap-1 items-center justify-center">
                                    <FileCode2 size={20} /> Share your code!
                                </DialogTitle>
                                <DialogDescription className="text-center">
                                    Save your code before sharing.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="flex flex-col gap-2 mt-2">
                                <div className="flex gap-1">
                                    <input
                                        type="text"
                                        disabled
                                        className="w-full px-2 py-2 rounded bg-slate-800 text-slate-400 truncate"
                                        value={window.location.href}
                                    />
                                    <Button variant="outline" onClick={handleCopyUrl}>
                                        <ClipboardCopy size={20} />
                                    </Button>
                                </div>

                                <p className="text-center text-xs font-thin">
                                    © 2025 Saksham Verma. All rights reserved.
                                </p>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>

            <div className="flex items-center gap-1">
                <small>Language:</small>
                <Select
                    value={currentLang}
                    onValueChange={(value) =>
                        dispatch(updateCurrentLang(value as compilerSliceStateType["currentLang"]))
                    }
                >
                    <SelectTrigger className="w-[120px] bg-gray-800 outline-none focus:ring-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="css">CSS</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
