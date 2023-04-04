import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import EmailIcon from "@mui/icons-material/Email";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {useSelector, useDispatch} from "react-redux"
// import { Authaction } from '../Redux/reducers/Authreducer'

export default function Profile() {
  const stateinfo = useSelector(state=> state)
  const  dispatch = useDispatch()
  const stateData= {
    firstName:sessionStorage.getItem("firstName"),
    lastName:sessionStorage.getItem("lastName"),
    email:sessionStorage.getItem("email"),
    mobile:sessionStorage.getItem("mobile"),
    avatar:sessionStorage.getItem("avatar")
  }
  return (
    <>
      <Grid container spacing={2} sx={{ mt: "200" }}>
        <Grid item md={4}>
          <Grid container spacing={2} sx={{ mt: "20" }}>
            <Grid item md={12}>
              <Card>
                <CardContent>
                  {/* <img src={stateData.avatar} /> */}
                  <Box style={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                  <img src={stateData.avatar}  style={{width:"80px",height:"80px", borderRadius:"100%", marginRight:"15px"}}/>
                  <Typography variant="h6" align="left">
                    {stateData?.firstName +" "+ stateData?.lastName}
                  </Typography>
                  </Box>
                  <Divider sx={{ mt: 2 }} />
                  <Stack direction="row" spacing={2}>
                    <div>
                      <EmailIcon sx={{ m: 2 }} />
                    </div>
                    <div>
                      <p>{stateData?.email}</p>
                    </div>
                  </Stack>
                  <Divider />
                  <Stack direction="row" spacing={2}>
                    <div>
                      <SmartphoneIcon sx={{ m: 2 }} />
                    </div>
                    <div>
                      <p>{stateData?.mobile}</p>
                    </div>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={8}>
          <Grid container spacing={2} sx={{ mt: "200" }}>
            <Grid item md={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" align="left">
                    About me
                  </Typography>
                  <Divider sx={{ mt: 2 }} />
                  <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
                    body2. Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit. Quos blanditiis tenetur unde suscipit, quam beatae
                    rerum inventore consectetur, neque doloribus, cupiditate
                    numquam dignissimos laborum fugiat deleniti? Eum quasi
                    quidem quibusdam.
                  </Typography>
                  <Typography variant="h6" align="left" sx={{ mt: "30px" }}>
                    Details
                  </Typography>
                  <Divider sx={{ mt: 2 }} />
                  <Box sx={{ m: 2 }}>
                    <Stack direction="row" spacing={2}>
                      <Typography variant="subtitle2" sx={{ width: "140px" }}>
                        First Name:
                      </Typography>
                      <Typography variant="body2">{stateData?.firstName}</Typography>
                    </Stack>
                  </Box>
                  <Divider />
                  <Box sx={{ m: 2 }}>
                    <Stack direction="row" spacing={2}>
                      <Typography variant="subtitle2" sx={{ width: "140px" }}>
                        Last Name:
                      </Typography>
                      <Typography variant="body2">
                        {stateData?.lastName}
                      </Typography>
                    </Stack>
                  </Box>
                  <Divider />
                  <Box sx={{ m: 2 }}>
                    <Stack direction="row" spacing={2}>
                      <Typography variant="subtitle2" sx={{ width: "140px" }}>
                        Email Id
                      </Typography>
                      <Typography variant="body2">{stateData?.email}</Typography>
                    </Stack>
                  </Box>
                  <Divider />
                  <Box sx={{ m: 2 }}>
                    <Stack direction="row" spacing={2}>
                      <Typography variant="subtitle2" sx={{ width: "140px" }}>
                        Mobile No.
                      </Typography>
                      <Typography variant="body2">{stateData?.mobile}</Typography>
                    </Stack>
                  </Box>
                  
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box height={20} />
    </>
  );
}
