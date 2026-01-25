import useGlobalStore from "~/globalStore";
import * as icons from "~/icons"
import { DropdownMenu } from "radix-ui";

export default function History() {
    const { history, undoHistory, undoHistoryById } = useGlobalStore();

    return (
        <div>
            <button className="btn btn-primary rounded-end-0 pe-1" disabled={history.length === 0}
                onClick={undoHistory}>{icons.arrowCounterClockwise}Undo</button>


        <DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
            <button className="btn btn-primary rounded-start-0 pe-1" disabled={history.length === 0}
                onClick={() => {}}>{icons.chevronDown}</button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
                    {history.toReversed().map((h) => {
                        return (
                            <DropdownMenu.Item className="DropdownMenuItem" key={h.id} onSelect={() => undoHistoryById(h.id)}>
                                {h.description}
                            </DropdownMenu.Item>
                        );
                    })}
				<DropdownMenu.Arrow className="DropdownMenuArrow" />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
        </div>
    );
}
