import { useState } from "react";
import "./forms.css";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
} from "firebase/auth";
import { useAuthValue } from "./AuthContext";
//
import { Helmet } from "react-helmet";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//
function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { setTimeActive } = useAuthValue();

	const validatePassword = () => {
		let isValid = true;
		if (password !== "" && confirmPassword !== "") {
			if (password !== confirmPassword) {
				isValid = false;
				setError("Passwords does not match");
			}
		}
		return isValid;
	};

	const register = (e) => {
		e.preventDefault();
		setError("");
		if (validatePassword()) {
			// Create a new user with email and password using firebase
			createUserWithEmailAndPassword(auth, email, password)
				.then(() => {
					sendEmailVerification(auth.currentUser)
						.then(() => {
							setTimeActive(true);
							navigate("/verify-email");
						})
						.catch((err) => alert(err.message));
				})
				.catch((err) => setError(err.message));
		}
		setEmail("");
		setPassword("");
		setConfirmPassword("");
	};

	return (
		<Grid container component="main" sx={{ height: "100vh" }}>
			<Helmet>
				<title>Register </title>
				<meta name="description" content="Helmet application" />
			</Helmet>
			<CssBaseline />

			<Grid
				className="leftBar"
				item
				xs={false}
				sm={4}
				md={5}
				sx={{
					backgroundImage: "url(https://source.unsplash.com/random)",
					backgroundRepeat: "no-repeat",
					backgroundColor: (t) =>
						t.palette.mode === "light"
							? t.palette.grey[50]
							: t.palette.grey[900],
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
				style={{
					filter: "brightness(40%)",
				}}
			></Grid>

			<Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h3" variant="h3" className="heading">
						Register Individual Account
					</Typography>
					<h2 className="subheading">
						For the purpose of industry regulation,your details are required{" "}
					</h2>
					{error && <div className="auth__error">{error}</div>}
					<Box component="form" noValidate onSubmit={register} sx={{ mt: 1 }}>
						{/* <form onSubmit={register} name="registration_form"> */}
						{/* <input
							type="email"
							value={email}
							placeholder="Enter your email"
							required
							onChange={(e) => setEmail(e.target.value)}
						/> */}

						<TextField
							margin="normal"
							required
							fullWidth
							id="name"
							label="Full Name"
							name="name"
							autoComplete="name"
							autoFocus
						/>

						<TextField
							margin="normal"
							required
							fullWidth
							type="email"
							value={email}
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							placeholder="Enter your email"
							onChange={(e) => setEmail(e.target.value)}
						/>

						{/* <input
							type="password"
							value={password}
							required
							placeholder="Enter your password"
							onChange={(e) => setPassword(e.target.value)}
						/> */}

						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							value={password}
							autoComplete="current-password"
							placeholder="Enter your password"
							onChange={(e) => setPassword(e.target.value)}
						/>

						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Confirm Password"
							type="password"
							id="password"
							value={confirmPassword}
							autoComplete="current-password"
							placeholder="Confirm password"
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>

						{/* <input
							type="password"
							value={confirmPassword}
							required
							placeholder="Confirm password"
							onChange={(e) => setConfirmPassword(e.target.value)}
						/> */}

						{/* <button type="submit">Register</button> */}

						<Button
							type="submit"
							fullWidth
							variant="contained"
							md={{ mt: 3, mb: 2 }}
							className="btn"
						>
							Register
						</Button>
					</Box>
					<span>
						Already have an account?
						<Link to="/login">login</Link>
					</span>
				</Box>
			</Grid>
		</Grid>
	);
}

export default Register;
