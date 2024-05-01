import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
	const [length, setLength] = useState(8);
	const [numberAllowed, setNumberAllowed] = useState(false);
	const [charAllowed, setCharAllowed] = useState(false);
	const [flag, setFlag] = useState(false);
	const [password, setPassword] = useState("");
	const passRef = useRef(null);

	const passwordGenerator = useCallback(() => {
		let pass = "";
		let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		if (numberAllowed) str += "0123456789";
		if (charAllowed) str += "!@$%^&*?#-+=[]{}~";

		for (let i = 1; i <= length; i++) {
			let index = Math.floor(Math.random() * str.length + 1);
			pass += str.charAt(index);
		}
		setPassword(pass);
		setFlag(false);
	}, [length, numberAllowed, charAllowed, setPassword]);
	useEffect(passwordGenerator, [length, numberAllowed, charAllowed]);
	function handleCopy() {
		passRef.current?.select();
		passRef.current?.setSelectionRange(0, 100); //to limit the selection range

		window.navigator.clipboard.writeText(password);
		setFlag(true);
	}
	useCallback(handleCopy, [password]);
	return (
		<div className="w-full max-w-xl  mx-auto  shadow-slate-800  shadow-xl text-orange-500  flex flex-col justify-between  bg-gray-700 h-40 items-center pt-4 ">
			<h1>Password generator</h1>
			<div className=" w-full flex flex-col items-center content-center justify-between  h-2/5">
				<input
					type="text"
					value={password}
					className="rounded-lg   h-1/3 w-full bg-slate-400 
					 
					outline-none py-1 px-2 text-slate-200 "
					placeholder="password"
					readOnly
					ref={passRef}
				></input>
				<button
					type="button"
					className=" px-3 py-0.5  w-16 h-1/3 text-cyan-50 rounded-lg bg-cyan-400 hover:bg-cyan-800  delay-100 "
					onClick={handleCopy}
				>
					{flag ? "copied" : "copy"}
				</button>
			</div>
			<div
				id="features"
				className=" w-full flex flex-row gap-6  items-center "
			>
				<input
					type="range"
					name=""
					id=""
					min={6}
					max={100}
					value={length}
					className=" cursor-pointer  w-2/3  h-1/2 ma"
					onChange={(e) => setLength(e.target.value)}
				/>
				<label htmlFor="">length :{length}</label>
				<input
					type="checkbox"
					name="Number"
					id=""
					className=" m-3  size-5"
					onChange={() => setNumberAllowed(!numberAllowed)}
				/>
				<input
					type="checkbox"
					name="character"
					id=""
					className=" m-3  size-5 "
					onChange={() => setCharAllowed(!charAllowed)}
				/>
			</div>
		</div>
	);
}

export default App;
