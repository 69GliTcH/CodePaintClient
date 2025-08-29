import { db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { compilerSliceStateType } from "@/redux/slices/compilerSlice";

/**
 * Save code snippet to Firestore
 */
export async function saveCode(
    urlId: string,
    fullCode: compilerSliceStateType["fullCode"],
    currentLang: compilerSliceStateType["currentLang"]
) {
    try {
        await setDoc(doc(db, "snippets", urlId), {
            fullCode,
            currentLang,
            updatedAt: new Date().toISOString(),
        });
        console.log("Code saved successfully 🚀");
    } catch (error) {
        console.error("Error saving code:", error);
    }
}

/**
 * Load code snippet from Firestore
 */
export async function loadCode(urlId: string) {
    try {
        const docRef = doc(db, "snippets", urlId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                fullCode: data?.fullCode as compilerSliceStateType["fullCode"],
                currentLang: data?.currentLang as compilerSliceStateType["currentLang"] || "html",
            };
        }

        return null;
    } catch (error) {
        console.error("Error loading code:", error);
        return null;
    }
}
