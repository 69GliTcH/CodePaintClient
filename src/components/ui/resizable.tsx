import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import * as ResizablePrimitive from "react-resizable-panels";
import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex w-full h-full data-[panel-group-direction=vertical]:flex-col " +
      "bg-gradient-to-br from-cyan-950 via-indigo-900 to-purple-950 text-white " +
      "rounded-xl border border-white/30 overflow-hidden box-border",
      className
    )}
    {...props}
  />
);

const ResizablePanel = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) => (
  <ResizablePrimitive.Panel
    className={cn(
      "flex-1 w-full h-full min-h-0 overflow-hidden rounded-xl box-border",
      className
    )}
    {...props}
  />
);

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex items-center justify-center bg-white/20 hover:bg-white/50 transition-colors duration-300 box-border " +
      "w-px after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 " +
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70 focus-visible:ring-offset-1 " +
      "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full " +
      "data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 " +
      "data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 " +
      "data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-5 w-4 items-center justify-center rounded-sm border border-white bg-white/10 backdrop-blur-sm box-border">
        <DragHandleDots2Icon className="h-2.5 w-2.5 text-white/80" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
