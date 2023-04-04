import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ListViewData from "../../mockdata/SampleData.json";
import "./calender.css";
import { Box, Divider, Grid, Grow, IconButton, Paper, Popover, Tooltip, Typography } from "@mui/material";

function CalenderView() {
  
 
  const [datas, setDatas] = useState();
  const [popUp, setPopUp] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [intialData, setInitialData] = React.useState(null);



 

  useEffect(() => {
    const eventInfo = ListViewData.map((current) => {
      if (current.status === "overdue") {
        return { ...current, color: "#ff4d4d" }; //ff0000
      }
      if (current.status === "completed") {
        return { ...current, color: "#9aafe5" }; //97ade4
      }
      if (current.status === "scheduled") {
        return { ...current, color: "#ffdf00" }; //ffdf00
      }
      if (current.status === "cancelled") {
        return { ...current, color: "#b6dde8" };
      }
      if (current.status === "started") {
        return { ...current, color: "#00dd00" }; //00dd00
      }
    });
    setInitialData(eventInfo);
    console.log(eventInfo, "Event Info");
  }, []);

  //Passing allevents here
  const events = ListViewData;
  const legends = [
    { name: "Scheduled", color: "#ffdf00" },
    { name: "Started", color: "#00dd00" },
    { name: "Completed", color: "#9aafe5" },
    { name: "Cancelled", color: "#b6dde8" },
    { name: "Overdue", color: "#ff4d4d" },
  ];

  
  const handlePopoverOpen = (event) => {
    //   setAnchorEl(event.currentTarget);
    console.log(event);
    setPopUp(true);
    setDatas(event.event);
    setAnchorEl(event.el);
  };
 

  const handlePopoverClose = () => {
    setPopUp(false);
    setAnchorEl(null);
  };
  
  return (
    <>
      <div style={{width:"100%", padding:"10px"}}>
      <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
         
        >
          <Box
            mt={2}
            mb={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            
          >
            <Typography
              variant="body1"
            
              sx={{ fontWeight: "600", color: "#000" }}
              
            >
              Legend :
            </Typography>
            {legends.map((current) => (
              <div
              
                style={{ backgroundColor: current?.color,  padding: "2px 25px",
                borderRadius: "15px",
                marginLeft: "15px",
                cursor: "pointer",
                color: "#fff", }}
              >
                {current?.name}
              </div>
            ))}
          </Box>
          
        </Box>
        <Grid container spacing={10}>
          <Grid item xs={12} md={12} lg={12}>
            <div
              style={{ position: "relative", zIndex: "0" }}
              className="calenderHtml"
            >
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                //   headerToolbar={{
                //     center: "dayGridMonth,timeGridWeek,timeGridDay",
                //   }}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                //   eventMouseEnter={handlePopup}
                eventMouseEnter={handlePopoverOpen}
                eventMouseLeave={handlePopoverClose}
                // eventClick={handleDialogBox}
                events={intialData}
                dayMaxEvents={1}
                // dayMaxEventRows={1}
                // eventMaxStack={}
                // eventLimit={true}
                // monthMaxEvents={1}
                // views={months:1}
                // views={{
                //   months: {
                //     dayMaxEvents: 1,
                //   },
                // }}
                // eveLimitClick="week"
                height={600}
                contentHeight={600}
                
              />
              <Popover
            id="mouse-over-popover"
            // className={classes.popover}
            sx={{
              pointerEvents: "none",
              cursor: "pointer",
              
            }}
            open={popUp}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Paper elevation={0} sx={{
              maxWidth: 400,
              maxHeight: 250,
            }}>
              <Box
                
                sx={{
                  backgroundColor: "blue",
    color: "#ffffff",
    paddingTop: "5px",
    paddingBottom: "5px",
    padding: 1,
                }}
                style={
                  datas?.extendedProps?.status === "overdue"
                    ? { backgroundColor: "#ff4d4d" } //ff0000
                    : datas?.extendedProps?.status === "scheduled"
                    ? { backgroundColor: "#ffdf00" } //ffdf00
                    : datas?.extendedProps?.status === "cancelled"
                    ? { backgroundColor: "#b6dde8" }
                    : datas?.extendedProps?.status === "completed"
                    ? { backgroundColor: "#9aafe5" } //97ade4
                    : { backgroundColor: "#00dd00" } //00dd00
                }
              >
                <Typography
                  variant="body1"
                  component="p"
                  style={{ fontWeight: "600" }}
                >
                  {"Name: " + datas?.title}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{padding:1}}>
                <Typography variant="body2" component={"p"}>
                  {"Task Id: " + datas?.id}
                </Typography>
                <Typography variant="body2" component={"p"}>
                  {"Status: " + datas?.extendedProps?.status}
                </Typography>
              </Box>
            </Paper>
          </Popover>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default CalenderView;
