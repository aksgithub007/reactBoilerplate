import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Swal from "sweetalert2";
import ImageUploading from 'react-images-uploading';
import { useState } from 'react';

const schema = yup
  .object({
    firstName: yup.string().min(3).max(10).required(),
    lastName: yup.string().min(3).max(15).required(),
    email: yup.string().email().required(),
    mobile: yup.number().positive().min(10).required(),
  })
  .required();


export default function EditProfileForm({userRows, open, setOpen, save, }) {
  const [images, setImages] = React.useState([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
     resolver:yupResolver(schema)
  });

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // console.log(userRows,"User rows")
  React.useEffect(() => {
    console.log(userRows, "Edit Part Info");
    setImages(userRows?.image)
    if (userRows) {
      reset({
       firstName:userRows?.firstName,
       lastName:userRows?.lastName,
       email:userRows?.email,
       mobile:userRows?.mobile
      });
    } else {
      reset({
        firstName:"",
        lastName:"",
        email:"",
        mobile:"",
      });
    }
  }, [userRows, reset]);

  const onSubmit= (data) => {
     data.image=images
    if(userRows.id){
        data.id = userRows.id
        data.username = userRows.username
        data.password = userRows.password
        data.confirmpassword = userRows.confirmpassword
    }
    console.log(data,"After Edit form submit")
    if(save){
        save(data)
        reset()
        setOpen(false)
        setImages([])
        
    }
   console.log(data,"user Info")
  }
  
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Profile Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            User can update his profile details as shown in below
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid container spacing={1} rowSpacing={3}>
                      <Grid item xs={12}  style={{marginTop:"20px"}}>
                          <TextField
                            {...register("firstName")}
                            fullWidth
                            placeholder="First Name"
                            size="small"
                            name="firstName"
                          />
                          {errors.firstName && (
                            <span style={{ color: "#f7d643", fontSize: "12px" }}>
                              {errors.firstName?.message}
                            </span>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            {...register("lastName")}
                            fullWidth
                            placeholder="Last Name"
                            size="small"
                            name="lastName"
                          />
                          {errors.lastName && (
                            <span style={{ color: "#f7d643", fontSize: "12px" }}>
                              {errors.lastName?.message}
                            </span>
                          )}
                        </Grid>
                       
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="email"
                            placeholder="Email"
                            disabled
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
                       
                        <Grid item xs={12}>
                          <TextField
                            {...register("mobile")}
                            fullWidth
                            name="mobile"
                            placeholder="Contact Number"
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
              {border:"1px solid #d3d3d3", color:"#333"}}
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
            {images?.map((image, index) => (
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
                            Update Details
                          </Button>
                          <Button
                            type="button"
                            variant="contained"
                            fullWidth="true"
                            onClick={handleClose}
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
                            Cancel
                          </Button>
                        </Grid>
                        
                      </Grid>
                    </form>
        </DialogContent>
        
      </Dialog>
    </div>
  );
}