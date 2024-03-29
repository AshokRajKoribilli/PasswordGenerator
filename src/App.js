import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
	numbers,
	upperCaseLetters,
	lowerCaseLetters,
	specialCharacters,
} from "./components/characters";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
	const [password, setPassword] = useState("");
	const [count, setCount] = useState(8);
	const [includeUpper, setIncludeUpper] = useState(false);
	const [includeLower, setIncludeLower] = useState(false);
	const [includeNumbers, setIncludeNumbers] = useState(false);
	const [includeSpecial, setIncludeSpecial] = useState(false);

	const countChange = (e) => {
		setCount(e.target.value);
	};

	const handleGeneratePassword = (e) => {
		if (
			!includeUpper &&
			!includeLower &&
			!includeNumbers &&
			!includeSpecial
		) {
			notify("You must Select atleast one option", true);
		}
		let charactersList = "";
		if (includeUpper) charactersList += upperCaseLetters;
		if (includeLower) charactersList += lowerCaseLetters;
		if (includeNumbers) charactersList += numbers;
		if (includeSpecial) charactersList += specialCharacters;
		let passwordList = "";
		for (let i = 0; i < count; i++) {
			passwordList += charactersList.charAt(
				Math.round(Math.random() * charactersList.length),
			);
		}
		console.log(passwordList);
		setPassword(passwordList);
	};

	const notify = (message, hasError = false) => {
		if (hasError) {
			toast.error(message, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			toast(message, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	const handleCopy = () => {
		if (password === "") {
			notify("Please generate a password first", true);
		} else {
			copyToClipboard();
			notify("Password copied to clipboard");
		}
	};

	const copyToClipboard = () => {
		const newTextArea = document.createElement("textarea");
		newTextArea.innerText = password;
		document.body.appendChild(newTextArea);
		newTextArea.select();
		document.execCommand("copy");
		newTextArea.remove();
	};

	return (
		<div className="App">
			<div className="generate-block">
				<h1>Password Generator</h1>
				<div className="generate-password">
					<h3>{password}</h3>
					<button className="copy-btn" onClick={handleCopy}>
						<i class="fas fa-clipboard"></i>{" "}
					</button>
				</div>
				<div className="generate-length">
					<label className="generate-length-lable">
						Password Length
					</label>
					<input
						type="number"
						min="8"
						max="20"
						value={count}
						onChange={countChange}
					/>
				</div>
				<div className="generte-Upper">
					<label className="generate-Upper-lable">
						Include Upper Case Letters
					</label>
					<input
						type="checkbox"
						checked={includeUpper}
						onChange={(e) => setIncludeUpper(e.target.checked)}
					/>
				</div>
				<div className="generte-Lower">
					<label className="generate-Lower-lable">
						Include Lower Case Letters
					</label>
					<input
						type="checkbox"
						checked={includeLower}
						onChange={(e) => setIncludeLower(e.target.checked)}
					/>
				</div>
				<div className="generte-Number">
					<label className="generate-Number-lable">
						Include Numbers
					</label>
					<input
						type="checkbox"
						checked={includeNumbers}
						onChange={(e) => setIncludeNumbers(e.target.checked)}
					/>
				</div>
				<div className="generte-Symbol">
					<label className="generate-Symbol-lable">
						Include Special Characters
					</label>
					<input
						type="checkbox"
						checked={includeSpecial}
						onChange={(e) => setIncludeSpecial(e.target.checked)}
					/>
				</div>
				<button className="btn" onClick={handleGeneratePassword}>
					Generate Password
				</button>
			</div>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
};

export default App;
