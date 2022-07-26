import HowToRegIcon from '@mui/icons-material/HowToReg';
import {
    Avatar,
    Box,
    Button, Grid, Paper,
    TextField,
    Typography
} from "@mui/material";
import Link from "@mui/material/Link";
import { useFormik } from 'formik';
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import * as yup from 'yup';
import RegisterImage from "../assets/images/RegisterImage.jpg";


const Register = () => {
    const [formValue, setFormValue] = React.useState({
        email: '',
        password: '',
        confirmPassword: '',
        Name: '',
        mobileNo: ''
    });

    const handleBlur = (event) => {
        const { name, value } = event.target;
        formik.setFieldTouched(name, true);
        if (name === 'confirmPassword' && value !== formik.values.password) {
            formik.setErrors({
                confirmPassword: 'Password does not match'
            })
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
        formik.setValues({
            ...formValue,
            [name]: value
        });
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            Name: '',
            mobileNo: ''
        },
        validationSchema: yup.object().shape({
            Name: yup.string().required("Name is Required").matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Enter valid name'),
            email: yup
                .string('Enter your email')
                .email('Enter a valid email')
                .required('Email is required')
            ,
            password: yup
                .string('Enter your password')
                .min(8, 'Password should be of minimum 8 characters length')
                .required('Password is required'),
            mobileNo: yup.string().required("Mobile No required")
                .min(10, 'Enter valid Mobile no')
                .matches(/^[0-9]*$/, 'Enter valid Mobile no'),
            confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
        }),
        onSubmit: (values) => {
            console.log(values)
            alert(JSON.stringify(values, null, 2));
        },

    });

    return (
        <Box
            sx={{
                marginTop: { sm: 10 },
                marginRight: { sm: 15 },
                marginLeft: { sm: 15 },
                boxShadow: 20
            }}
        >

            <Grid container component="main" sx={{ height: "75vh" }}>
                {/* IMAGE */}
                <Grid
                    item
                    xs={false}
                    sm={6}
                    md={6}
                    sx={{
                        backgroundImage: `url(${RegisterImage})`,
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />

                {/* FORM */}
                <Grid item xs={12} sm={6} md={6} component={Paper} elevation={0} square>
                    <Box
                        sx={{
                            my: 4,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "primary.dark" }}>
                            <HowToRegIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={formik.handleSubmit}
                            sx={{ mt: 1 }}
                        >
                            <Grid rowSpacing={1} container spacing={3}>
                                <Grid item md={12}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Name"
                                        label="Name"
                                        name="Name"
                                        autoComplete="Name"
                                        autoFocus
                                        size="small"
                                        value={formValue.Name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={formik.touched.Name && Boolean(formik.errors.Name)}
                                        helperText={formik.touched.Name && formik.errors.Name}

                                    />
                                </Grid>
                                <Grid item md={12}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        size="small"
                                        value={formValue.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    // InputProps={{
                                    //     endAdornment: (
                                    //         <InputAdornment position="end" sx={{ backgroundColor: '' }}>
                                    //             {emailAdorment()}
                                    //         </InputAdornment>
                                    //     ),
                                    // }}
                                    />
                                </Grid>
                                <Grid item md={12}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="mobileNo"
                                        label="Mobile No."
                                        name="mobileNo"
                                        autoComplete="mobileNo"
                                        type="text"
                                        size="small"
                                        value={formValue.mobileNo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
                                        helperText={formik.touched.mobileNo && formik.errors.mobileNo}
                                        inputProps={{ maxLength: 10 }}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        size="small"
                                        value={formValue.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        type="password"
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        id="confirmPassword"
                                        size="small"
                                        value={formValue.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"

                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit
                            </Button>
                            <Grid container>
                                {/* <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid> */}
                                <Grid item>
                                    <Link component={RouterLink} to="/login" variant="body2">
                                        {"Already have an account? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Register;
