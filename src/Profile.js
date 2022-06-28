import "./profile.css";
import { useState } from "react";
import { useAuthValue } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import MuiPhoneNumber from "material-ui-phone-number";
import CountrySelect from "./Country";
import { Link } from "react-router-dom";
import "./forms.css";
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

function Profile() {
	const { currentUser } = useAuthValue();
	const [phone, setPhone] = useState(""); // for phone number
	const handlePhoneChange = (value) => {
		setPhone(value);
	};

	return (
		<Grid container component="main" sx={{ height: "100vh" }}>
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
			{/* <Grid className="center"> */}
			<Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<a className="backB" href="/">
						<ArrowBackIosIcon className="backbtn" />
						<span className="backtext">back</span>
					</a>
					<Typography
						style={{
							color: "#4a4e69",
						}}
						variant="h6"
					>
						{currentUser?.email}
					</Typography>
				</Box>

				<Box
					sx={{
						my: 8,
						mx: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					{/* <p>
						<strong>Email: </strong>
						{currentUser?.email}
					</p> */}
					{/* <p>
						<strong>Email verified: </strong>
						{`${currentUser?.emailVerified}`}
					</p> */}
					<MuiPhoneNumber
						style={{ width: "100%", marginBottom: "2rem" }}
						name="phone"
						label="Phone Number"
						data-cy="user-phone"
						defaultCountry={"us"}
						value={phone}
						onChange={handlePhoneChange}
					/>
					<TextField
						style={{ marginBottom: "2rem" }}
						margin="normal"
						required
						fullWidth
						id="address"
						label="Address"
						name="address"
						autoComplete="address"
						placeholder="Enter your address"
						autoFocus
					/>
					<CountrySelect />

					<Button
						style={{ marginBottom: "2rem", marginTop: "2rem" }}
						type="submit"
						fullWidth
						variant="contained"
						md={{ mt: 4, mb: 4 }}
						className="btn"
					>
						<a
							style={{ textDecoration: "none", color: "white" }}
							href="https://github.com/JoyeshDebnath"
						>
							Save & Continue
						</a>
					</Button>
					{/* imp below  */}

					<Button
						style={{ backgroundColor: "#457b9d", color: "#edf2f4" }}
						onClick={() => signOut(auth)}
					>
						Sign Out
					</Button>
				</Box>
			</Grid>
		</Grid>
	);
}

export default Profile;
