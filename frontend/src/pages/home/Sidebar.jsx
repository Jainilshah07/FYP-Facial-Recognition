import React from "react";
import { Link } from 'react-router-dom'
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    return (
        <></>
        // <div>
        //     <div className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        //         <div className="mb-2 p-4">
        //             <Link to={'/'}> <Typography variant="h5" color="blue-gray">
        //                 Spider Cloud
        //             </Typography></Link>
        //         </div>
        //         <List>
        //             <Accordion
        //                 open={open === 1}
        //                 icon={
        //                     <ChevronDownIcon
        //                         strokeWidth={2.5}
        //                         className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
        //                     />
        //                 }
        //             >
        //                 <ListItem className="p-0" selected={open === 1}>
        //                     <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
        //                         <ListItemPrefix>
        //                             <PresentationChartBarIcon className="h-5 w-5" />
        //                         </ListItemPrefix>
        //                         <Typography color="blue-gray" className="mr-auto font-normal">
        //                             Dashboard
        //                         </Typography>
        //                     </AccordionHeader>
        //                 </ListItem>
        //                 <AccordionBody className="py-1">
        //                     <List className="p-0">
        //                         <ListItem>
        //                             <ListItemPrefix>
        //                                 <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
        //                             </ListItemPrefix>
        //                             Analytics
        //                         </ListItem>
        //                         <ListItem>
        //                             <ListItemPrefix>
        //                                 <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
        //                             </ListItemPrefix>
        //                             Reporting
        //                         </ListItem>
        //                         <ListItem>
        //                             <ListItemPrefix>
        //                                 <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
        //                             </ListItemPrefix>
        //                             Projects
        //                         </ListItem>
        //                     </List>
        //                 </AccordionBody>
        //             </Accordion>
        //             <Accordion
        //                 open={open === 2}
        //                 icon={
        //                     <ChevronDownIcon
        //                         strokeWidth={2.5}
        //                         className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
        //                     />
        //                 }
        //             >
        //                 <ListItem className="p-0" selected={open === 2}>
        //                     <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
        //                         <ListItemPrefix>
        //                             <ShoppingBagIcon className="h-5 w-5" />
        //                         </ListItemPrefix>
        //                         <Typography color="blue-gray" className="mr-auto font-normal">
        //                             Defaulters
        //                         </Typography>
        //                     </AccordionHeader>
        //                 </ListItem>
        //                 <AccordionBody className="py-1">
        //                     <List className="p-0">
        //                         <Link to={'/defaulter/attendance'}> <ListItem>
        //                             <ListItemPrefix>
        //                                 <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
        //                             </ListItemPrefix>
        //                             Based On Attendance
        //                         </ListItem> </Link>
        //                         <ListItem>
        //                             <ListItemPrefix>
        //                                 <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
        //                             </ListItemPrefix>
        //                             Based On Zones
        //                         </ListItem>
        //                     </List>
        //                 </AccordionBody>
        //             </Accordion>
        //             <Link to={'/attendance'}><ListItem>
        //                 <ListItemPrefix>
        //                     <InboxIcon className="h-5 w-5" />
        //                 </ListItemPrefix>
        //                 Attendance
        //             </ListItem></Link> 
        //             <Link to={'/employee-details'}><ListItem>
        //                 <ListItemPrefix>
        //                     <InboxIcon className="h-5 w-5" />
        //                 </ListItemPrefix>
        //                 Employee Details
        //             </ListItem></Link> 
        //             <ListItem>
        //                 <ListItemPrefix>
        //                     <InboxIcon className="h-5 w-5" />
        //                 </ListItemPrefix>
        //                 Activity Log
        //                 <ListItemSuffix>
        //                     <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
        //                 </ListItemSuffix>
        //             </ListItem>
        //             <ListItem>
        //                 <ListItemPrefix>
        //                     <UserCircleIcon className="h-5 w-5" />
        //                 </ListItemPrefix>
        //                 Profile
        //             </ListItem>
        //             <p className="mx-auto text-xl font-semibold mt-10"> Secondary </p>
        //             <ListItem className="mt-4">
        //                 <ListItemPrefix>
        //                     <Cog6ToothIcon className="h-5 w-5" />
        //                 </ListItemPrefix>
        //                 Settings
        //             </ListItem>
        //             <Link to='/login'> <ListItem>
        //                 <ListItemPrefix>
        //                     <PowerIcon className="h-5 w-5" />
        //                 </ListItemPrefix>
        //                 Log Out
        //             </ListItem></Link>
        //         </List>
        //     </div>
        // </div>
    )
}

export default Sidebar