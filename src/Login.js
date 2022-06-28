import { useState } from "react";
import { Link } from "react-router-dom";
import "./forms.css";
//

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

import {
	signInWithEmailAndPassword,
	sendEmailVerification,
} from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "./AuthContext";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { setTimeActive } = useAuthValue();
	const navigate = useNavigate();

	const login = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				if (!auth.currentUser.emailVerified) {
					sendEmailVerification(auth.currentUser)
						.then(() => {
							setTimeActive(true);
							navigate("/verify-email");
						})
						.catch((err) => alert(err.message));
				} else {
					navigate("/");
				}
			})
			.catch((err) => setError(err.message));
	};

	return (
		// <div className="center">
		<Grid container component="main" sx={{ height: "100vh" }}>
			<CssBaseline />

			{/* <div className="auth"> */}
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
						Login Individual Account
					</Typography>
					<h2 className="subheading">
						For the purpose of industry regulation,your details are required{" "}
					</h2>
					{error && <div className="auth__error">{error}</div>}

					<Box component="form" noValidate onSubmit={login} sx={{ mt: 1 }}>
						{/* <form onSubmit={login} name="login_form"> */}
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
							type="email"
							value={email}
							required
							placeholder="Enter your email"
							onChange={(e) => setEmail(e.target.value)}
						/> */}

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

						<FormControlLabel
							className="form-control"
							control={<Checkbox value="remember" color="primary" />}
							label="I Agree To The Terms & Conditions"
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							md={{ mt: 3, mb: 2 }}
							className="btn"
						>
							Login
						</Button>
						{/* </form> */}
					</Box>
					<p>
						Don't have and account?
						<Link to="/register">Create one here</Link>
					</p>
				</Box>
			</Grid>
			{/* </div> */}
			{/* inner div  */}
			{/* </div> */}
		</Grid>
		// container
	);
}

export default Login;
