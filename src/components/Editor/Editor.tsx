import { TitleMachineContext } from "../../machines/TitleMachine";

const Editor: React.FC = () => {
	const titleActorRef = TitleMachineContext.useActorRef();
	const { send } = titleActorRef;

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.code === "Tab") {
			e.preventDefault();
			send({ type: 'EnteredAI' });
		} else if (e.key === "Enter") {
			e.preventDefault();
			send({ type: 'SelectedAI' });
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value && e.target.value.trim()) {
			send({ type: 'TitleAdded' });
		} else {
			send({
				type: 'TitleRemoved'
			});
		}
	}

	return <div className="column">
		<h1 className="column-header">Editor</h1>
		<div className="p1">
			<input type="text" className="w100" onChange={handleChange} onKeyDown={handleKeyDown} />
		</div>
	</div>
}

export default Editor;