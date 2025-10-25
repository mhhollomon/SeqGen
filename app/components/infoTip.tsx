import { Tooltip } from "radix-ui";

export function InfoTip({ children }: { children: React.ReactNode }) {
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <i className="bi bi-info-circle fs-6 ms-1"></i>
            </Tooltip.Trigger>
            <Tooltip.Content className="TooltipContent">{children}</Tooltip.Content>
        </Tooltip.Root>
    );
}
