import { Button } from './ui/button'
import { ClipboardCopy, ExternalLink, FileCode2, Loader2 } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { compilerSliceStateType, updateCurrentLang } from '@/redux/slices/compilerSlice'
import { RootState } from '@/redux/store'
import { handleError } from '@/utils/handleError'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from 'sonner'


export default function HelperHeader() {
    // const ENDPOINT='http://localhost:8080';
    const ENDPOINT='https://newserver-2-1t7c.onrender.com';
    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const [shareBtn, setSharebtn] = useState<boolean>(false);
    const navigate = useNavigate();
    const fullCode = useSelector((state: RootState) => state.compilerSlice.fullCode);
    const handleSaveCode = async () => {
        setSaveLoading(true);
        try {
            const response = await axios.post(`${ENDPOINT}/compiler/save`, {
                fullCode: fullCode
            });
            console.log(response.data);
            navigate(`/compiler/${response.data.url}`, { replace: true })
        } catch (error) {
            handleError(error);
        } finally {
            setSaveLoading(false);
        }
    }

    const { urlId } = useParams();
    useEffect(() => {
        if (urlId) {
            setSharebtn(true)
        }
        else setSharebtn(false)
    }, [urlId])



    const dispatch = useDispatch();
    const currentLang = useSelector((state: RootState) => state.compilerSlice.currentLang)
    return (
        <div className='_helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center'>
            <div className="_btn_container flex gap-2">
{/*                 <Button variant='success' onClick={handleSaveCode} disabled={saveLoading}>
                    {saveLoading ? <><Loader2 className='animate-spin' size={16} /> Saving</>
                        : "Save"}
                </Button>
                {shareBtn &&
                    <Dialog>
                        <DialogTrigger className='whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 flex justify-center items-center gap-1'>Share<ExternalLink size={16} /></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className='flex flex-row gap-1 justify-center items-center'><FileCode2 size={20} />Share your code!</DialogTitle>
                                <DialogDescription className='flex flex-col gap-2'>
                                    <div className=' justify-center items-center'>
                                        <p className='text-center'>Remember to save your code before sharing.
                                        </p>
                                    </div>
                                    <div className="__url flex gap-1">
                                        <input type='text' disabled className='w-full px-2 py-2 rounded bg-slate-800 text-slate-400'
                                            value={window.location.href} />
                                        <Button variant="outline" onClick={() => {
                                            window.navigator.clipboard.writeText(window.location.href);
                                            toast("URL copied to your clipboard!")
                                        }
                                        }><ClipboardCopy size={20} /></Button>
                                    </div>
                                    <p className='text-center'>
                                        Share this URL and show your code directly in the browser.<br />
                                        <p className=' font-thin text-xs'>&copy; 2024 Saksham Verma. All rights reserved.</p>
                                    </p>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                } */}
            </div>
            <div className="_tab_switcher flex justify-center items-center gap-1">
                <small>Language:</small>
                <Select defaultValue={currentLang}
                    onValueChange={(value) =>
                        dispatch(updateCurrentLang(value as compilerSliceStateType["currentLang"]))}>
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
    )
}
