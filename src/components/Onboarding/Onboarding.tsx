import { useSelector } from "@xstate/react";
import { TitleMachineContext } from "../../machines/TitleMachine";

const Onboarding: React.FC = () => {
	const titleActorRef = TitleMachineContext.useActorRef();
	const { send } = titleActorRef;
	const state = useSelector(titleActorRef, (s) => s.context);
	const stage = useSelector(titleActorRef, (s) => s.value);

	let children;

	switch (stage) {
		case 'Intro':
			children = <div className="ta-center">
				<span style={{ fontSize: '50px' }}>&#128075;</span>
				<p>Hello there, I'll be guiding you through creating your first document.</p>
				<button onClick={() => send({ type: 'IntroNext' })}>Next</button>
			</div>
			break;
		case 'Step1':
			children = (
				<div className="p1">
					<div className="ta-center" style={{ fontSize: '50px' }}>
						&#128072;
					</div>
					<div >
						<p>Just start typing! Let's start with creating a title for your documents.</p>
						<ul className="task-list">
							<li className={state.titleAdded ? 'task-completed' : ''}>Add a title</li>
							<li className={state.aiEntered ? 'task-completed' : ''}>Press [TAB]</li>
							<li className={state.selectedAi ? 'task-completed' : ''}>Press [ENTER]</li>
						</ul>
					</div>
				</div>
			)
			break;
		case 'Step2':
			children = (<div className="ta-center">
				<p>&#127881; &#127881; &#127881; Fantastic work!</p>
				<button onClick={() => send({ type: 'Step2Next' })}>Next</button>
			</div>)
			break;
		case 'Step3': 
			children = (<div className="ta-center">
				<p>In this lesson you've learnt the following:-</p>
				<ul className="task-list">
					<li className="task-completed">How to add a title</li>
					<li className="task-completed">How to use AI</li>
				</ul>
			</div>)
	}

	// console.log(state);
	return <div className="column">
		<h1 className="column-header">Onboarding</h1>
		{children}
	</div>
}

export default Onboarding;