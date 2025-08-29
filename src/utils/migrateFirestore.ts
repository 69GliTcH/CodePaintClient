// src/utils/migrateFirestore.ts
import { db } from "./firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { compilerSliceStateType } from "@/redux/slices/compilerSlice";

export async function migrateOldCodes() {
    try {
        const codesCol = collection(db, "codes");
        const snapshot = await getDocs(codesCol);

        let migratedCount = 0;

        for (const docSnap of snapshot.docs) {
            const data = docSnap.data();

            // Only migrate if it has `fullCode`
            if ("fullCode" in data) {
                const { fullCode } = data as { fullCode: compilerSliceStateType["fullCode"] };

                await updateDoc(doc(db, "codes", docSnap.id), fullCode);
                migratedCount++;
                console.log(`Migrated doc: ${docSnap.id}`);
            }
        }

        console.log(`✅ Migration complete. Migrated ${migratedCount} documents.`);
    } catch (error) {
        console.error("❌ Migration failed:", error);
    }
}
