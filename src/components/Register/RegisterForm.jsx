import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bg from "../../pages/bg/signin.jpg";
import bgimg from "../../pages/bg/backimg.jpg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, } from "react";
import ImageUploading from 'react-images-uploading';
import Stack from "@mui/material/Stack";

import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { v4 as uuidv4 } from 'uuid';
import { IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Swal from "sweetalert2";

const schema = yup
  .object({
    firstName: yup.string().min(3).max(10).required(),
    lastName: yup.string().min(3).max(15).required(),
    username: yup.string().min(3).max(12).required(),
    password: yup.string().min(10).required(),
    confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    email: yup.string().email().required(),
    mobile: yup.number().positive().min(10).required(),
  })
  .required();


const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const boxstyle = {
  
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "75vh",
  

  // bgcolor: "background.paper",
  // boxShadow: 24,
};

const button= {
  backgroundColor: "#D3D3D3 ",
  marginLeft: "10px",
};

const center = {
  position: "relative",
  top: "50%",
  left: "30%",
  
  
};

export default function RegisterForm({onSave}) {
 const navigate=useNavigate()
  const [gender, setGender] = useState("");
  const [images, setImages] = useState([]);

 
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const onSubmit = async (data) => {
    // Object.assign(data, { gender: gender });
    data.id = uuidv4()
    data.gender = gender;
    data.image=images
    console.log(data, "Register  Data");
    if(onSave){
      onSave(data)
     reset()
     setGender("")
     setImages([])
    }
  };



  const handleChange = (event) => {
    // errors.gender = event.target.value;
    setGender(event.target.value);
  };

  const handleEmailChange = (event) => {
    console.log(event.target.value)
  }

  return (
    <>
      
      <div
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
          // overflow:"hidden"
        }}
      >
        <Box sx={boxstyle}>
          <Grid container>
            {/* <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  marginTop: "40px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  height: "65vh",
                  color: "#f5f5f5",
                }}
              ></Box>
            </Grid> */}
            <Grid item xs={12} sm={12} lg={12}>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "auto",
                  minHeight: "500px",
                  backgroundColor: "#3b33d5",
                  padding:"10px"
                }}
              >
                <ThemeProvider theme={darkTheme}>
                  <Container>
                    <Box height={22} />
                    <Box sx={center}>
                      <Typography component="h1" variant="h4">
                        Create Account
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid container spacing={1}>
                      <Grid item xs={6}>
                          <TextField
                            {...register("firstName")}
                            fullWidth
                            label="First Name"
                            size="small"
                            name="firstName"
                          />
                          {errors.firstName && (
                            <span style={{ color: "#f7d643", fontSize: "12px" }}>
                              {errors.firstName?.message}
                            </span>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            {...register("lastName")}
                            fullWidth
                            label="Last Name"
                            size="small"
                            name="lastName"
                          />
                          {errors.lastName && (
                            <span style={{ color: "#f7d643", fontSize: "12px" }}>
                              {errors.lastName?.message}
                            </span>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            {...register("username")}
                            fullWidth
                            label="Username"
                            size="small"
                            name="username"
                          />
                          {errors.username && (
                            <span style={{ color: "#f7d643", fontSize: "12px" }}>
                              {errors.username?.message}
                            </span>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            id="email"
                            label="Email"
                            type="email"
                            name="email"
                            size="small"
                            
                            {...register("email")}
                            aria-invalid={errors.email ? "true" : "false"}
                          />
                          {errors.email && (
                            <span style={{ color: "#f7d643", fontSize: "12px" }}>
                              {errors.email?.message}
                            </span>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            {...register("password")}
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            size="small"
                            id="password"
                            autoComplete="new-password"
                          />
                          {errors.password && (
                            <span style={{ color: "#f7d643", fontSize: "12px" }}>
                              {errors.password?.message}
                            </span>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            {...register("confirmpassword")}
                            name="confirmpassword"
                            label="Confirm Password"
                            type="password"
                            size="small"
                            id="confirmpassword"
                            autoComplete="new-password"
                          />
                          {errors.confirmpassword && (
                            <span style={{ color: "#f7d643", fontSize: "12px" }}>
                              {errors.confirmpassword?.message}
                            </span>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            {...register("mobile")}
                            fullWidth
                            name="mobile"
                            label="Contact Number"
                            type="number"
                            size="small"
                          />
                          {errors.mobile && (
                            <span style={{ color: "#f7d643", fontSize: "12px" }}>
                              {errors.mobile?.message}
                            </span>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Gender
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={gender}
                              label="Gender"
                              size="small"
                              onChange={handleChange}
                            >
                              <MenuItem value="male">Male</MenuItem>
                              <MenuItem value="Female">Female</MenuItem>
                              <MenuItem value="Other">Other</MenuItem>
                            </Select>
                          </FormControl>
                          {errors.gender && (
                            <span style={{ color: "#f7d643", fontSize: "12px" }}>
                              {errors.gender?.message}
                            </span>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                        <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={1}
        maxFileSize={5000000}
        dataURLKey="data_url"
        acceptType={["jpg"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper"  style={{
            border: "2px dotted #ddd",
            padding: "5px",
          }}>
            <Button
            
              style={
              {border:"1px solid #d3d3d3", color:"#ffff"}}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </Button>
            &nbsp;
            <div style={{marginTop: "10px",
    position: "relative",
    zIndex: "99",
    display: "flex",
    justifyContent: "flex-start",}}>
            {images.map((image, index) => (
               <>
               <div
                 style={{
                   display: "flex",
                   justifyContent: "flex-start",
                   position: "relative",
                   zIndex: "99",
                 }}
               >
                 <img
                   key={index}
                   src={image.data_url}
                   style={{width: "60px",
                   height: "60px",}}
                  // 
                  //  onClick={() =>
                  //    handleTechLightbox(
                  //      index,
                  //      image.data_url
                  //    )
                  //  }
                 />
               </div>
               <div>
                 <IconButton
                   onClick={() => onImageRemove(index)}
                 >
                   <DeleteOutlineOutlinedIcon />
                 </IconButton>
               </div>
               {errors?.maxFileSize && (
               Swal.fire({
          
                icon: 'warning',
                title: 'Maximum File Size Limit is 5 MB',
                showConfirmButton: false,
                timer: 1000
              })
            )}
             </>
            ))}
            </div>
           
                                 
          </div>
        )}
      </ImageUploading>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth="true"
                            size="large"
                            sx={{
                              mt: "15px",
                              mr: "20px",
                              borderRadius: 28,
                              color: "#ffffff",
                              minWidth: "170px",
                              backgroundColor: "#FF9A01",
                            }}
                          >
                            Register
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack direction="row" spacing={2}>
                            <Typography
                              variant="body1"
                              component="span"
                              style={{ marginTop: "10px" }}
                            >
                              Already have an Account?{" "}
                              <span
                                style={{ color: "#beb4fb", cursor: "pointer" }}
                                onClick={() => {
                                  navigate("/login");
                                }}
                              >
                                Sign In
                              </span>
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </form>
                  </Container>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
